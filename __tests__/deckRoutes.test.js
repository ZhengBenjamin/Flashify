const request = require("supertest");
const express = require("express");
const mongoose = require("mongoose");
const router = require("../server/routes/deckRoutes");
const FlashdeckModel = require("../server/models/FlashdeckModel");
const FlashcardModel = require("../server/models/FlashcardModel");

jest.mock("../server/models/FlashdeckModel");
jest.mock("../server/models/FlashcardModel");

const app = express();
app.use(express.json());
app.use("/", router);

describe("Flashdeck Routes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  /**
   * @desc Tests POST / — Create a flashdeck
   */
  describe("POST /", () => {
    it("should return 201 and create a new flashdeck", async () => {
      const mockDeck = {
        deck_id: "mock-id",
        username: "alice",
        title: "Math Deck",
        subject_id: "math01",
        card_count: 0,
        cards: [],
        save: jest.fn().mockResolvedValue(),
      };

      FlashdeckModel.mockImplementation(() => mockDeck);

      const res = await request(app).post("/").send({
        username: "alice",
        title: "Math Deck",
        subject_id: "math01",
      });

      expect(res.statusCode).toBe(201);
      expect(res.body.message).toBe("Flashdeck created successfully");
      expect(res.body.deck).toEqual(mockDeck);
    });

    it("should return 500 if deck creation fails", async () => {
      FlashdeckModel.mockImplementation(() => ({
        save: jest.fn().mockRejectedValue(new Error("Fail")),
      }));

      const res = await request(app).post("/").send({
        username: "alice",
        title: "History Deck",
        subject_id: "hist01",
      });

      expect(res.statusCode).toBe(500);
      expect(res.body.error).toBe("Error creating flashdeck");
    });
  });

  /**
   * @desc Tests GET / — Get all flashdecks by username (optionally subject_id)
   */
  describe("GET /", () => {
    it("should return all flashdecks for a user", async () => {
      const mockDecks = [{ title: "Deck 1" }, { title: "Deck 2" }];
      FlashdeckModel.find.mockReturnValue({ populate: jest.fn().mockResolvedValue(mockDecks) });

      const res = await request(app).get("/").query({ username: "bob" });

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(mockDecks);
    });

    it("should return 500 if retrieval fails", async () => {
      FlashdeckModel.find.mockImplementation(() => {
        throw new Error("DB error");
      });

      const res = await request(app).get("/").query({ username: "bob" });

      expect(res.statusCode).toBe(500);
      expect(res.body.error).toBe("Error retrieving flashdecks");
    });
  });

  /**
   * @desc Tests PUT /:id — Update flashdeck title
   */
  describe("PUT /:id", () => {
    it("should return 400 if no title is provided", async () => {
      const res = await request(app).put("/12345").send({});
      expect(res.statusCode).toBe(400);
      expect(res.body.message).toBe("Title is required to update the flashdeck");
    });

    it("should return 404 if flashdeck is not found", async () => {
      FlashdeckModel.findByIdAndUpdate.mockResolvedValue(null);

      const res = await request(app).put("/12345").send({ title: "New Title" });

      expect(res.statusCode).toBe(404);
      expect(res.body.message).toBe("Flashdeck not found");
    });

    it("should update the flashdeck and return it", async () => {
      const updatedDeck = { _id: "12345", title: "Updated" };
      FlashdeckModel.findByIdAndUpdate.mockResolvedValue(updatedDeck);

      const res = await request(app).put("/12345").send({ title: "Updated" });

      expect(res.statusCode).toBe(200);
      expect(res.body.deck).toEqual(updatedDeck);
    });

    it("should return 500 if update fails", async () => {
      FlashdeckModel.findByIdAndUpdate.mockRejectedValue(new Error("Update error"));

      const res = await request(app).put("/12345").send({ title: "Updated" });

      expect(res.statusCode).toBe(500);
      expect(res.body.error).toBe("Error updating flashdeck");
    });
  });

  /**
   * @desc Tests DELETE /:deck_id — Delete flashdeck and its flashcards
   */
  describe("DELETE /:deck_id", () => {
    it("should return 404 if deck is not found", async () => {
      FlashdeckModel.findOne.mockResolvedValue(null);

      const res = await request(app).delete("/deck001");

      expect(res.statusCode).toBe(404);
      expect(res.body.message).toBe("Deck not found");
    });

    it("should delete deck and associated flashcards", async () => {
      const mockDeck = { deck_id: "deck001", cards: ["card1", "card2"] };
      FlashdeckModel.findOne.mockResolvedValue(mockDeck);
      FlashcardModel.deleteMany.mockResolvedValue();
      FlashdeckModel.deleteOne.mockResolvedValue();

      const res = await request(app).delete("/deck001");

      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe("Deck and its flashcards deleted successfully");
    });

    it("should return 500 if delete fails", async () => {
      FlashdeckModel.findOne.mockRejectedValue(new Error("DB error"));

      const res = await request(app).delete("/deck001");

      expect(res.statusCode).toBe(500);
      expect(res.body.error).toBe("Error deleting flashdeck");
    });
  });
});
