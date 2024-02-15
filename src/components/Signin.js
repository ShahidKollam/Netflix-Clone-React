import React from "react";
import { signInWithPopup } from "firebase/auth";
import { Button } from "@mui/material";
import { GoogleAuth, auth } from "../firebase/setup";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Signin() {
  const navigate = useNavigate();

  const googleSignin = async () => {
    try {
      await signInWithPopup(auth, GoogleAuth);
      setTimeout(() => {
        auth.currentUser?.emailVerified && navigate("/");
      },2000)
      toast.success("Signedin successfully")
    } catch (error) {
      console.log(error);
    }
  };
  console.log(auth);

  return (
    <div
      style={{ backgroundColor: "#181818", height: "100vh", padding: "20px" }}
    >
      <ToastContainer autoClose={ 3000} />
      <img
        style={{ width: "110px", height: "30px" }}
        src={
          "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1920px-Netflix_2015_logo.svg.png"
        }
      />
      <div style={{ position: "fixed", left: "45%", top: "35%" }}>
        <Button onClick={googleSignin} variant="contained" color="error">
          sign in with google
        </Button>
        <br />
        <h2 style={{ color: "white" }}>
          Let's start <br />
          to explore movies
          <br /> from here.
        </h2>
      </div>
    </div>
  );
}

export default Signin;
