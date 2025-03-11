import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import { Link } from "react-router";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import StarRateIcon from "@mui/icons-material/StarRate";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid2";
import img from "../../images/film-poster-placeholder.png";

// Import the FavoriteIcon only if it's necessary (e.g., inside RemoveFromFavorites)
import FavoriteIcon from "@mui/icons-material/Favorite"; // Import if you are still using this in your RemoveFromFavorites or elsewhere

// Your MovieCard component definition
export default function MovieCard({ movie, action }) { 
  const { favorites, addToFavorites } = useContext(MoviesContext);

  // Check if the movie is in favorites to display the heart icon
  if (favorites.find((id) => id === movie.id)) {
    movie.favorite = true;
  } else {
    movie.favorite = false;
  }

  // Inside your MovieCard component
const handleAddToFavorite = (e) => {
  e.preventDefault();
  addToFavorites(movie.id); // Changed from passing the whole movie object
};

  return (
    <Card>
      <CardHeader
        avatar={
          movie.favorite ? (
            <Avatar sx={{ backgroundColor: 'red' }}>
              <FavoriteIcon />
            </Avatar>
          ) : null
        }
        title={
          <Typography variant="h5" component="p">
            {movie.title}
          </Typography>
        }
      />
      <CardMedia
        sx={{ height: 500 }}
        image={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
            : img
        }
      />
      <CardContent>
        <Grid container>
          <Grid size={{ xs: 6 }}>
            <Typography variant="h6" component="p">
              <CalendarIcon fontSize="small" />
              {movie.release_date}
            </Typography>
          </Grid>
          <Grid size={{ xs: 6 }}>
            <Typography variant="h6" component="p">
              <StarRateIcon fontSize="small" />
              {"  "} {movie.vote_average}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions disableSpacing>
        {/* Render the action prop here */}
        {action && action(movie)} 

       
    


        {/* More Info Button */}
        <Button variant="outlined" size="medium" color="primary">
          <Link to={`/movies/${movie.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            More Info ...
          </Link>
        </Button>

        {/* 🔹 New Button for Cast & Crew */}
        <Button variant="outlined" size="medium" color="secondary">
          <Link to={`/movies/${movie.id}/cast`} style={{ textDecoration: 'none', color: 'inherit' }}>
            View Cast & Crew
          </Link>
        </Button>
      </CardActions>
    </Card>
  );
};
