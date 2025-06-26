import { useContext, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { authContext } from '../../contexts/AuthProvider';
import { Tooltip } from 'react-tooltip';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user, signoutUSer } = useContext(authContext);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleSignout = () => {
        signoutUSer()
            .then(() => {
                console.log("Logout successful")
                navigate('/login');
            })
            .catch(error => {
                console.error(error);
            })
    }

    return (
        <nav className="bg-black w-full z-20 top-0 left-0 overflow-x-hidden">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <span className="self-center text-2xl font-bold whitespace-nowrap text-white"><span className='text-red-600'>Uni</span>Drive</span>
                </a>
                <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse items-center">
                    {
                        user ?
                            <div className='flex items-center gap-2 max-w-[100%] overflow-hidden shrink-0'>
                                <div className="avatar" data-tooltip-id="avatar-tooltip">
                                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full w-8 h-8 flex items-center justify-center ring-3 ring-red-500">
                                        <img className='w-full h-full rounded-full object-cover' src={`${user.photoURL}`} />
                                    </div>
                                </div>
                                <Tooltip className="z-10" id="avatar-tooltip">{user.displayName}</Tooltip>

                                <button onClick={handleSignout} className="btn btn-sm px-3 py-1 text-sm font-semibold bg-gradient-to-r from-[#FF3600] to-[#ff3700d7] text-white hover:bg-gradient-to-l transition-all duration-300 border-none">Logout</button>

                            </div>
                            :
                            <Link to={'/login'}>
                                <button className="btn btn-sm md:btn-md mr-2 bg-gradient-to-r from-[#FF3600] to-[#ff3700d7] text-white font-bold hover:bg-gradient-to-l transition-all duration-300 border-none">Login</button>
                            </Link>
                    }
                    <button onClick={toggleMenu} type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="navbar-sticky" aria-expanded={isOpen ? 'true' : 'false'}>
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                </div>
                <div className={`items-center justify-between ${isOpen ? 'flex' : 'hidden'} w-full md:flex md:w-auto md:order-1`} id="navbar-sticky">
                    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-700 rounded-lg bg-black md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
                        <li>
                            <NavLink
                                to="/"
                                className={({ isActive }) =>
                                    isActive
                                        ? "block py-2 px-3 text-white bg-red-600 rounded md:bg-transparent md:text-[#FF3500] md:p-0"
                                        : "block py-2 px-3 text-white rounded hover:bg-gray-700 md:hover:bg-transparent md:hover:text-[#FF3500] md:p-0"
                                }
                                aria-current="page"
                            >
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/available-cars"
                                className={({ isActive }) =>
                                    isActive
                                        ? "block py-2 px-3 text-white bg-red-600 rounded md:bg-transparent md:text-[#FF3500] md:p-0"
                                        : "block py-2 px-3 text-white rounded hover:bg-gray-700 md:hover:bg-transparent md:hover:text-[#FF3500] md:p-0"
                                }
                            >
                                Available Cars
                            </NavLink>
                        </li>
                        {
                            user &&
                            <>
                                <li>
                                    <NavLink
                                        to="/add-car"
                                        className={({ isActive }) =>
                                            isActive
                                                ? "block py-2 px-3 text-white bg-red-600 rounded md:bg-transparent md:text-[#FF3500] md:p-0"
                                                : "block py-2 px-3 text-white rounded hover:bg-gray-700 md:hover:bg-transparent md:hover:text-[#FF3500] md:p-0"
                                        }
                                    >
                                        Add Car
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/my-cars"
                                        className={({ isActive }) =>
                                            isActive
                                                ? "block py-2 px-3 text-white bg-red-600 rounded md:bg-transparent md:text-[#FF3500] md:p-0"
                                                : "block py-2 px-3 text-white rounded hover:bg-gray-700 md:hover:bg-transparent md:hover:text-[#FF3500] md:p-0"
                                        }
                                    >
                                        My Cars
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/my-bookings"
                                        className={({ isActive }) =>
                                            isActive
                                                ? "block py-2 px-3 text-white bg-red-600 rounded md:bg-transparent md:text-[#FF3500] md:p-0"
                                                : "block py-2 px-3 text-white rounded hover:bg-gray-700 md:hover:bg-transparent md:hover:text-[#FF3500] md:p-0"
                                        }
                                    >
                                        My Bookings
                                    </NavLink>
                                </li>
                            </>
                        }
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
