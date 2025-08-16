import useResults from "../hooks/useResults";
import useFavorites from "../hooks/useFavorites";

const Pagination = ({ section }) => {
    const resultsData = useResults();
    const favoritesData = useFavorites();

    const { totalPages, page, setPage } = section === 'homepage' ? resultsData : favoritesData;

    const createPagination = () => {
        let startPage;
        let endPage;

        if (totalPages < 10) {
            startPage = 1;
            endPage = totalPages;
        } else if (page <= 6) {
            startPage = 1;
            endPage = 10;
        } else {
            startPage = page - 5;
            endPage = page + 4;
        }

        // Make sure endPage doesn't exceed totalPages
        if (endPage > totalPages) {
            endPage = totalPages;
        }

        const buttons = [];

        for (let i = startPage; i <= endPage; i++) {
            buttons.push(
                <button
                    key={i}
                    className={`flex items-center justify-center rounded-full cursor-pointer bg-cyan-100 border text-cyan-700 font-bold text-sm w-8 h-8 md:text-normal md:w-10 md:h-10 hover:bg-sky-300 ${i === page ? "bg-sky-300" : ""}`}
                    onClick={() => {
                        setPage(i);
                        window.scrollTo({ top: 90, behavior: "smooth" });
                    }}
                >{i}</button>
            );
        }
        
        return buttons;
    }

  return (
    <div id="pagination" className="flex flex-col items-center gap-8 my-5 w-full">
        <div className="flex flex-wrap gap-3 md:gap-5">
            {createPagination()}
        </div>

        { totalPages > 10 ? (
            <button
                className="font-bold cursor-pointer w-fit rounded-md py-2 px-3 text-white text-sm bg-cyan-600 hover:bg-cyan-700 md:text-normal"
                onClick={() => {
                    setPage(1);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                }}
            >
                Back to Beginning
            </button>
        ) : null }
    </div>
  )
}

export default Pagination