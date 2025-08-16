const SectionTitle = section => {
    const { type } = section;
    
  return (
    <>
        { type === 'homepage' ? (
            <h1 className="text-gray-800 text-4xl font-light text-center">
                Learn everything about the most popular <span className="font-bold text-cyan-500">Animes</span>
            </h1>
        ) : ( 
            <h1 className="text-gray-800 text-4xl font-light text-center">
                Keep track of your favorite <span className="font-bold text-cyan-500">Animes</span>
            </h1>
        )}
    </>
  )
}

export default SectionTitle