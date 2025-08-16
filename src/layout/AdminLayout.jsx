import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const AdminLayout = () => {
  return (
    <div className="flex flex-col items-center gap-7 min-h-screen">
        <Header />

        <main className="flex flex-col flex-grow gap-7 items-center w-full px-4 md:w-3/4">
            <Outlet />
        </main>

        <Footer />
    </div>
  )
}

export default AdminLayout