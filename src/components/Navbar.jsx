import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import IconsGuest from "./IconsGuest";
import IconsAuth from "./IconsAuth";

const Navbar = () => {
    const { auth } = useAuth();
    const isLoggedIn = auth && Object.keys(auth).length > 0;

  return (
    <>
        <nav className="flex items-center gap-5">
            <Link
                to="/"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-house text-cyan-400 hover:text-cyan-300" viewBox="0 0 16 16">
                    <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z"/>
                </svg>
            </Link>
            <Link
                to="/admin/favorites"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-heart text-cyan-400 hover:text-cyan-300" viewBox="0 0 16 16">
                    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
                </svg>
            </Link>
            { !isLoggedIn ? (
                <IconsGuest />
            ) : (
                <IconsAuth />
            )}
        </nav>
    </>
  )
}

export default Navbar