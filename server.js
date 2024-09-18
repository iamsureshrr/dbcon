const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const path = require("path");
const cors = require('cors');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose
  .connect("mongodb://localhost:27017/formDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Mongoose Schema for Form Data
const formSchema = new mongoose.Schema({
  name: String,
  contactNumber: String,
  location: String,
});

const Form = mongoose.model("Form", formSchema);

// API to handle form submission
app.post("/submit", async (req, res) => {
  const { name, contactNumber, location } = req.body;
  try {
    const formData = new Form({ name, contactNumber, location });
    await formData.save();
    res.status(200).json({ message: "Data saved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error saving data", error });
  }
});

// Serve the static HTML file from the public directory
app.use(express.static(path.join(__dirname,)));

// Test route for debugging
app.get("/", (req, res) => {
  res.send("Server is working!");
});

// Catch-all route to serve index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname,'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});



app.use(cors({
    origin: "https://iamsureshrr.github.io", // Allow requests from your GitHub Pages URL
    methods: ['GET', 'POST'], // Specify the allowed methods
}));

