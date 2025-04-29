const request = require("supertest");
const express = require("express");
const router = require("../server/routes/authRoutes.js");
const UserModel = require("../server/models/UserModel.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

jest.mock("../server/models/UserModel");
jest.mock("bcryptjs");
jest.mock("jsonwebtoken");

const app = express();
app.use(express.json());
app.use("/", router);

describe("User Routes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  /**
   * Test suite for user registration (POST /register)
   */
  describe("POST /register", () => {
    /**
     * Should return 400 if any required field is missing
     */
    it("should return 400 if fields are missing", async () => {
      const res = await request(app).post("/register").send({ username: "user" });
      expect(res.statusCode).toBe(400);
      expect(res.body.message).toBe("All fields are required");
    });

    /**
     * Should return 400 if the username already exists
     */
    it("should return 400 if username already exists", async () => {
      UserModel.findOne.mockImplementation(({ username }) =>
        username ? { username } : null
      );
      const res = await request(app).post("/register").send({
        username: "testuser",
        email: "test@example.com",
        password: "password123"
      });
      expect(res.statusCode).toBe(400);
      expect(res.body.message).toBe("Username already exists");
    });

    /**
     * Should register a new user successfully when inputs are valid
     */
    it("should register a user successfully", async () => {
      UserModel.findOne.mockResolvedValue(null);
      bcrypt.hash.mockResolvedValue("hashedpassword");
      UserModel.prototype.save = jest.fn().mockResolvedValue();

      const res = await request(app).post("/register").send({
        username: "newuser",
        email: "new@example.com",
        password: "securepass"
      });

      expect(res.statusCode).toBe(201);
      expect(res.body.message).toBe("User registered successfully");
    });
  });

  /**
   * Test suite for user login (POST /login)
   */
  describe("POST /login", () => {
    /**
     * Should return 400 if username does not exist
     */
    it("should return 400 for invalid username", async () => {
      UserModel.findOne.mockResolvedValue(null);
      const res = await request(app).post("/login").send({
        username: "nouser",
        password: "any"
      });
      expect(res.statusCode).toBe(400);
      expect(res.body.message).toBe("Invalid credentials");
    });

    /**
     * Should return 400 if password is incorrect
     */
    it("should return 400 for invalid password", async () => {
      UserModel.findOne.mockResolvedValue({ password: "hashed" });
      bcrypt.compare.mockResolvedValue(false);
      const res = await request(app).post("/login").send({
        username: "validuser",
        password: "wrongpassword"
      });
      expect(res.statusCode).toBe(400);
      expect(res.body.message).toBe("Invalid credentials");
    });

    /**
     * Should return JWT token and user info on successful login
     */
    it("should return token on successful login", async () => {
      const user = { _id: "123", username: "user", password: "hashed", role: "user" };
      UserModel.findOne.mockResolvedValue(user);
      bcrypt.compare.mockResolvedValue(true);
      jwt.sign.mockReturnValue("mocktoken");

      const res = await request(app).post("/login").send({
        username: "user",
        password: "correctpassword"
      });

      expect(res.statusCode).toBe(200);
      expect(res.body.token).toBe("mocktoken");
      expect(res.body.user).toEqual({ id: "123", username: "user", role: "user" });
    });
  });

  /**
   * Test suite for getting all users (GET /)
   */
  describe("GET /", () => {
    /**
     * Should return a list of all users with IDs and usernames
     */
    it("should return list of users", async () => {
      const users = [{ _id: "1", username: "user1" }, { _id: "2", username: "user2" }];
      UserModel.find.mockReturnValue({ select: jest.fn().mockResolvedValue(users) });

      const res = await request(app).get("/");
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(users);
    });
  });

  /**
   * Test suite for deleting a user by ID (DELETE /:id)
   */
  describe("DELETE /:id", () => {
    /**
     * Should return 404 if the user to delete is not found
     */
    it("should return 404 if user not found", async () => {
      UserModel.findByIdAndDelete.mockResolvedValue(null);
      const res = await request(app).delete("/123");
      expect(res.statusCode).toBe(404);
      expect(res.body.message).toBe("User not found");
    });

    /**
     * Should delete a user successfully when the ID exists
     */
    it("should delete user successfully", async () => {
      UserModel.findByIdAndDelete.mockResolvedValue({ _id: "123" });
      const res = await request(app).delete("/123");
      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe("User deleted successfully");
    });
  });
});
