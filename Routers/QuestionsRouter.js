const express = require("express");
const { QuestionModel } = require("../Models/QuestionModel");
require("dotenv").config();

const questionRouter = express.Router();

// Middleware to parse JSON bodies
questionRouter.use(express.json());

// POST request to insert one or multiple questions
questionRouter.post("/add", async (req, res) => {
    try {
        const questions = req.body; // This can be an array of questions or a single question
        // Check if it's a single question or an array
        if (Array.isArray(questions)) {
            // Insert multiple questions
            const savedQuestions = await QuestionModel.insertMany(questions);
            return res.status(201).json({ message: "Questions added successfully!", data: savedQuestions });
        } else {
            // Insert a single question
            const newQuestion = new QuestionModel(questions);
            const savedQuestion = await newQuestion.save();
            return res.status(201).json({ message: "Question added successfully!", data: savedQuestion });
        }
    } catch (error) {
        console.error("Error adding questions:", error);
        return res.status(500).json({ message: "Error adding questions", error: error.message });
    }
});

// GET request to retrieve all questions
questionRouter.get("/", async (req, res) => {
    try {
        const questions = await QuestionModel.find(); // Fetch all questions
        return res.status(200).json({ message: "Questions retrieved successfully!", data: questions });
    } catch (error) {
        console.error("Error retrieving questions:", error);
        return res.status(500).json({ message: "Error retrieving questions", error: error.message });
    }
});

module.exports = {
    questionRouter,
};
