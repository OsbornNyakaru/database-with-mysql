"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Link from 'next/link';

export default function Home() {
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
            <h1 className="text-3xl font-bold text-blue-700 mb-6">Insurance Brokerage Management System</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Link href="/clients" className="bg-white shadow-lg rounded-lg p-4 text-center">
                    <h3 className="text-lg font-semibold text-gray-800">Clients</h3>
                </Link>
                <Link href="/agents" className="bg-white shadow-lg rounded-lg p-4 text-center">
                    <h3 className="text-lg font-semibold text-gray-800">Agents</h3>
                </Link>
                <Link href="/claims" className="bg-white shadow-lg rounded-lg p-4 text-center">
                    <h3 className="text-lg font-semibold text-gray-800">Claims</h3>
                </Link>
                <Link href="/policies" className="bg-white shadow-lg rounded-lg p-4 text-center">
                    <h3 className="text-lg font-semibold text-gray-800">Policies</h3>
                </Link>
                <Link href="/payments" className="bg-white shadow-lg rounded-lg p-4 text-center">
                    <h3 className="text-lg font-semibold text-gray-800">Payments</h3>
                </Link>
                <Link href="/claim_status" className="bg-white shadow-lg rounded-lg p-4 text-center">
                    <h3 className="text-lg font-semibold text-gray-800">Claim Status</h3>
                </Link>
                <Link href="/insurers" className="bg-white shadow-lg rounded-lg p-4 text-center">
                    <h3 className="text-lg font-semibold text-gray-800">Insurers</h3>
                </Link>
                <Link href="/coverages" className="bg-white shadow-lg rounded-lg p-4 text-center">
                    <h3 className="text-lg font-semibold text-gray-800">Coverages</h3>
                </Link>
                <Link href="/branches" className="bg-white shadow-lg rounded-lg p-4 text-center">
                    <h3 className="text-lg font-semibold text-gray-800">Branches</h3>
                </Link>
            </div>
        </div>
    );
}
