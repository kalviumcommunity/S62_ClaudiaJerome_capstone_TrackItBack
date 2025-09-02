import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, X } from 'lucide-react';

import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function SingleItemPage() {
    const {id}=useParams()
    const [item,setItem]=useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [startIndex, setStartIndex] = useState(0);
    const navigate=useNavigate()
    

    useEffect(()=>{
        const fetch=async()=>{
            try{
                const response=await axios.get(`http://localhost:8080/item/${id}`)
                setItem(response.data)
                console.log(response.data)
                
            }catch(err){
                console.log('Failed to fetch details-',err)
            }
        }
        fetch()
    },[])
    if (!item) {
        return <div className="p-4 text-red-500 text-center">Item not found</div>;
    }

    const handleImageClick = (index) => {
        setStartIndex(index);
        setIsModalOpen(true);
    };

    const settings = {
        dots: true,
        infinite: true,
        initialSlide: startIndex,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
    };
  return (
    //   <div className="max-w-5xl mx-auto px-4 py-8">
    //       <button
    //           onClick={() => navigate(-1)}
    //           className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium px-4 py-2 rounded-full shadow-sm transition duration-200 w-fit mb-6"
    //       >
    //           <ArrowLeft className="w-4 h-4" />
    //           Back to items
    //       </button>

    //       <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col md:flex-row gap-8">
    //           <div className="md:w-1/2">
    //               <img
    //                   src={item.imagePath[0]}
    //                   alt={item.name}
    //                   className="w-full h-72 object-contain rounded-lg border"
    //               />
    //               {item.imagePath.length > 1 && (
    //                   <div className="flex gap-2 mt-4 overflow-x-auto">
    //                       {item.imagePath.slice(1).map((img, idx) => (
    //                           <img
    //                               key={idx}
    //                               src={img}
    //                               alt={`Thumbnail ${idx}`}
    //                               className="w-20 h-20 object-cover rounded border"
    //                           />
    //                       ))}
    //                   </div>
    //               )}
    //           </div>

              

    //           <div className="md:w-1/2 flex flex-col justify-between">
    //               <div>
    //                   <h2 className="text-3xl font-bold mb-2">{item.name}</h2>
    //                   <p className="text-gray-700 mb-4">{item.description}</p>

    //                   <p className="text-sm text-gray-600 mb-2">
    //                       <span className="font-semibold">Location:</span> {item.location}
    //                   </p>

    //                   <span
    //                       className={`inline-block px-3 py-1 text-sm rounded-full font-semibold mb-4 ${item.status === 'lost'
    //                               ? 'bg-red-100 text-red-600'
    //                               : 'bg-green-100 text-green-600'
    //                           }`}
    //                   >
    //                       Status: {item.status}
    //                   </span>

    //                   <hr className="my-4" />

    //                   <div>
    //                       <h3 className="text-lg font-semibold mb-1">Posted by:</h3>
    //                       <p className="text-gray-800">{item.userId?.name || 'Unknown User'}</p>
    //                       <p className="text-gray-500 text-sm">{item.userId?.email}</p>
    //                       <p className="text-gray-500 text-sm">{item.userId?.phone}</p>
    //                   </div>
    //               </div>
    //           </div>
    //       </div>
    //   </div>


    <div className="max-w-6xl mx-auto px-4 py-8">
            <button
                onClick={() => navigate('/homepage')}
                className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium px-4 py-2 rounded-full shadow-sm transition duration-200 w-fit mb-6"
            >
                <ArrowLeft className="w-4 h-4" />
                Back
            </button>

            <div className="bg-white rounded-xl shadow-xl p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="w-full space-y-4">
                    <img
                        src={item.imagePath[0]}
                        alt={item.name}
                        className="w-full h-80 object-contain rounded-lg border cursor-pointer"
                        onClick={() => handleImageClick(0)}
                    />

                    {item.imagePath.length > 1 && (
                        <div className="flex gap-2 overflow-x-auto">
                            {item.imagePath.map((img, idx) => (
                                <img
                                    key={idx}
                                    src={img}
                                    alt={`Thumb ${idx}`}
                                    onClick={() => handleImageClick(idx)}
                                    className="w-20 h-20 object-cover rounded border cursor-pointer hover:scale-105 transition"
                                />
                            ))}
                        </div>
                    )}
                </div>

                <div className="flex flex-col justify-between">
                    <div>
                        <h2 className="text-4xl font-bold mb-3">{item.name}</h2>
                        <p className="text-gray-700 text-lg mb-4">{item.description}</p>

                        <p className="text-sm text-gray-600 mb-2">
                            <span className="font-semibold">Location:</span> {item.location}
                        </p>

                        <span
                            className={`inline-block px-3 py-1 text-sm rounded-full font-semibold mb-4 ${item.status === 'lost'
                                ? 'bg-red-100 text-red-600'
                                : 'bg-green-100 text-green-600'
                                }`}
                        >
                            Status: {item.status}
                        </span>

                        <hr className="my-4" />

                        <div>
                            <h3 className="text-lg font-semibold mb-1">Posted by:</h3>
                            <p className="text-gray-800">{item.userId?.name || 'Unknown User'}</p>
                            <p className="text-gray-500 text-sm">{item.userId?.email}</p>
                            <p className="text-gray-500 text-sm">{item.userId?.phone}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal for Image Preview */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center">
                    <div className="absolute top-4 right-4 z-50">
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="text-white bg-gray-800 p-2 rounded-full hover:bg-gray-700"
                        >
                            <X size={20} />
                        </button>
                    </div>
                    <div className="w-full max-w-3xl">
                        <Slider {...settings}>
                            {item.imagePath.map((img, index) => (
                                <div key={index} className="flex justify-center">
                                    <img
                                        src={img}
                                        alt={`Slide ${index}`}
                                        className="max-h-[80vh] w-full object-contain rounded-lg"
                                    />
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
            )}
        </div>
  )
}

export default SingleItemPage