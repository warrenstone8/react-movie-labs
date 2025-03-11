import React from "react";

const CastCard = ({ actor }) => {
  return (
    <div className="cast-card">
      <img
        src={actor.profile_path 
          ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
          : "https://via.placeholder.com/200x300?text=No+Image"}
        alt={actor.name}
      />
      <h3>{actor.name}</h3>
      <p>{actor.character}</p>
    </div>
  );
};

export default CastCard;
