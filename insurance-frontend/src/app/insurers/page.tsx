"use client";

import { useState, useEffect } from "react";
import axios from "axios";

export default function Insurers() {
    const [insurers, setInsurers] = useState([]);
    const [newInsurer, setNewInsurer] = useState({
        Name: "",
        Address: "",
        Phone: "",
        Email: ""
    });

    useEffect(() => {
        axios.get("http://localhost:5000/insurers")
            .then(response => setInsurers(response.data))
            .catch(error => console.error("Error fetching insurers:", error));
    }, []);

    const handleChange = (e) => {
        setNewInsurer({ ...newInsurer, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/insurers", newInsurer);
            setInsurers([...insurers, newInsurer]);
            setNewInsurer({ Name: "", Address: "", Phone: "", Email: "" });
        } catch (error) {
            console.error("Error adding insurer:", error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center p-5">
            <h1 className="text-3xl font-bold text-blue-700 mb-6">Insurance Insurers</h1>

            <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
                <h2 className="text-xl font-semibold mb-4 text-gray-700">Add New Insurer</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="text" name="Name" placeholder="Name" value={newInsurer.Name} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded" />
                    <input type="text" name="Address" placeholder="Address" value={newInsurer.Address} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded" />
                    <input type="text" name="Phone" placeholder="Phone" value={newInsurer.Phone} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded" />
                    <input type="email" name="Email" placeholder="Email" value={newInsurer.Email} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded" />
                    <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">Add Insurer</button>
                </form>
            </div>

            <div className="mt-8 w-full max-w-3xl">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Insurer List</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {insurers.map((insurer, index) => (
                        <div key={index} className="bg-white shadow-lg rounded-lg p-4">
                            <h3 className="text-lg font-semibold text-gray-800">{insurer.Name}</h3>
                            <p className="text-gray-600">{insurer.Email}</p>
                            <p className="text-gray-500">{insurer.Phone}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
