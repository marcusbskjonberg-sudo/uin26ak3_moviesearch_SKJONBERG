import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"


export default function Movie(){

  const [ currentMovie, setCurrentMovie ] = useState({})

  const {movie} = useParams()
  const defaultApiUrl = "http://www.omdbapi.com/?apikey="
  const apiKey = import.meta.env.VITE_API_KEY

  
  //Use effect med tom dependency for å kjøre når siden er lastet inn, laster inn film basert på movie useParam som hentes fra søkefeltet i nettleseren
  useEffect(() => {
    const getMovie = async () => {
      const response = await fetch (defaultApiUrl+apiKey+"&t="+movie)
      const data = await response?.json()
      setCurrentMovie(data)
    }
    getMovie()
  }, [])

  return(
    <>
      <h1>{movie}</h1>
      <h2>{currentMovie?.Released}, Rated: {currentMovie?.Rated}, {currentMovie?.Runtime}</h2>
      
      {currentMovie?.Poster !== "N/A" ? 
      (<img src={currentMovie?.Poster} alt={currentMovie?.title} />)
      : (<p>No movie poster</p>)}
      
      <p>IMDB-Rating: {currentMovie?.imdbRating} / 10, votes: {currentMovie?.imdbVotes}</p>
      <p>Genre: {currentMovie?.Genre} </p>
      <p>{currentMovie?.Plot}</p>
      <a href={`https://www.imdb.com/title/${currentMovie?.imdbID}`}>IMDB</a>

      
    </>
  )
}