import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"




export default function Movie(){

  const [ currentMovie, setCurrentMovie ] = useState({})

  const {movie} = useParams()
  const defaultApiUrl = "http://www.omdbapi.com/?apikey="
  const apiKey = import.meta.env.VITE_API_KEY
  
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch (defaultApiUrl+apiKey+"&t="+movie)
      const data = await response?.json()
      console.log("Fra movie apifetch:", data)
      setCurrentMovie(data)
    }
    fetchData()
  }, [])

  return(
    <>
      <h2>{movie}</h2>
      <h3>{currentMovie?.Released}, Rated: {currentMovie?.Rated}, {currentMovie?.Runtime}</h3>
      
      {currentMovie?.Poster !== "N/A" ? 
      (<img src={currentMovie?.Poster} alt={currentMovie?.title} />)
      : (<p>No movie poster</p>)}
      
      <p>IMDB-Rating: {currentMovie?.imdbRating} / 10, votes: {currentMovie?.imdbVotes}</p>
      <p>Genre: {currentMovie?.Genre} </p>
      <p>{currentMovie?.Plot}</p>
    </>
  )
}