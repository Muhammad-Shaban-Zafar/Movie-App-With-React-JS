import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

const Slider = () => {
    const [topTrendingMovies, setTopTrendingMovies] = useState([]);

    useEffect(() => {
        const fetchTopTrendingMovies = async () => {
            try {
                const response = await fetch("https://api.themoviedb.org/3/movie/popular?api_key=6cde7a66b7d3efec6a840e68f2d94559");
                const data = await response.json();
                setTopTrendingMovies(data.results);
            } catch (error) {
                console.error('Error fetching top trending movies:', error);
            }
        };

        fetchTopTrendingMovies();
    }, []);

    return (
        <div className="container bg-white mt-5">
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >
                {topTrendingMovies.map(movie => (
                    <SwiperSlide key={movie.id} className='text-center'>
                        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className='img-fluid w-25'/>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Slider;
