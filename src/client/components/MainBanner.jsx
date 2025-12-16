import React from "react";
import "../../assets/css/style.css";

function MainBanner() {
  return (
    <>
      <section className="bg-dark text-white text-center py-5 bg-image position-relative">
        <div className="overlay"></div>
        <div className="container position-relative pt-5" style={{ zIndex: 2 }}>
          <h1 className="display-4 fw-bold pt-5">
            Discover & Book Amazing Events
          </h1>
          <p className="lead mt-3">
            Concerts, Workshops, Meetups & Festivals — all in one place.
          </p>
          <button className="btn btn-primary btn-lg mt-3">
            Explore Events
          </button>
        </div>
      </section>
    </>
  );
}

export default MainBanner;
