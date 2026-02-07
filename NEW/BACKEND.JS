// server.js
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/childnotes", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// User Schema
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  notes: [
    {
      name: String,
      link: String,
    },
  ],
  pagesUsed: { type: Number, default: 0 },
  pagesRemaining: { type: Number, default: 20 },
});

const User = mongoose.model("User", userSchema);

// Signup
app.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(400).json({ message: "Username already exists" });
  }
  const newUser = new User({ username, password });
  await newUser.save();
  res.json({ message: "Signup successful" });
});

// Login
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, password });
  if (!user) {
    return res.status(400).json({ message: "Invalid credentials" });
  }
  res.json({ message: "Login successful", user });
});

// Add Note
app.post("/addNote", async (req, res) => {
  const { username, noteName, noteLink } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(404).json({ message: "User not found" });

  if (user.pagesRemaining <= 0) {
    return res.status(403).json({ message: "No pages remaining. Please pay." });
  }

  user.notes.push({ name: noteName, link: noteLink });
  user.pagesUsed += 1;
  user.pagesRemaining -= 1;
  await user.save();

  res.json({ message: "Note added successfully", user });
});

// Search Notes
app.get("/searchNotes/:username/:query", async (req, res) => {
  const { username, query } = req.params;
  const user = await User.findOne({ username });
  if (!user) return res.status(404).json({ message: "User not found" });

  const filteredNotes = user.notes.filter((note) =>
    note.name.toLowerCase().includes(query.toLowerCase())
  );

  res.json({ notes: filteredNotes });
});

// Payment Simulation
app.post("/simulatePayment", async (req, res) => {
  const { username } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(404).json({ message: "User not found" });

  user.pagesRemaining += 100;
  await user.save();

  res.json({ message: "Payment successful! 100 pages unlocked.", user });
});

// Start Server
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});