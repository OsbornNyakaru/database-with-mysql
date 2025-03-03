const express = require("express");
const db = require("../db");
const router = express.Router();

// Get all policies
router.get("/", (req, res) => {
    db.query("SELECT * FROM Policy", (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Create a new policy
router.post("/", (req, res) => {
    const { PolicyType, CoverageAmount, Premium, StartDate, EndDate, Description } = req.body;
    db.query(
        "INSERT INTO Policy (PolicyType, CoverageAmount, Premium, StartDate, EndDate, Description) VALUES (?, ?, ?, ?, ?, ?)",
        [PolicyType, CoverageAmount, Premium, StartDate, EndDate, Description],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: "Policy Added", PolicyID: result.insertId });
        }
    );
});

// Update a policy
router.put("/:id", (req, res) => {
    const { PolicyType, CoverageAmount, Premium, StartDate, EndDate, Description } = req.body;
    db.query(
        "UPDATE Policy SET PolicyType=?, CoverageAmount=?, Premium=?, StartDate=?, EndDate=?, Description=? WHERE PolicyID=?",
        [PolicyType, CoverageAmount, Premium, StartDate, EndDate, Description, req.params.id],
        (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: "Policy Updated" });
        }
    );
});

// Delete a policy
router.delete("/:id", (req, res) => {
    db.query("DELETE FROM Policy WHERE PolicyID=?", [req.params.id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Policy Deleted" });
    });
});

module.exports = router;
