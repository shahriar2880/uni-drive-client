import { useContext, useEffect, useState } from "react";
import {useLoaderData, useNavigate } from "react-router-dom";
import BookingModal from "../components/bookings/BookingModal";
import { authContext } from "../contexts/AuthProvider";
import Swal from "sweetalert2";

const CarDetails = () => {
    useEffect(() => {
        scrollTo(0, 0);
    }, []);

    const { user } = useContext(authContext); // Destructure user from AuthContext
    const navigate = useNavigate();
    const carInformation = useLoaderData();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleBookingCar = () => {
        if (!user) {
            Swal.fire({
                title: "Not logged in!",
                text: "You must be logged in to book a car. Please login or create an account.",
                icon: "warning",
                confirmButtonText: "Login",
                showCancelButton: true,
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate("/login");
                }
            });
            return;
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="bg-[#191919] py-10">
            <div className="flex flex-col md:flex-row bg-black rounded-lg shadow-lg overflow-hidden gap-8 items-stretch w-11/12 mx-auto">
                <div className="p-6 md:w-1/2">
                    <h1 className="text-4xl font-bold text-white mb-4">{carInformation.carModel}</h1>
                    <p className="text-lg font-semibold text-orange-600 mb-6">{carInformation.dailyRentalPrice}$ <span className="text-gray-300">/ Per Day</span></p>
                    <div className="space-y-4">
                        <p className="flex items-center text-lg">
                            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" className="mr-3 text-[#FF3600]" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V192H0v272zm320-196c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zm0 128c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zM192 268c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zm0 128c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zM64 268c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H76c-6.6 0-12-5.4-12-12v-40zm0 128c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H76c-6.6 0-12-5.4-12-12v-40zM400 64h-48V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H160V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H48C21.5 64 0 85.5 0 112v48h448v-48c0-26.5-21.5-48-48-48z"></path>
                            </svg>
                            <strong className="text-gray-300"> Availability:</strong>
                            <span className="text-gray-300 ml-1">{carInformation.carModel}</span>
                        </p>
                        <p className="flex items-center text-lg text-wrap">
                            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className="mr-3 text-[#FF3600]" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                <path d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 110c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z"></path>
                            </svg>
                            <strong className="text-gray-300">Description:</strong>
                        </p>
                        <p className="text-gray-300">{carInformation.description}</p>
                        <p className="flex items-center text-lg">
                            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 576 512" className="mr-3 text-[#FF3600]" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                <path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"></path>
                            </svg>
                            <strong className="text-gray-300">Features:</strong>
                        </p>
                        <ul className="list-disc ml-8 text-gray-300">
                            {carInformation.features.map((carDetails, idx) => (
                                <li key={idx}>{carDetails}</li>
                            ))}
                        </ul>
                    </div>
                    <button onClick={handleBookingCar} className="mt-8 px-6 py-3 bg-gradient-to-r from-[#FF3600] to-[#ff3700d7] text-white hover:bg-gradient-to-l font-semibold rounded-lg text-lg">Book Now</button>
                </div>
                <div className="md:w-1/2 bg-gray-200 flex items-center">
                    <img className="w-full h-full object-fill" src={`${carInformation.imageUrl}`} alt="Mercedes G Class" />
                </div>
            </div>
            {isModalOpen && <BookingModal carInformation={carInformation} onClose={handleCloseModal} />}
        </div>
    );
};

export default CarDetails;
