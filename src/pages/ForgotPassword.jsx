import { useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../config/axios";
import Toast from "../components/Toast";
import ReturnBtn from "../components/ReturnBtn";

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [alert, setAlert] = useState({});

    const handleSubmit = async e => {
        e.preventDefault();

        // Validate Empty Fields
        if (email.trim() === '') {
            setAlert({ msg: 'All fields required', error: true });
            resetAlert();
            return;
        }

        // Validate Email Address
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if ( !(emailRegex.test(email)) ) {
            setAlert({ msg: 'Invalid email address', error: true });
            resetAlert();
            return;
        }

        // Password Recovery Request
        try {
            const { data } = await axiosClient.post('/users/forgot-password', { email });
            setAlert({ msg: data.msg });
            setEmail('');
        } catch (error) {
            setAlert({ 
                msg: error.response?.data?.msg || 'Server did not respond properly',
                error: true 
            });
        }
    }

    const resetAlert = () => {
        setTimeout(() => {
            setAlert({});
        }, 3000);
    }

    const { msg } = alert;

  return (
    <>
        { msg && <Toast alert={alert}/> }

        <div className="bg-[#2f3542] flex p-10 justify-center items-center text-center md:text-start md:h-screen md:w-1/2">
            <h1 className="text-gray-200 font-bold text-5xl">
                Regain access to your <span className="text-cyan-600">Account</span> and keep track of your favorite <span className="text-cyan-600">Animes</span>
            </h1>
        </div>

        <div className="relative flex px-10 py-15 md:py-10 justify-center items-center md:h-screen md:w-1/2">
            <ReturnBtn destination={'Login'}/>

            <form className="w-full flex flex-col gap-3 bg-white p-5 shadow rounded-md" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-1">
                    <label className="font-semibold text-lg text-gray-800">Email</label>

                    <input 
                        type="text" 
                        placeholder="User Email"
                        name="email"
                        className="border border-gray-500 rounded-sm px-2 py-1"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>

                <input 
                    type="submit" 
                    value="Send Instructions" 
                    className="font-semibold text-lg cursor-pointer w-full rounded-sm py-1 mt-3 text-white bg-cyan-800 hover:bg-cyan-700"
                />

                <nav className="flex flex-col items-center gap-3 mt-2 md:mt-0 md:flex-row md:justify-between">
                    <Link 
                        to="/openid"
                        className="text-cyan-900 hover:text-cyan-700"
                    >
                        Already have an account? Login
                    </Link>

                    <Link 
                        to="/openid/sign-up"
                        className="text-cyan-900 hover:text-cyan-700"
                    >
                        Don't have an account? Create One
                    </Link>
                </nav>
            </form>
        </div>
    </>
  )
}

export default ForgotPassword