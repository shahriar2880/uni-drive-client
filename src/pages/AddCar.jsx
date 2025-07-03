import { useContext, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Helmet } from "react-helmet-async";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import { authContext } from "../contexts/AuthProvider";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useForm } from "react-hook-form";

const AddCar = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [selectedFile, setSelectedFile] = useState(null);
    const [startDate, setStartDate] = useState(new Date());
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useContext(authContext);
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            carModel: "",
            dailyRentalPrice: "",
            vehicleRegistrationNumber: "",
            features: "",
            description: "",
            location: "",
        },
    });

    const onDrop = (acceptedFiles) => {
        setSelectedFile(acceptedFiles[0]); // Get the first dropped file
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: "image/*",
    });

    const handleImageUpload = async (file) => {
        const formData = new FormData();
        formData.append("image", file);

        try {
            const response = await fetch(
                'https://api.imgbb.com/1/upload?key=74ea1ddd96327cb757effd0ab3f71192',
                {
                    method: "POST",
                    body: formData,
                }
            );

            const data = await response.json();
            if (data.success) {
                return data.data.url; // Getting the direct image URL
            } else {
                throw new Error("Image upload failed");
            }
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: "Failed to upload image. Please try again.",
                icon: "error",
                confirmButtonText: "Close",
                confirmButtonColor: "#d33",
            });
            throw error;
        }
    };

    const onSubmit = async (data) => {
        setIsLoading(true);

        // Check if an image file is selected
        if (!selectedFile) {
            Swal.fire({
                title: "Error",
                text: "Please upload an image for the car.",
                icon: "error",
                confirmButtonText: "Close",
                confirmButtonColor: "#d33",
            });
            setIsLoading(false);
            return; // Stop the submission process
        }

        let imageUrl = null;

        try {
            // Upload the image
            imageUrl = await handleImageUpload(selectedFile);

            // Prepare the car data
            const carData = {
                carModel: data.carModel,
                dailyRentalPrice: parseFloat(data.dailyRentalPrice),
                availabilityDate: startDate,
                vehicleRegistrationNumber: data.vehicleRegistrationNumber,
                features: data.features.split(",").map((feature) => feature.trim()),
                description: data.description,
                bookingCount: 0,
                imageUrl: imageUrl,
                location: data.location,
                saveUserDetails: {
                    name: user.displayName,
                    email: user.email,
                    photo: user.photoURL,
                },
                bookingStatus: "Pending",
            };

            // Send the car data to the server
            const response = await axiosPublic.post("/car", carData);
            if (response.data.insertedId) {
                Swal.fire({
                    title: "Car successfully added",
                    icon: "success",
                    draggable: true,
                });
                reset();
                setSelectedFile(null); // Clear the selected file
                navigate("/available-cars");
            } else {
                throw new Error("Failed to add car");
            }
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Failed to add car. Please try again.",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-[#191919] pb-20">
            <Helmet>
                <title>Add Car | Uni Drive</title>
            </Helmet>
            <div
                data-aos="flip-down"
                className="w-11/12 md:w-1/2 mx-auto py-6 md:py-10 space-y-4"
            >
                <h1 className="text-4xl font-bold text-center text-[#ff3700d7]">
                    Add Your Car
                </h1>
                <p className="text-center text-base-300 font-medium pb-5">
                    List your car effortlessly, reach more renters, and maximize your
                    earnings by joining our trusted car-sharing platform today!
                </p>
            </div>
            <div className="w-full md:w-3/5 mx-auto bg-[#060b17] p-8 space-y-3 rounded-xl">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Car Model */}
                    <div className="space-y-1 text-sm">
                        <label
                            htmlFor="carModel"
                            className="block text-white font-bold mb-2"
                        >
                            Car Model
                        </label>
                        <input
                            {...register("carModel", {
                                required: "Car model is required",
                            })}
                            type="text"
                            name="carModel"
                            id="carModel"
                            placeholder="Enter car model"
                            className="w-full bg-[#1F2937] text-white px-4 py-2 rounded-md focus:border-red-600"
                        />
                        {errors.carModel && (
                            <span className="text-red-500">{errors.carModel.message}</span>
                        )}
                    </div>

                    {/* Daily Rental Price */}
                    <div className="space-y-1 text-sm">
                        <label
                            htmlFor="dailyRentalPrice"
                            className="block text-white font-bold mb-2"
                        >
                            Daily Rental Price
                        </label>
                        <input
                            {...register("dailyRentalPrice", {
                                required: "Daily rental price is required",
                                min: {
                                    value: 0,
                                    message: "Price must be positive",
                                },
                            })}
                            type="number"
                            name="dailyRentalPrice"
                            id="dailyRentalPrice"
                            placeholder="Enter daily rental price"
                            className="w-full bg-[#1F2937] text-white px-4 py-2 rounded-md focus:border-red-600"
                        />
                        {errors.dailyRentalPrice && (
                            <span className="text-red-500">{errors.dailyRentalPrice.message}</span>
                        )}
                    </div>

                    {/* Availability Date */}
                    <div className="space-y-1 text-sm">
                        <label
                            htmlFor="availabilityDate"
                            className="block text-white font-bold mb-2"
                        >
                            Availability Date
                        </label>
                        <DatePicker
                            {...register("availabilityDate")}
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            className="bg-[#1F2937] text-white px-4 py-2 rounded-md w-full"
                        />
                    </div>

                    {/* Vehicle Registration Number */}
                    <div className="space-y-1 text-sm">
                        <label
                            htmlFor="vehicleRegistrationNumber"
                            className="block text-white font-bold mb-2"
                        >
                            Vehicle Registration Number
                        </label>
                        <input
                            {...register("vehicleRegistrationNumber", {
                                required: "Vehicle registration number is required",
                            })}
                            type="text"
                            name="vehicleRegistrationNumber"
                            id="vehicleRegistrationNumber"
                            placeholder="Enter vehicle registration number"
                            className="w-full bg-[#1F2937] text-white px-4 py-2 rounded-md focus:border-red-600"
                        />
                        {errors.vehicleRegistrationNumber && (
                            <span className="text-red-500">
                                {errors.vehicleRegistrationNumber.message}
                            </span>
                        )}
                    </div>

                    {/* Features */}
                    <div className="space-y-1 text-sm">
                        <label
                            htmlFor="features"
                            className="block text-white font-bold mb-2"
                        >
                            Features
                        </label>
                        <input
                            {...register("features", {
                                required: "Features are required",
                            })}
                            type="text"
                            name="features"
                            id="features"
                            placeholder="Enter features (comma-separated)"
                            className="w-full bg-[#1F2937] text-white px-4 py-2 rounded-md focus:border-red-600"
                        />
                        {errors.features && (
                            <span className="text-red-500">{errors.features.message}</span>
                        )}
                    </div>

                    {/* Description */}
                    <div className="space-y-1 text-sm">
                        <label
                            htmlFor="description"
                            className="block text-white font-bold mb-2"
                        >
                            Description
                        </label>
                        <textarea
                            {...register("description", {
                                required: "Description is required",
                            })}
                            name="description"
                            id="description"
                            placeholder="Enter description"
                            className="w-full bg-[#1F2937] text-white px-4 py-2 rounded-md focus:border-red-600"
                        ></textarea>
                        {errors.description && (
                            <span className="text-red-500">{errors.description.message}</span>
                        )}
                    </div>

                    {/* Location */}
                    <div className="space-y-1 text-sm">
                        <label
                            htmlFor="location"
                            className="block text-white font-bold mb-2"
                        >
                            Location
                        </label>
                        <input
                            {...register("location", {
                                required: "Location is required",
                            })}
                            type="text"
                            name="location"
                            id="location"
                            placeholder="Enter location"
                            className="w-full bg-[#1F2937] text-white px-4 py-2 rounded-md focus:border-red-600"
                        />
                        {errors.location && (
                            <span className="text-red-500">{errors.location.message}</span>
                        )}
                    </div>

                    {/* Image Upload */}
                    <div className="space-y-1 text-sm">
                        <label
                            htmlFor="image"
                            className="block text-white font-bold mb-2"
                        >
                            Image
                        </label>
                        <div
                            {...getRootProps()}
                            className={`border-dashed border-2 p-4 rounded-md text-center ${isDragActive ? "border-red-600" : "border-gray-500"
                                }`}
                        >
                            <input {...getInputProps()} />
                            {isDragActive ? (
                                <p className="text-white">
                                    Drop the files here...
                                </p>
                            ) : (
                                <p className="text-white">
                                    Drag and drop files here, or click to select a file
                                </p>
                            )}
                        </div>
                        {selectedFile && (
                            <p className="text-sm text-green-500 mt-2">
                                Selected file: {selectedFile.name}
                            </p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        disabled={isLoading || !selectedFile} // Disable if loading or no file is selected
                        className={`block w-full p-2 text-center rounded-sm ${isLoading || !selectedFile
                                ? "bg-gray-500"
                                : "bg-gradient-to-r from-[#FF3600] to-[#ff3700d7]"
                            } text-white font-bold hover:bg-gradient-to-l transition-all duration-300 border-none`}
                    >
                        {isLoading ? "Adding Car..." : "Add Car"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddCar;