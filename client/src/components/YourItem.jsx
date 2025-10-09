import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const YourItem = ({ userId }) => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    useEffect(() => {
        const fetchUserItems = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token || !userId) return;

                const response = await axios.get(`https://s62-claudiajerome-capstone-trackitback.onrender.com/item`, {
                    headers: { Authorization: `Bearer ${token}` },
                    withCredentials: true,
                });

                const userItems = response.data.filter(item => item.userId === userId);
                setItems(userItems);
            } catch (error) {
                console.error("Error fetching user's items:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserItems();
    }, [userId]);

    const handleDelete = async (itemId) => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("You must be logged in to delete an item.");
            return;
        }

        // const confirmDelete = window.confirm("Are you sure you want to delete this item?");
        // if (!confirmDelete) return;

        try {
            await axios.delete(
                `https://s62-claudiajerome-capstone-trackitback.onrender.com/item/${itemId}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                    withCredentials: true,
                }
            );
            // Remove deleted item from state
            setItems((prevItems) => prevItems.filter((item) => item._id !== itemId));
            alert("Item deleted successfully!");
        } catch (error) {
            console.error("Error deleting item:", error);
            alert("Failed to delete item.");
        }
    };

    return (
        <div className="mt-6">
            <h3 className="text-lg font-semibold text-[#3D52A0]">Your Items</h3>
            {loading ? (
                <p className="text-[#8697C4]">Loading...</p>
            ) : items.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {items.map((item) => (
                        <Link key={item._id} to={`/item/${item._id}`}>
                            <div key={item._id} className="bg-[#D5C1DC] p-4 rounded-lg shadow-md flex flex-col  h-full items-center">
                            <h4 className="text-md font-semibold">{item.name}</h4>
                                <p className="text-sm text-gray-700 text-center line-clamp-2">{item.description}</p>
                            <p className="text-xs text-gray-600">Location: {item.location}</p>
                            <p className="text-xs text-gray-600">Status: {item.status}</p>
                            {item.imagePath.length > 0 && (
                                <img
                                    src={item.imagePath[0]}
                                    alt={item.name}
                                        className="mt-2 w-28 h-28 object-cover rounded-md mx-auto"
                                />
                            )}
                        </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <p className="text-gray-500">You haven't posted any items yet.</p>
            )}

            {showLogoutModal && (
                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40 backdrop-blur-sm z-50">
                    <div className="bg-white text-gray-800 p-6 rounded-2xl shadow-2xl w-96 border border-gray-200 relative">
                        <h2 className="text-xl font-bold mb-4">CONFIRM DELETE</h2>
                        <p className="text-base font-semibold text-gray-600 mb-6">
                            Are you sure you want to Delete?
                        </p>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setShowLogoutModal(false)}
                                className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 text-gray-700 font-medium transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium transition"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>

        
    );
};

export default YourItem;
