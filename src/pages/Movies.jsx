import { useEffect, useState } from "react"
import MovieDisplay from "../components/MovieDisplay"

export default function Movies() {

  //useStates
  const [ movies, setMovies ] = useState([])
  const [ movieSearch, setMovieSearch] = useState("James Bond")
  const [ currentPage, setCurrentPage ] = useState(1)
  /*Jeg fant et problem med koden min for å håndtere sider: når jeg "spammet" neste side fort en del ganger ville et movieCard fra forrige søk henge igjen på neste søk.
  Jeg testet litt forskjellige ting og kom fram til en løsning der jeg disabler knappene for å bytte side mens api'et fetcher. Bruker useState med en boolean som endres når api'et fetcher
  og at sideknappene skal være disabled om useStaten loading === true 

  oppdatering: problemet kan gjenskapes når du blar til siste side for søkeresultatene for "Shrek", usikker hva som gjør dette
  
  Jeg fikk problemet en gang etter jeg har lagt til loading men det virker vanskeligere å gjenskape enn før jeg la til loading løsningen.
  */
  const [ loading, setLoading ] = useState(false)

  const defaultApiUrl = "http://www.omdbapi.com/?apikey="
  const apiKey = import.meta.env.VITE_API_KEY

  
  //Henter filmer fra API basert på søk, sidetall etc og lagrer filmene i movies useStaten
  const getMovies = async () => {
    const response = await fetch(`${defaultApiUrl}${apiKey}&type=movie&s=${movieSearch}&page=${currentPage}`)
    const data = await response?.json()
    
    setMovies(data)
      
    console.log("Fra Movies", data)
  }

    
    useEffect(() => {
      //Setter loading staten til true for å disable knapper for å bla gjennom sider med filmer
    setLoading(true)

      //Etter 1 sekund uten at movieSearch staten oppdaterer seg (søkefeltet for film) kalles getMovies og fetcher fra api'et. Loading staten oppdateres også til false så det blir mulig å søke igjen
    const timer = setTimeout(() => {
      getMovies()
      setLoading(false)
    }, 1000)

      //Resetter timeren (1 sekund delay før søk) hver gang movieSearch oppdaterer seg, getMovies vil ikke kalles før 1 sekund etter at vi har sluttet å skrive i søkefeltet for film
    return () => clearTimeout(timer)
  }, [movieSearch, currentPage])
    

 
 
  return(
    <>
    {movies?.Response === "False" ? <h2>Søk etter filmer</h2> : <h1>{movies?.totalResults} Filmer</h1> }
      <nav id="movie-nav">
        <form>
          <label htmlFor='MovieSearch'>Filmtittel</label>
          <input id='MovieSearch' type="search" placeholder="James Bond" onChange={(e) => {setCurrentPage(1); setMovieSearch(e.target.value)}} />
          <button disabled={loading === true} onClick={(e) => {e.preventDefault(); getMovies()}}>Søk</button>

          <button className="page-button" disabled={currentPage === 1 || loading === true} onClick={(e) => {e.preventDefault(); setCurrentPage(currentPage - 1)}}>
          Forrige
        </button>
        <button className="page-button" disabled={currentPage === Math.ceil(movies.totalResults / 10) || loading === true} onClick={(e) => {e.preventDefault() ;setCurrentPage(currentPage + 1)}}>
          Neste
        </button>
        <p id="current-page">{movies.totalResults ? (<>Side {currentPage} / {Math.ceil(movies.totalResults / 10)}</>) : ("ingen resultat")}</p>
        </form>
      </nav>

      <MovieDisplay movies={movies}/>
      

    </>
  )
}