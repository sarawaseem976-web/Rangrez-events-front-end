import React, { useEffect, useState } from "react";
import "../../assets/css/style.css";
import axios from "axios";
import { Link } from "react-router-dom";

function EventCards() {
  const API_URL = import.meta.env.VITE_API_URL; // ✅ Use your environment variable

  const [eventsData, setEventsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const categories = ["All", "Music", "Festival"];
  const [activeCategory, setActiveCategory] = useState("All");

  // ================================
  // ⭐ FETCH EVENTS
  // ================================
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/events`);

        // FIX: backend returns array directly
        setEventsData(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load events");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [API_URL]);

  const filteredEvents =
    activeCategory === "All"
      ? eventsData
      : eventsData.filter((e) => e.category === activeCategory);

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary"></div>
        <p className="mt-2">Loading events...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5 text-center text-danger">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <>
      <section className="container py-5">
        <h2 className="mb-4 fw-bold">Upcoming Events</h2>

        {/* ⭐ CATEGORY TABS */}
        <ul className="nav nav-pills mb-4 gap-2">
          {categories.map((cat) => (
            <li className="nav-item" key={cat}>
              <button
                className={`btn ${
                  activeCategory === cat ? "btn-primary" : "btn-outline-primary"
                }`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            </li>
          ))}
        </ul>

        {/* ⭐ EVENTS GRID */}
        <div className="row g-4">
          {filteredEvents.map((event, index) => {
            const mainImage = event.imageUrl
              ? `${API_URL}${event.imageUrl}`
              : null;
            return (
              <div className="col-md-4 d-flex" key={index}>
                <div className="card event-card shadow-sm h-100 d-flex flex-column">
                  {/* Popular Badge */}
                  {event.isPopular && (
                    <span className="badge bg-primary popular-badge">
                      Popular
                    </span>
                  )}

                  {/* ⭐ Fixed Image Path (uses BASE URL + imageUrl) */}
                  <img
                    src={mainImage}
                    className="card-img-top"
                    alt={event.title}
                  />

                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title fw-bold">{event.title}</h5>

                    <div className="d-flex justify-content-between text-muted small mb-2">
                      <span>
                        <i className="bi bi-ticket-perforated"></i>{" "}
                        {event.category}
                      </span>
                      <span>
                        <i className="bi bi-currency-dollar"></i>{" "}
                        {event.standardPrice}
                      </span>
                    </div>

                    <p className="small text-muted mb-2">
                      <i className="bi bi-geo-alt"></i> {event.location}
                    </p>

                    <div className="d-flex justify-content-between align-items-center small text-muted date-time-box p-2 rounded mb-3">
                      <span>
                        <i className="bi bi-calendar2"></i> {event.date}
                      </span>
                      <span>
                        <i className="bi bi-clock"></i> {event.eventTime}
                      </span>
                    </div>

                    <Link to={`/event-details/${event._id}`}>
                      <button className="btn btn-primary w-100 mt-auto">
                        View More
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}

export default EventCards;
