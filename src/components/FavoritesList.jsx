import useFavorites from "../hooks/useFavorites";
import AnimeCard from "./AnimeCard";

const FavoritesList = () => {
  const { favorites } = useFavorites();
  
  return (
    <div id="favorites" className="flex flex-col gap-5 w-[90%] md:w-full md:flex-row md:flex-wrap md:justify-center md:items-center">
        { favorites.map(anime => (
            <AnimeCard
                key={anime.mal_id}
                anime={anime}
                section={'favorites'}
            />
        )) }
    </div>
  )
}

export default FavoritesList