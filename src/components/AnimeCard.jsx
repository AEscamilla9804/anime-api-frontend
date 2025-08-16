import useResults from "../hooks/useResults"

const AnimeCard = ({ anime, section }) => {
  const { status, images, img, title, rank, score, episodes, mal_id } = anime;

  let imageWebp;
  
  section === 'homepage'
    ? imageWebp = images.webp.image_url
    : imageWebp = img;

  const { fetchAnimeById } = useResults();

  return (
    <div className="flex items-center w-full gap-5 bg-white rounded-md p-3 shadow-sm md:w-3/7">
      <img 
        src={imageWebp} 
        alt="{anime.title} Poster"
        className="h-45 w-30 rounded-sm" 
      />

      <div id="summary" className="flex flex-col gap-1 justify-center">
        { status === 'Currently Airing' ? (
          <p className="text-sm font-semibold text-cyan-600 bg-cyan-100 border rounded-sm py-2 px-3 w-fit">On Air</p>
        ) : (
          <p className="text-sm font-semibold text-red-500 bg-red-100 border rounded-sm py-2 px-3 w-fit">Finished</p>
        )}

        <p className="font-bold text-cyan-700">{title}</p>

        { episodes !== null ? (
          <p className="font-light text-sm">{episodes} episodes</p>
        ) : (
          <p className="font-light text-sm">TBA</p>
        )}

        <div id="user-opinion" className="flex gap-3">
          <div id="score" className="flex gap-1 items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star text-sky-600" viewBox="0 0 16 16">
              <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z"/>
            </svg>
            <p className="font-semibold text-sm">{score}</p>
          </div>

          <div id="rank" className="flex gap-1 items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-hash text-sky-600" viewBox="0 0 16 16">
              <path d="M8.39 12.648a1 1 0 0 0-.015.18c0 .305.21.508.5.508.266 0 .492-.172.555-.477l.554-2.703h1.204c.421 0 .617-.234.617-.547 0-.312-.188-.53-.617-.53h-.985l.516-2.524h1.265c.43 0 .618-.227.618-.547 0-.313-.188-.524-.618-.524h-1.046l.476-2.304a1 1 0 0 0 .016-.164.51.51 0 0 0-.516-.516.54.54 0 0 0-.539.43l-.523 2.554H7.617l.477-2.304c.008-.04.015-.118.015-.164a.51.51 0 0 0-.523-.516.54.54 0 0 0-.531.43L6.53 5.484H5.414c-.43 0-.617.22-.617.532s.187.539.617.539h.906l-.515 2.523H4.609c-.421 0-.609.219-.609.531s.188.547.61.547h.976l-.516 2.492c-.008.04-.015.125-.015.18 0 .305.21.508.5.508.265 0 .492-.172.554-.477l.555-2.703h2.242zm-1-6.109h2.266l-.515 2.563H6.859l.532-2.563z"/>
            </svg>
            <p className="font-semibold text-sm">{rank}</p>
          </div>
        </div>

        <button
          className="font-semibold cursor-pointer self-start w-fit rounded-sm py-1 px-2 mt-2 text-white bg-cyan-700 hover:bg-cyan-600"
          onClick={ () => fetchAnimeById(mal_id) }
        >
          More Details
        </button>
      </div>
    </div>
  )
}

export default AnimeCard