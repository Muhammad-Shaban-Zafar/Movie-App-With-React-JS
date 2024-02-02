// router.js
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Home from "./Home"
import Movies from "./Movies/Movies";
import TvSeries from "./TvSeries/TvSeries";
import Live from "./Live/Live";
import All from "./All/All";
import DetailPage from "./DetailPage/DetailPage";
import SearchResults from './SearchResults';

export const CustomRoutes = () => {
    return (
        <BrowserRouter>
            <Header />
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/movies" element={<Movies />} />
                    <Route path="/tvSeries" element={<TvSeries />} />
                    <Route path="/live" element={<Live />} />
                    <Route path="/all" element={<All />} />
                    <Route path="/detail/:id" element={<DetailPage />} />
                    <Route path="/search-results"  element = {<SearchResults />}  />
                </Routes>
            </main>
            <Footer />
        </BrowserRouter>
    );
};
