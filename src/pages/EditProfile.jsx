import { useState, useEffect } from "react";
import AdminNav from "../components/AdminNav"
import useAuth from "../hooks/useAuth"
import Toast from "../components/Toast";

const EditProfile = () => {
  const { auth, updateProfile } = useAuth();

  const [profile, setProfile] = useState({});
  const [alert, setAlert] = useState({});

  useEffect(() => {
    setProfile(auth);
  }, [auth])

  const handleSubmit = async e => {
    e.preventDefault();

    // Empty field validation
    const { name, email } = profile;

    if ([name, email].includes('')) {
      setAlert({ msg: 'The Name and Email fields are required', error: true });
      return;
    }

    const response = await updateProfile(profile);
    setAlert(response);

    // Remove Alert from Screen
    setTimeout(() => {
      setAlert({});
    }, 3000);
  }
  
  const { msg } = alert;

  return (
    <>
      { msg && <Toast alert={alert}/> }

      <AdminNav section={'edit'}/>

      <div className="flex flex-col gap-3 items-center">
        <h2 className="font-black text-3xl">Edit Profile</h2>
        <p className="text-xl">Update your <span className="text-cyan-600 font-bold">Information</span> here</p>
      </div>

      <form className="w-3/4 flex flex-col gap-3 bg-white p-5 shadow rounded-md md:w-1/2" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-1">
            <label className="font-semibold text-lg text-gray-800">Name</label>

            <input 
              type="text" 
              placeholder="Name"
              name="name"
              value={profile.name || ''}
              onChange={e => setProfile({
                ...profile,
                [e.target.name] : e.target.value
              })}
              className="border border-gray-500 rounded-sm px-2 py-1"
            />
        </div>

        <div className="flex flex-col gap-1">
          <label className="font-semibold text-lg text-gray-800">Email</label>

          <input 
            type="text" 
            placeholder="Email"
            name="email"
            value={profile.email || ''}
            onChange={e => setProfile({
              ...profile,
              [e.target.name] : e.target.value
            })}
            className="border border-gray-500 rounded-sm px-2 py-1"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="font-semibold text-lg text-gray-800">Phone</label>

          <input 
            type="text" 
            placeholder="Phone"
            name="phone"
            value={profile.phone || ''}
            onChange={e => setProfile({
              ...profile,
              [e.target.name] : e.target.value
            })}
            className="border border-gray-500 rounded-sm px-2 py-1"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="font-semibold text-lg text-gray-800">Website</label>

          <input 
            type="text" 
            placeholder="Website"
            name="website"
            value={profile.website || ''}
            onChange={e => setProfile({
              ...profile,
              [e.target.name] : e.target.value
            })}
            className="border border-gray-500 rounded-sm px-2 py-1"
          />
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

export default EditProfile