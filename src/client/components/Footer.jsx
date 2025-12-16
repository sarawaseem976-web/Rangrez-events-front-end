import React from "react";

function Footer() {
  return (
    <>
      <footer className="bg-light pt-5 pb-3 text-center footr-bg">
        {/* Contact Area */}
        <div className="container mb-5">
          <h3 className="fw-bold mb-3">
            Do you have any question?
            <br />
            Feel free to contact me.
          </h3>

          <h2 className="fw-bold text-white mb-4" style={{ fontSize: "40px" }}>
            +44 7305 717891
          </h2>

          <button className="btn btn-warning px-4 py-2 mb-4">
            Send me a message
          </button>

          {/* Menu Links */}
          <div className="d-flex justify-content-center gap-4 mt-3 mb-5">
            <a href="#" className="text-white text-decoration-none">
              Home
            </a>
            <a href="#" className="text-white text-decoration-none">
              Events
            </a>
            <a href="#" className="text-white text-decoration-none">
              Blog
            </a>
            <a href="#" className="text-white text-decoration-none">
              Contact
            </a>
          </div>

          <hr />
        </div>

        {/* Bottom Footer */}
        <div className="container d-flex justify-content-between align-items-center flex-wrap">
          {/* Left Logo */}
          <h2 className="fw-bold text-white m-0">RANGREZ EVENTS</h2>

          {/* Social Icons */}
          <div className="d-flex gap-3">
            <a href="#" className="btn btn-white p-2 rounded">
              <i className="bi bi-facebook text-white"></i>
            </a>
            <a href="#" className="btn btn-white p-2 rounded">
              <i className="bi bi-twitter text-white"></i>
            </a>
            <a href="#" className="btn btn-white p-2 rounded">
              <i className="bi bi-youtube text-white"></i>
            </a>
            <a href="#" className="btn btn-white p-2 rounded">
              <i className="bi bi-whatsapp text-white"></i>
            </a>
          </div>
        </div>

        {/* Copyright */}
        <p className="mt-4">
          © 2025 All right reserved. Made with by Businex Cloud
        </p>
      </footer>
    </>
  );
}

export default Footer;
