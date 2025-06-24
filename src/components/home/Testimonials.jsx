import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import SectionTitle from "../common/SectionTitle";


const StarRating = ({ rating }) => {
    const totalStars = 5;
    const filledStars = Array(rating).fill("★");
    const emptyStars = Array(totalStars - rating).fill("★");

    return (
        <div className="flex items-center mb-2">
            {filledStars.map((star, idx) => (
                <span key={`filled-${idx}`} className="text-2xl text-[#ff3600]">{star}</span>
            ))}
            {emptyStars.map((star, idx) => (
                <span key={`empty-${idx}`} className="text-2xl text-gray-400">{star}</span>
            ))}
        </div>
    );
};

const Testimonials = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await fetch("/testimonials.json");
                const data = await response.json();
                setReviews(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchReviews();
    }, []);

    return (
        <div className="pb-16 relative">
            <SectionTitle title="Testimonials" description="What our customers are saying about us" />
            <div className="w-4/5 mx-auto my-10 relative">
                {/* Swiper Component */}
                <Swiper
                    slidesPerView={1}
                    spaceBetween={30}
                    pagination={{
                        clickable: true,
                        el: ".swiper-custom-pagination",
                        type: "bullets",
                        bulletClass: "custom-bullet",
                        bulletActiveClass: "custom-bullet-active",
                    }}
                    navigation={{
                        prevEl: ".swiper-custom-button-prev",
                        nextEl: ".swiper-custom-button-next",
                    }}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    breakpoints={{
                        640: {
                            slidesPerView: 1,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 30,
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 40,
                        },
                    }}
                    modules={[Pagination, Navigation, Autoplay]}
                    className="mySwiper"
                >
                    {reviews.map((review, idx) => (
                        <SwiperSlide key={idx}>
                            <div data-aos="zoom-in-up" className="block max-w-sm p-6 bg-[#191919] rounded-lg shadow-sm mb-4 transition-transform duration-500 ease-in-out transform hover:scale-110">
                                <div className="flex items-center mb-2">
                                    <StarRating rating={review.rating} />
                                </div>
                                <h5 className="mb-2 text-xs text-white h-32">{review.review}</h5>
                                <div className="border border-b-gray-900 mb-6"></div>
                                <figcaption className="flex items-center">
                                    <img className="rounded-full w-10 h-10" src={review.profile_picture} alt="" />
                                    <div className="space-y-0.5 font-medium text-left rtl:text-right ms-3">
                                        <h4 className="text-white">{review.name}</h4>
                                        <div className="text-xs text-white">{review.position}</div>
                                    </div>
                                </figcaption>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Custom Navigation Buttons */}
                <button className="swiper-custom-button-prev absolute top-1/2 -left-12 z-10 bg-[#FF3600] text-white w-10 h-10 rounded-full flex items-center justify-center transform -translate-y-1/2">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <button className="swiper-custom-button-next absolute top-1/2 -right-12 z-10 bg-[#FF3600] text-white w-10 h-10 rounded-full flex items-center justify-center transform -translate-y-1/2">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>

                {/* Custom Pagination */}
                <div className="swiper-custom-pagination flex justify-center gap-2 mt-8"></div>
            </div>

            {/* Add these styles to your CSS file */}
            <style>
                {`
                    .custom-bullet {
                        width: 24px;
                        height: 4px;
                        background: #333;
                        border-radius: 2px;
                        display: inline-block;
                        margin: 0 4px;
                        cursor: pointer;
                        transition: all 0.3s ease;
                    }
                    
                    .custom-bullet-active {
                        background: #FF3600;
                        width: 32px;
                    }
                    
                    .swiper-custom-button-prev,
                    .swiper-custom-button-next {
                        transition: all 0.3s ease;
                    }
                    
                    .swiper-custom-button-prev:hover,
                    .swiper-custom-button-next:hover {
                        background: #cc2b00;
                    }
                `}
            </style>
        </div>
    );
};

export default Testimonials;