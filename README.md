# 🚀 Insurance Brokerage Management System

## 📌 Project Overview
This is a **full-stack Insurance Brokerage Management System** built using:

- **Frontend:** Next.js, Tailwind CSS, Axios
- **Backend:** Node.js, Express.js, MySQL
- **Database:** MySQL with Prisma ORM (optional)
- **Authentication:** JWT (To be implemented)

The system provides features such as policy management, claims processing, payments, and client-agent interactions.

---

## 📂 Folder Structure
```
insurance-brokerage/
├── insurance-frontend/  # Next.js Frontend
├── insurance-backend/   # Node.js Backend with Express and MySQL
```

---

# 🔧 Backend Setup (Node.js + Express + MySQL)
### **1️⃣ Install Dependencies**
```sh
cd insurance-backend
npm install express mysql2 cors dotenv
```

### **2️⃣ Configure Environment Variables**
Create a `.env` file in `insurance-backend/`:
```env
DB_HOST=localhost
DB_USER=root
DB_PASS=yourpassword
DB_NAME=InsuranceDB
PORT=5000
```

### **3️⃣ Database Schema**
Run this SQL script in MySQL:
```sql
CREATE DATABASE InsuranceDB;
USE InsuranceDB;

CREATE TABLE Policy (
    PolicyID INT AUTO_INCREMENT PRIMARY KEY,
    PolicyType ENUM('Life', 'Health', 'Auto', 'Property', 'Travel') NOT NULL,
    CoverageAmount DECIMAL(10,2) NOT NULL CHECK (CoverageAmount > 0),
    Premium DECIMAL(10,2) NOT NULL CHECK (Premium > 0),
    StartDate DATE NOT NULL,
    EndDate DATE NOT NULL,
    Description TEXT
);
```

### **4️⃣ Run the Backend**
```sh
node server.js
```

✅ **Server should start at** `http://localhost:5000`

### **5️⃣ Backend API Routes**
| Method | Route | Description |
|--------|----------------|------------------|
| GET    | `/policies`    | Fetch all policies |
| POST   | `/policies`    | Add a new policy |
| PUT    | `/policies/:id` | Update a policy |
| DELETE | `/policies/:id` | Delete a policy |

---

# 🎨 Frontend Setup (Next.js + TailwindCSS)
### **1️⃣ Install Dependencies**
```sh
cd insurance-frontend
npx create-next-app@latest .
npm install axios tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### **2️⃣ Configure TailwindCSS**
Modify `tailwind.config.js`:
```js
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: { extend: {} },
  plugins: [],
};
```
Add Tailwind directives in `styles/globals.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### **3️⃣ Implement Policy Management UI**
Modify `pages/policies.js`:
```js
import { useState, useEffect } from "react";
import axios from "axios";

export default function Policies() {
    const [policies, setPolicies] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/policies")
            .then(res => setPolicies(res.data))
            .catch(err => console.error("Error fetching policies:", err));
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-5">
            <h1 className="text-3xl font-bold text-blue-700">Insurance Policies</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                {policies.map((policy, index) => (
                    <div key={index} className="bg-white shadow-md p-4 rounded-lg">
                        <h3 className="text-lg font-semibold">{policy.PolicyType}</h3>
                        <p>${policy.CoverageAmount} Coverage</p>
                        <p>${policy.Premium} Premium</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
```

### **4️⃣ Run the Frontend**
```sh
npm run dev
```
✅ **Frontend will be available at** `http://localhost:3000`

---

# 🚀 Next Steps
✅ Implement Authentication (JWT / Clerk)  
✅ Add CRUD for Clients & Agents  
✅ Secure API Endpoints  
✅ Deploy Backend (Railway/Render) & Frontend (Vercel)  

📌 **Contributions & Issues**
Feel free to fork this repo, raise issues, or contribute! 🎉

