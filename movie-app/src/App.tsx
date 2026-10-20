import { useState, type FormEvent } from "react";
import MovieList from "./components/MovieList";
import Filter from "./components/Filter";
import "./App.css";

export type Movie = {
  id: number;
  title: string;
  description: string;
  posterURL: string;
  rating: number;
};

const initialMovies: Movie[] = [
  {
    id: 1,
    title: "Inception",
    description: "A thief enters people's dreams to steal secrets.",
    posterURL: "https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg",
    rating: 8.8,
  },
  {
    id: 2,
    title: "Interstellar",
    description: "Explorers travel through space to find a new home for humanity.",
    posterURL: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    rating: 8.7,
  },
  {
    id: 3,
    title: "The Dark Knight",
    description: "Batman faces the dangerous criminal known as the Joker.",
    posterURL: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    rating: 9.0,
  },
];

function App() {
  const [movies, setMovies] = useState<Movie[]>(initialMovies);
  const [titleFilter, setTitleFilter] = useState("");
  const [ratingFilter, setRatingFilter] = useState(0);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [posterURL, setPosterURL] = useState("");
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
      rating: Number(rating),
    };

    setMovies((currentMovies) => [...currentMovies, newMovie]);

    setTitle("");
    setDescription("");
    setPosterURL("");
    setRating("7");
  }

  return (
    <main className="app">
      <header className="app-header">
        <h1>🎬 MovieVerse</h1>
        <p>Your favorite movies and TV shows, all in one place.</p>
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

export default App;
