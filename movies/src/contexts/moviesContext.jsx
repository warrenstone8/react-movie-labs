import React, { createContext, useState } from "react";

export const MoviesContext = createContext();

const MoviesContextProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]); 
  const [mustWatch, setMustWatch] = useState([]);

  
  const addToMustWatch = (movieId) => {
    setMustWatch((prevMustWatch) => {
      if (!prevMustWatch.includes(movieId)) {
        const updatedList = [...prevMustWatch, movieId];
        console.log("Must Watch List Updated:", updatedList); 
        return updatedList;
      }
      return prevMustWatch;
    });
  };

  return (
    <MoviesContext.Provider value={{ favorites, setFavorites, mustWatch, addToMustWatch }}>
      {children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;
