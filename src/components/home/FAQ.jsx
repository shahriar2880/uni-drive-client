import { useState } from "react";
import { FaAsterisk } from "react-icons/fa";

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const faqData = [
        {
            question: "What Do I Need To Rent A Car?",
            answer: "Explore our diverse selection of high-end vehicles, choose your preferred pickup and return dates, and select a location that best fits your needs.",
        },
        {
            question: "How Old Do I Need To Be To Rent A Car?",
            answer: "The minimum age to rent a car varies by location, but typically you must be at least 21 years old. Additional fees may apply for drivers under 25.",
        },
        {
            question: "Can I Rent A Car With A Debit Card?",
            answer: "Most rental locations require a credit card for security deposits, but some may accept debit cards with additional verification.",
        }
    ];

    return (
        <section className="bg-[#191919] py-16 px-6 md:px-12">
            <div className="flex flex-col lg:flex-row-reverse items-center gap-12 w-11/12 mx-auto">
                {/* Text and FAQ Section */}
                <div className="text-white lg:w-1/2">
                    <h4 className="flex items-center gap-2 text-[#FF3600] font-semibold text-lg mb-4">
                        <FaAsterisk className="text-sm" /> Frequently Asked Questions
                    </h4>
                    <h2 className="text-4xl font-bold leading-tight mb-10">
                        Everything you need to <br /> know about <br /> our services
                    </h2>

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
                <div data-aos="fade-left">
                    {/* Car Image */}
                    <img src="https://demo.awaikenthemes.com/novaride/dark/wp-content/uploads/2024/08/our-faqs-car-img.png"
                        alt="Luxury Car"
                        className="relative z-10"
                    />
                </div>
            </div>
        </section>
    );
};

export default FAQ;