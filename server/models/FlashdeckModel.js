const mongoose = require("mongoose");
const Card = require("../models/FlashcardModel");


const FlashdeckSchema = new mongoose.Schema({

deck_id: { type: String, required: true, unique: true },
username: { type: String, required: true },
title: { type: String, required: true },
description: { type: String, default: "Null" },
card_count: {type: Number, required: true },
cards: {type: [{ type: mongoose.Schema.Types.ObjectId, ref: Card }] }

});

module.exports = mongoose.model("FlashdeckModel", FlashdeckSchema);