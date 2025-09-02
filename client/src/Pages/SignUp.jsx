import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaExclamationCircle } from "react-icons/fa";

const Signup = () => {
    const [formData, setFormData] = useState({ name: "", email: "", password: "", phone: "" });
    const [profileImage, setProfileImage] = useState(null);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^[0-9]{10}$/;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setProfileImage(e.target.files[0]); // Store selected file
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!emailPattern.test(formData.email)) {
            return setError("Invalid email format");
        }

        if (!passwordPattern.test(formData.password)) {
            return setError("Invalid password format");
        }

        if (!phonePattern.test(formData.phone)) {
            return setError("Phone number must be exactly 10 digits");
        }

        const formDataToSend = new FormData();
        formDataToSend.append("name", formData.name);
        formDataToSend.append("email", formData.email);
        formDataToSend.append("password", formData.password);
        formDataToSend.append("phone", `+91${formData.phone}`);
        if (profileImage) {
            formDataToSend.append("image", profileImage); // Must match backend field name
        }


        try {
            const res = await axios.post("http://localhost:8080/user/signup", formDataToSend, {
                withCredentials: true,
                headers: {
                    "Content-Type": "multipart/form-data", // Important for file upload
                },
            });

            console.log(res.data); // Debugging response
            navigate("/login");
        } catch (err) {
            console.error("Signup Error:", err);
            setError(err.response?.data?.message || "Signup failed");
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-[#EDE8F5] font-winky">
            <div className="bg-[#ADBBDA] p-8 shadow-lg rounded-lg w-96 border border-[#8697C4]">
                <h2 className="text-2xl font-bold text-center text-[#3D52A0]">Sign Up</h2>
                {/* {error && <p className="text-red-500 text-sm text-center">{error}</p>} */}
                {error && error !== "Invalid password format." && (
                    <p className="text-red-600 text-sm mt-2 flex items-center gap-2 justify-center">
                        <FaExclamationCircle className="text-red-500" /> {error}
                    </p>
                 )}
                <form onSubmit={handleSubmit} className="mt-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full p-2 border rounded mb-2 border-[#8697C4]"
                        required
                    />
                    <div className="mb-2">

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-2 border rounded mb-2 border-[#8697C4]"
                        required
                    />
                        {!emailPattern.test(formData.email) && formData.email.length > 0 && (
                            <p className="text-red-500 text-xs mt-1">Please enter a valid email address.</p>
                        )}
                    </div>
                    <div className="mb-2">

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full p-2 border rounded mb-2 border-[#8697C4]"
                        required
                        
                    />
                        {!passwordPattern.test(formData.password) && formData.password.length > 0 && (
                            <p className="text-red-500 text-xs mt-1">
                                Password must be at least 8 characters and include uppercase, lowercase, number, and special character.
                            </p>
                        )}
                    </div>
                    <div className="mb-2">

                        <label className="block mb-1 text-sm font-semibold text-[#3D52A0]">Phone Number</label>
                        <div className="flex items-center border border-[#8697C4] rounded-lg shadow-sm bg-[#ADBBDA]">
                            <span
                                className="inline-flex items-center justify-center px-4 text-[#3D52A0] font-bold border-r border-[#8697C4] select-none bg-white rounded-l-lg"
                                style={{ minWidth: "60px", height: "40px" }}
                            >
                                +91
                            </span>
                            <input
                                type="text"
                                name="phone"
                                placeholder="Enter 10-digit phone number"
                                value={formData.phone}
                                onChange={(e) => {
                                    const val = e.target.value.replace(/\D/g, "").slice(0, 10);
                                    setFormData({ ...formData, phone: val });
                                }}
                                className="flex-grow p-2 rounded-r-lg focus:outline-none text-[#3D52A0] font-semibold bg-white"
                                required
                            />
                        </div>
                        {!phonePattern.test(formData.phone) && formData.phone.length > 0 && (
                            <p className="text-red-500 text-xs mt-1">Phone number must be exactly 10 digits.</p>
                        )}
                    </div>

                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="w-full p-2 border rounded mb-2 border-[#8697C4]"
                        required
                    />
                    <button type="submit" className="w-full bg-[#3D52A0] text-white p-2 rounded hover:bg-[#7091E6]">
                        Sign Up
                    </button>
                </form>
                <p className="text-center text-sm mt-4">
                    Already have an account?{" "}
                    <span
                        onClick={() => navigate("/login")}
                        className="text-[#3D52A0] cursor-pointer hover:underline"
                    >
                        Login
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Signup;
