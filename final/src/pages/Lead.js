import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/Login.css";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";

const LoginSchema = Yup.object().shape({
  email: Yup.string().label("Email").required().min(5).max(30),
  password: Yup.string().label("Password").required().min(5).max(30),
});

const Lead = () => {
  const clientid = "909daba4eb0b4c8e8978c71d3cc3685f";
  const redirect_uri = "http://localhost:3000";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";

  const [token, setToken] = useState("");
  const [artist, setArtist] = useState("");
  const [genre, setGenre] = useState("");

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

  const searchTop = async (e) => {
    e.preventDefault();
    const { data } = await axios.get(
      "https://api.spotify.com/v1/me/top/artists",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(data.items[0]);
    setArtist(data.items[0].name);
    setGenre(data.items[0].genres[0]);
  };

  const renderArtist = () => {
    return (
      <div>
        <h2>{artist}</h2>
        <h2>{genre}</h2>
      </div>
    );
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
        <div class="login-body">
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={LoginSchema}
            onSubmit={(values) => {
              // same shape as initial values
              console.log(values);
            }}
          >
            {({ errors, touched }) => (
              <div class="wrapper">
                <Form>
                  <h1>Login</h1>
                  {!token ? (
                    <button
                      href={`${AUTH_ENDPOINT}?client_id=${clientid}&redirect_uri=${redirect_uri}&response_type=${RESPONSE_TYPE}&scope=user-top-read`}
                    >
                      Login to Spotify
                    </button>
                  ) : (
                    <button className="button" onClick={logout}>
                      Logout
                    </button>
                  )}
                  {/* <button onClick={searchTop}>Get Top</button>
                  {renderArtist()} */}
                </Form>
              </div>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};
export default Lead;
