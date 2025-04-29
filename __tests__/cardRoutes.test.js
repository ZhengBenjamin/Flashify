const request = require("supertest");
const express = require("express");
const router = require("../server/routes/cardRoutes");
const FlashcardModel = require("../server/models/FlashcardModel");
const FlashdeckModel = require("../server/models/FlashdeckModel");

jest.mock("../server/models/FlashcardModel");
jest.mock("../server/models/FlashdeckModel");

const app = express();
app.use(express.json());
app.use("/", router);

describe("Flashcard Routes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  /**
   * Test suite for POST / route
   * Creates a new flashcard and updates the corresponding flashdeck
   */
  describe("POST /", () => {
    /**
     * Should return 400 if front/back/deck_id is missing
     */
    it("should return 400 if required fields are missing", async () => {
      const res = await request(app).post("/").send({ front: "Q1" });
      expect(res.statusCode).toBe(400);
      expect(res.body.message).toBe("Front, back, and deck_id are required");
    });

    /**
     * Should create a new flashcard and push it to the deck
     */
    it("should create a flashcard and update the deck", async () => {
      const fakeCard = {
        _id: "fake-id",
        flashcard_id: "card-uuid",
        username: "alice",
        deck_id: "deck123",
        front: "What is 2+2?",
        back: "4",
        save: jest.fn().mockResolvedValue(),
      };

      FlashcardModel.mockImplementation(() => fakeCard);
      FlashdeckModel.findOneAndUpdate.mockResolvedValue({});

      const res = await request(app).post("/").send({
        username: "alice",
        deck_id: "deck123",
        front: "What is 2+2?",
        back: "4",
      });

      expect(res.statusCode).toBe(201);
      expect(res.body.message).toBe("Flashcard created successfully");
      expect(res.body.card).toEqual(fakeCard);
    });

    /**
     * Should return 500 if saving the flashcard throws an error
     */
    it("should return 500 if card creation fails", async () => {
      FlashcardModel.mockImplementation(() => ({
        save: jest.fn().mockRejectedValue(new Error("Fail")),
      }));

      const res = await request(app).post("/").send({
        username: "alice",
        deck_id: "deck123",
        front: "Q",
        back: "A",
      });

      expect(res.statusCode).toBe(500);
      expect(res.body.error).toBe("Error creating flashcard");
    });
  });

  /**
   * Test suite for GET / route
   * Fetches flashcards for a given user and deck
   */
  describe("GET /", () => {
    /**
     * Should return all flashcards for a user and deck_id
     */
    it("should return flashcards for a user and deck", async () => {
      const flashcards = [{ front: "Q", back: "A" }];
      FlashcardModel.find.mockResolvedValue(flashcards);

      const res = await request(app).get("/").query({ username: "bob", deck_id: "deck123" });
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(flashcards);
    });

    /**
     * Should return 500 if the database query fails
     */
    it("should return 500 if flashcard fetch fails", async () => {
      FlashcardModel.find.mockRejectedValue(new Error("DB error"));
      const res = await request(app).get("/").query({ username: "bob", deck_id: "deck123" });
      expect(res.statusCode).toBe(500);
      expect(res.body.error).toBe("Error retrieving flashcards");
    });
  });

  /**
   * Test suite for PUT /:id route
   * Updates an existing flashcard by ID
   */
  describe("PUT /:id", () => {
    /**
     * Should return 400 if neither front nor back is provided
     */
    it("should return 400 if front and back are missing", async () => {
      const res = await request(app).put("/abc123").send({});
      expect(res.statusCode).toBe(400);
      expect(res.body.message).toBe("At least one field (front or back) must be provided");
    });

    /**
     * Should update the flashcard and return the updated document
     */
    it("should update a flashcard", async () => {
      const updatedCard = { _id: "abc123", front: "New", back: "Updated" };
      FlashcardModel.findByIdAndUpdate.mockResolvedValue(updatedCard);

      const res = await request(app).put("/abc123").send({ front: "New", back: "Updated" });
      expect(res.statusCode).toBe(200);
      expect(res.body.card).toEqual(updatedCard);
    });

    /**
     * Should return 404 if flashcard is not found
     */
    it("should return 404 if card not found", async () => {
      FlashcardModel.findByIdAndUpdate.mockResolvedValue(null);
      const res = await request(app).put("/abc123").send({ front: "New" });
      expect(res.statusCode).toBe(404);
      expect(res.body.message).toBe("Flashcard not found");
    });

    /**
     * Should return 500 if updating the flashcard fails
     */
    it("should return 500 on update error", async () => {
      FlashcardModel.findByIdAndUpdate.mockRejectedValue(new Error("DB error"));
      const res = await request(app).put("/abc123").send({ front: "New" });
      expect(res.statusCode).toBe(500);
      expect(res.body.error).toBe("Error updating flashcard");
    });
  });

  /**
   * Test suite for DELETE /:id route
   * Deletes a flashcard and updates the parent deck
   */
  describe("DELETE /:id", () => {
    /**
     * Should delete the flashcard and update the related flashdeck
     */
    it("should delete a flashcard and update the deck", async () => {
      const deletedCard = { _id: "abc123", deck_id: "deck123" };
      FlashcardModel.findByIdAndDelete.mockResolvedValue(deletedCard);
      FlashdeckModel.findOneAndUpdate.mockResolvedValue({});

      const res = await request(app).delete("/abc123");
      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe("Flashcard deleted successfully");
    });

    /**
     * Should return 404 if no flashcard is found to delete
     */
    it("should return 404 if flashcard not found", async () => {
      FlashcardModel.findByIdAndDelete.mockResolvedValue(null);
      const res = await request(app).delete("/abc123");
      expect(res.statusCode).toBe(404);
      expect(res.body.message).toBe("Flashcard not found");
    });

    /**
     * Should return 500 if deletion fails
     */
    it("should return 500 if delete fails", async () => {
      FlashcardModel.findByIdAndDelete.mockRejectedValue(new Error("DB error"));
      const res = await request(app).delete("/abc123");
      expect(res.statusCode).toBe(500);
      expect(res.body.error).toBe("Error deleting flashcard");
    });
  });
});
