import { useEffect } from "react"
import MovieCard from "./MovieCard"


export default function MovieDisplay({movies}){
    
    return(
        <section id='movie-display'>
  {movies?.Response === "False" ? (
    <p>{movies?.Error}</p>
  ) : 
    
      movies?.Search?.map((movie) => (
        <MovieCard key={movie.imdbID} movieTitle={movie.Title} movieImage={movie.Poster} movieRelease={movie.Year} /> ))
    
  }
</section>
    )
}