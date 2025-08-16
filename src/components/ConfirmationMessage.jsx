const ConfirmationMessage = ({ message }) => {
  return (
    <>
        { message.error ? (
            <img 
                src="/error.webp" 
                alt="Error Image" 
                className="h-60 w-60" 
            />
        ) : (
            <img 
                src="/success.webp" 
                alt="Success Image" 
                className="h-60 w-60"
            />
        )}

        <p className="font-bold text-3xl">{message.msg}</p>
    </>
  )
}

export default ConfirmationMessage