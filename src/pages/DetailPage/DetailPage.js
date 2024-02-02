
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import YouTube from 'react-youtube';
import { FaStar } from 'react-icons/fa';

const DetailPage = () => {
    const { id } = useParams();
    const [movieDetails, setMovieDetails] = useState(null);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=6cde7a66b7d3efec6a840e68f2d94559&append_to_response=videos`);
                const data = await response.json();
                setMovieDetails(data);
                console.log(movieDetails);
            } catch (error) {
                console.error('Error fetching movie details:', error);
            }
        };

        fetchMovieDetails();
    }, [id]);

    if (!movieDetails) {
        return (
            <div className="container">
                <h2>Loading...</h2>
            </div>
        );
    }

    const { title, release_date, vote_average, overview, poster_path } = movieDetails;

    // Options for the YouTube component
    const youtubeOptions = {
        height: '400',
        width: '100%',
    };

    console.log('movieDetails:', movieDetails);
    console.log('movieDetails.cast:', movieDetails.cast);

    // Check if videos property exists and has at least one result
    if (movieDetails.videos && movieDetails.videos.results.length > 0) {
        return (
            <>
                <div className="container my-5">
                    <div className="row">
                        <div className="col">
                            <h3 className='text-uppercase'>{title}</h3>
                        </div>
                    </div>
                    <div className="row">

                        <div className="col-6 pt-2">

                            <div className="row">

                                <div className="col-5">
                                    <img src={`https://image.tmdb.org/t/p/w500${poster_path}`} className='img-fluid w-100' />
                                </div>

                                <div className="col-7 text-primary fw-bold pt-2">

                                    <div className='py-1'>
                                        <span className='text-secondary me-2'>Ratting :</span>
                                        {Array.from({ length: Math.floor(vote_average / 2) }, (_, index) => (
                                            <FaStar key={index} color="#ffc107" />
                                        ))}
                                    </div>

                                    <div className='py-1'>
                                        <span className='text-secondary me-2'>Release Date :</span>
                                        {release_date}
                                    </div>

                                    <div className='py-1'>
                                        <span className='text-secondary me-2'>Genre :</span>
                                        {movieDetails.genres && movieDetails.genres.map(genre => genre.name).join(', ')}
                                    </div>

                                    <div className='py-1'>
                                        <span className='text-secondary me-2'>Type :</span>
                                        {movieDetails.original_language}
                                    </div>

                                    <div className='py-1'>
                                        <span className='text-secondary me-2'>Budget :</span>
                                        {movieDetails.budget}
                                    </div>
                                    <div className='py-1'>
                                        <span className='text-secondary me-2'>Country :</span>
                                        {movieDetails.production_countries && movieDetails.production_countries.map(country => country.name).join(', ')}
                                    </div>

                                    <div className='pt-3'>
                                        <span className='fw-normal'>Description</span>
                                        <br />
                                        <span className='text-secondary fw-normal'>
                                            {overview.split('. ')[0]}.
                                        </span>
                                    </div>

                                </div>
                            </div>

                        </div>

                        <div className="col-6">
                            <YouTube videoId={movieDetails.videos.results[0].key} opts={youtubeOptions} />
                        </div>

                    </div>

                </div>

            </>
        );
    } else {
        return (
            <div className="container my-5">

                <div className="row my-3">
                    <div className="col-4">
                        <h3 className='text-uppercase'>{title}</h3>
                    </div>
                </div>

                <div className="row">

                    <div className="col-4 text-primary fw-bold">
                        <div className='py-1'>
                            <span className='text-secondary me-2'>Ratting :</span>
                            {Array.from({ length: Math.floor(vote_average / 2) }, (_, index) => (
                                <FaStar key={index} color="#ffc107" />
                            ))}
                        </div>

                        <div className='py-1'>
                            <span className='text-secondary me-2'>Release Date :</span>
                            {release_date}
                        </div>

                        <div className='py-1'>
                            <span className='text-secondary me-2'>Genre :</span>
                            {movieDetails.genres && movieDetails.genres.map(genre => genre.name).join(', ')}
                        </div>

                        <div className='py-1'>
                            <span className='text-secondary me-2'>Type :</span>
                            {movieDetails.original_language}
                        </div>

                        <div className='py-1'>
                            <span className='text-secondary me-2'>Budget :</span>
                            {movieDetails.budget}
                        </div>
                        <div className='py-1'>
                            <span className='text-secondary me-2'>Country :</span>
                            {movieDetails.production_countries && movieDetails.production_countries.map(country => country.name).join(', ')}
                        </div>

                        <div className='pt-3'>
                            <span className='fw-normal'>Description</span>
                            <br />
                            <span className='text-secondary fw-normal'>
                                {overview.split('. ')[0]}.
                            </span>
                        </div>
                    </div>
                    <div className="col">
                        <p className='text-center fw-bold'>No trailer available</p>
                    </div>

                </div>
            </div>
        );
    }
};

export default DetailPage;
