import useResults from "../hooks/useResults";

const Filters = () => {
    const { type, setType, score, setScore, status, setStatus, setPage } = useResults();

    const handleTypeChange = e => setType(e.target.value);
    const handleScoreChange = e => setScore(e.target.value);
    const handleStatusChange = e => setStatus(e.target.value);

    const resetFilters = () => {
        setType('');
        setScore('');
        setStatus('');
        setPage(1);
    }

  return (
    <div className="flex w-full items-center justify-center px-5 gap-5 md:justify-center md:gap-20">
        <div className="flex flex-col gap-1">
            <label htmlFor="type" className="font-semibold">Type</label>
            <select 
                name="type" 
                id="type"
                value={type}
                className="bg-white rounded-sm w-20 md:w-35 font-light shadow-sm"
                onChange={e => handleTypeChange(e)}
            >
                <option value="">Selection</option>
                <option value="tv">Anime</option>
                <option value="movie">Movie</option>
                <option value="ova">OVA</option>
            </select>
        </div>

        <div className="flex flex-col">
            <label htmlFor="score" className="font-semibold">Score</label>
            <select 
                name="score" 
                id="score"
                value={score}
                className="bg-white rounded-sm w-20 md:w-35 font-light shadow-sm"
                onChange={e => handleScoreChange(e)}
            >
                <option value="">Selection</option>
                <option value="9">&gt; 9</option>
                <option value="8">&gt; 8</option>
                <option value="7">&gt; 7</option>
            </select>
        </div>
        
        <div className="flex flex-col">
            <label htmlFor="status" className="font-semibold">Status</label>
            <select 
                name="status" 
                id="status"
                value={status}
                className="bg-white rounded-sm w-20 md:w-35 font-light shadow-sm"
                onChange={e => handleStatusChange(e)}
            >
                <option value="">Selection</option>
                <option value="airing">On Air</option>
                <option value="complete">Finished</option>
            </select>
        </div>

        <div className="flex flex-col items-center">
            <label htmlFor="reset" className="font-semibold">Reset</label>
            <button
                className="cursor-pointer"
                onClick={resetFilters}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-arrow-counterclockwise text-cyan-600" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2z"/>
                    <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466"/>
                </svg>
            </button>
        </div>
    </div>
  )
}

export default Filters