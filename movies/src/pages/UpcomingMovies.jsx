import React, { useContext } from "react";
import { getUpcomingMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { MoviesContext } from "../contexts/MoviesContext"; 

const UpcomingMoviesPage = () => { 
  const { data, error, isPending, isError } = useQuery({
    queryKey: ['upcoming'],
    queryFn: getUpcomingMovies, 
  });

  const { addToMustWatch } = useContext(MoviesContext); 

  if (isPending) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  const movies = data.results;

  return (
    <PageTemplate
      title="Upcoming Movies" 
      movies={movies}
      action={(movie) => (
        <PlaylistAddIcon 
          style={{ cursor: "pointer", color: "blue" }} 
          onClick={() => addToMustWatch(movie.id)} 
        />
      )}
    />
  );
};

export default UpcomingMoviesPage;
