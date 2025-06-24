import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaCalendarAlt, FaCar } from "react-icons/fa";

const CarCard = ({ car }) => {
    return (
        <div data-aos="zoom-in-up" className="relative flex flex-col my-6 bg-black text-white shadow-md border border-gray-700 rounded-lg overflow-hidden">
            {/* Car Image with Price Tag */}
            <div className="relative h-52 overflow-hidden">
                <img
                    className="w-full h-full object-cover transition-transform duration-500 ease-in-out transform hover:scale-110"
                    src={car.imageUrl}
                    alt={car.carModel}
                />
                <div className="absolute top-2 left-2 bg-[#FF3600] text-white font-bold text-sm px-3 py-1 rounded-lg shadow-md">
                    ${car.dailyRentalPrice}/Day
                </div>
            </div>

            {/* Car Details */}
            <div className="p-5 flex flex-col gap-3">
                <h3 className="text-xl font-semibold text-red-500">
                    {car.carModel}
                </h3>

                <div className="flex items-center gap-2 text-sm text-gray-300">
                    <FaCalendarAlt className="text-red-500" />
                    <span>Available {car.availabilityDate}</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-300">
                    <FaMapMarkerAlt className="text-red-500" />
                    <span>{car.location}</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-300">
                    <FaCar className="text-red-500" />
                    <span>{car.bookingCount} bookings</span>
                </div>
            </div>

            {/* Rent Now Button */}
            <Link to={`/cars/${car._id}`} className="px-5 pb-5">
                <button className="w-full py-2 font-semibold bg-gradient-to-r from-[#FF3600] to-[#ff3700d7] text-white hover:bg-gradient-to-l transition-all duration-300 border-none rounded-lg hover:scale-105">
                    Rent Now
                </button>
            </Link>
        </div>
    );
};

CarCard.propTypes = {
    car: PropTypes.shape({
        carModel: PropTypes.string.isRequired,
        dailyRentalPrice: PropTypes.number.isRequired,
        availabilityDate: PropTypes.string.isRequired,
        vehicleRegistrationNumber: PropTypes.string.isRequired,
        features: PropTypes.arrayOf(PropTypes.string).isRequired,
        description: PropTypes.string.isRequired,
        bookingCount: PropTypes.number.isRequired,
        imageUrl: PropTypes.string.isRequired,
        location: PropTypes.string.isRequired,
        saveUserDetails: PropTypes.shape({
            name: PropTypes.string.isRequired,
            email: PropTypes.string.isRequired,
            photo: PropTypes.string.isRequired,
        }).isRequired,
        bookingStatus: PropTypes.string.isRequired,
    }).isRequired,
};

export default CarCard;
