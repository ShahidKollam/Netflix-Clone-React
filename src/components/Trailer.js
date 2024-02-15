import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { Button } from "@mui/material";
import YouTube from "react-youtube";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

function Trailer({ location, movieId }) {
    

    const [trailerView, setTrailerView] = useState([]);
    

  const showTrailer = () => {
    if (location || movieId) {
      fetch(
        `https://api.themoviedb.org/3/movie/${movieId ? movieId : location?.state?.movie?.id}/videos?api_key=9d6b6d270dbe23628e9b8f45a49da974&language=en-US`
      )
        .then((res) => res.json())
        .then((json) => {
            console.log(json); // Log the response data
            setTrailerView(json.results);
          })
                  .catch((error) => console.error(error));
        
    } else {
      console.error("Movie information is not available in location state.");
    }
  };

  useEffect(() => {
    showTrailer();
  }, []);

  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <Button
        variant="contained"
        sx={{ color: "black", bgcolor: "white" }}
        onClick={openModal}
      >
        Play Trailer
      </Button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}></h2>
        {trailerView.length > 0 && <YouTube videoId={trailerView[0]?.key} />}

      </Modal>
    </div>
  );
}

export default Trailer;
