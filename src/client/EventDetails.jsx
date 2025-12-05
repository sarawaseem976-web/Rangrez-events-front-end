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

  const mainImage = event.imageUrl ? `${API}${event.imageUrl}` : null;

  return (
    <>
      <Header />
      <div className="container my-5">
        <div className="row">
          <div className="col-md-8">
            <h2 className="fw-bold mb-3">{event.title}</h2>
            <h5>{event.category}</h5>
            <p>{event.address}</p>
            <p>{event.location}</p>
            <p>{event.date}</p>
            <p>{event.time}</p>
            <p>
              Standard: {event.standardPrice}, VIP: {event.vipPrice}
            </p>
            <p>{event.refreshments}</p>
            <h5>Description: </h5>
            <p>{event.description}</p>
          </div>
          <div className="col-md-4">
            <img src={mainImage} className="img-fluid rounded shadow mb-4" />
            <Link to={`/booking-form/${event._id}`}>
              <button className="btn btn-danger">Book Ticket</button>
            </Link>
            <button className="btn btn-success ms-2">
              Contact at WhatsApp
            </button>
            {/* ⭐ SPONSOR LOGOS */}
            {event?.sponsorLogos && event.sponsorLogos.length > 0 && (
              <section className="py-4">
                <h4 className="fw-bold mb-3">Event Sponsors</h4>

                <div className="row g-3">
                  {event.sponsorLogos.map((logo, index) => (
                    <div className="col-md-4" key={index}>
                      <div className="shadow-sm roundedtext-center">
                        <img
                          src={`${API}${logo}`} // 👈 FIXED — backend already includes /uploads path
                          alt={`Sponsor ${index + 1}`}
                          className="img-fluid   sponsor-logo"
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
