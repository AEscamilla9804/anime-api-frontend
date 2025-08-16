import { useState } from "react"
import useAuth from "../hooks/useAuth"
import AdminNav from "../components/AdminNav"
import Toast from "../components/Toast"
import Tooltip from "../components/Tooltip"

const ChangePassword = () => {
  const [alert, setAlert] = useState({});
  const [showTooltip, setShowTooltip] = useState(false);
  const [password, setPassword] = useState({
    currentPassword: '',
    newPassword: ''
  });

  const { updatePassword } = useAuth();

  const resetForm = () => {
    setPassword({ currentPassword: '', newPassword: '' });
  }

  const handleSubmit = async e => {
    e.preventDefault();

    // Empty Field Validation
    const emptyFields = Object.values(password).some(field => field.trim() === '');

    if (emptyFields) {
      setAlert({ msg: 'All fields required', error: true });
      return;
    }

    // Password Validation
    const { currentPassword, newPassword } = password;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{6,}$/;

    if ( !( passwordRegex.test(newPassword) ) ) {
      setAlert({ msg: 'The new password does not meet all the requirements', error: true });
      return;
    }

    if (currentPassword === newPassword) {
      setAlert({ msg: 'The new password cannot be the same as the current one', error: true });
      return;
    }

    const response = await updatePassword(password);
    setAlert(response);
    resetForm();

    setTimeout(() => {
      setAlert({});
    }, 3000);
  }

  const { msg } = alert;

  return (
    <>
      { msg && <Toast alert={ alert }/>}

      <AdminNav section={'password'}/>

      <div className="flex flex-col gap-3 items-center">
        <h2 className="font-black text-3xl">Password Change</h2>
        <p className="text-xl">Update your <span className="text-cyan-600 font-bold">Password</span> here</p>
      </div>

      <form className="w-3/4 flex flex-col gap-3 bg-white p-5 shadow rounded-md md:w-1/2" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-1">
            <label className="font-semibold text-lg text-gray-800">Current Password</label>

            <input 
              type="password" 
              placeholder="Current password"
              name="currentPassword"
              className="border border-gray-500 rounded-sm px-2 py-1"
              value={password.currentPassword}
              onChange={e => setPassword({
                ...password,
                [e.target.name] : e.target.value
              })}
            />
        </div>

        <div className="flex flex-col gap-1">
          <label className="font-semibold text-lg text-gray-800">New Password</label>

          <div className="relative w-full">
            <input 
              type="password" 
              placeholder="New password"
              name="newPassword"
              className="border border-gray-500 rounded-sm px-2 py-1 w-full"
              value={password.newPassword}
              onChange={e => setPassword({
                ...password,
                [e.target.name] : e.target.value
              })}
              onFocus={() => setShowTooltip(true)}
              onBlur={() => setShowTooltip(false)}
            />

            <Tooltip show={showTooltip} />
          </div>
        </div>

        <input 
            type="submit" 
            value="Save Changes" 
            className="font-semibold text-lg cursor-pointer w-full rounded-sm py-1 mt-3 text-white bg-cyan-800 hover:bg-cyan-700"
        />
      </form>
    </>
  )
}

export default ChangePassword