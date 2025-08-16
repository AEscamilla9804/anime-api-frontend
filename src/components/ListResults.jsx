import useResults from "../hooks/useResults";
import Spinner from "./Spinner"
import NoResults from "./NoResults"
import AnimeCard from "./AnimeCard";

const ListResults = () => {
  const { results, loading } = useResults();

  return (
    <div id="results" className="flex flex-col gap-5 w-full md:flex-row md:flex-wrap md:justify-center md:items-center">
      { loading ? (
        <Spinner />
      ) : results.length > 0 ? (
        results
          .filter(anime => anime.synopsis !== null && anime.synopsis.trim() !== "")
          .map(anime => (
            <AnimeCard
              key={anime.mal_id}
              anime={anime}
              section={'homepage'}
            />
          ))
      ) : (
        <NoResults section={'homepage'}/>
      )}
    </div>
  );
}

export default ListResults