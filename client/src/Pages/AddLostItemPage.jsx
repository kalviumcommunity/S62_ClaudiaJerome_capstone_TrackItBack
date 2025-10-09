import React, { useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddLostItemPage = () => {
  const [itemData, setItemData] = useState({
    name: "",
    description: "",
    location: "",
    images: [],
  });
  const [isOpen, setIsOpen] = useState(true);
  const [descriptionError, setDescriptionError] = useState("");
  const [locationError, setLocationError] = useState("");
  const [imageError, setImageError] = useState("");
  const fileInputRef = useRef(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItemData({ ...itemData, [name]: value });
  };

  const handleRemoveImage = (indexToRemove) => {
    setItemData((prev) => {
      const newImages = prev.images.filter((_, i) => i !== indexToRemove);
      return { ...prev, images: newImages };
    });
    setImageError("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length + itemData.images.length > 5) {
      setImageError("You can upload a maximum of 5 images.");
      return;
    }
    setImageError("");
    setItemData((prev) => ({
      ...prev,
      images: [...prev.images, ...selectedFiles],
    }));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDescriptionError("");
    setLocationError("");
    setImageError("");

    if (itemData.description.trim().length < 20) {
      setDescriptionError(
        "Description must be at least 20 characters long."
      );
      return;
    }
    if (itemData.location.trim().length < 10) {
      setLocationError(
        "Please provide a more specific location, at least 10 characters."
      );
      return;
    }
    if (itemData.images.length < 3) {
      setImageError("Please upload at least 3 images.");
      return;
    }

    const formData = new FormData();
    formData.append("name", itemData.name);
    formData.append("description", itemData.description);
    formData.append("location", itemData.location);
    formData.append("status", "lost");
    itemData.images.forEach((image) => formData.append("images", image));

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Token is missing, please log in.");
      return;
    }

    try {
      const response = await axios.post(
        `https://s62-claudiajerome-capstone-trackitback.onrender.com/item/lostitem?token=${token}`,
        formData,
        { withCredentials: true }
      );
      console.log("Lost Item Submitted:", response.data);
      navigate("/homepage");
    } catch (error) {
      console.error("Error submitting lost item:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#EDE8F5] flex flex-col">

      <div className="absolute top-6 left-6 z-50">
        <button
          onClick={() => navigate("/homepage")}
          className="px-6 py-2 rounded-full bg-gradient-to-r from-[#3D52A0] to-[#8697C4] text-white font-bold shadow-md hover:scale-105 transform transition duration-200"
        >
          Back
        </button>
      </div>
      
      <div className="flex justify-center items-start flex-1 p-4 sm:p-8">
        <div className="bg-white shadow-lg rounded-lg p-6 sm:p-8 w-full max-w-md">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-[#3D52A0]">
            Add Lost Item
          </h2>
          <form
            onSubmit={handleSubmit}
            className="mt-6 space-y-4"
            encType="multipart/form-data"
          >
            {/* Item Name */}
            <div>
              <label className="block text-[#3D52A0] font-semibold mb-1">
                Item Name
              </label>
              <input
                type="text"
                name="name"
                value={itemData.name}
                onChange={handleChange}
                className="w-full border border-[#8697C4] p-2 sm:p-3 rounded text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#7091E6]"
                placeholder="Name or brand of the item"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-[#3D52A0] font-semibold mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={itemData.description}
                onChange={handleChange}
                className="w-full border border-[#8697C4] p-2 sm:p-3 rounded text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#7091E6]"
                placeholder="Describe about the lost item"
                rows={4}
                required
              ></textarea>
              {descriptionError && (
                <p className="text-red-600 text-sm mt-1 font-semibold">
                  {descriptionError}
                </p>
              )}
            </div>

            {/* Location */}
            <div>
              <label className="block text-[#3D52A0] font-semibold mb-1">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={itemData.location}
                onChange={handleChange}
                className="w-full border border-[#8697C4] p-2 sm:p-3 rounded text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#7091E6]"
                placeholder="Where did you lose it?"
                required
              />
              {locationError && (
                <p className="text-red-600 text-sm mt-1 font-semibold">
                  {locationError}
                </p>
              )}
            </div>

            {/* Images */}
            <div>
              <label className="block text-[#3D52A0] font-semibold mb-1">
                Upload Images (Min 3)
              </label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="w-full border border-[#8697C4] p-2 sm:p-3 rounded text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#7091E6]"
                placeholder="Upload images of the item"
                required
              />
              {imageError && (
                <p className="text-red-600 text-sm mt-1 font-semibold">
                  {imageError}
                </p>
              )}
              <div className="flex flex-wrap gap-2 mt-2">
                {itemData.images.map((image, index) => (
                  <div
                    key={index}
                    className="relative w-16 h-16 sm:w-20 sm:h-20 rounded overflow-hidden"
                  >
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Uploaded ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute -top-1 -right-1 bg-white rounded-full p-1 shadow hover:bg-gray-100"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#7091E6] text-white py-2 sm:py-3 rounded hover:bg-[#8697C4] text-sm sm:text-base transition"
            >
              Submit Lost Item
            </button>
          </form>
        </div>
      </div>

      
    </div>
  );
};

export default AddLostItemPage;
