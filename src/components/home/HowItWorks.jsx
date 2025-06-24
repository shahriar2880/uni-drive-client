import { useState } from "react";
import { FaAsterisk } from "react-icons/fa";

const HowItWorks = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const faqData = [
  {
    question: "1. Explore & Choose",
    answer: "Browse our wide range of premium vehicles. Set your desired pickup and drop-off dates, and pick a convenient location that suits your travel plans.",
  },
  {
    question: "2. Reserve with Ease",
    answer: "Select your ideal car and complete your booking by entering the required information. Receive instant confirmation for a hassle-free experience.",
  },
  {
    question: "3. Drive & Enjoy",
    answer: "Pick up your car on the scheduled date and hit the road with confidence. Experience comfort, style, and reliability every mile of the way.",
  }
];

    

    return (
        <section className="bg-[#191919] py-16 px-6 md:px-12">
            <div data-aos="fade-up" className="flex flex-col lg:flex-row items-center gap-20 w-11/12 mx-auto">
                {/* Text and FAQ Section */}
                <div className="text-white lg:w-1/2">
                    <h4 className="flex items-center gap-2 text-[#FF3600] font-semibold text-lg mb-4">
                        <FaAsterisk className="text-sm" /> How It Work
                    </h4>
                    <h2 className="text-4xl font-bold leading-tight mb-4">
                        Streamlined processes for a hassle-free experience
                    </h2>
                    <p className="text-gray-300 mb-4">Our streamlined process ensures a seamless car rental experience from start to finish. With easy online booking, flexible pick-up and drop-off options.</p>

                    {/* FAQ Section */}
                    <div className="space-y-4">
                        {faqData.map((faq, index) => (
                            <div key={index} className="border-b border-gray-700">
                                <button
                                    className="flex justify-between items-center w-full py-5 text-lg font-medium text-white focus:outline-none"
                                    onClick={() => toggleFAQ(index)}
                                >
                                    <span>{faq.question}</span>
                                    <svg
                                        className={`w-5 h-5 transition-transform ${openIndex === index ? "rotate-180" : ""}`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                <div className={`overflow-hidden transition-all duration-300 ${openIndex === index ? "max-h-40" : "max-h-0"}`}>
                                    <p className="text-gray-400 pb-5">{faq.answer}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Image Section */}
                <div>
                    {/* Car Image */}
                    <img src="https://demo.awaikenthemes.com/novaride/dark/wp-content/uploads/2024/08/about-img-1.jpg"
                        alt="Luxury Car"
                        className="relative z-10 rounded-[150px]"
                    />
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;