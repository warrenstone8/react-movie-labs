import React from "react";
import { getUpcomingMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd'; 

const UpcomingMoviesPage = () => { 
  const { data, error, isPending, isError } = useQuery({
    queryKey: ['upcoming'],
    queryFn: getUpcomingMovies, 
  });

  if (isPending) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  const movies = data.results;

  
  const handleAddToWatchlist = (movie) => {
    let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
    const isAlreadyInWatchlist = watchlist.some(item => item.id === movie.id);
    
    if (!isAlreadyInWatchlist) {
      watchlist.push(movie);
      localStorage.setItem('watchlist', JSON.stringify(watchlist));
    }
  };

  return (
    <PageTemplate
      title="Upcoming Movies" 
      movies={movies}
      action={(movie) => (
        <PlaylistAddIcon 
          style={{ cursor: "pointer", color: "blue" }} 
          onClick={() => handleAddToWatchlist(movie)} 
        />
      )}
    />
  );
};

export default UpcomingMoviesPage;
