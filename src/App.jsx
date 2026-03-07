import { useEffect, useState } from 'react'
import './App.css'
import { Routes, Route, Outlet, Link, useParams } from 'react-router-dom'


function Layout() {
  return(
    <>
    <header>
      <p>AK3 Marcus Skjønberg</p>
      <h1>Filmer</h1>
      <nav>
        <Link to="">Hjem</Link>
      </nav>
    </header>
    <main>
      <Outlet/>
    </main>
    <footer><p>AK3 Marcus Skjønberg</p></footer>
    </>
  )
}

function Movies() {

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

    // USE EFFECT for automatisk søking når input-feltet for filmsøk er 3 tegn eller mer
    //useEffect(() => {
    //  movieSearch.length >= 3 ? apiFetch() : null
    // }, [movieSearch])
    

 
 
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


function Movie(){

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
      <h1>{movie}</h1>
      <h2>{currentMovie?.Released}, Rated: {currentMovie?.Rated}, {currentMovie?.Runtime}</h2>
      
      {currentMovie?.Poster !== "N/A" ? 
      (<img src={currentMovie?.Poster} alt={currentMovie?.title} />)
      : (<p>No movie poster</p>)}
      
      <h3>IMDB-Rating: {currentMovie?.imdbRating} / 10, votes: {currentMovie?.imdbVotes}</h3>
      <h4>Genre: {currentMovie?.Genre} </h4>
      <p>{currentMovie?.Plot}</p>
    </>
  )
}

function MovieCard({movieTitle, movieImage, movieRelease}){
  
  return(
    <>
      <article>
        <h3 title={movieTitle}>{movieRelease}, {movieTitle}</h3>
        {movieImage && movieImage !== "N/A" ? (
          <img src={movieImage} alt={movieTitle} /> ) : (<p>Ingen bilde for film</p>)
        }
      </article>
    </>
  )
}

function App() {
  
  return (
    <>
      <Routes>
        <Route element={<Layout/>}>
          <Route index path='' element={<Movies/>}/>
          <Route path='/:movie' element={<Movie/>}/>
        </Route>
      </Routes>
    </>
  )
}

export default App
