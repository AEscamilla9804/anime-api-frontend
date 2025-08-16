import { useState, useEffect, createContext } from "react";
import axiosClient from "../config/axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    const [authLoading, setAuthLoading] = useState(true);

    const fetchUserProfile = async token => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            }    
            const { data } = await axiosClient('users/profile', config);
            setAuth(data);     
        } catch (error) {
            console.log(error.response?.data?.msg);
            setAuth({});
        }
    }

    const logout = () => {
        localStorage.removeItem('av_token');
        setAuth({});
    }

    const updateProfile = async userData => {
        const token = localStorage.getItem('av_token');

        if (!token) {
            setAuthLoading(false);
            return;
        }

        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }

        try {
            const url = `users/profile/${userData._id}`;
            const { data } = await axiosClient.put(url, userData, config);
            setAuth(userData);
            return { msg: data.msg, error: false };
        } catch (error) {
            return { msg: error.response?.data?.msg || 'An unexpected error occurred', error: true }
        }
    }

    const updatePassword = async password => {
        const token = localStorage.getItem('av_token');

        if (!token) {
            setAuthLoading(false);
            return;
        }

        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }
        
        try {
            const url = 'users/profile/change-password';
            const { data } = await axiosClient.put(url, password, config);
            return { msg: data.msg, error: false }
        } catch (error) {
            return { msg: error.response?.data?.msg || 'An unexpected error occurred', error: true }
        }
    }

    useEffect(() => {
        const authenticateUser = async () => {
            const token = localStorage.getItem('av_token');

            if (!token) {
                setAuth({});
                setAuthLoading(false);
                return;
            }

            await fetchUserProfile(token);
            setAuthLoading(false);
        }

        authenticateUser();
    }, [])

    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                authLoading,
                fetchUserProfile,
                logout,
                updateProfile,
                updatePassword
            }}
        >
            { children }
        </AuthContext.Provider>
    )
}

export { AuthProvider };
export default AuthContext;