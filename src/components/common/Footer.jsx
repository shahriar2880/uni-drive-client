import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => {
    return (
        <div className="bg-black text-gray-300 py-8">
            <div className='flex flex-col md:flex-row justify-evenly gap-6 w-11/12 mx-auto'>
                <div className='space-y-3'>
                    <div className='flex items-center gap-1'>
                        <h2 className='text-2xl font-bold text-white'><span className='text-red-600'>Uni</span>Drive</h2>
                    </div>
                    <p className='text-sm'>Experience the ease and convenience of renting a car with Rent Ride..</p>
                </div>
                <div className='space-y-3'>
                    <h4 className='text-white font-medium'>Stay Updated</h4>
                    <p className='text-sm'>Subscribe to get the latest cars and deals delivered to your inbox.</p>
                    <fieldset className="form-control w-80">
                        <div className="join">
                            <input
                                type="text"
                                placeholder="Your E-mail"
                                className="input input-bordered join-item" />
                            <button className="bg-gradient-to-r from-[#FF3600] to-[#ff3700d7]  text-white font-semibold py-2 px-4 rounded">Subscribe</button>
                        </div>
                    </fieldset>
                </div>
                <div className='space-y-3'>
                    <h4 className='text-white font-medium'>Contact Us</h4>
                    <p className='text-sm'>Have a question? We&apos;re here to help.</p>
                    <h3 className='text-white text-lg font-bold'>+8801608456891</h3>
                    <div className='flex items-center gap-4 text-2xl'>
                        <FaInstagram className='cursor-pointer hover:text-[#E1713B]' />
                        <FaFacebook className='cursor-pointer hover:text-sky-500' />
                        <FaTwitter className='cursor-pointer hover:text-sky-500' />
                    </div>
                </div>
            </div>
            <div>
                <div className='border border-t-white mt-3'></div>
                <div className='w-11/12 mx-auto text-center pt-6 space-y-2'>
                    <p className='text-xs '>© 2025 UniDrive. All Rights Reserved.</p>
                    <p className='text-xs '>Privacy | PolicyTerms | Conditions</p>
                </div>
            </div>
        </div>
    );
};

export default Footer;
