import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/NavBar";

const AddFoundItemPage = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [descriptionError, setDescriptionError] = useState("");
    const [locationError, setLoactionError] = useState("");
    const [imageError, setImageError] = useState("");
    const [itemData, setItemData] = useState({
        name: "",
        description: "",
        location: "",
        images: [],
    });
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const navigate = useNavigate()
    

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setItemData({ ...itemData, [name]: value });
    };

    const handleImageChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        if (selectedFiles.length + itemData.images.length > 5) {
            setImageError("You can upload a maximum of 5 images.");
            return;
        }
        setImageError("");
        setItemData((prevState) => ({
            ...prevState,
            images: [...prevState.images, ...selectedFiles] // Merge new files
        }));
        
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setDescriptionError(""); 
        setLoactionError("")
        setImageError("");

        if (itemData.description.trim().length < 20) {
            setDescriptionError("Description must be at least 20 characters long.");
            return;
        }
        if (itemData.location.trim().length < 10) {
            setLoactionError("Please provide a more specific location atleast 10 characters.");
            return;
        }
        if (itemData.images.length < 2) {
            setImageError("Please upload at least 2 images.");
            return;
        } else {
            setImageError("");
        }
        if (itemData.images.length > 5) {
            setImageError("You can upload a maximum of 5 images.");
            return;
        } else {
            setImageError("");
        }
        const formData = new FormData();
        formData.append("name", itemData.name);
        formData.append("description", itemData.description);
        formData.append("location", itemData.location);
        formData.append("status", "found");
        itemData.images.forEach((image) => formData.append("images", image));

        const token = localStorage.getItem('token')
        console.log("Token:", token); // Debugging step
        if (!token) {
            alert("Token is missing, please log in.");
            return;
        }

        try {
            const response = await axios.post(`http://localhost:8080/item/lostitem?token=${token}`, formData, { withCredentials: true });
            console.log("Found Item Submitted:", response.data);
            navigate('/homepage')
        } catch (error) {
            console.error("Error submitting lost item:", error);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-[#EDE8F5]">
            <Navbar isOpen={isOpen} setIsOpen={setIsOpen} onLogoutClick={() => setShowLogoutModal(true)} />
            <div className="bg-white shadow-lg rounded-lg p-8 w-96">
                <h2 className="text-xl font-bold text-center text-[#3D52A0]">Add Found Item</h2>
                <form onSubmit={handleSubmit} className="mt-4" encType="multipart/form-data">
                    <div className="mb-4">
                        <label className="block text-[#3D52A0]">Item Name</label>
                        <input
                            type="text"
                            name="name"
                            value={itemData.name}
                            onChange={handleChange}
                            className="w-full border border-[#8697C4] p-2 rounded"
                            placeholder="Name or brand of the item"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-[#3D52A0]">Description</label>
                        <textarea
                            name="description"
                            value={itemData.description}
                            onChange={handleChange}
                            className="w-full border border-[#8697C4] p-2 rounded"
                            placeholder="Describe about the Found item"
                            required
                        ></textarea>
                        {descriptionError && (
                            <p className="text-red-500 text-sm mt-1">{descriptionError}</p>
                        )}
                    </div>
                    <div className="mb-4">
                        <label className="block text-[#3D52A0]">Location</label>
                        <input
                            type="text"
                            name="location"
                            value={itemData.location}
                            onChange={handleChange}
                            className="w-full border border-[#8697C4] p-2 rounded"
                            placeholder="Where did you Found it!"
                            required
                        />
                        {locationError && (
                            <p className="text-red-600 text-sm mt-1 font-semibold">
                                {locationError}
                            </p>
                        )}
                    </div>
                    <div className="mb-4">
                        <label className="block text-[#3D52A0]">Upload Images (Min 2)</label>
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleImageChange}
                            className="w-full border border-[#8697C4] p-2 rounded"
                            placeholder="upload the images of the item"
                            required
                        />
                        {imageError && (
                            <p className="text-red-600 text-sm mt-1 font-semibold">
                                {imageError}
                            </p>
                        )}
                        <div className="flex gap-2 mt-2">
                            {itemData.images.map((image, index) => (
                                <img
                                    key={index}
                                    src={URL.createObjectURL(image)}
                                    alt={`Uploaded ${index + 1}`}
                                    className="w-16 h-16 object-cover rounded"
                                />
                            ))}
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#7091E6] text-white py-2 rounded hover:bg-[#8697C4]"
                    >
                        Submit Found Item
                    </button>
                </form>
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

export default AddFoundItemPage;