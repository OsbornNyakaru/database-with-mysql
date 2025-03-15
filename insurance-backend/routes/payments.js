const express = require("express");
const db = require("../db");
const router = express.Router();

// Get all payments
router.get("/", (req, res) => {
    db.query("SELECT * FROM Payment", (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Create a new payment
router.post("/", (req, res) => {
    const { Amount, Date, PolicyID, ClientID } = req.body;
    db.query(
        "INSERT INTO Payment (Amount, Date, PolicyID, ClientID) VALUES (?, ?, ?, ?)",
        [Amount, Date, PolicyID, ClientID],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: "Payment Added", PaymentID: result.insertId });
        }
    );
});

// Update a payment
router.put("/:id", (req, res) => {
    const { Amount, Date, PolicyID, ClientID } = req.body;
    db.query(
        "UPDATE Payment SET Amount=?, Date=?, PolicyID=?, ClientID=? WHERE PaymentID=?",
        [Amount, Date, PolicyID, ClientID, req.params.id],
        (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: "Payment Updated" });
        }
    );
});

// Delete a payment
router.delete("/:id", (req, res) => {
    db.query("DELETE FROM Payment WHERE PaymentID=?", [req.params.id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Payment Deleted" });
    });
});

module.exports = router;
