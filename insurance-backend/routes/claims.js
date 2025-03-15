const express = require("express");
const db = require("../db");
const router = express.Router();

// Get all claims
router.get("/", (req, res) => {
    db.query("SELECT * FROM Claim", (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Create a new claim
router.post("/", (req, res) => {
    const { ClaimType, Amount, Status, PolicyID, ClientID } = req.body;
    db.query(
        "INSERT INTO Claim (ClaimType, Amount, Status, PolicyID, ClientID) VALUES (?, ?, ?, ?, ?)",
        [ClaimType, Amount, Status, PolicyID, ClientID],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: "Claim Added", ClaimID: result.insertId });
        }
    );
});

// Update a claim
router.put("/:id", (req, res) => {
    const { ClaimType, Amount, Status, PolicyID, ClientID } = req.body;
    db.query(
        "UPDATE Claim SET ClaimType=?, Amount=?, Status=?, PolicyID=?, ClientID=? WHERE ClaimID=?",
        [ClaimType, Amount, Status, PolicyID, ClientID, req.params.id],
        (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: "Claim Updated" });
        }
    );
});

// Delete a claim
router.delete("/:id", (req, res) => {
    db.query("DELETE FROM Claim WHERE ClaimID=?", [req.params.id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Claim Deleted" });
    });
});

module.exports = router;
