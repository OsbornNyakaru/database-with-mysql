"use client";

import { useState, useEffect } from "react";
import axios from "axios";

export default function Coverages() {
    const [coverages, setCoverages] = useState([]);
    const [newCoverage, setNewCoverage] = useState({
        CoverageType: "",
        Description: ""
    });

    useEffect(() => {
        axios.get("http://localhost:5000/coverages")
            .then(response => setCoverages(response.data))
            .catch(error => console.error("Error fetching coverages:", error));
    }, []);

    const handleChange = (e) => {
        setNewCoverage({ ...newCoverage, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/coverages", newCoverage);
            setCoverages([...coverages, newCoverage]);
            setNewCoverage({ CoverageType: "", Description: "" });
        } catch (error) {
            console.error("Error adding coverage:", error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center p-5">
            <h1 className="text-3xl font-bold text-blue-700 mb-6">Insurance Coverages</h1>

            <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
                <h2 className="text-xl font-semibold mb-4 text-gray-700">Add New Coverage</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="text" name="CoverageType" placeholder="Coverage Type" value={newCoverage.CoverageType} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded" />
                    <input type="text" name="Description" placeholder="Description" value={newCoverage.Description} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded" />
                    <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">Add Coverage</button>
                </form>
            </div>

            <div className="mt-8 w-full max-w-3xl">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Coverage List</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {coverages.map((coverage, index) => (
                        <div key={index} className="bg-white shadow-lg rounded-lg p-4">
                            <h3 className="text-lg font-semibold text-gray-800">{coverage.CoverageType}</h3>
                            <p className="text-gray-600">{coverage.Description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
