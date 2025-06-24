import { useContext, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { authContext } from "../contexts/AuthProvider";
import ErrorToaster from "../components/common/ErrorToaster";

const Login = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const { signinUser, createGoogleAccount } = useContext(authContext);
    const navigate = useNavigate();
    const location = useLocation();

    const handleLoginForm = e => {
        e.preventDefault();

        const form = e.currentTarget;
        const formData = new FormData(form);

        const email = formData.get('email');
        const password = formData.get('password');

        console.log(email, password);

        signinUser(email, password)
            .then(userCredential => {
                const user = userCredential.user;
                console.log('Login done', user);
                navigate(location?.state ? location.state : '/');
            })
            .catch(error => {
                ErrorToaster("email or password is incorrect");
                console.error(error);
            })
    }

    const handleGoogleSignUp = () => {
        createGoogleAccount()
            .then(() => {
                console.log('Successfully create account with google');
                navigate(location?.state ? location.state : '/');
            })
            .catch(error => {
                console.error(error)
            })
    }

    const navigateToForgetPassword = () => {
        const emailInput = document.getElementById('email');
        navigate('/forget-password', {
            state: {
                email: emailInput.value
            }
        })
    }

    return (
        <div className="bg-[#191919] py-10">
            <Helmet>
                <title>Login | Uni Drive</title>
            </Helmet>
            <div className="w-full max-w-md mx-auto bg-[#060b17] p-8 space-y-3 rounded-xl">
                <h1 className="text-3xl font-bold text-center text-[#ff3700d7] ">Welcome Back</h1>
                <p className="text-center text-base-300 font-medium pb-5">Please enter your details to sign in</p>
                <form onSubmit={handleLoginForm} className="space-y-6">
                    <div className="space-y-1 text-sm">
                        <label htmlFor="email" className="block text-white font-bold">Email</label>
                        <input type="email" name="email" id="email" placeholder="Enter your email" className="w-full bg-[#1F2937] text-white px-4 py-3 rounded-md focus:border-red-600" />
                    </div>
                    <div className="space-y-1 text-sm">
                        <label htmlFor="password" className="block text-white font-bold">Password</label>
                        <input type="password" name="password" id="password" placeholder="Enter your password" className="w-full bg-[#1F2937] text-white px-4 py-3 rounded-md focus:border-red-600" />
                        <div onClick={navigateToForgetPassword} className="flex justify-end text-xs text-white">
                            <Link rel="noopener noreferrer" to={'/forget-password'}>Forgot Password?</Link>
                        </div>
                    </div>
                    <button className="block w-full p-3 text-center rounded-sm bg-gradient-to-r from-[#FF3600] to-[#ff3700d7] text-white font-bold hover:bg-gradient-to-l transition-all duration-300 border-none">Login</button>
                </form>
                <div className="flex items-center pt-4 space-x-1">
                    <div className="flex-1 h-px sm:w-16 bg-gray-300"></div>
                    <p className="px-3 text-sm text-white font-bold">Login with social accounts</p>
                    <div className="flex-1 h-px sm:w-16 bg-gray-300"></div>
                </div>
                <div className="flex justify-center space-x-4">
                    <button onClick={handleGoogleSignUp} aria-label="Login with Google" type="button" className="flex items-center justify-center w-full p-4 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 hover:border-gray-500">
                        <img className="w-5 h-5" src="https://neodrive-be91c.web.app/assets/google-Bp_336oh.png" alt="google logo" />
                        <p className="text-white font-bold">Login with Google</p>
                    </button>
                </div>
                <p className="text-xs text-white text-center sm:px-6">Don&apos;t have an account?
                    <Link to={'/register'} className="underline ml-1 text-red-600 font-bold">Register</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
