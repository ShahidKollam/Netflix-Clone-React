import { Box, CardMedia, Grid, Card } from "@mui/material";
import React, { useEffect, useState } from "react";

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

  return (
    <div>
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
          return (
            <Grid item xs={3}>
              <Box>
                <Card>
                  <CardMedia
                    component="img"
                    height="140"
                    image={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  ></CardMedia>
                </Card>
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}

export default Home;
