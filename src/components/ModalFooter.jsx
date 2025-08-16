import useResults from "../hooks/useResults";
import useAuth from "../hooks/useAuth";
import FavoriteBtn from "./FavoriteBtn";

const ModalFooter = ({ section, setAlert }) => {
    const { anime, setAnime, setModalView } = useResults();
    const { auth } = useAuth();
    const id = anime.mal_id;
    const isLoggedIn = auth && Object.keys(auth).length > 0;

    const resetModal = () => {
        setModalView(false);
        setAnime({});
    }

    const resetAlert = () => {
        setTimeout(() => {
            setAlert({});
        }, 3000);
    }

  return (
    <div
        id="modal-footer"
        className="w-full flex justify-between mt-[0.75rem] gap-2"
    >
        { !isLoggedIn ? (
            <button
                onClick={ () => {
                    setAlert({ msg: 'You must be logged in to add favorites', error: true });
                    resetAlert();
                }}
                className="w-1/2 rounded-md py-2 text-lg font-bold bg-gray-400 text-gray-200 cursor-pointer hover:bg-gray-400"
                 key={id}
            >
                Add to Favorites
            </button>  
        ) : (
            <FavoriteBtn anime={ anime } section={ section } setAlert={ setAlert }/>
        )}

        <button
            className="w-1/2 bg-cyan-700 rounded-md cursor-pointer py-2 text-gray-200 md:text-lg font-bold hover:bg-cyan-600"
            onClick={() => resetModal()}
        >
            Close
        </button>
    </div>
  )
}

export default ModalFooter