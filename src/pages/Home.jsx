import useResults from "../hooks/useResults";
import Header from "../components/Header";
import SectionTitle from "../components/SectionTitle";
import Filters from "../components/Filters";
import Footer from "../components/Footer";
import ListResults from "../components/ListResults";
import Pagination from "../components/Pagination";
import ModalView from "../components/ModalView";
import Toast from "../components/Toast";
import { useState } from "react";

const Home = () => {
  const { results, modalView } = useResults();
  const [alert, setAlert] = useState({});

  const { msg } = alert;
  return (
    <div className="flex flex-col items-center gap-7 min-h-screen">
        <Header />

        <main className="flex flex-col flex-grow gap-7 items-center w-full px-4 md:w-3/4">
          <SectionTitle type={ 'homepage' } />

          <Filters />

          <ListResults />

          { results.length > 0 && <Pagination section={'homepage'}/> }
        </main>

        { modalView && <ModalView section={'homepage'} setAlert={ setAlert }/> }

        { msg && <Toast alert={ alert } />}

        <Footer />
    </div>
  )
}

export default Home