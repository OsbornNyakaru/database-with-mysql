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

app.use("/clients", require("./routes/clients"));
app.use("/agents", require("./routes/agents"));
app.use("/claims", require("./routes/claims"));
app.use("/payments", require("./routes/payments"));
app.use("/claim_status", require("./routes/claim_status"));
app.use("/insurers", require("./routes/insurers"));
app.use("/coverages", require("./routes/coverages"));
app.use("/branches", require("./routes/branches"));

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
