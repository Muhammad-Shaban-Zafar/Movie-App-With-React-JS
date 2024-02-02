import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Movies() {

  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMovies = async () => {
    try {
      const response = await fetch("https://api.themoviedb.org/3/discover/movie?api_key=6cde7a66b7d3efec6a840e68f2d94559");
      const data = await response.json();

      // Ensure 'results' is an array
      const moviesArray = Array.isArray(data.results) ? data.results : [];
      setMovies(moviesArray);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col-12">
            <h4 className='fw-bold'>SEE ALL MOVIES</h4>
          </div>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <div className="row mt-2 p-4">
            {movies.map((movie) => (
              <Link to={`/detail/${movie.id}`} key={movie.id} className="topTrendingCard col-3 text-decoration-none">
                <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} className='w-100' />
                <h6 className='text-primary fw-bold mt-4'>{movie.title}</h6>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
