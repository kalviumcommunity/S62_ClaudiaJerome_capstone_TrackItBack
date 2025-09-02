import React from "react";
import { motion } from "framer-motion";
import { FaCheckCircle, FaUpload, FaUserShield } from "react-icons/fa";



const LandingPage = () => {
    return (
        <div className="min-h-screen bg-[#EDE8F5] text-gray-900">
            {/* Navbar */}
            <nav className="flex justify-between items-center py-4 px-8 bg-[#3D52A0] text-white shadow-md">
                <h1 className="text-2xl font-bold">TrackItBack</h1>
                <div>
                    <a href="/login" className="px-4 py-2 bg-white text-[#3D52A0] rounded-md mr-4 hover:bg-gray-200">Login</a>
                    <a href="/signup" className="px-4 py-2 bg-[#7091E6] text-white rounded-md hover:bg-[#5A7CCF]">Sign Up</a>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="text-center py-20 bg-[#3D52A0] text-white rounded-b-3xl shadow-lg">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-5xl font-extrabold"
                >
                    Lost Something? Get It Back!
                </motion.h1>
                <p className="mt-4 text-lg">Track and recover lost items with ease.</p>
            </header>

            {/* Features Section */}
            <section className="py-16 px-8 grid md:grid-cols-3 gap-8 text-center">
                <div className="bg-white shadow-lg p-6 rounded-lg">
                    <FaUpload className="text-[#3D52A0] text-4xl mx-auto mb-4" />
                    <h3 className="text-xl font-bold">Post Lost Items</h3>
                    <p className="text-gray-600">Easily report lost items and help others return them.</p>
                </div>
                <div className="bg-white shadow-lg p-6 rounded-lg">
                    <FaUserShield className="text-[#3D52A0] text-4xl mx-auto mb-4" />
                    <h3 className="text-xl font-bold">Secure User Profiles</h3>
                    <p className="text-gray-600">
                        Track and manage your lost and found items securely with your personal profile.
                    </p>
                </div>


                <div className="bg-white shadow-lg p-6 rounded-lg">
                    <FaCheckCircle className="text-[#3D52A0] text-4xl mx-auto mb-4" />
                    <h3 className="text-xl font-bold">Get Verified Returns</h3>
                    <p className="text-gray-600">Ensure secure and verified returns of found items.</p>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
