"use client";

import { useState, useEffect } from "react";
import axios from "axios";

export default function Agents() {
    const [agents, setAgents] = useState([]);
    const [newAgent, setNewAgent] = useState({
        Name: "",
        Email: "",
        Phone: "",
        CommissionRate: ""
    });

    useEffect(() => {
        axios.get("http://localhost:5000/agents")
            .then(response => setAgents(response.data))
            .catch(error => console.error("Error fetching agents:", error));
    }, []);

    const handleChange = (e) => {
        setNewAgent({ ...newAgent, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/agents", newAgent);
            setAgents([...agents, newAgent]);
            setNewAgent({ Name: "", Email: "", Phone: "", CommissionRate: "" });
        } catch (error) {
            console.error("Error adding agent:", error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center p-5">
            <h1 className="text-3xl font-bold text-blue-700 mb-6">Insurance Agents</h1>

            <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
                <h2 className="text-xl font-semibold mb-4 text-gray-700">Add New Agent</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="text" name="Name" placeholder="Name" value={newAgent.Name} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded" />
                    <input type="email" name="Email" placeholder="Email" value={newAgent.Email} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded" />
                    <input type="text" name="Phone" placeholder="Phone" value={newAgent.Phone} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded" />
                    <input type="number" name="CommissionRate" placeholder="Commission Rate" value={newAgent.CommissionRate} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded" />
                    <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">Add Agent</button>
                </form>
            </div>

            <div className="mt-8 w-full max-w-3xl">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Agent List</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {agents.map((agent, index) => (
                        <div key={index} className="bg-white shadow-lg rounded-lg p-4">
                            <h3 className="text-lg font-semibold text-gray-800">{agent.Name}</h3>
                            <p className="text-gray-600">{agent.Email}</p>
                            <p className="text-gray-500">{agent.Phone}</p>
                            <p className="text-gray-500">Commission Rate: {agent.CommissionRate}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
