import MovieCard from "./MovieCard";
import type { Movie } from "../App";

type MovieListProps = {
  movies: Movie[];
};

function MovieList({ movies }: MovieListProps) {
  if (movies.length === 0) {
    return <p className="empty-message">No movies found. Try another filter!</p>;
  }

  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}

export default MovieList;
