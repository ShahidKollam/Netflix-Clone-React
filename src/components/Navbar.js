import axios from "axios";
import React, { useEffect, useState } from "react";

function Navbar() {
  const [movies, setMovies] = useState([]);
  const getMovie = async () => {
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/discover/movie?api_key=9d6b6d270dbe23628e9b8f45a49da974"
      );
      setMovies(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getMovie();
  }, []);
  console.log("kkkk", movies);
 
  return (
    <div
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movies[14]?.poster_path})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: "400px",
        width: "100%",
      }}
    ></div>
  );
}

export default Navbar;
