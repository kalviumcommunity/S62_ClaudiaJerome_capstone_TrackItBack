import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const YourItem = ({ userId }) => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserItems = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token || !userId) return;

                const response = await axios.get(`http://localhost:8080/item`, {
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
        </div>
    );
};

export default YourItem;
