import { Link, useParams } from "react-router-dom";
import type { Movie } from "./types";

type MovieDetailsProps = {
  movies: Movie[];
};

function MovieDetails({ movies }: MovieDetailsProps) {
  const { id } = useParams<{ id: string }>();

  const movie = movies.find(
    (item) => item.id === Number(id)
  );

  if (!movie) {
    return (
      <main className="app details-page">
        <h1>Movie not found</h1>
        <p>This movie may no longer be available.</p>
        <Link to="/" className="back-button">
          ← Back to Home
        </Link>
      </main>
    );
  }

  return (
    <main className="app details-page">
      <Link to="/" className="back-button">
        ← Back to Home
      </Link>

      <header className="details-header">
        <img
          src={movie.posterURL}
          alt={movie.title}
          className="details-poster"
        />

        <div className="details-text">
          <p className="details-label">MOVIE DETAILS</p>
          <h1>{movie.title}</h1>
          <p className="rating">⭐ {movie.rating}/10</p>

          <h2>Synopsis</h2>
          <p>{movie.description}</p>
        </div>
      </header>

      <section className="trailer-section">
        <h2>Watch the Trailer</h2>

        <div className="trailer-container">
          <iframe
            src={movie.trailerURL}
            title={`${movie.title} trailer`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      </section>

      <Link to="/" className="back-button">
        ← Back to Home
      </Link>
    </main>
  );
}

export default MovieDetails;
