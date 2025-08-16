import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import useAuth from "../hooks/useAuth";
import axiosClient from "../config/axios";
import Toast from "../components/Toast";
import ReturnBtn from "../components/ReturnBtn";

const Login = () => {
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });
    const [alert, setAlert] = useState({});
    const navigate = useNavigate();
    const { fetchUserProfile } = useAuth();

    const handleSubmit = async e => {
        e.preventDefault();

        const { email, password } = credentials;

        // Empty Field Validation
        if ([email, password].includes('')) {
            setAlert({ msg: 'All fields required', error: true });
            return;
        }

        // User Authentication
        try {
            const { data } = await axiosClient.post('/users/login', { email, password });
            localStorage.setItem('av_token', data.token);

            // Update auth
            await fetchUserProfile(data.token);

            // Redirect user after authentication
            navigate('/');
        } catch (error) {
            setAlert({
                msg: error.response?.data?.msg || 'Server did not respond properly',
                error: true
            })
        }
    }

    const { msg } = alert;

  return (
    <>
        { msg && <Toast alert={alert}/> }
        
        <div className="bg-[#2f3542] flex p-10 justify-center items-center text-center md:text-start md:h-screen md:w-1/2">
            <h1 className="text-gray-200 font-bold text-5xl">
                Login to <span className="text-cyan-600">Improve</span> your Experience with <span className="text-cyan-600">Ani</span>Verse
            </h1>
        </div>

        <div className="relative flex px-10 py-15 md:py-10 justify-center items-center md:h-screen md:w-1/2">
            <ReturnBtn destination={'Home'}/>
            <form className="w-full flex flex-col gap-3 bg-white p-5 shadow rounded-md" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-1">
                    <label className="font-semibold text-lg text-gray-800">Email</label>

                    <input 
                        type="text" 
                        placeholder="Email"
                        name="email"
                        className="border border-gray-500 rounded-sm px-2 py-1"
                        value={credentials.email}
                        onChange={e => setCredentials({
                            ...credentials,
                            [e.target.name] : e.target.value
                        })}
                    />
                </div>
                
                <div className="flex flex-col gap-1">
                    <label className="font-semibold text-lg text-gray-800">Password</label>

                    <input 
                        type="password" 
                        placeholder="Password"
                        name="password"
                        className="border border-gray-500 rounded-sm px-2 py-1"
                        value={credentials.password}
                        onChange={e => setCredentials({
                            ...credentials,
                            [e.target.name] : e.target.value
                        })}
                    />
                </div>

                <input 
                    type="submit" 
                    value="Login" 
                    className="font-semibold text-lg cursor-pointer w-full rounded-sm py-1 mt-3 text-white bg-cyan-800 hover:bg-cyan-700"
                />

                <nav className="flex justify-between">
                    <Link 
                        to="sign-up"
                        className="text-cyan-900 hover:text-cyan-700"
                    >
                        Don't have an account? Create One
                    </Link>

                    <Link 
                        to="forgot-password"
                        className="text-cyan-900 hover:text-cyan-700"
                    >
                        Forgot Password
                    </Link>
                </nav>
            </form>
        </div>
    </>
  )
}

export default Login