# **Insurance Brokerage Database System - Implementation Guide**

## **1. Database Setup in MySQL**
### **Step 1: Install MySQL**
- Install MySQL Server and MySQL Workbench.
- Start the MySQL service.

### **Step 2: Create a Database**
```sql
CREATE DATABASE InsuranceDB;
USE InsuranceDB;
```

### **Step 3: Create Tables (Schema Definition)**
```sql
CREATE TABLE Client (
    ClientID INT AUTO_INCREMENT PRIMARY KEY,
    FullName VARCHAR(100) NOT NULL,
    Address TEXT NOT NULL,
    Phone VARCHAR(15) UNIQUE NOT NULL,
    Email VARCHAR(100) UNIQUE NOT NULL,
    DOB DATE NOT NULL
);
```

### **Step 4: Insert Sample Data**
```sql
INSERT INTO Client (FullName, Address, Phone, Email, DOB)
VALUES ('John Doe', '123 Main St', '0712345678', 'john.doe@email.com', '1985-07-20');
```

---

## **2. Backend Integration**
### **Step 5: Set Up Backend (Node.js + Express.js)**
```sh
mkdir insurance-backend
cd insurance-backend
npm init -y
npm install express mysql dotenv cors
```

### **Step 6: Configure Database Connection**
- Create a `.env` file.
```env
DB_HOST=localhost
DB_USER=root
DB_PASS=yourpassword
DB_NAME=InsuranceDB
```
- Create `db.js`.
```js
const mysql = require('mysql');
require('dotenv').config();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

db.connect(err => {
    if (err) throw err;
    console.log("MySQL Connected...");
});

module.exports = db;
```

### **Step 7: Define API Endpoints (Express.js)**
- Create `server.js`.
```js
const express = require('express');
const db = require('./db');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

app.get('/clients', (req, res) => {
    db.query("SELECT * FROM Client", (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

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
```
- Run the backend:
```sh
node server.js
```

---

## **3. Frontend Integration**
### **Step 8: Set Up React Frontend**
```sh
npx create-next-app@latest insurance-frontend
cd insurance-frontend
npm install axios
```

### **Step 9: Fetch Data from API**
- Modify `pages/index.js`.
```js
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
    const [clients, setClients] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/clients")
            .then(response => setClients(response.data))
            .catch(error => console.error("Error fetching clients:", error));
    }, []);

    return (
        <div>
            <h1>Insurance Clients</h1>
            <ul>
                {clients.map(client => (
                    <li key={client.ClientID}>{client.FullName} - {client.Email}</li>
                ))}
            </ul>
        </div>
    );
}
```

### **Step 10: Start Frontend**
```sh
npm run dev
```

---

## **4. Final Steps & Best Practices**
✅ **Secure Credentials**: Use `.env` for secrets.  
✅ **Implement Authentication**: Use JWT or Clerk for user management.  
✅ **Use ORM (Optional)**: Prisma or Sequelize for better query management.  
✅ **Deploy**: Host the backend on **Vercel** or **Render** and the database on **AWS RDS**.  

---

