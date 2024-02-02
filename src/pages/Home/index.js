import React from 'react'
import Slider from './Slider'
import TopMovies from './TopMovies'
import MoviesTypes from './MoviesTypes'
import CommingSoonMovies from './CommingSoonMovies'

export default function index() {
    return (
        <>
            <Slider />
            <TopMovies />
            <CommingSoonMovies />
            <MoviesTypes />
        </>
    )
}
