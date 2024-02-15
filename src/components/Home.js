import { Box, CardMedia, Grid, Card } from "@mui/material";
import { doc, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { database } from "../firebase/setup";

function Home() {
  const [movies, setMovies] = useState([]);

  const getMovie = () => {
    try {
      fetch(
        "https://api.themoviedb.org/3/discover/movie?api_key=9d6b6d270dbe23628e9b8f45a49da974"
      )
        .then((res) => res.json())
        .then((json) => setMovies(json.results));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getMovie();
  }, []);

  const addMovie = async (movie) => {
    const movieRef = doc(database, "Movies", `${movie.id}`);
    try {
      await setDoc(movieRef, { movieName: movie.original_title });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ backgroundColor: "black" }}>
      <Grid
        container
        spacing={2}
        style={{
          paddingTop: "20px",
          paddingLeft: "20px",
          paddingRight: "20px",
        }}
      >
        {movies.map((movie) => {
          {
            addMovie(movie);
          }
          return (
            <Grid item xs={3}>
              <Box>
                <Link to="Movies" state={{ movie: movie }}>
                  <Card>
                    <CardMedia
                      component="img"
                      height="140"
                      image={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    ></CardMedia>
                  </Card>
                </Link>
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}

export default Home;
