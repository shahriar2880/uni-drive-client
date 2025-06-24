import { useState } from "react";

const ModifyBookingDateModal = ({ onClose, onSubmit }) => {
    const [bookingDate, setBookingDate] = useState('');

    const handleSubmit = () => {
        onSubmit(bookingDate);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-gray-200 p-6 rounded shadow-md w-1/3">
                <h3 className="text-lg font-bold mb-4">Modify Booking Date</h3>
                <input 
                    type="datetime-local" 
                    className="w-full p-2 border rounded mb-4" 
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                />
                <div className="flex justify-end">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded mr-2">Cancel</button>
                    <button onClick={handleSubmit} className="px-4 py-2 bg-gradient-to-r from-[#FF3600] to-[#ff3700d7] text-white hover:bg-gradient-to-l rounded">Confirm</button>
                </div>
            </div>
        </div>
    );
};

export default ModifyBookingDateModal;
