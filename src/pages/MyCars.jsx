import React, { useContext, useEffect, useState, useRef } from "react";
import { authContext } from "../contexts/AuthProvider";
import axios from "axios";
import Modal from "../components/common/Modal";
import Swal from "sweetalert2";
import { format } from 'date-fns';
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import ErrorToaster from "../components/common/ErrorToaster";

const MyCars = () => {
    const { user } = useContext(authContext);
    const [addedCars, setAddedCars] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedCar, setSelectedCar] = useState(null);
    const myRef = useRef(null);
    const [loading, setLoading] = useState(true);

    const fetchCars = () => {
        setLoading(true);
        axios.get(`https://uni-drive-client.vercel.app/my-cars/${user.email}`)
            .then(response => {
                setAddedCars(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setLoading(false);
                ErrorToaster("Failed to fetch your added cars");
            });
    };

    useEffect(() => {
        fetchCars();
    }, [user.email]);

    const handleUpdateCar = (car) => {
        setSelectedCar(car);
        setOpen(true);
    };

    const handleSaveChanges = () => {
        fetchCars();
        setOpen(false);
        setSelectedCar(null);
    };

    const handleDeleteCar = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`https://uni-drive-client.vercel.app/car/${id}`)
                    .then(response => {
                        if (response.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Car has been deleted successfully.",
                                icon: "success"
                            });
                            setAddedCars(prevCars => prevCars.filter(car => car._id !== id));
                        }
                    })
                    .catch(error => {
                        console.error(error);
                        Swal.fire({
                            icon: "error",
                            title: "Delete Failed",
                            text: "Failed to delete the car. Please try again."
                        });
                    });
            }
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#191919] flex items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-red-500"></div>
            </div>
        );
    }

    return (
        <div className="bg-[#191919] min-h-screen border border-transparent py-20" ref={myRef}>
            <Helmet>
                <title>My Cars | Uni Drive</title>
            </Helmet>
            {/* Modal Component */}
            <Modal
                open={open}
                onClose={() => {
                    setOpen(false);
                    setSelectedCar(null);
                }}
                car={selectedCar}
                handleSaveChanges={handleSaveChanges}
                myRef={myRef}
            />

            {/* Page Title */}
            <h1 className="text-4xl font-bold text-center text-white mb-10">
                Manage Your Cars
            </h1>

            {addedCars.length === 0 ? (
                <div>
                    <div className="text-center text-gray-400 text-xl">
                        You haven&apos;t added any cars yet.
                    </div>
                    <Link to={'/add-car'} className="flex justify-center">
                        <button className="mt-6 px-6 py-3 font-semibold bg-gradient-to-r from-[#FF3600] to-[#ff3700d7] text-white hover:bg-gradient-to-l  duration-300 border-none rounded-lg hover:scale-105 transition-transform text-sm md:text-base lg:text-lg">Add Car</button>
                    </Link>
                </div>
            ) : (
                <div className="overflow-x-auto mt-6 w-11/12 mx-auto">
                    <table className="table-auto w-full bg-black border border-gray-700 rounded-lg shadow-lg animate__animated animate__fadeInUp">
                        <thead className="bg-black">
                            <tr>
                                <th className="px-4 py-4 text-white text-center text-xl">Car Image</th>
                                <th className="px-4 py-4 text-white text-center text-xl">Car Model</th>
                                <th className="px-4 py-4 text-white text-center text-xl">Daily Rental Price</th>
                                <th className="px-4 py-4 text-white text-center text-xl">Location</th>
                                <th className="px-4 py-4 text-white text-center text-xl">Booking Count</th>
                                <th className="px-4 py-4 text-white text-center text-xl">Date Added</th>
                                <th className="px-4 py-4 text-white text-center text-xl">Status</th>
                                <th className="px-4 py-4 text-white text-center text-xl">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {addedCars.map((car) => (
                                <tr key={car._id} className="border-t border-gray-700 hover:bg-[#2C2C2C] transition-colors duration-200">
                                    <td className="px-4 py-4">
                                        <img
                                            src={car.imageUrl}
                                            alt={car.carModel}
                                            className="w-28 h-20 object-cover rounded mx-auto"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = "/placeholder-car.png"; // Add a placeholder image
                                            }}
                                        />
                                    </td>
                                    <td className="px-4 py-4 text-gray-300 text-center font-semibold">
                                        {car.carModel}
                                    </td>
                                    <td className="px-4 py-4 text-gray-300 text-center font-semibold">
                                        ${car.dailyRentalPrice}
                                    </td>
                                    <td className="px-4 py-4 text-gray-300 text-center font-semibold">
                                        {car.location}
                                    </td>
                                    <td className="px-4 py-4 text-gray-300 text-center font-semibold">
                                        {car.bookingCount || 0}
                                    </td>
                                    <td className="px-4 py-4 text-gray-300 text-center font-semibold">
                                        {format(new Date(car.availabilityDate), 'MMM dd, yyyy')}
                                    </td>
                                    <td className="px-4 py-4 text-center">
                                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${car.bookingStatus === "Booked"
                                            ? "bg-red-200 text-red-800"
                                            : "bg-green-200 text-green-800"
                                            }`}>
                                            {car.bookingStatus || "Available"}
                                        </span>
                                    </td>
                                    <td className="px-4 py-4 text-center">
                                        <button
                                            onClick={() => handleUpdateCar(car)}
                                            className="flex items-center font-semibold text-blue-400 hover:text-blue-600 mx-auto transition-colors duration-200"
                                        >
                                            <span className="mr-2">
                                                <svg
                                                    stroke="currentColor"
                                                    fill="currentColor"
                                                    strokeWidth="0"
                                                    viewBox="0 0 576 512"
                                                    height="1em"
                                                    width="1em"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z">
                                                    </path>
                                                </svg>
                                            </span>
                                            Update
                                        </button>
                                        <button
                                            onClick={() => handleDeleteCar(car._id)}
                                            className="flex items-center font-semibold text-red-400 hover:text-red-600 mt-2 mx-auto transition-colors duration-200"
                                        >
                                            <span className="mr-2">
                                                <svg
                                                    stroke="currentColor"
                                                    fill="currentColor"
                                                    strokeWidth="0"
                                                    viewBox="0 0 448 512"
                                                    height="1em"
                                                    width="1em"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z">
                                                    </path>
                                                </svg>
                                            </span>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default MyCars;