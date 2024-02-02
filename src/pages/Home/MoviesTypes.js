import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';

const MoviesTypes = () => {
    const [allGenres, setAllGenres] = useState([]);

    useEffect(() => {
        const fetchAllGenres = async () => {
            try {
                const response = await fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=6cde7a66b7d3efec6a840e68f2d94559");
                const data = await response.json();
                setAllGenres(data.genres);
                console.log(data);
            } catch (error) {
                console.error('Error fetching genres:', error);
            }
        };
        fetchAllGenres();
    }, []);

    return (
        <div className="container mt-3">
            <h5 className='text-dark fw-bold'>TOP GENRES NAME</h5>

            <div className='my-5'>
                <Swiper
                    slidesPerView={1}
                    spaceBetween={10}
                    autoplay={{
                        delay: 1500,
                        disableOnInteraction: false,
                    }}
                    breakpoints={{
                        '@0.00': {
                            slidesPerView: 1,
                            spaceBetween: 10,
                        },
                        '@0.75': {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        '@1.00': {
                            slidesPerView: 3,
                            spaceBetween: 40,
                        },
                        '@1.50': {
                            slidesPerView: 5,
                            spaceBetween: 50,
                        },
                    }}
                    modules={[Pagination, Autoplay]}
                    className="mySwiper"
                >
                    {allGenres.map((genre) => (
                        <SwiperSlide key={genre.id}>
                            <div className="row text-center">
                                <div className="col">
                                    <h3 className='fw-bold text-primary'>
                                        {genre.name}
                                    </h3>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default MoviesTypes;
