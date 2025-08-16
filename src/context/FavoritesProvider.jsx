import { createContext, useState, useEffect } from "react";
import axiosClient from "../config/axios";
import useAuth from "../hooks/useAuth";

const FavoritesContext = createContext();

const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const { auth, authLoading } = useAuth();

    useEffect(() => {
        if (authLoading) return;

        if (!auth?.user?._id) {
            setFavorites([]);
            setLoading(false);
            return;
        }

        fetchFavorites(page);
    }, [auth, page, authLoading]);

   const fetchFavorites = async (pageNum) => {
        const token = localStorage.getItem('av_token');
        if (!token) {
            setFavorites([]);
            setLoading(false);
            return;
        }

        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            };

            const { data } = await axiosClient.get(`/favorites/fetch?page=${pageNum}&limit=10`, config);

            setFavorites(data.favorites);
            setTotalPages(data.totalPages);
            setPage(data.currentPage);
        } catch (error) {
            console.log(error.response?.data?.msg);
            setFavorites([]);
        } finally {
            setLoading(false);
        }
    }

    const addFavorite = async anime => {
        const token = localStorage.getItem('av_token');
        if (!token) return { error: true, msg: "Not authenticated" };

        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            };

            const { data } = await axiosClient.post('/favorites/add', anime, config);

            // Update favorite state
            const updatedList = [...favorites, anime ];
            setFavorites(updatedList);

            return { msg: data.msg, error: false }
        } catch (error) {
            return { msg: error.response?.data?.msg || 'Unable to add to favorites'};
        }
    }

    const deleteFavorite = async mal_id => {
        const token = localStorage.getItem('av_token');
        if (!token) return { error: true, msg: "Not authenticated" };

        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            };

            const { data } = await axiosClient.delete(`/favorites/delete/${mal_id}`, config);

            // Update favorite state
            const updatedList = favorites.filter(fav => fav.mal_id !== mal_id);
            setFavorites(updatedList);
            
            return { msg: data.msg, error: false };
        } catch (error) {
            return { msg: error.response?.data?.msg || 'Unable to remove from favorites'};
        }
    }

    return (
        <FavoritesContext.Provider
            value={{
                favorites, 
                loading,
                setFavorites, 
                addFavorite,
                deleteFavorite,
                page, setPage,
                totalPages
            }}
        > 
            { children }
        </FavoritesContext.Provider>
    )
}

export { FavoritesProvider };
export default FavoritesContext;