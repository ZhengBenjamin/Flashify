const request = require("supertest");
const express = require("express");
const router = require("../server/routes/subjectRoutes"); // Adjust path as needed
const Subject = require("../server/models/SubjectModel");
const Flashdeck = require("../server/models/FlashdeckModel");
const Flashcard = require("../server/models/FlashcardModel");
const { v4: uuidv4 } = require("uuid");

// Mock the uuid function so it returns a fixed value during tests
jest.mock("uuid", () => ({
  v4: jest.fn(() => "test-uuid"),
}));

// Mock the models
jest.mock("../server/models/SubjectModel");
jest.mock("../server/models/FlashdeckModel");
jest.mock("../server/models/FlashcardModel");

const app = express();
app.use(express.json());
app.use("/", router);

describe("Subject Routes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  /**
   * Test suite for creating a new subject (POST /create)
   */
  describe("POST /create", () => {
    /**
     * Should return 400 if any required field is missing
     */
    it("should return 400 if fields are missing", async () => {
      const res = await request(app).post("/create").send({ username: "user" });
      expect(res.statusCode).toBe(400);
      expect(res.body.error).toBe("All fields are required.");
    });

    /**
     * Should create a new subject successfully
     */
    it("should create a new subject successfully", async () => {
      // Simulate a successful save with a stubbed subject object.
      const fakeSubject = {
        subject_id: "test-uuid",
        username: "user",
        subjectName: "Math",
        color: "blue",
        decks: [],
      };

      // Set up Subject constructor mock to return a fake instance with a save method.
      Subject.mockImplementation(() => {
        return {
          save: jest.fn().mockResolvedValue(fakeSubject),
        };
      });

      const res = await request(app).post("/create").send({
        username: "user",
        subjectName: "Math",
        color: "blue",
      });

      expect(uuidv4).toHaveBeenCalled();
      expect(res.statusCode).toBe(201);
      expect(res.body).toEqual(fakeSubject);
    });

    /**
     * Should return 500 if an error occurs during subject creation
     */
    it("should return 500 if error occurs during subject creation", async () => {
      // Force the save() method to throw an error.
      Subject.mockImplementation(() => {
        return {
          save: jest.fn().mockRejectedValue(new Error("DB error")),
        };
      });

      const res = await request(app).post("/create").send({
        username: "user",
        subjectName: "Math",
        color: "blue",
      });

      expect(res.statusCode).toBe(500);
      expect(res.body.error).toBe("Failed to create subject.");
    });
  });

  /**
   * Test suite for retrieving subjects for a given username (GET /:username)
   */
  describe("GET /:username", () => {
    /**
     * Should return a list of subjects for the specified username
     */
    it("should return a list of subjects", async () => {
      const subjects = [
        { subject_id: "1", username: "user", subjectName: "Math", color: "blue" },
        { subject_id: "2", username: "user", subjectName: "Science", color: "green" },
      ];
      Subject.find.mockResolvedValue(subjects);

      const res = await request(app).get("/user");
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(subjects);
    });

    /**
     * Should return 500 if an error occurs while fetching subjects
     */
    it("should return 500 if error occurs while fetching subjects", async () => {
      Subject.find.mockRejectedValue(new Error("DB error"));

      const res = await request(app).get("/user");
      expect(res.statusCode).toBe(500);
      expect(res.body.error).toBe("Failed to fetch subjects.");
    });
  });

  /**
   * Test suite for deleting a subject and its associated decks/flashcards (DELETE /:id)
   */
  describe("DELETE /:id", () => {
    /**
     * Should delete a subject and all related decks/flashcards successfully
     */
    it("should delete subject and related decks/flashcards", async () => {
      // Fake decks associated with the subject.
      const decks = [
        { deck_id: "deck1", subject_id: "subject123" },
        { deck_id: "deck2", subject_id: "subject123" },
      ];

      // Setup mocks:
      Flashdeck.find.mockResolvedValue(decks);
      // For each deck, we mock Flashcard deletion
      Flashcard.deleteMany.mockResolvedValue({ deletedCount: 5 });
      Flashdeck.deleteMany.mockResolvedValue({ deletedCount: decks.length });
      Subject.deleteOne.mockResolvedValue({ deletedCount: 1 });

      const res = await request(app).delete("/subject123");
      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe("Subject and all related decks/flashcards deleted successfully.");
    });

    /**
     * Should return 500 if an error occurs during deletion
     */
    it("should return 500 if error occurs during deletion", async () => {
      // Force an error during finding decks.
      Flashdeck.find.mockRejectedValue(new Error("DB error"));

      const res = await request(app).delete("/subject123");
      expect(res.statusCode).toBe(500);
      expect(res.body.error).toBe("Failed to delete subject and related data.");
    });
  });
});
