import React,{useState} from "react";
import { Link,useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Home, LogIn, UserPlus, LogOut, User, PlusCircle } from "lucide-react";

const Navbar = ({ isOpen, setIsOpen, onLogoutClick }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
        
    };
    return (
        <div className={`h-screen bg-[#3D52A0] text-white fixed top-0 left-0 transition-all duration-300 ${isOpen ? "w-64" : "w-16"}`}>
            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="absolute top-5 right-[-15px] bg-[#3D52A0] text-white rounded-full p-1 shadow-md"
            >
                {isOpen ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
            </button>

            <div className="p-5 flex flex-col">
                {/* Logo */}
                <h1 className={`text-xl font-bold text-center mb-6 transition-all duration-300 ${isOpen ? "opacity-100 w-auto" : "opacity-0 w-0 overflow-hidden"}`}>
                    TrackItBack
                </h1>

                {/* Nav Links */}
                <ul className="mt-6 space-y-4">
                    <li>
                        <Link to="/homepage" className="flex items-center px-4 py-2 rounded hover:bg-[#7091E6]">
                            <Home size={24} />
                            <span className={`ml-3 text-gray-100 transition-all duration-300 ${isOpen ? "opacity-100 w-auto" : "opacity-0 w-0 overflow-hidden"}`}>Home</span>
                        </Link>
                    </li>
                    {/* <li>
                        <Link to="/login" className="flex items-center px-4 py-2 rounded hover:bg-[#7091E6]">
                            <LogIn size={24} />
                            <span className={`ml-3 transition-all duration-300 ${isOpen ? "opacity-100 w-auto" : "opacity-0 w-0 overflow-hidden"}`}>Login</span>
                        </Link>
                    </li> */}
                    {/* <li>
                        <Link to="/signup" className="flex items-center px-4 py-2 rounded hover:bg-[#7091E6]">
                            <UserPlus size={24} />
                            <span className={`ml-3 transition-all duration-300 ${isOpen ? "opacity-100 w-auto" : "opacity-0 w-0 overflow-hidden"}`}>Signup</span>
                        </Link>
                    </li> */}
                    <li>
                        <Link to="/profile" className="flex items-center px-4 py-2 rounded hover:bg-[#7091E6]">
                            <User size={24} />
                            <span className={`ml-3 transition-all duration-300 ${isOpen ? "opacity-100 w-auto" : "opacity-0 w-0 overflow-hidden"}`}>Profile</span>
                        </Link>
                    </li>
                    <li className="relative">
                        <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center px-4 py-2 w-full rounded hover:bg-[#7091E6]">
                            <PlusCircle size={24} />
                            <span className={`ml-3 transition-all duration-300 ${isOpen ? "opacity-100 w-auto" : "opacity-0 w-0 overflow-hidden"}`}>Add Item</span>
                        </button>
                        {dropdownOpen && (
                            <ul className="absolute left-16 bg-[#A9C1FA] w-48 mt-2 rounded shadow-lg">
                                <li>
                                    <Link to="/add-lost-item" className="block px-4 py-2 hover:bg-[#7091E6]">Lost Item</Link>
                                </li>
                                <li>
                                    <Link to="/add-found-item" className="block px-4 py-2 hover:bg-[#7091E6]">Found Item</Link>
                                </li>
                            </ul>
                        )}
                    </li>
                    <li>
                        <button
                            onClick={onLogoutClick}
                            className="flex items-center w-full px-4 py-2 rounded hover:bg-[#7091E6] text-left"
                        >
                            <LogOut size={24} />
                            <span className={`ml-3 transition-all duration-300 ${isOpen ? "opacity-100 w-auto" : "opacity-0 w-0 overflow-hidden"}`}>Logout</span>
                        </button>
                    </li>
                </ul>
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

export default Navbar;




