import type { Movie } from "../App";

type MovieCardProps = {
  movie: Movie;
};

function MovieCard({ movie }: MovieCardProps) {
  return (
    <article className="movie-card">
      <img
        src={movie.posterURL}
        alt={movie.title}
        className="movie-poster"
      />

      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p className="rating">⭐ {movie.rating}/10</p>
        <p>{movie.description}</p>
      </div>
    </article>
  );
}

export default MovieCard;
