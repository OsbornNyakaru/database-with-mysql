const express = require("express");
const db = require("../db");
const router = express.Router();

// Get all branches
router.get("/", (req, res) => {
    db.query("SELECT * FROM Branch", (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Create a new branch
router.post("/", (req, res) => {
    const { BranchName, Address, Phone, Email } = req.body;
    db.query(
        "INSERT INTO Branch (BranchName, Address, Phone, Email) VALUES (?, ?, ?, ?)",
        [BranchName, Address, Phone, Email],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: "Branch Added", BranchID: result.insertId });
        }
    );
});

// Update a branch
router.put("/:id", (req, res) => {
    const { BranchName, Address, Phone, Email } = req.body;
    db.query(
        "UPDATE Branch SET BranchName=?, Address=?, Phone=?, Email=? WHERE BranchID=?",
        [BranchName, Address, Phone, Email, req.params.id],
        (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: "Branch Updated" });
        }
    );
});

// Delete a branch
router.delete("/:id", (req, res) => {
    db.query("DELETE FROM Branch WHERE BranchID=?", [req.params.id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Branch Deleted" });
    });
});

module.exports = router;
