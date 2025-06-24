import SectionTitle from "../common/SectionTitle";

const drivers = [
    {
        name: "John Smith",
        title: "Senior Chauffeur",
        image: "https://img.freepik.com/free-photo/happy-smiling-man-sitting-inside-car-showing-thumbs-up-handsome-guy-excited-about-his-new-vehicle-positive-face-expression_231208-823.jpg?t=st=1738229156~exp=1738232756~hmac=1389d031a676f69ff6c17c6ed89970e26139b7801e407c7559d31f3f55ad897f&w=740",
        aos: "fade-right",
        delay: 0
    },
    {
        name: "Taylor Smith",
        title: "City Tour Guide",
        image: "https://img.freepik.com/free-photo/happy-car-driver-with-fastened-seat-belt_158595-4228.jpg?t=st=1738229225~exp=1738232825~hmac=aeea004202c41173e978745f6cd12fe4fd1ac9633559eb3db9c411a76710f623&w=740",
        aos: "fade-up",
        delay: 100
    },
    {
        name: "Jordan Drown",
        title: "Distance Driver",
        image: "https://img.freepik.com/free-photo/handsome-young-businessman-sits-steering-wheel-inside-car_8353-7204.jpg?t=st=1738229256~exp=1738232856~hmac=79869f6706f6f01cf8dc2322e39f471e1cac51ed92ff9309521340cb5f0cab46&w=740",
        aos: "fade-up",
        delay: 200
    },
    {
        name: "Davis Casey",
        title: "Travel Specialist",
        image: "https://img.freepik.com/free-photo/handsome-young-businessman-full-suit-smiling-while-driving-new-car_496169-594.jpg?t=st=1738229276~exp=1738232876~hmac=d280bea0cba627c20a12f6f24fb7cda1f54666438a7f7d8440003863af3de63a&w=740",
        aos: "fade-left",
        delay: 300
    },
    {
        name: "Morgan Lee",
        title: "Travel Consultant",
        image: "https://img.freepik.com/free-photo/smiley-delivery-man-signing-paper_23-2148546131.jpg?t=st=1738229301~exp=1738232901~hmac=f92f05cb97d912f9ad346e275f5a0943d508ea3965b6207d8f6f2bec0bb466d6&w=740",
        aos: "fade-right",
        delay: 300
    },
    {
        name: "Carlos Mendes",
        title: "Airport Transfer",
        image: "https://img.freepik.com/free-photo/car-technician-with-stethoscope-car-showroom_1303-17871.jpg?t=st=1738229320~exp=1738232920~hmac=8c236266c42123fa7167aa0e51f58adb4d9ca49a2686e512216d3f9192da89d4&w=740",
        aos: "fade-up",
        delay: 0
    },
    {
        name: "Riley Walker",
        title: "Executive Chauffeur",
        image: "https://img.freepik.com/free-photo/handsome-young-smiling-bearded-driver-full-suit-with-fastening-seat-belt-driving-new-white-car_496169-602.jpg?t=st=1738229347~exp=1738232947~hmac=687e72a7bce34b64c0c112f8abaed370d24364b6a1acfadf3ee79e3950ab6719&w=740",
        aos: "fade-up",
        delay: 300
    },
    {
        name: "Avery Hall",
        title: "Shuttle Driver",
        image: "https://img.freepik.com/free-photo/handsome-elegant-man-car-salon_1157-30136.jpg?t=st=1738229373~exp=1738232973~hmac=95a55b72c55d10cdda040148cdae8f6701375ce44b3cf3d54fe9dcbf74ffe0ba&w=740",
        aos: "fade-left",
        delay: 300
    }
];

const ExperiencedDrivers = () => {
    return (
        <div className="bg-[#191919] text-white pb-20 px-4 text-center">
            <SectionTitle title="Our Experienced Drivers" description="Ensuring your safety and comfort on every journey" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 cursor-pointer w-4/5 mx-auto">
                {drivers.map((driver, index) => (
                    <div key={index} className="rounded-lg p-4" data-aos={driver.aos} data-aos-delay={driver.delay}>
                        <img src={driver.image} alt={driver.name} className="rounded-lg w-full mb-4 hover:scale-105 transition-transform" />
                        <h3 className="text-lg font-semibold">{driver.name}</h3>
                        <p className="text-sm text-gray-400">{driver.title}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ExperiencedDrivers;
