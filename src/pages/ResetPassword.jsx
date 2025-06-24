import { useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import { authContext } from "../contexts/AuthProvider";
import { useLocation } from "react-router-dom";

const ResetPassword = () => {
    const { resetPassword } = useContext(authContext);
    const location = useLocation();
    const [email, setEmail] = useState(location?.state?.email || '');

    const handleResetPasswordForm = e => {
        e.preventDefault();

        const form = e.currentTarget;
        const formData = new FormData(form);

        const email = formData.get('email');

        resetPassword(email)
            .then(() => {
                console.log('Password reset email sent!');
            })
            .catch((error) => {
                console.error(error.message);
            });
    }

    return (
        <div className="bg-[#191919] py-10">
            <Helmet>
                <title>Reset Password | Uni Drive</title>
            </Helmet>
            <div className="w-full max-w-md mx-auto bg-[#060b17] p-8 space-y-3 rounded-xl">
                <h1 className="text-3xl font-bold text-center text-[#ff3700d7] ">Reset Password</h1>
                <p className="text-center text-base-300 font-medium pb-5">Enter your email address below to reset your password.</p>
                <form onSubmit={handleResetPasswordForm} className="space-y-6">
                    <div className="space-y-1 text-sm">
                        <label htmlFor="email" className="block text-white font-bold mb-2">Email Address</label>
                        <input onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" value={email} placeholder="Enter your email" className="w-full bg-[#1F2937] text-white px-4 py-3 rounded-md focus:border-red-600" />
                    </div>
                    <button className="block w-full p-2 text-center rounded-lg bg-gradient-to-r from-[#FF3600] to-[#ff3700d7] text-white font-bold hover:bg-gradient-to-l transition-all duration-300 border-none">Reset Password</button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;