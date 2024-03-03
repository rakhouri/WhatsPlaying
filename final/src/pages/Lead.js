import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/Login.css";

const Lead = () => {
  const clientid = "909daba4eb0b4c8e8978c71d3cc3685f";
  const redirect_uri = "http://localhost:3000/lead";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";

  const [token, setToken] = useState("");
  const [artists, setArtists] = useState([]);
  const [genres, setGenres] = useState([]);
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];

      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }

    setToken(token);
    console.log(token);
  }, []);

  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
  };

  const searchArtists = async (e) => {
    e.preventDefault();
    const { data } = await axios.get(
      "https://api.spotify.com/v1/me/top/artists",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const topArtists = data.items.slice(0, 5); // Get the top 3 artists
    const artistNames = topArtists.map((artist) => artist.name); // Extract artist names
    const artistGenres = topArtists.map((artist) => artist.genres[0]); // Extract genres

    searchTracks();
    setArtists(artistNames);
    setGenres(artistGenres);
  };

  const searchTracks = async () => {
    const { data } = await axios.get(
      "https://api.spotify.com/v1/me/top/tracks",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(data.items[0].name);
    const topTracks = data.items.slice(0, 5); // Get the top 3 artists
    const trackNames = topTracks.map((track) => track.name); // Extract artist names

    setTracks(trackNames);
  };

  const renderArtist = () => {

    const artistNames = artists.map((artist) => <h1>{artist}</h1>);
    const trackNames = tracks.map((track) => <h1>{track}</h1>);
    const genreNames = genres.map((genre) => <h1>{genre}</h1>)
    
    if (artistNames.length > 0) {
      return (
        <>
        <div className="output">
          {artistNames}
          {trackNames}
          {genreNames}
        </div>
        </>
      );
    }
  };

  // const renderArtists = () => {
  //   return artists.map((artist) => (
  //     <div key={artist.id}>
  //       {artist.images.length ? (
  //         <img width={"100%"} src={artist.images[0].url} alt="" />
  //       ) : (
  //         <div>No Image</div>
  //       )}
  //       {artist.name}
  //     </div>
  //   ));
  // };

  return (
    <>
      <div>
        {!token ? (
          <>
            <div class="login-body">
              <div class="wrapper">
                <h1>Login:</h1>
                <button
                  className="button"
                  onClick={() =>
                    (window.location.href = `${AUTH_ENDPOINT}?client_id=${clientid}&redirect_uri=${redirect_uri}&response_type=${RESPONSE_TYPE}&scope=user-top-read`)
                  }
                >
                  Login to Spotify
                </button>
              </div>
            </div>
          </>
        ) : (
          <button className="logbutton" onClick={logout}>
            Logout
          </button>
        )}
        <button className='top'onClick={searchArtists}>Get Top</button>
        {renderArtist()}
      </div>
    </>
  );
};

export default Lead;
