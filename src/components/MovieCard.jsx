import { Link } from "react-router-dom";

export default function MovieCard({movieTitle, movieImage, movieRelease}){
  
  return(
    <>
      <article>
        <Link to={movieTitle}><h3 title={movieTitle}>{movieRelease}, {movieTitle}</h3></Link>
        {movieImage && movieImage !== "N/A" ? (
        <Link to={movieTitle} ><img src={movieImage} alt={movieTitle} /></Link> ) : (<p>Ingen bilde for film</p>)
        }
      </article>
    </>
  )
}