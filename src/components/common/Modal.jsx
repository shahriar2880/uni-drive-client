import React, { useContext, useEffect, useState } from 'react';
import { Modal as ResponsiveModal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Swal from 'sweetalert2';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { authContext } from '../../contexts/AuthProvider';
import './modalStyles.css';

const Modal = ({ open, onClose, car, handleSaveChanges, myRef }) => {
    const { user } = useContext(authContext);
    const [loading, setLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [formData, setFormData] = useState({
        carModel: '',
        dailyRentalPrice: '',
        availabilityDate: new Date(),
        vehicleRegistrationNumber: '',
        features: '',
        description: '',
        location: '',
        imageUrl: '',
    });

    useEffect(() => {
        if (car) {
            setFormData({
                carModel: car.carModel || '',
                dailyRentalPrice: car.dailyRentalPrice || '',
                availabilityDate: car.availabilityDate ? new Date(car.availabilityDate) : new Date(),
                vehicleRegistrationNumber: car.vehicleRegistrationNumber || '',
                features: car.features ? car.features.join(', ') : '',
                description: car.description || '',
                location: car.location || '',
                imageUrl: car.imageUrl || '',
            });
        }
    }, [car]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const onDrop = (acceptedFiles) => {
        setSelectedFile(acceptedFiles[0]);
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.jpeg', '.jpg', '.png', '.gif']
        },
        maxSize: 5242880, // 5MB
    });

    const handleImageUpload = async (file) => {
        const formData = new FormData();
        formData.append("image", file);

        try {
            const response = await fetch(
                "https://api.imgbb.com/1/upload?key=74ea1ddd96327cb757effd0ab3f71192",
                {
                    method: "POST",
                    body: formData,
                }
            );

            const data = await response.json();
            if (data.success) {
                return data.data.url;
            } else {
                throw new Error("Image upload failed");
            }
        } catch (error) {
            throw new Error("Image upload failed: " + error.message);
        }
    };

    const handleUpdateCarForm = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            let imageUrl = formData.imageUrl;
            if (selectedFile) {
                imageUrl = await handleImageUpload(selectedFile);
            }

            const carData = {
                carModel: formData.carModel,
                dailyRentalPrice: parseFloat(formData.dailyRentalPrice),
                availabilityDate: formData.availabilityDate,
                vehicleRegistrationNumber: formData.vehicleRegistrationNumber,
                features: formData.features.split(",").map(feature => feature.trim()),
                description: formData.description,
                bookingCount: car.bookingCount || 0,
                imageUrl: imageUrl,
                location: formData.location,
                saveUserDetails: {
                    name: user.displayName,
                    email: user.email,
                    photo: user.photoURL
                },
                bookingStatus: car.bookingStatus || "Available"
            };

            const response = await axios.put(`https://neo-drive-server.vercel.app/cars/${car._id}`, carData);
            
            if (response.data.modifiedCount > 0) {
                Swal.fire({
                    title: "Success!",
                    text: "Car details updated successfully",
                    icon: "success",
                    draggable: true
                });
                handleSaveChanges();
            }
        } catch (error) {
            console.error('Update error:', error);
            Swal.fire({
                icon: "error",
                title: "Update Failed",
                text: "Failed to update car details. Please try again.",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <ResponsiveModal
            open={open}
            onClose={onClose}
            center
            container={myRef.current}
            classNames={{
                modal: 'customModal',
                overlay: 'customOverlay',
            }}
        >
            {car && (
                <div className="w-full bg-[#060b17] p-8 space-y-3 rounded-xl">
                    <h1 className="text-3xl font-bold text-center text-[#ff3700d7] mb-6">Update Car Details</h1>
                    <form onSubmit={handleUpdateCarForm} className="space-y-6">
                        {/* Car Model */}
                        <div className="space-y-1 text-sm">
                            <label htmlFor="carModel" className="block text-white font-bold mb-2">Car Model</label>
                            <input
                                type="text"
                                name="carModel"
                                id="carModel"
                                placeholder="Enter car model"
                                value={formData.carModel}
                                onChange={handleInputChange}
                                className="w-full bg-[#1F2937] text-white px-4 py-2 rounded-md focus:border-red-600"
                                required
                            />
                        </div>

                        {/* Daily Rental Price */}
                        <div className="space-y-1 text-sm">
                            <label htmlFor="dailyRentalPrice" className="block text-white font-bold mb-2">Daily Rental Price ($)</label>
                            <input
                                type="number"
                                name="dailyRentalPrice"
                                id="dailyRentalPrice"
                                placeholder="Enter daily rental price"
                                value={formData.dailyRentalPrice}
                                onChange={handleInputChange}
                                className="w-full bg-[#1F2937] text-white px-4 py-2 rounded-md focus:border-red-600"
                                required
                                min="0"
                                step="0.01"
                            />
                        </div>

                        {/* Availability Date */}
                        <div className="space-y-1 text-sm">
                            <label htmlFor="availabilityDate" className="block text-white font-bold mb-2">Availability Date</label>
                            <DatePicker
                                selected={formData.availabilityDate}
                                onChange={(date) => setFormData(prev => ({ ...prev, availabilityDate: date }))}
                                className="w-full bg-[#1F2937] text-white px-4 py-2 rounded-md focus:border-red-600"
                                dateFormat="MMMM d, yyyy"
                                minDate={new Date()}
                                required
                            />
                        </div>

                        {/* Vehicle Registration Number */}
                        <div className="space-y-1 text-sm">
                            <label htmlFor="vehicleRegistrationNumber" className="block text-white font-bold mb-2">Vehicle Registration Number</label>
                            <input
                                type="text"
                                name="vehicleRegistrationNumber"
                                id="vehicleRegistrationNumber"
                                placeholder="Enter vehicle registration number"
                                value={formData.vehicleRegistrationNumber}
                                onChange={handleInputChange}
                                className="w-full bg-[#1F2937] text-white px-4 py-2 rounded-md focus:border-red-600"
                                required
                            />
                        </div>

                        {/* Features */}
                        <div className="space-y-1 text-sm">
                            <label htmlFor="features" className="block text-white font-bold mb-2">Features (comma-separated)</label>
                            <input
                                type="text"
                                name="features"
                                id="features"
                                placeholder="Enter features (e.g., AC, GPS, Bluetooth)"
                                value={formData.features}
                                onChange={handleInputChange}
                                className="w-full bg-[#1F2937] text-white px-4 py-2 rounded-md focus:border-red-600"
                                required
                            />
                        </div>

                        {/* Description */}
                        <div className="space-y-1 text-sm">
                            <label htmlFor="description" className="block text-white font-bold mb-2">Description</label>
                            <textarea
                                name="description"
                                id="description"
                                placeholder="Enter car description"
                                value={formData.description}
                                onChange={handleInputChange}
                                className="w-full bg-[#1F2937] text-white px-4 py-2 rounded-md focus:border-red-600 min-h-[100px]"
                                required
                            />
                        </div>

                        {/* Location */}
                        <div className="space-y-1 text-sm">
                            <label htmlFor="location" className="block text-white font-bold mb-2">Location</label>
                            <input
                                type="text"
                                name="location"
                                id="location"
                                placeholder="Enter location"
                                value={formData.location}
                                onChange={handleInputChange}
                                className="w-full bg-[#1F2937] text-white px-4 py-2 rounded-md focus:border-red-600"
                                required
                            />
                        </div>

                        {/* Image Upload */}
                        <div className="space-y-1 text-sm">
                            <label className="block text-white font-bold mb-2">Car Image</label>
                            <div
                                {...getRootProps()}
                                className={`border-dashed border-2 p-4 rounded-md text-center cursor-pointer ${
                                    isDragActive ? "border-red-600 bg-red-50/10" : "border-gray-500"
                                }`}
                            >
                                <input {...getInputProps()} />
                                {isDragActive ? (
                                    <p className="text-white">Drop the image here...</p>
                                ) : (
                                    <p className="text-white">Drag and drop an image here, or click to select</p>
                                )}
                            </div>
                            {selectedFile && (
                                <p className="text-sm text-green-500 mt-2">Selected: {selectedFile.name}</p>
                            )}
                        </div>

                        {/* Current Image Preview */}
                        {formData.imageUrl && (
                            <div className="space-y-1">
                                <label className="block text-white font-bold mb-2">Current Image</label>
                                <img 
                                    src={formData.imageUrl} 
                                    alt="Current car" 
                                    className="w-full h-32 object-cover rounded-md"
                                />
                            </div>
                        )}

                        {/* Submit Button */}
                        <button 
                            type="submit" 
                            disabled={loading}
                            className="w-full p-3 text-center rounded-md bg-gradient-to-r from-[#FF3600] to-[#ff3700d7] text-white font-bold hover:bg-gradient-to-l transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Updating...' : 'Update Car'}
                        </button>
                    </form>
                </div>
            )}
        </ResponsiveModal>
    );
};

export default Modal;