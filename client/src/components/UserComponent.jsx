import React from "react";
import { FaEnvelope, FaPhone } from "react-icons/fa";

const UserProfile = ({ user }) => {
    if (!user) {
        return (
            <div className="text-center text-gray-600 py-10">
                Loading profile...
            </div>
        );
    }
    return (
        <div className="w-full max-w-3xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden">
            {/* Background Image & Profile */}
            <div className="relative w-full h-52 bg-cover bg-center" style={{ backgroundImage: `url('https://i.pinimg.com/736x/84/62/4b/84624b5461bad2728c2179554c96266d.jpg')` }}>
                <div className="absolute bottom-[-50px] left-5 w-24 h-24 border-4 border-white rounded-full overflow-hidden shadow-lg">
                    <img src={user.profileImage} alt="Profile" className="w-full h-full object-cover" />
                

                </div>
                
                
    
                
            </div>

            

            

            {/* User Info */}
            <div className="px-6 text-center border-b border-gray-200">
                {/* Welcome Message at the Top */}
                <p className="text-lg font-medium text-gray-500 mt-4">Welcome,</p>
                <h2 className="text-3xl font-extrabold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent drop-shadow-md">
                    {user.name}!
                </h2>
                <div className="w-16 h-1 bg-blue-500 mx-auto mt-2 rounded-full animate-pulse"></div>

                {/* Website Description at the Bottom */}
                <p className="text-sm text-gray-600 mt-4 italic">
                    "TrackItBack - Helping you recover lost items quickly and securely."
                </p>
            </div>

            {/* Contact Details */}
            <div className="px-6 py-4 flex flex-col items-center space-y-3 border-t">
                <div className="text-gray-700 flex items-center space-x-2">
                    <FaPhone className="text-blue-500" />
                    <span>{user.phone}</span>
                </div>
                <div className="text-gray-700 flex items-center space-x-2">
                    <FaEnvelope className="text-blue-500" />
                    <span>{user.email}</span>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;


