import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import Navbar from "../components/NavBar";
import UserComponent from "../components/UserComponent";
import YourItem from "../components/YourItem";

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(true);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    console.error("No token found, please log in.");
                    return;
                }

                // Decode token to get user ID
                const payload = JSON.parse(atob(token.split(".")[1])); // Decoding JWT
                const userId = payload.id;

                const response = await axios.get(`http://localhost:8080/user/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                    withCredentials: true,
                });

                setUser(response.data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    return (
        <div className="bg-[#EDE8F5] min-h-screen">
            {/* <Navbar isOpen={isOpen} setIsOpen={setIsOpen} onLogoutClick={() => setShowLogoutModal(true)} /> */}
            <div className="max-w-4xl mx-auto py-10">
                <div className="bg-white p-6 shadow-lg rounded-lg border border-[#8697C4] mb-6">
                    <h2 className="text-xl font-bold text-center text-[#3D52A0]">My Profile</h2>
                    {loading ? (
                        <p className="text-center text-[#8697C4]">Loading...</p>
                    ) : user ? (
                        <UserComponent user={user} />
                    ) : (
                        <p className="text-center text-[#E63946]">User not found. Please log in.</p>
                    )}
                </div>
                {user && <YourItem userId={user._id} />}

                <div className="absolute top-6 right-6 z-50">
                    <button
                        onClick={() => setShowLogoutModal(true)}
                        className="px-6 py-2 rounded-full bg-gradient-to-r from-[#3D52A0] to-[#8697C4] text-white font-bold shadow-md hover:scale-105 transform transition duration-200"
                    >
                        Logout
                    </button>
                </div>



                <div className="absolute top-6 left-6 z-50">
                    <button
                        onClick={() => navigate("/homepage")}
                        className="px-6 py-2 rounded-full bg-gradient-to-r from-[#3D52A0] to-[#8697C4] text-white font-bold shadow-md hover:scale-105 transform transition duration-200"
                    >
                        Back
                    </button>
                </div>

            </div>

            {showLogoutModal && (
                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40 backdrop-blur-sm z-50">
                    <div className="bg-white text-gray-800 p-6 rounded-2xl shadow-2xl w-96 border border-gray-200 relative">
                        <h2 className="text-xl font-bold mb-4">CONFIRM LOGOUT</h2>
                        <p className="text-base font-semibold text-gray-600 mb-6">
                            Are you sure you want to logout?
                        </p>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setShowLogoutModal(false)}
                                className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 text-gray-700 font-medium transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium transition"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            )}
            
        </div>
    );
};

export default ProfilePage;






