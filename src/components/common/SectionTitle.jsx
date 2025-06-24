import { FaAsterisk } from "react-icons/fa";

const SectionTitle = ({ title, description }) => {
    return (
        <div data-aos="zoom-in-up" className="w-11/12 md:w-1/2 mx-auto pt-20">
            <h4 className="flex justify-center items-center gap-1 font-bold text-[#FF3600] text-center mb-5">
                <FaAsterisk /> {title}
            </h4>
            <h2 className="text-white text-4xl text-center font-bold mb-12">
                {description}
            </h2>
        </div>
    );
};

export default SectionTitle;