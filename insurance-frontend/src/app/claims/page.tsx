"use client";

import { useState, useEffect } from "react";
import axios from "axios";

export default function Claims() {
    const [claims, setClaims] = useState([]);
    const [newClaim, setNewClaim] = useState({
        ClaimType: "",
        Amount: "",
        Status: "",
        PolicyID: "",
        ClientID: ""
    });

    useEffect(() => {
        axios.get("http://localhost:5000/claims")
            .then(response => setClaims(response.data))
            .catch(error => console.error("Error fetching claims:", error));
    }, []);

    const handleChange = (e) => {
        setNewClaim({ ...newClaim, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/claims", newClaim);
            setClaims([...claims, newClaim]);
            setNewClaim({ ClaimType: "", Amount: "", Status: "", PolicyID: "", ClientID: "" });
        } catch (error) {
            console.error("Error adding claim:", error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center p-5">
            <h1 className="text-3xl font-bold text-blue-700 mb-6">Insurance Claims</h1>

            <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
                <h2 className="text-xl font-semibold mb-4 text-gray-700">Add New Claim</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="text" name="ClaimType" placeholder="Claim Type" value={newClaim.ClaimType} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded" />
                    <input type="number" name="Amount" placeholder="Amount" value={newClaim.Amount} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded" />
                    <input type="text" name="Status" placeholder="Status" value={newClaim.Status} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded" />
                    <input type="number" name="PolicyID" placeholder="Policy ID" value={newClaim.PolicyID} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded" />
                    <input type="number" name="ClientID" placeholder="Client ID" value={newClaim.ClientID} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded" />
                    <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">Add Claim</button>
                </form>
            </div>

            <div className="mt-8 w-full max-w-3xl">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Claim List</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {claims.map((claim, index) => (
                        <div key={index} className="bg-white shadow-lg rounded-lg p-4">
                            <h3 className="text-lg font-semibold text-gray-800">{claim.ClaimType}</h3>
                            <p className="text-gray-600">${claim.Amount}</p>
                            <p className="text-gray-500">{claim.Status}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
