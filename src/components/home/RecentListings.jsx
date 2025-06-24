import { formatDistanceToNow, parseISO } from "date-fns";
import { useEffect, useState } from "react";
import { FaMapMarkerAlt, FaCalendarAlt, FaCar } from "react-icons/fa";
import { Link } from "react-router-dom";
import SectionTitle from "../common/SectionTitle";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const RecentListings = () => {
    const [recentCars, setRecentCars] = useState([]);
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        axiosPublic.get("/recent-cars")
            .then(response => {
                setRecentCars(response.data);
            })
            .catch(error => {
                console.error(error.message);
            });
    }, [axiosPublic]);

    return (
        <div className="bg-[#191919] pb-16">
            <SectionTitle title="Discover the Latest Arrivals" description="Explore our newest rides and book your dream car today!" />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-4/5 mx-auto">
                {recentCars.map((recentCar) => (
                    <div data-aos="zoom-in-up" key={recentCar._id} className="relative flex flex-col my-6 bg-black text-white shadow-md border border-gray-700 rounded-lg overflow-hidden">
                        {/* Car Image with Price Tag */}
                        <div className="relative h-52 overflow-hidden">
                            <img
                                className="w-full h-full object-cover transition-transform duration-500 ease-in-out transform hover:scale-110"
                                src={recentCar.imageUrl}
                                alt={recentCar.carModel}
                            />
                            <div className="absolute top-2 left-2 bg-[#FF3600] text-white font-bold text-sm px-3 py-1 rounded-lg shadow-md">
                                ${recentCar.dailyRentalPrice}/Day
                            </div>
                        </div>

                        {/* Car Details */}
                        <div className="p-5 flex flex-col gap-3">
                            <h3 className="text-xl font-semibold text-red-500">
                                {recentCar.carModel}
                            </h3>

                            <div className="flex items-center gap-2 text-sm text-gray-300">
                                <FaCalendarAlt className="text-red-500" />
                                <span>{formatDistanceToNow(parseISO(recentCar.availabilityDate))} ago</span>
                            </div>

                            <div className="flex items-center gap-2 text-sm text-gray-300">
                                <FaMapMarkerAlt className="text-red-500" />
                                <span>{recentCar.location}</span>
                            </div>

                            <div className="flex items-center gap-2 text-sm text-gray-300">
                                <FaCar className="text-red-500" />
                                <span>{recentCar.bookingCount} bookings</span>
                            </div>
                        </div>

                        {/* Rent Now Button */}
                        <Link to={`/cars/${recentCar._id}`} className="px-5 pb-5">
                            <button className="w-full py-2 font-semibold bg-gradient-to-r from-[#FF3600] to-[#ff3700d7] text-white hover:bg-gradient-to-l transition-all duration-300 border-none rounded-lg hover:scale-105">
                                Rent Now
                            </button>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecentListings;
