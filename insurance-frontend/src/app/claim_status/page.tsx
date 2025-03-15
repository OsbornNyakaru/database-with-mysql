"use client";

import { useState, useEffect } from "react";
import axios from "axios";

export default function ClaimStatus() {
    const [statuses, setStatuses] = useState([]);
    const [newStatus, setNewStatus] = useState({
        Status: "",
        Description: ""
    });

    useEffect(() => {
        axios.get("http://localhost:5000/claim_status")
            .then(response => setStatuses(response.data))
            .catch(error => console.error("Error fetching statuses:", error));
    }, []);

    const handleChange = (e) => {
        setNewStatus({ ...newStatus, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/claim_status", newStatus);
            setStatuses([...statuses, newStatus]);
            setNewStatus({ Status: "", Description: "" });
        } catch (error) {
            console.error("Error adding status:", error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center p-5">
            <h1 className="text-3xl font-bold text-blue-700 mb-6">Claim Status</h1>

            <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
                <h2 className="text-xl font-semibold mb-4 text-gray-700">Add New Status</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="text" name="Status" placeholder="Status" value={newStatus.Status} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded" />
                    <input type="text" name="Description" placeholder="Description" value={newStatus.Description} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded" />
                    <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">Add Status</button>
                </form>
            </div>

            <div className="mt-8 w-full max-w-3xl">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Status List</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {statuses.map((status, index) => (
                        <div key={index} className="bg-white shadow-lg rounded-lg p-4">
                            <h3 className="text-lg font-semibold text-gray-800">{status.Status}</h3>
                            <p className="text-gray-600">{status.Description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
