import React, { useEffect, useState } from "react";
import axios from "axios";
import ItemCard from "./ItemCard";

const Item = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axios.get("https://s62-claudiajerome-capstone-trackitback.onrender.com/item/");
                console.log("Fetched items:", response.data);
                setItems(response.data);
            } catch (error) {
                console.error("Error fetching items:", error);
            }
        };

        fetchItems();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">All Items</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map((item) => (
                    <ItemCard key={item._id} item={item} />
                ))}
            </div>
        </div>
    );
};

export default Item;
