import {
  useState,
  type FormEvent,
  type Dispatch,
  type SetStateAction,
} from "react";
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
} from "react-router-dom";

import MovieList from "./components/MovieList";
import Filter from "./components/Filter";
import MovieDetails from "./MovieDetails";
import type { Movie } from "./types";
import "./App.css";

const initialMovies: Movie[] = [
  {
    id: 1,
    title: "Inception",
    description:
      "A skilled thief enters people's dreams to steal secrets. He is offered a chance to erase his past by completing an almost impossible mission.",
    posterURL:
      "https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg",
    rating: 8.8,
    trailerURL: "https://www.youtube.com/embed/YoHD9XEInc0",
  },
  {
    id: 2,
    title: "Interstellar",
    description:
      "When Earth faces an environmental crisis, a group of explorers travels through a wormhole to search for a new home for humanity.",
    posterURL:
      "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    rating: 8.7,
    trailerURL: "https://www.youtube.com/embed/zSWdZVtXT7E",
  },
  {
    id: 3,
    title: "The Dark Knight",
    description:
      "Batman faces the Joker, a criminal mastermind whose chaotic plans threaten Gotham City.",
    posterURL:
      "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    rating: 9.0,
    trailerURL: "https://www.youtube.com/embed/EXeTwQWrcwY",
  },
];

function HomePage({
  movies,
  setMovies,
}: {
  movies: Movie[];
  setMovies: Dispatch<SetStateAction<Movie[]>>;
}) {
  const [titleFilter, setTitleFilter] = useState("");
  const [ratingFilter, setRatingFilter] = useState(0);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [posterURL, setPosterURL] = useState("");
  const [trailerURL, setTrailerURL] = useState("");
  const [rating, setRating] = useState("7");

  const filteredMovies = movies.filter(
    (movie) =>
      movie.title.toLowerCase().includes(titleFilter.toLowerCase()) &&
      movie.rating >= ratingFilter
  );

  function handleAddMovie(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const newMovie: Movie = {
      id: Date.now(),
      title: title.trim(),
      description: description.trim(),
      posterURL: posterURL.trim(),
      trailerURL: trailerURL.trim(),
      rating: Number(rating),
    };

    setMovies((currentMovies) => [...currentMovies, newMovie]);

    setTitle("");
    setDescription("");
    setPosterURL("");
    setTrailerURL("");
    setRating("7");
  }

  return (
    <main className="app">
      <header className="app-header">
        <h1>🎬 MovieVerse</h1>
        <p>Discover your favorite movies and watch their trailers.</p>
      </header>

      <section className="add-movie">
        <h2>Add a New Movie</h2>

        <form onSubmit={handleAddMovie}>
          <input
            placeholder="Movie title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          />

          <textarea
            placeholder="Movie description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            required
          />

          <input
            type="url"
            placeholder="Poster image URL"
            value={posterURL}
            onChange={(event) => setPosterURL(event.target.value)}
            required
          />

          <input
            type="url"
            placeholder="YouTube embed link (https://www.youtube.com/embed/...)"
            value={trailerURL}
            onChange={(event) => setTrailerURL(event.target.value)}
            required
          />

          <label>
            Rating (0–10)
            <input
              type="number"
              min="0"
              max="10"
              step="0.1"
              value={rating}
              onChange={(event) => setRating(event.target.value)}
              required
            />
          </label>

          <button type="submit">+ Add Movie</button>
        </form>
      </section>

      <section className="collection">
        <h2>My Collection</h2>

        <Filter
          titleFilter={titleFilter}
          ratingFilter={ratingFilter}
          onTitleChange={setTitleFilter}
          onRatingChange={setRatingFilter}
        />

        <p>
          Showing {filteredMovies.length} of {movies.length} movies
        </p>

        <MovieList movies={filteredMovies} />
      </section>
    </main>
  );
}

function App() {
  const [movies, setMovies] = useState<Movie[]>(initialMovies);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<HomePage movies={movies} setMovies={setMovies} />}
        />
        <Route
          path="/movie/:id"
          element={<MovieDetails movies={movies} />}
        />
        <Route
          path="*"
          element={
            <main className="app">
              <h1>Page not found</h1>
              <Link to="/">Return to Home</Link>
            </main>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
