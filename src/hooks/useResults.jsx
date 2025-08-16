import { useContext } from 'react';
import ResultsContext from '../context/ResultsProvider';

const useResults = () => {
    return useContext(ResultsContext);
}

export default useResults;