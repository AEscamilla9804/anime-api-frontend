import { createContext, useState, useEffect } from "react";
import axiosClient from "../config/axios";

const ResultsContext = createContext();

const ResultsProvider = ({ children }) => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);

    const [anime, setAnime] = useState({});
    const [modalView, setModalView] = useState(false);

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [type, setType] = useState('');
    const [score, setScore] = useState('');
    const [status, setStatus] = useState('');

    useEffect(() => {
        const fetchAnimes = async () => {
            // Spinner will trigger during page changes
            setLoading(true);

            const config = {
                params: {
                    page,
                    limit: 10,
                    type,
                    min_score: score,
                    status
                }
            }

            try {
                const { data } = await axiosClient('/animes', config);
                setTotalPages(data.pagination.last_visible_page);
                setResults(data.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }

        fetchAnimes();
    }, [page, type, score, status]);

    const fetchAnimeById = async id => {
        try {
            const { data } = await axiosClient(`/animes/${id}`);
            setAnime(data.data);
            setModalView(true);
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <ResultsContext.Provider
        value={{
            results,
            loading,
            modalView, setModalView,
            anime, setAnime,
            page, setPage,
            totalPages,
            type, setType,
            score, setScore,
            status, setStatus,
            fetchAnimeById
        }}
    > 
        { children }
    </ResultsContext.Provider>
  )
}

export { ResultsProvider };
export default ResultsContext;