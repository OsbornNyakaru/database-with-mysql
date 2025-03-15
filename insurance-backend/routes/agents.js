const express = require("express");
const db = require("../db");
const router = express.Router();

// Get all agents
router.get("/", (req, res) => {
    db.query("SELECT * FROM Agent", (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Create a new agent
router.post("/", (req, res) => {
    const { Name, Email, Phone, CommissionRate } = req.body;
    db.query(
        "INSERT INTO Agent (Name, Email, Phone, CommissionRate) VALUES (?, ?, ?, ?)",
        [Name, Email, Phone, CommissionRate],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: "Agent Added", AgentID: result.insertId });
        }
    );
});

// Update an agent
router.put("/:id", (req, res) => {
    const { Name, Email, Phone, CommissionRate } = req.body;
    db.query(
        "UPDATE Agent SET Name=?, Email=?, Phone=?, CommissionRate=? WHERE AgentID=?",
        [Name, Email, Phone, CommissionRate, req.params.id],
        (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: "Agent Updated" });
        }
    );
});

// Delete an agent
router.delete("/:id", (req, res) => {
    db.query("DELETE FROM Agent WHERE AgentID=?", [req.params.id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Agent Deleted" });
    });
});

module.exports = router;
