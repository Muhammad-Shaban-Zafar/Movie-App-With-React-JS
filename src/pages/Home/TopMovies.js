import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Pagination } from 'react-bootstrap';

const TopMovies = () => {

    const [topTrendingMovies, setTopTrendingMovies] = useState([]);
    const [topTrendingActivePage, setTopTrendingActivePage] = useState(1);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                // Fetch top trending movies
                const trendingResponse = await fetch("https://api.themoviedb.org/3/movie/popular?api_key=6cde7a66b7d3efec6a840e68f2d94559");
                const trendingData = await trendingResponse.json();
                setTopTrendingMovies(trendingData.results);

            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };

        fetchMovies();
    }, []);

    const handleTopTrendingPageChange = (pageNumber) => {
        setTopTrendingActivePage(pageNumber);
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
                        <h5 className='text-dark fw-bold'>TOP TRENDING</h5>
                    </div>
                </div>

                <div className="row border mt-2 p-4">
                    {renderMovies(topTrendingMovies, topTrendingActivePage, handleTopTrendingPageChange)}
                </div>

                <Pagination className='mt-2'>
                    {[...Array(Math.ceil(topTrendingMovies.length / itemsPerPage))].map((_, index) => (
                        <Pagination.Item
                            key={index + 1}
                            active={index + 1 === topTrendingActivePage}
                            onClick={() => handleTopTrendingPageChange(index + 1)}
                        >
                            {index + 1}
                        </Pagination.Item>
                    ))}
                </Pagination>

            </div>
        </>
    );
};

export default TopMovies;
