import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import MovieCard from "../components/MovieCard"

export default function Movies() {

  const [ movies, setMovies ] = useState([])
  const [ movieSearch, setMovieSearch] = useState("James Bond")

  const defaultApiUrl = "http://www.omdbapi.com/?apikey="
  const apiKey = import.meta.env.VITE_API_KEY

  
    const apiFetch = async () => {
      const response = await fetch(defaultApiUrl+apiKey+"&type=movie&s="+movieSearch)
      const data = await response?.json()
      setMovies(data.Search)
      
      console.log("Fra Movies apiFetch:", data)
    }

    
    useEffect(() => {
      //For å ikke bruke unødvendig mange API calls. (1000 daglig limit)
      //Om søkelengden er mindre enn 3, gjør ingenting. Ellers vent 1 sekund og søk automatisk.
      if (movieSearch.length < 3) return

      const timeout = setTimeout(() => {
        apiFetch()
      }, 1000)

      //reset setTimeout tilbake til 1 sekund når movieSearch staten oppdaterer seg. (hver gang du skriver et nytt tegn)
      return () => {
        clearTimeout(timeout)
      }

     }, [movieSearch]) 
    

 
 
  return(
    <>
      <form>
        <label htmlFor='MovieSearch'>Film</label>
        <input id='MovieSearch' type="search" onChange={(e) => setMovieSearch(e.target.value)} />
        <button onClick={(e) => {e.preventDefault(); apiFetch()}}>Søk</button>
      </form>

      <section id='movie-display'>
        
        {movies?.map((movie) => <Link key={movie.imdbID} to={movie.Title}> <MovieCard movieTitle={movie.Title} movieImage={movie.Poster} movieRelease={movie.Year} /></Link>)}
      </section>
      

    </>
  )
}