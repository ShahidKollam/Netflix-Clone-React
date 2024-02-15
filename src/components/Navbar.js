import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/setup";
import { signOut } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Trailer from "./Trailer";

function Navbar() {
  const [movies, setMovies] = useState([]);

  const navigate = useNavigate();

  const logout = async () => {
    try {
      await signOut(auth);
      toast.success("Loggedout successfully", { theme: "dark" });
    } catch (error) {
      console.error(error);
    }
  };

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

  const signinClick = () => {
    navigate("/signin");
  };

  useEffect(() => {
    getMovie();
  }, []);

  return (
    <div
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7)),url(https://image.tmdb.org/t/p/original${movies[19]?.poster_path})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: "500px",
        width: "100%",
      }}
    >
      <ToastContainer autoClose={2000} />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "20px",
        }}
      >
        <img
          src={
            "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1920px-Netflix_2015_logo.svg.png"
          }
          style={{ width: "110px", height: "30px" }}
        />
        {auth.currentUser?.emailVerified ? (
          <Button
            onClick={logout}
            variant="contained"
            color="error"
            sx={{ height: "40px", marginLeft: "10px" }}
          >
            log out
          </Button>
        ) : (
          <Button
            onClick={signinClick}
            color="error"
            variant="contained"
            sx={{ height: "40px" }}
          >
            sign in
          </Button>
        )}
      </div>

      <div style={{ padding: "20px" }}>
        <h1
          style={{ color: "#EEECEC", fontSize: "70px", fontFamily: "initial" }}
        >
          {movies[19]?.original_title}
        </h1>
        <h3 style={{ color: "#EEECEC" }}>{movies[2]?.overview}</h3>
        <Trailer movieId={movies[2]?.id} />
      </div>
    </div>
  );
}

export default Navbar;
