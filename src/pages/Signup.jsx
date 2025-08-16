import { Link } from "react-router-dom";
import { useState } from "react";
import axiosClient from "../config/axios";
import Tooltip from "../components/Tooltip";
import Toast from "../components/Toast";
import ReturnBtn from "../components/ReturnBtn";

const Signup = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    repPassword: ''
  });

  const [showTooltip, setShowTooltip] = useState(false);

  const [alert, setAlert] = useState({});

  const resetForm = () => {
    setUserData({ name: '', email: '', password: '', repPassword: '' });
  }

  const handleSubmit = async e => {
    e.preventDefault();

    const { name, email, password, repPassword } = userData;

    // Empty Field Validation
    const emptyFields = Object.values(userData).some(field => field.trim() === '');

    if (emptyFields) {
      setAlert({ msg: 'All fields required', error: true });
      return;
    }

    // Email Validation (User Input is an actual email --> email@email.com)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if ( !(emailRegex.test(email)) ) {
      setAlert({ msg: 'Invalid email address', error: true });
      return;
    }

    // Password Validation (6 char min, at least one lowercase, one uppercase, one digit and one special char)
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{6,}$/;

    if (password !== repPassword) {
      setAlert({ msg: 'Mismatched passwords', error: true });
      return;
    }

    if ( !( passwordRegex.test(password) ) ) {
      setAlert({ msg: 'Password does not meet requirements', error: true });
      return;
    }

    // Create user in the Database
    try {
      await axiosClient.post('/users/sign-up', { name, email, password });
      setAlert({ msg: 'Account creation successful. Visit your email for instructions'});
      resetForm();
    } catch (error) {
      setAlert({ 
        msg: error.response?.data?.msg || 'Server did not respond properly',
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
              Create an <span className="text-cyan-600">Account</span> and Join the <span className="text-cyan-600">Ani</span>Verse Community
          </h1>
      </div>

      <div className="relative flex px-10 py-15 md:py-10 justify-center items-center md:h-screen md:w-1/2">
        <ReturnBtn destination={'Home'}/>

        <form className="w-full flex flex-col gap-3 bg-white p-5 shadow rounded-md" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1">
            <label className="font-semibold text-lg text-gray-800">Name</label>

            <input 
                type="text" 
                placeholder="Name"
                name="name"
                className="border border-gray-500 rounded-sm px-2 py-1"
                value={userData.name}
                onChange={e => setUserData({
                  ...userData,
                  [e.target.name] : e.target.value
                })}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-semibold text-lg text-gray-800">Email</label>

            <input 
                type="text" 
                placeholder="Email"
                name="email"
                className="border border-gray-500 rounded-sm px-2 py-1"
                value={userData.email}
                onChange={e => setUserData({
                  ...userData,
                  [e.target.name] : e.target.value
                })}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-semibold text-lg text-gray-800">Password</label>

            <div className="relative w-full">
              <input 
                type="password" 
                placeholder="Password"
                name="password"
                className="border border-gray-500 rounded-sm px-2 py-1 w-full"
                value={userData.password}
                onChange={e => setUserData({
                  ...userData,
                  [e.target.name] : e.target.value
                })}
                onFocus={() => setShowTooltip(true)}
                onBlur={() => setShowTooltip(false)}
              />

              <Tooltip show={showTooltip} />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-semibold text-lg text-gray-800">Confirm Password</label>

            <input 
                type="password" 
                placeholder="Password"
                name="repPassword"
                className="border border-gray-500 rounded-sm px-2 py-1"
                value={userData.repPassword}
                onChange={e => setUserData({
                  ...userData,
                  [e.target.name] : e.target.value
                })}
            />
          </div>

          <input 
              type="submit" 
              value="Create Account" 
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
                  to="/openid/forgot-password"
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

export default Signup