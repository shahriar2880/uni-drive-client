import SectionTitle from "../common/SectionTitle";

const services = [
    { icon: "🚗", title: "Wide Variety of Cars", description: "From budget-friendly options to luxury vehicles, we have something for everyone." },
    { icon: "💰", title: "Affordable Prices", description: "Competitive daily rates you can count on, without hidden fees." },
    { icon: "🖱️", title: "Easy Booking Process", description: "Seamlessly book your ride in just a few clicks with our user-friendly interface." },
    { icon: "📞", title: "Customer Support", description: "Enjoy 24/7 assistance for all your queries, ensuring a hassle-free experience." }
];

const ServiceCard = ({ icon, title, description }) => (
    <div className="bg-[#1E2325] p-4 rounded-lg shadow-md text-center transition-transform duration-500 ease-in-out transform hover:scale-110" data-aos="fade-up">
        <div className="text-4xl mb-4">{icon}</div>
        <h3 className="text-lg font-semibold mb-2 text-base-300">{title}</h3>
        <p className="text-sm text-gray-400">{description}</p>
    </div>
);

const RentalService = () => {
    return (
        <div>
            <SectionTitle title="Our Services" description="Explore our wide range of rental services" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-7 w-4/5 mx-auto mb-20">
                {services.map((service, index) => (
                    <ServiceCard key={index} {...service} />
                ))}
            </div>
        </div>
    );
};

export default RentalService;
