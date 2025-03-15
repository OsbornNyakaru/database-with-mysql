const express = require("express");
const db = require("../db");
const router = express.Router();

// Get all claim statuses
router.get("/", (req, res) => {
    db.query("SELECT * FROM ClaimStatus", (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Create a new claim status
router.post("/", (req, res) => {
    const { Status, Description } = req.body;
    db.query(
        "INSERT INTO ClaimStatus (Status, Description) VALUES (?, ?)",
        [Status, Description],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: "Claim Status Added", ClaimStatusID: result.insertId });
        }
    );
});

// Update a claim status
router.put("/:id", (req, res) => {
    const { Status, Description } = req.body;
    db.query(
        "UPDATE ClaimStatus SET Status=?, Description=? WHERE ClaimStatusID=?",
        [Status, Description, req.params.id],
        (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: "Claim Status Updated" });
        }
    );
});

// Delete a claim status
router.delete("/:id", (req, res) => {
    db.query("DELETE FROM ClaimStatus WHERE ClaimStatusID=?", [req.params.id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Claim Status Deleted" });
    });
});

module.exports = router;
