import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Pagination } from 'react-bootstrap';

export default function CommingSoonMovies() {
  const [comingSoonMovies, setComingSoonMovies] = useState([]);
  const [comingSoonActivePage, setComingSoonActivePage] = useState(1);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        // Fetch coming soon movies (you may need to change the API endpoint)
        const comingSoonResponse = await fetch("https://api.themoviedb.org/3/movie/upcoming?api_key=6cde7a66b7d3efec6a840e68f2d94559");
        const comingSoonData = await comingSoonResponse.json();
        setComingSoonMovies(comingSoonData.results);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  const handleComingSoonPageChange = (pageNumber) => {
    setComingSoonActivePage(pageNumber);
  };

  const itemsPerPage = 6; // Set the number of items per page

  const renderMovies = (movies, activePage, handlePageChange) => {
    const startIndex = (activePage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return movies.slice(startIndex, endIndex).map(movie => (
      <Link to={`/detail/${movie.id}`} key={movie.id} className="topTrendingCard col-2 py-3 text-decoration-none">
        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className='img-fluid w-100' />
        <h6 className='mt-4 text-center'>{movie.title}</h6>
      </Link>
    ));
  };

  return (
    <>
      <div className="container my-5">

        <div className="row">
          <div className="col">
            <h5 className='text-dark fw-bold'>COMMING SOON</h5>
          </div>
        </div>

        <div className="row border mt-2 p-4">
          {renderMovies(comingSoonMovies, comingSoonActivePage, handleComingSoonPageChange)}
        </div>

        <Pagination className='mt-2'>
          {[...Array(Math.ceil(comingSoonMovies.length / itemsPerPage))].map((_, index) => (
            <Pagination.Item
              key={index + 1}
              active={index + 1 === comingSoonActivePage}
              onClick={() => handleComingSoonPageChange(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
        </Pagination>

      </div>
    </>
  );
}
