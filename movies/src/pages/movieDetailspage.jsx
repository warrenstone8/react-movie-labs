import React from "react";
import { useParams } from 'react-router';
import MovieDetails from "../components/movieDetails/";
import PageTemplate from "../components/templateMoviePage";
import { getMovie } from '../api/tmdb-api';  // Import getMovie
import { useQuery } from '@tanstack/react-query';  // Import useQuery from React Query
import Spinner from '../components/spinner';  // Import Spinner

// Comment out or remove the useMovie import, as it's no longer needed
// import useMovie from "../hooks/useMovie";   // Redundant now

const MoviePage = (props) => {
  const { id } = useParams();

  // Use React Query's useQuery to fetch the movie data by ID
  const { data, error, isPending, isError } = useQuery({
    queryKey: ['movie', { id: id }],  // Variable ID in the query key
    queryFn: getMovie,  // Function that fetches the movie data
  });

  // Loading state
  if (isPending) {
    return <Spinner />;
  }

  // Error state
  if (isError) {
    return <h1>{error.message}</h1>;
  }

  // If movie data is available, render the page template and movie details
  return (
    <>
      {data ? (
        <PageTemplate movie={data}>
          <MovieDetails movie={data} />
        </PageTemplate>
      ) : (
        <p>Waiting for movie details...</p>
      )}
    </>
  );
};

export default MoviePage;
