import { Link } from "react-router-dom";
import type { Movie } from "../types";

type MovieCardProps = {
  movie: Movie;
};

function MovieCard({ movie }: MovieCardProps) {
  return (
    <Link
      to={`/movie/${movie.id}`}
      className="movie-link"
      aria-label={`View details for ${movie.title}`}
    >
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
          <span className="view-details">View details →</span>
        </div>
      </article>
    </Link>
  );
}

export default MovieCard;
