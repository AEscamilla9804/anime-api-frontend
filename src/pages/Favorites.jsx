import { useState } from "react";
import useFavorites from "../hooks/useFavorites"
import useResults from "../hooks/useResults";
import NoResults from "../components/NoResults";
import Spinner from "../components/Spinner";
import SectionTitle from "../components/SectionTitle";
import FavoritesList from "../components/FavoritesList";
import Pagination from "../components/Pagination";
import ModalView from "../components/ModalView";
import Toast from "../components/Toast";

const Favorites = () => {
  const { favorites, loading } = useFavorites();
  const { modalView } = useResults();

  const [alert, setAlert] = useState({});

  const { msg } = alert;

  return (
    <>
      { loading ? (
        <Spinner />
      ) : favorites.length > 0 ? (
        <>
          <SectionTitle type={ 'favorites' } />

          <FavoritesList />

          { favorites.length > 0 && <Pagination section={'favorites'} /> }

          { modalView && <ModalView section={'favorites'} setAlert={ setAlert }/> }

          { msg && <Toast alert={ alert } />}
        </>
      ) : (
        <NoResults section={'favorites'} />
      )}
    </>
  )
}

export default Favorites