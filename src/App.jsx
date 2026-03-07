import { useEffect, useState } from 'react'
import './App.css'
import { Routes, Route, Outlet } from 'react-router-dom'


function Layout() {
  return(
    <>
    <header>
      <p>AK3 Marcus Skjønberg</p>
      <nav>

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
        <label htmlFor='MovieSearch'>Søk</label>
        <input id='MovieSearch' type="search" onChange={(e) => setMovieSearch(e.target.value)} />
        <button onClick={(e) => {e.preventDefault(); apiFetch()}}>Søk</button>
      </form>

      <section>
        {movies?.map((movie) => <article key={movie.imdbID}><p>{movie.Title}</p></article>)}
      </section>
      

    </>
  )
}

function App() {
  
  return (
    <>
      <Routes>
        <Route element={<Layout/>}>
          <Route index path='' element={<Movies/>}/>
          <Route path='/:movie' element={<h1>Film</h1>}/>
        </Route>
      </Routes>
    </>
  )
}

export default App
