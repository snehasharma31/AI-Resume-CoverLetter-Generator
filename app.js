const express = require("express");
const path = require("path");
const multer = require("multer");
require("dotenv").config();

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static Files
app.use(express.static(path.join(__dirname, "public")));

// View Engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Upload Folder
const upload = multer({
    dest: "uploads/"
});

// Home Page
app.get("/", (req, res) => {
    res.render("index");
});

// ===============================
// Resume Analysis
// ===============================
app.post("/analyze", upload.single("resume"), async (req, res) => {

    try {

        if (!req.file) {
            return res.send("Please upload your resume.");
        }

        // Dummy AI Result (Project Submission)
        const aiResult = `
📊 ATS Score: 88%

✅ Strengths
• Good technical skills
• Relevant projects
• Proper resume formatting

⚠️ Weaknesses
• Add measurable achievements
• Improve professional summary

🔑 Missing Keywords
• Node.js
• Express.js
• MongoDB
• REST API

💡 Suggestions
• Add internship experience.
• Mention project impact.
• Add more job-specific keywords.
`;

        res.render("result", {
            aiResult
        });

    } catch (err) {

        console.log(err);

        res.status(500).send("Error while analyzing resume.");

    }

});

// ===============================
// Cover Letter Page
// ===============================
app.get("/cover-letter", (req, res) => {
    res.render("cover-letter");
});

// ===============================
// Generate Cover Letter
// ===============================
app.post("/cover-letter", (req, res) => {

    res.render("cover-result", {
        name: req.body.name,
        role: req.body.role,
        company: req.body.company,
        skills: req.body.skills,
        details: req.body.details
    });

});

// ===============================
// Server
// ===============================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
});