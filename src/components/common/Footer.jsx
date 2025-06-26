import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-black text-gray-300 py-10">
            <div className="w-11/12 mx-auto flex flex-col md:flex-row justify-between gap-10">
                {/* Brand Section */}
                <div className="space-y-4 max-w-xs">
                    <h2 className="text-2xl font-bold text-white">
                        <span className="text-red-600">Uni</span>Drive
                    </h2>
                    <p className="text-sm">
                        Experience the ease and convenience of renting a car with UniDrive.
                    </p>
                </div>

                {/* Subscription Section */}
                <div className="space-y-4 max-w-sm">
                    <h4 className="text-white font-semibold text-lg">Stay Updated</h4>
                    <p className="text-sm">
                        Subscribe to get the latest cars and deals delivered to your inbox.
                    </p>
                    <form className="flex flex-col sm:flex-row items-center gap-3">
                        <input
                            type="email"
                            placeholder="Your E-mail"
                            className="input input-bordered w-full sm:w-auto flex-1 px-4 py-2 rounded focus:outline-none"
                            required
                        />
                        <button
                            type="submit"
                            className="bg-gradient-to-r from-[#FF3600] to-[#ff3700d7] text-white font-semibold px-5 py-2 rounded hover:scale-105 transition-transform"
                        >
                            Subscribe
                        </button>
                    </form>
                </div>

                {/* Contact Section */}
                <div className="space-y-4 max-w-xs">
                    <h4 className="text-white font-semibold text-lg">Contact Us</h4>
                    <p className="text-sm">Have a question? We&apos;re here to help.</p>
                    <p className="text-lg font-bold text-white">+8801608456891</p>
                    <div className="flex gap-4 text-2xl">
                        <FaInstagram className="cursor-pointer hover:text-pink-500" />
                        <FaFacebook className="cursor-pointer hover:text-blue-500" />
                        <FaTwitter className="cursor-pointer hover:text-sky-400" />
                    </div>
                </div>
            </div>

            {/* Bottom Line */}
            <div className="mt-10 border-t border-gray-700 pt-6 text-center text-xs text-gray-400">
                <p>© 2025 UniDrive. All Rights Reserved.</p>
                <p>Privacy Policy | Terms & Conditions</p>
            </div>
        </footer>
    );
};

export default Footer;
