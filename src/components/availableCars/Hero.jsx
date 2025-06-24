import { Typewriter } from 'react-simple-typewriter'

const Hero = () => {
    return (
        <div className="hero min-h-screen relative">
            <video
                className="absolute w-full h-full object-cover"
                src="/Videos/car1.mp4"
                autoPlay
                loop
                muted
            ></video>
            <div className="absolute inset-0 bg-black bg-opacity-60"></div>
            <div className="hero-content text-white text-center relative z-20">
                <div className="">
                    <p className="text-[#FF3600] font-bold text-lg">★  Welcome To Car Rent</p>
                    <h1 className="mb-5 md:mb-8 text-5xl md:text-6xl font-bold">
                        <Typewriter
                            words={["Explore Our Available Cars"]}
                            loop={5}
                            cursor
                            cursorStyle='_'
                            typeSpeed={70}
                            deleteSpeed={50}
                            delaySpeed={1000}

                        />
                    </h1>
                    <p className="mb-5 text-lg">
                        Browse through our wide selection of cars, ready to rent at affordable prices <br /> with convenient availability and locations.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Hero;