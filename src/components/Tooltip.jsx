const Tooltip = ({ show }) => {
  return (
    <div 
        className={`
            absolute right-0 mt-1 w-fit text-gray-700 border border-gray-200 text-sm rounded-sm p-2 shadow-sm z-10 bg-white transition-all duration-300 ease-in-out
            ${show ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}
        `}
    >
        <p>
            The password must be at least<br />  
            6 characters long and include:
        </p>

        <ul className="list-disc list-inside mt-2">
            <li>one lowercase</li>
            <li>one uppercase</li>
            <li>one digit</li>
            <li>one special character</li>
        </ul>
    </div>
  )
}

export default Tooltip