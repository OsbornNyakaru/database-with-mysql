const express = require("express");
const db = require("../db");
const router = express.Router();

// Get all insurers
router.get("/", (req, res) => {
    db.query("SELECT * FROM Insurer", (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Create a new insurer
router.post("/", (req, res) => {
    const { Name, Address, Phone, Email } = req.body;
    db.query(
        "INSERT INTO Insurer (Name, Address, Phone, Email) VALUES (?, ?, ?, ?)",
        [Name, Address, Phone, Email],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: "Insurer Added", InsurerID: result.insertId });
        }
    );
});

// Update an insurer
router.put("/:id", (req, res) => {
    const { Name, Address, Phone, Email } = req.body;
    db.query(
        "UPDATE Insurer SET Name=?, Address=?, Phone=?, Email=? WHERE InsurerID=?",
        [Name, Address, Phone, Email, req.params.id],
        (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: "Insurer Updated" });
        }
    );
});

// Delete an insurer
router.delete("/:id", (req, res) => {
    db.query("DELETE FROM Insurer WHERE InsurerID=?", [req.params.id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Insurer Deleted" });
    });
});

module.exports = router;
