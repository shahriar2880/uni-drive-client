import axios from "axios";
import SuccessToaster from "../common/SuccessToaster";
import ErrorToaster from "../common/ErrorToaster";
import { useContext } from "react";
import { authContext } from "../../contexts/AuthProvider";

const BookingModal = ({ carInformation, onClose }) => {
    const { user } = useContext(authContext);

    const handleConfirmBooking = () => {
        // Get the current date
        const currentDate = new Date().toISOString();

        // Include the current date in the carInformation object
        const bookingData = { ...carInformation, bookingDate: currentDate, booked_user: user.email };
        console.log(bookingData)

        axios.post('https://neo-drive-server.vercel.app/booking-cars', bookingData)
            .then(response => {
                console.log(response);
                SuccessToaster('Booking confirmed.');
                // Close the modal after successful booking
                onClose();
            })
            .catch(error => {
                console.error(error.message);
                ErrorToaster('This car is already booked');
            });
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-gray-300 p-6 rounded-lg shadow-lg max-w-sm w-full relative">
                <h2 className="text-2xl font-bold mb-4">Confirm Booking</h2>
                <p className="mb-2 font-semibold text-gray-800">Car Model: {carInformation.carModel}</p>
                <p className="mb-2 font-semibold text-gray-800">Price per Day: {carInformation.dailyRentalPrice}$</p>
                <p className="mb-4 font-semibold text-gray-800">Availability: {carInformation.availabilityDate}</p>
                <button onClick={handleConfirmBooking} className="block w-full px-4 py-2 bg-gradient-to-r from-[#FF3600] to-[#ff3700d7] hover:bg-gradient-to-l font-semibold text-white rounded-lg text-lg mb-4">
                    Confirm Booking
                </button>
                <button onClick={onClose} className="block w-full px-4 py-2 bg-gray-400 text-white rounded-lg text-lg hover:bg-gray-500">
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default BookingModal;
