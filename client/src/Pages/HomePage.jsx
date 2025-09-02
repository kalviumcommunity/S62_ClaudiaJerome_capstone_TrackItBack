import React,{useState} from "react";
import Navbar from "../components/NavBar"; 
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Item from "../components/Items";

const HomePage = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };
    return (
        <div className="flex">
            {/* Sidebar */}
            <Navbar isOpen={isOpen} setIsOpen={setIsOpen} onLogoutClick={() => setShowLogoutModal(true)} />

            {/* Main Content */}
            <div className={`flex-1 transition-all duration-300 ${isOpen ? "ml-64" : "ml-16"} p-4`}>
                <Item />
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

export default HomePage;
