"use client";

import { useState, useEffect } from "react";
import axios from "axios";

export default function Clients() {
    const [clients, setClients] = useState([]);
    const [newClient, setNewClient] = useState({
        FullName: "",
        Address: "",
        Phone: "",
        Email: "",
        DOB: ""
    });

    useEffect(() => {
        axios.get("http://localhost:5000/clients")
            .then(response => setClients(response.data))
            .catch(error => console.error("Error fetching clients:", error));
    }, []);

    const handleChange = (e) => {
        setNewClient({ ...newClient, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/clients", newClient);
            setClients([...clients, newClient]);
            setNewClient({ FullName: "", Address: "", Phone: "", Email: "", DOB: "" });
        } catch (error) {
            console.error("Error adding client:", error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center p-5">
            <h1 className="text-3xl font-bold text-blue-700 mb-6">Insurance Clients</h1>

            <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
                <h2 className="text-xl font-semibold mb-4 text-gray-700">Add New Client</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="text" name="FullName" placeholder="Full Name" value={newClient.FullName} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded" />
                    <input type="text" name="Address" placeholder="Address" value={newClient.Address} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded" />
                    <input type="text" name="Phone" placeholder="Phone" value={newClient.Phone} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded" />
                    <input type="email" name="Email" placeholder="Email" value={newClient.Email} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded" />
                    <input type="date" name="DOB" value={newClient.DOB} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded" />
                    <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">Add Client</button>
                </form>
            </div>

            <div className="mt-8 w-full max-w-3xl">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Client List</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {clients.map((client, index) => (
                        <div key={index} className="bg-white shadow-lg rounded-lg p-4">
                            <h3 className="text-lg font-semibold text-gray-800">{client.FullName}</h3>
                            <p className="text-gray-600">{client.Email}</p>
                            <p className="text-gray-500">{client.Phone}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
