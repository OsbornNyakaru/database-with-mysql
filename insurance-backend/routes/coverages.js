const express = require("express");
const db = require("../db");
const router = express.Router();

// Get all coverages
router.get("/", (req, res) => {
    db.query("SELECT * FROM Coverage", (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Create a new coverage
router.post("/", (req, res) => {
    const { CoverageType, Description } = req.body;
    db.query(
        "INSERT INTO Coverage (CoverageType, Description) VALUES (?, ?)",
        [CoverageType, Description],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: "Coverage Added", CoverageID: result.insertId });
        }
    );
});

// Update a coverage
router.put("/:id", (req, res) => {
    const { CoverageType, Description } = req.body;
    db.query(
        "UPDATE Coverage SET CoverageType=?, Description=? WHERE CoverageID=?",
        [CoverageType, Description, req.params.id],
        (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: "Coverage Updated" });
        }
    );
});

// Delete a coverage
router.delete("/:id", (req, res) => {
    db.query("DELETE FROM Coverage WHERE CoverageID=?", [req.params.id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Coverage Deleted" });
    });
});

module.exports = router;
