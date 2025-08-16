import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const Header = () => { 
  return (
    <header className="bg-[#2f3542] p-5 flex justify-between w-full">
        <div className="flex gap-3 items-center">
            <Link 
                to="/"
                className="text-cyan-400 font-bold text-3xl"
            >
                <p>Ani<span className="text-gray-200">Verse</span></p>
            </Link>
        </div>

       <Navbar />
    </header>
  )
}

export default Header