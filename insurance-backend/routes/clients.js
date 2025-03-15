const express = require("express");
const db = require("../db");
const router = express.Router();

// Get all clients
router.get("/", (req, res) => {
    db.query("SELECT * FROM Client", (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Create a new client
router.post("/", (req, res) => {
    const { FullName, Address, Phone, Email, DOB } = req.body;
    db.query(
        "INSERT INTO Client (FullName, Address, Phone, Email, DOB) VALUES (?, ?, ?, ?, ?)",
        [FullName, Address, Phone, Email, DOB],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: "Client Added", ClientID: result.insertId });
        }
    );
});

// Update a client
router.put("/:id", (req, res) => {
    const { FullName, Address, Phone, Email, DOB } = req.body;
    db.query(
        "UPDATE Client SET FullName=?, Address=?, Phone=?, Email=?, DOB=? WHERE ClientID=?",
        [FullName, Address, Phone, Email, DOB, req.params.id],
        (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: "Client Updated" });
        }
    );
});

// Delete a client
router.delete("/:id", (req, res) => {
    db.query("DELETE FROM Client WHERE ClientID=?", [req.params.id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Client Deleted" });
    });
});

module.exports = router;
