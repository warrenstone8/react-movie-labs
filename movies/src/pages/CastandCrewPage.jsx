import React from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getMovieCredits } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import CastCard from "../components/castCard"; // Import CastCard

const CastCrewPage = () => {
  const { id } = useParams();

  // Fetch credits data
  const { data, error, isPending, isError } = useQuery({
    queryKey: ["movieCredits", id],
    queryFn: () => getMovieCredits(id),
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <div className="cast-crew-container">
      <h2>Cast</h2>
      <div className="cast-list">
        {data.cast
          .filter((actor) => actor.profile_path) // Only show actors with images
          .map((actor) => (
            <CastCard key={actor.id} actor={actor} />
          ))}
      </div>
    </div>
  );
          }
  

export default CastCrewPage;

