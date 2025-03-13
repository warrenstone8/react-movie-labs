import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes } from "react-router";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage";
import MovieReviewPage from "./pages/moviereviewpage";
import SiteHeader from './components/siteHeader';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from './pages/addMovieReviewPage';
import UpcomingMoviesPage from "./pages/upcomingmovies";
import PopularMoviesPage from "./pages/PopularMoviespage";
import CastAndCrewPage from "./pages/CastAndCrewPage"; 
import NowPlayingMoviesPage from "./pages/NowPlayingMoviesPage";







const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000,
      refetchOnWindowFocus: false,
    },
  },
});
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <SiteHeader />
        <MoviesContextProvider>
        <Routes>
  <Route path="/movies/favorites" element={<FavoriteMoviesPage />} />
  <Route path="/reviews/:id" element={<MovieReviewPage />} />
  <Route path="/movies/:id" element={<MoviePage />} />
  <Route path="/movies/:id/cast" element={<CastAndCrewPage />} /> 
  <Route path="/" element={<HomePage />} />
  <Route path="*" element={<Navigate to="/" />} />
  <Route path="/reviews/form" element={<AddMovieReviewPage />} />
  <Route path="/movies/upcoming" element={<UpcomingMoviesPage />} />
  <Route path="/movies/popular" element={<PopularMoviesPage />} />
  <Route path="/movies/Now Playing" element={<NowPlayingMoviesPage />} />

</Routes>

        </MoviesContextProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};


const rootElement = createRoot(document.getElementById("root"));
rootElement.render(<App />);
