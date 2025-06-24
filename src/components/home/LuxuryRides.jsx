import { Link } from "react-router-dom";
import SectionTitle from "../common/SectionTitle";

const offers = [
    {
        title: "15% Off Weekend Rentals!",
        description: "Book now and save 15% on all rentals this weekend. Perfect for your getaway!",
        dataAos: "fade-right",
        buttonText: "Book Now",
        price: null
    },
    {
        title: "Luxury Cars at $99/day!",
        description: "Experience luxury at an affordable price. Offer valid this holiday season!",
        dataAos: "fade-up",
        buttonText: "Book Now",
        price: "$99/day"
    },
    {
        title: "Free Upgrade on Rentals!",
        description: "Book a standard car and get upgraded to a luxury car for free!",
        dataAos: "fade-left",
        buttonText: "Book Now",
        price: null
    }
];

const LuxuryRides = () => {
    return (
        <div className="bg-black px-6 pb-20">
            <SectionTitle title="Luxury Rides at Affordable Prices!" description="Why wait? Take advantage of our incredible offers today!" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-4/5 mx-auto">
                {offers.map((offer, index) => (
                    <div key={index} className="bg-[#1E2325] cursor-pointer rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105 aos-init aos-animate" data-aos={offer.dataAos}>
                        <h3 className="text-2xl font-bold mb-4 text-gray-300">
                            {offer.title}
                            {offer.price && <span className="text-[#FF3600]"> {offer.price}</span>}
                        </h3>
                        <p className="text-gray-400 h-16 mb-6">
                            {offer.description}
                        </p>
                        <Link to={'/available-cars'} data-discover="true">
                            <button className="py-2 px-4 rounded font-semibold bg-gradient-to-r from-[#FF3600] to-[#ff3700d7] text-white hover:bg-gradient-to-l duration-300 border-none hover:scale-105 transition-transform">
                                {offer.buttonText}
                            </button>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LuxuryRides;
