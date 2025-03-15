"use client";

import { useState, useEffect } from "react";
import axios from "axios";

export default function Branches() {
    const [branches, setBranches] = useState([]);
    const [newBranch, setNewBranch] = useState({
        BranchName: "",
        Address: "",
        Phone: "",
        Email: ""
    });

    useEffect(() => {
        axios.get("http://localhost:5000/branches")
            .then(response => setBranches(response.data))
            .catch(error => console.error("Error fetching branches:", error));
    }, []);

    const handleChange = (e) => {
        setNewBranch({ ...newBranch, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/branches", newBranch);
            setBranches([...branches, newBranch]);
            setNewBranch({ BranchName: "", Address: "", Phone: "", Email: "" });
        } catch (error) {
            console.error("Error adding branch:", error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center p-5">
            <h1 className="text-3xl font-bold text-blue-700 mb-6">Insurance Branches</h1>

            <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
                <h2 className="text-xl font-semibold mb-4 text-gray-700">Add New Branch</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="text" name="BranchName" placeholder="Branch Name" value={newBranch.BranchName} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded" />
                    <input type="text" name="Address" placeholder="Address" value={newBranch.Address} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded" />
                    <input type="text" name="Phone" placeholder="Phone" value={newBranch.Phone} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded" />
                    <input type="email" name="Email" placeholder="Email" value={newBranch.Email} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded" />
                    <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">Add Branch</button>
                </form>
            </div>

            <div className="mt-8 w-full max-w-3xl">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Branch List</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {branches.map((branch, index) => (
                        <div key={index} className="bg-white shadow-lg rounded-lg p-4">
                            <h3 className="text-lg font-semibold text-gray-800">{branch.BranchName}</h3>
                            <p className="text-gray-600">{branch.Email}</p>
                            <p className="text-gray-500">{branch.Phone}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
