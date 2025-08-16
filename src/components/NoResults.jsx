const NoResults = ({ section }) => {
  return (
    <div className="flex flex-col mt-20 md:mt-0 items-center">
        <img 
            src="/no-results.webp" 
            alt="No Results Found" 
            className="h-65"
        />
        { section === 'homepage' ? (
          <p className="mt-5 font-bold text-2xl">No results found for your search</p> 
        ) : (
          <p className="mt-5 font-bold text-2xl">No favorites yet!</p> 
        )}
    </div>
  )
}

export default NoResults