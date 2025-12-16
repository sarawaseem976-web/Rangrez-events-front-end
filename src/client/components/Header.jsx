import React from "react";
import Logo from "../../assets/media/logo.png";

const Header = () => {
  return (
    <header className="custom-header">
      <nav className="navbar navbar-expand-lg position-relative">
        <div className="container-fluid p-3">
          {/* Center Logo */}
          <a className="navbar-brand main-logo" href="/">
            <img src={Logo} alt="Logo" className="logo" />
          </a>

          {/* Burger (mobile) */}
          <button
            className="navbar-toggler ms-auto"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainNavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Menu */}
          <div className="collapse navbar-collapse" id="mainNavbar">
            <div className="desktop-menu-wrapper">
              {/* LEFT MENU */}
              <ul className="navbar-nav menu-left align-items-center">
                <li className="nav-item">
                  <a className="nav-link" href="/">
                    HOME
                  </a>
                </li>

                <li className="divider d-none d-lg-block" />

                <li className="nav-item">
                  <a className="nav-link" href="/about">
                    ABOUT US
                  </a>
                </li>

                <li className="divider d-none d-lg-block" />

                <li className="nav-item">
                  <a className="nav-link" href="/services">
                    SERVICES
                  </a>
                </li>
              </ul>

              {/* RIGHT MENU */}
              <ul className="navbar-nav menu-right align-items-center">
                <li className="nav-item">
                  <a className="nav-link" href="/stories">
                    OUR STORIES
                  </a>
                </li>

                <li className="divider d-none d-lg-block" />

                <li className="nav-item">
                  <a className="nav-link" href="/gallery">
                    GALLERY
                  </a>
                </li>

                <li className="divider d-none d-lg-block" />

                <li className="nav-item">
                  <a className="nav-link" href="/contact">
                    CONTACT US
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
