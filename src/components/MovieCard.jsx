export default function MovieCard({movieTitle, movieImage, movieRelease}){
  
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