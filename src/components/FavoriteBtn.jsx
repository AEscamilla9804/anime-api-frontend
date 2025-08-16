import useFavorites from "../hooks/useFavorites";
import useResults from "../hooks/useResults";
import { useRef } from "react";

const FavoriteBtn = ({ anime, section, setAlert }) => {
    const { favorites, addFavorite, deleteFavorite } = useFavorites();
    const { setModalView } = useResults();
    const { mal_id, images, title, rank, score, episodes, status } = anime;

    const imageWebp = images.webp.image_url;
    const isFavorite = favorites.some(fav => fav.mal_id === mal_id);

    const alertTimerRef = useRef(null);

    const resetAlert = (newAlert) => {
        if (alertTimerRef.current) {
            clearTimeout(alertTimerRef.current);
        }

        setAlert(newAlert);

        alertTimerRef.current = setTimeout(() => {
            setAlert({});
            alertTimerRef.current = null;
        }, 3000);
    }

    const handleFavoriteAction = async action => {
        if (section === 'homepage') {
            const result = action === 'add'
                ? await addFavorite({ mal_id, img: imageWebp, title, rank, score, episodes, status })
                : await deleteFavorite( mal_id );

            resetAlert({ msg: result.msg, error: result.error });
        } else {
            const result = await deleteFavorite( mal_id );
            resetAlert({ msg: result.msg, error: result.error });
            setModalView(false);
        }
    }

  return (
    <>
        <button
            onClick={() => handleFavoriteAction(isFavorite ? 'remove' : 'add')}
            className="w-1/2 rounded-md py-2 text-lg font-bold bg-cyan-700 text-gray-200 cursor-pointer hover:bg-cyan-600"
        >
            {isFavorite ? "Eliminate from Favorites" : "Add to Favorites"}
        </button>
    </>
  )
}

export default FavoriteBtn