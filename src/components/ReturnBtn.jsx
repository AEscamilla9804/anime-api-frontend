import { Link } from "react-router-dom"

const ReturnBtn = ({ destination }) => {
  const destinations = {
    login: '/openid',
    home: '/'
  }

  const route = destinations[destination.toLowerCase()] || '/';

  return (
    <div className="absolute top-[18px] right-[40px] md:top-[30px]">
      <Link
            to={route}
            className="border border-cyan-700 px-2 py-1 text-cyan-700 hover:border-cyan-600 hover:text-cyan-600 rounded-sm"
        >
            {destination}
        </Link>
    </div>
  )
}

export default ReturnBtn