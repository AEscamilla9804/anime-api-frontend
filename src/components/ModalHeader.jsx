import useResults from "../hooks/useResults";

const ModalHeader = () => {
    const { anime } = useResults();
    const { images, title, rank, score, episodes } = anime;
    const imageWebp = images.webp.image_url;

  return (
    <div id="modal-header" className="flex gap-8 items-center">
        <img 
            src={imageWebp} 
            className="h-[175px] w-[120px] md:h-[225px] md:w-[150px] rounded-md"
        />

        <div 
            id="anime-details"
            className="flex flex-col g-[1rem]"
        >
            <p className="text-[1.5rem] md:text-[2rem] font-bold text-cyan-700">{title}</p>
            <p className="font-light">{episodes} episodes</p>
            <div className="flex items-center gap-10 mt-4">
                <div className="flex flex-col items-center">
                    <p className="font-bold text-cyan-700">Score</p>
                    <p className="font-semibold">{score}</p>
                </div>

                <div className="flex flex-col items-center">
                    <p className="font-bold text-cyan-700">Ranked</p>
                    <p className="font-semibold">#{rank}</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ModalHeader