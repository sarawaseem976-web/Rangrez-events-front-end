import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Header from "./components/Header";

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL;

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchEvent = async () => {
    try {
      // Try common route
      let res = await axios.get(`${API}/api/events/${id}`);
      setEvent(res.data);
    } catch {
      try {
        // Try alternative backend naming
        let res = await axios.get(`${API}/api/event/${id}`);
        setEvent(res.data);
      } catch (error) {
        console.error("Event Fetch Failed:", error);
        setEvent(null);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchEvent();
  }, [id]);

  if (loading) return <p className="text-center mt-5">Loading event...</p>;

  if (!event)
    return (
      <div className="text-center mt-5 text-danger">
        <h4>Event not found</h4>
        <button
          className="btn btn-secondary mt-3"
          onClick={() => navigate("/")}
        >
          Back to Home
        </button>
      </div>
    );

  // ✅ Use Cloudinary URLs directly
  const mainImage =
    event.imageUrl || "https://via.placeholder.com/600x400?text=No+Image";

  return (
    <>
      <Header />
      <div className="container my-5">
        <div className="row">
          {/* Event Info */}
          <div className="col-md-7">
            <h2 className="fw-bold mb-3">{event.title}</h2>
            <h5>{event.category}</h5>
            <p>
              <b>Address: </b>
              {event.address}
              <Link to={event.location} className="ms-3">
                <i class="bi bi-geo-alt"></i>
              </Link>
            </p>
            <p>
              <b className="me-2">Date: </b>
              {event.date}
            </p>
            <p>
              <b className="me-2">Time: </b>
              {event.time || event.eventTime}
            </p>
            <p>
              <b className="me-2">Ticket Type: </b>
              Standard: ${event.standardPrice}, VIP: ${event.vipPrice}
            </p>
            <p>
              <b className="me-2">Refreshments: </b>
              {event.refreshments}
            </p>
            <h3>Description:</h3>
            <p>{event.description}</p>
          </div>

          {/* Event Sidebar */}
          <div className="col-md-5 ps-3">
            <img
              src={mainImage}
              className="img-fluid rounded shadow mb-4"
              alt={event.title}
            />
            <Link to={`/booking-form/${event._id}`}>
              <button className="btn btn-danger w-100 mb-2">Book Ticket</button>
            </Link>
            <button className="btn btn-success w-100 mb-4">
              Contact via WhatsApp
            </button>

            {/* ⭐ Sponsor Logos */}
            {event?.sponsorLogos && event.sponsorLogos.length > 0 && (
              <section className="py-4">
                <h4 className="fw-bold mb-3">Event Sponsors</h4>
                <div className="row g-3">
                  {event.sponsorLogos.map((logo, index) => (
                    <div className="col-md-4 text-center" key={index}>
                      <div className="shadow-sm rounded p-2">
                        <img
                          src={
                            logo ||
                            "https://via.placeholder.com/150x80?text=No+Logo"
                          } // Cloudinary URLs
                          alt={`Sponsor ${index + 1}`}
                          className="img-fluid sponsor-logo"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default EventDetails;
