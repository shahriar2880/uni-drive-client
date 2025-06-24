import { useContext, useEffect, useState } from "react";
import { format } from "date-fns";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { authContext } from "../contexts/AuthProvider";
import ErrorToaster from "../components/common/ErrorToaster";
import LoadingSpinner from "../components/common/LoadingSpinner";
import Swal from 'sweetalert2';
import { Helmet } from "react-helmet-async";

const MyBookings = () => {
    const [bookingCars, setBookingCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const axiosPublic = useAxiosPublic();
    const { user } = useContext(authContext);

    useEffect(() => {
        const fetchBookingCars = async () => {
            setLoading(true);
            try {
                const response = await axiosPublic.get(`/booking-cars/${user?.email}`);
                setBookingCars(response.data);
            } catch (error) {
                console.error(error);
                ErrorToaster("Failed to fetch bookings. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        fetchBookingCars();
    }, [axiosPublic, user?.email]);

    if (loading) {
        return <LoadingSpinner />;
    }

    const handleCancel = async (car) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, cancel it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await axiosPublic.delete(`/booking-cars/${car._id}`, { bookingStatus: 'Pending' });
                    if (response.data.deletedCount === 1) {
                        // Update the local state
                        setBookingCars((prevBookingCars) => 
                            prevBookingCars.filter((bookingCar) => bookingCar._id !== car._id)
                        );
                        Swal.fire({
                            title: "Canceled!",
                            text: "Your booking has been canceled.",
                            icon: "success"
                        });
                    }
                } catch (error) {
                    Swal.fire({
                        title: "Error!",
                        text: error.message,
                        icon: "error",
                        draggable: true,
                    });
                }
            }
        });
    };
    
    return (
        <div className="bg-[#191919] min-h-screen border border-transparent py-20">
            <Helmet>
                <title>My Bookings | Uni Drive</title>
            </Helmet>
            <h1 className="text-4xl font-bold text-center text-white mb-10">My Bookings</h1>
            {bookingCars.length === 0 ? (
                <div className="text-center text-gray-400 text-xl">
                    You haven&apos;t booked any cars yet.
                </div>
            ) : (
                <div className="overflow-x-auto mt-6 w-11/12 mx-auto">
                    <table className="table-auto w-full bg-black border border-gray-700 rounded-lg shadow-lg animate__animated animate__fadeInUp">
                        <thead className="bg-black">
                            <tr>
                                <th className="px-4 py-4 text-white text-center text-xl">Car Image</th>
                                <th className="px-4 py-4 text-white text-center text-xl">Car Model</th>
                                <th className="px-4 py-4 text-white text-center text-xl">Booking Date</th>
                                <th className="px-4 py-4 text-white text-center text-xl">Total Price</th>
                                <th className="px-4 py-4 text-white text-center text-xl">Booking Status</th>
                                <th className="px-4 py-4 text-white text-center text-xl">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookingCars.map((car) => (
                                <tr
                                    key={car._id}
                                    className="border-t border-gray-700 hover:bg-[#2C2C2C] transition-colors duration-200"
                                >
                                    <td className="px-4 py-4">
                                        <img
                                            src={car.imageUrl}
                                            alt={car.carModel}
                                            className="w-28 h-20 object-cover rounded mx-auto"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = "/placeholder-car.png";
                                            }}
                                        />
                                    </td>
                                    <td className="px-4 py-4 text-gray-300 text-center font-semibold">
                                        {car.carModel}
                                    </td>
                                    <td className="px-4 py-4 text-gray-300 text-center font-semibold">
                                        {format(new Date(car.bookingDate), "dd-MM-yyyy HH:mm")}
                                    </td>
                                    <td className="px-4 py-4 text-gray-300 text-center font-semibold">
                                        ${car.dailyRentalPrice}
                                    </td>
                                    <td className="px-4 py-4 text-center">
                                        <span
                                            className={`px-3 py-1 rounded-full text-sm font-semibold ${car.bookingStatus === "Booked"
                                                ? "bg-red-200 text-red-800"
                                                : car.bookingStatus === "Pending"
                                                    ? "bg-yellow-200 text-yellow-800"
                                                    : "bg-green-200 text-green-800"
                                                }`}
                                        >
                                            {car.bookingStatus}
                                        </span>
                                    </td>
                                    <td className="px-4 py-4 text-center space-x-4">
                                        <button
                                            onClick={() => handleCancel(car)}

                                            className={`font-medium items-center px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded transition-colors duration-200`}
                                        >
                                            Cancel
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

export default MyBookings;