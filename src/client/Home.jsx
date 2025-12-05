import React from "react";
import Header from "./components/Header";
import EventCards from "./components/EventCards";
import Blogs from "./components/Blogs";
import Footer from "./components/Footer";
import MainBanner from "./components/MainBanner";
import Feature from "./components/Feature";

const Home = () => {
  return (
    <>
      <Header />
      <MainBanner />
      <EventCards />
      <Feature />
      <Blogs />
      <Footer />
    </>
  );
};

export default Home;
