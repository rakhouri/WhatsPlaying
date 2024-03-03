import React from "react";

const Home = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const token = searchParams.get("access_token");
  console.log(token);

  return (
    <>
      <div className="home">Home</div>
    </>
  );
};

export default Home;
