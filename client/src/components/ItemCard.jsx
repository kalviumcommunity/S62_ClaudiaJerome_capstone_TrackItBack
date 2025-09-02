import React from "react";
import { Link } from "react-router-dom";

const ItemCard = ({ item }) => {
    return (
        <Link to={`/item/${item._id}`}>
            <div className="bg-white p-4 rounded-lg shadow-md overflow-hidden h-full flex flex-col">
            <div className="w-full h-48 flex justify-center items-center overflow-hidden rounded-md">
                <img
                    src={item.imagePath[0]}
                    alt={item.name}
                    className="w-full h-full object-contain"
                />
            </div>
            <h3 className="text-lg font-semibold mt-2">{item.name}</h3>
                <p className="text-gray-600 line-clamp-2">{item.description}</p>
            <p className="text-sm text-gray-500">Location: {item.location}</p>
            <p className={`text-sm font-bold ${item.status === "lost" ? "text-red-500" : "text-green-500"}`}>
                Status: {item.status}
            </p>
        </div>
        </Link>
    );
};

export default ItemCard;
