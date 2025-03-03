const express = require('express');
const db = require('./db');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Get all clients
app.get('/clients', (req, res) => {
    db.query("SELECT * FROM Client", (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.use("/policies", require("./routes/policies"));

// Add a new client
app.post('/clients', (req, res) => {
    const { FullName, Address, Phone, Email, DOB } = req.body;
    db.query("INSERT INTO Client (FullName, Address, Phone, Email, DOB) VALUES (?, ?, ?, ?, ?)", 
    [FullName, Address, Phone, Email, DOB], (err, result) => {
        if (err) throw err;
        res.json({ message: "Client Added", clientID: result.insertId });
    });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
