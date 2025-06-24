import { useContext, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { authContext } from "../contexts/AuthProvider";
import { updateProfile } from "firebase/auth";
import { useForm } from "react-hook-form";

const Register = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const { createUser } = useContext(authContext);
    const navigate = useNavigate();
    const location = useLocation();

    const onSubmit = async (data) => {
        const { name, email, password, photoUrl } = data;

        try {
            // Create the user with email and password
            const userCredential = await createUser(email, password);
            const user = userCredential.user;

            // Update the user's profile with displayName and photoURL
            await updateProfile(user, {
                displayName: name,
                photoURL: photoUrl,
            });

            // Show success message
            Swal.fire({
                title: "Account Created",
                text: "Your account has been successfully created!",
                icon: "success",
                confirmButtonText: "OK",
            });

            // Navigate to the previous page or home
            navigate(location?.state?.from || "/");
            reset(); // Reset the form
        } catch (error) {
            console.error("Error during registration:", error);

            // Show error message
            Swal.fire({
                title: "Error",
                text: error.message || "Failed to create account. Please try again.",
                icon: "error",
                confirmButtonText: "Close",
                confirmButtonColor: "#d33",
            });
        }
    };

    return (
        <div className="bg-[#191919] py-10">
            <Helmet>
                <title>Register | Uni Drive</title>
            </Helmet>
            <div className="w-full max-w-md mx-auto bg-[#060b17] p-8 space-y-3 rounded-xl">
                <h1 className="text-3xl font-bold text-center text-[#ff3700d7]">
                    Create an account
                </h1>
                <p className="text-center text-base-300 font-medium pb-5">
                    Please fill in your details to create an account
                </p>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Name */}
                    <div className="space-y-1 text-sm">
                        <label htmlFor="name" className="block text-white font-bold">
                            Name
                        </label>
                        <input
                            {...register("name", {
                                required: "Name is required",
                            })}
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Enter your name"
                            className="w-full bg-[#1F2937] text-white px-4 py-3 rounded-md focus:border-red-600"
                        />
                        {errors.name && (
                            <span className="text-red-500">{errors.name.message}</span>
                        )}
                    </div>

                    {/* Photo URL */}
                    <div className="space-y-1 text-sm">
                        <label htmlFor="photoUrl" className="block text-white font-bold">
                            Photo URL
                        </label>
                        <input
                            {...register("photoUrl", {
                                required: "Photo URL is required",
                            })}
                            type="url"
                            name="photoUrl"
                            id="photoUrl"
                            placeholder="Enter your photo URL"
                            className="w-full bg-[#1F2937] text-white px-4 py-3 rounded-md focus:border-red-600"
                        />
                        {errors.photoUrl && (
                            <span className="text-red-500">{errors.photoUrl.message}</span>
                        )}
                    </div>

                    {/* Email */}
                    <div className="space-y-1 text-sm">
                        <label htmlFor="email" className="block text-white font-bold">
                            Email
                        </label>
                        <input
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Please enter a valid email address",
                                },
                            })}
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Enter your email"
                            className="w-full bg-[#1F2937] text-white px-4 py-3 rounded-md focus:border-red-600"
                        />
                        {errors.email && (
                            <span className="text-red-500">{errors.email.message}</span>
                        )}
                    </div>

                    {/* Password */}
                    <div className="space-y-1 text-sm pb-2">
                        <label htmlFor="password" className="block text-white font-bold">
                            Password
                        </label>
                        <input
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message: "Password must be at least 6 characters long",
                                },
                            })}
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Enter your password"
                            className="w-full bg-[#1F2937] text-white px-4 py-3 rounded-md focus:border-red-600"
                        />
                        {errors.password && (
                            <span className="text-red-500">{errors.password.message}</span>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="block w-full p-3 text-center rounded-sm bg-gradient-to-r from-[#FF3600] to-[#ff3700d7] text-white font-bold hover:bg-gradient-to-l transition-all duration-300 border-none"
                        aria-label="Register"
                    >
                        Register
                    </button>
                </form>
                <p className="text-xs text-white text-center sm:px-6">
                    Already have an account?
                    <Link
                        to="/login"
                        className="underline ml-1 text-red-600 font-bold"
                        aria-label="Login"
                    >
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;