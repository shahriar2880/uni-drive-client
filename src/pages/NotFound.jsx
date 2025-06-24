import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <section className="flex items-center h-full p-16 bg-black text-white">
            <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
                <div className="max-w-md text-center">
                    <h2 className="mb-8 font-extrabold text-9xl">
                        <span className="sr-only">Error</span>404
                    </h2>
                    <p className="text-2xl font-semibold md:text-3xl">Sorry, we couldn't find this page.</p>
                    <p className="mt-4 mb-8 text-gray-300">But don&apos;t worry, you can find plenty of other things on our homepage.</p>
                    <Link to={'/'}>
                        <button className="mt-6 px-6 py-3 font-semibold bg-gradient-to-r from-[#FF3600] to-[#ff3700d7] text-white hover:bg-gradient-to-l  duration-300 border-none rounded-lg hover:scale-105 transition-transform text-sm md:text-base lg:text-lg">Back to homepage</button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default NotFound;