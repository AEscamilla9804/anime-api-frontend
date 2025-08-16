import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axiosClient from "../config/axios";
import Toast from "../components/Toast";
import Tooltip from "../components/Tooltip";

const NewPassword = () => {
    const [credentials, setCredentials] = useState({
        password: '',
        repPassword: ''
    });

    const [alert, setAlert] = useState({});
    const [validToken, setValidToken] = useState(false);
    const [updatedPassword, setUpdatedPassword] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);

    const params = useParams();
    const { token } = params;

    // Token Validation
    useEffect(() => {
        const tokenValidation = async () => {
            try {
                await axiosClient(`/users/forgot-password/${token}`);
                setAlert({ msg: 'Valid Token. Set your new Password' });
                setValidToken(true);
            } catch (error) {
                setAlert({ msg: 'There was an error with the link', error: true });
                console.log(error);
            }
        }

        tokenValidation();
    }, [token]);

    const handleSubmit = async e => {
        e.preventDefault();

        const { password, repPassword } = credentials;

        // Empty Field Validation
        const emptyFields = Object.values(credentials).some(field => field.trim() === '');

        if (emptyFields) {
            setAlert({ msg: 'All fields required', error: true });
            return;
        }

        // Password Validation
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{6,}$/;
        
        if (password.trim() !== repPassword.trim()) {
            setAlert({ msg: 'Mismatched passwords', error: true });
            return;
        }

        if ( !(passwordRegex.test(password)) ) {
            setAlert({ msg: 'Password does not meet the requirements', error: true });
            return;
        }

        // Store New Password
        try {
            const url = `/users/forgot-password/${token}`;
            const { data } = await axiosClient.post(url, { password });
            setAlert({ msg: data.msg });
            setUpdatedPassword(true);
            setCredentials({
                password: '',
                repPassword: ''
            });
        } catch (error) {
            setAlert({ 
                msg: error.response?.data?.msg || 'Error changing password',
                error: true 
            });
        }
    }

    const { msg } = alert;
  return (
    <>
        { msg && <Toast alert={alert}/> }

        <div className="bg-[#2f3542] flex p-10 justify-center items-center text-center md:text-start md:h-screen md:w-1/2">
            <h1 className="text-gray-200 font-bold text-5xl">
                Set a new password for your <span className="text-cyan-600">Account</span>
            </h1>
        </div>

        <div className="relative flex px-10 py-15 md:py-10 justify-center items-center md:h-screen md:w-1/2">
            <form className="w-full flex flex-col gap-3 bg-white p-5 shadow rounded-md" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-1">
                    <label className="font-semibold text-lg text-gray-800">New Password</label>

                    <div className="relative w-full">
                        <input 
                            type="password" 
                            placeholder="New Password"
                            name="password"
                            className="border border-gray-500 rounded-sm px-2 py-1 w-full"
                            value={credentials.password}
                            onChange={e => setCredentials({
                                ...credentials,
                                [e.target.name] : e.target.value
                            })}
                            onFocus={() => setShowTooltip(true)}
                            onBlur={() => setShowTooltip(false)}
                        />

                        <Tooltip show={showTooltip} />
                    </div>
                </div>

                <div className="flex flex-col gap-1">
                    <label className="font-semibold text-lg text-gray-800">Repeat Password</label>

                    <input 
                        type="password" 
                        placeholder="Repeat Password"
                        name="repPassword"
                        className="border border-gray-500 rounded-sm px-2 py-1"
                        value={credentials.repPassword}
                        onChange={e => setCredentials({
                            ...credentials,
                            [e.target.name] : e.target.value
                        })}
                    />
                </div>

                <input 
                    type="submit" 
                    value="Change Password" 
                    className={`
                        font-semibold text-lg cursor-pointer w-full rounded-sm py-1 mt-3 text-white
                        ${validToken ? "bg-cyan-800 hover:bg-cyan-700" : "bg-gray-400 cursor-not-allowed" }
                    `}
                    disabled={!validToken}
                />

                {updatedPassword && (
                    <nav className="flex justify-between">
                        <Link 
                            to="/openid"
                            className="text-cyan-900 hover:text-cyan-700"
                        >
                            Back to Login
                        </Link>
                    </nav>
                )}
            </form>
        </div>
    </>
  )
}

export default NewPassword