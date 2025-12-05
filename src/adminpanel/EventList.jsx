import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const EventList = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("adminToken");
  const BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (!token) navigate("/admin/login");
  }, [navigate, token]);

  // Fetch events
  const fetchEvents = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/api/events`);
      setEvents(res.data);
    } catch (err) {
      console.error("Fetch events error:", err);
      setMessage(err.response?.data?.message || "Failed to fetch events.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Delete event
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;

    try {
      await axios.delete(`${BASE_URL}/api/events/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMessage("Event deleted successfully!");
      fetchEvents();
    } catch (err) {
      console.error("Delete event error:", err);
      setMessage(err.response?.data?.message || "Failed to delete event.");
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <nav className="col-md-2 d-none d-md-block bg-dark sidebar p-3 min-vh-100 text-white">
          <h4 className="text-center mb-4">Admin Panel</h4>

          <ul className="nav flex-column">
            <li className="nav-item mb-2">
              <button
                className="btn btn-dark w-100"
                onClick={() => navigate("/admin/dashboard")}
              >
                Dashboard
              </button>
            </li>

            <li className="nav-item mb-2">
              <button
                className="btn btn-dark w-100"
                onClick={() => navigate("/admin/create-event")}
              >
                Create Event
              </button>
            </li>

            <li className="nav-item mb-2">
              <button
                className="btn btn-dark w-100"
                onClick={() => navigate("/admin/event-list")}
              >
                Event List
              </button>
            </li>

            <li className="nav-item mt-4">
              <button
                className="btn btn-danger w-100"
                onClick={() => {
                  localStorage.removeItem("adminToken");
                  navigate("/admin/login");
                }}
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>

        {/* Main Content */}
        <main className="col-md-10 ms-sm-auto px-4 py-4">
          <h2>All Events</h2>

          {message && <div className="alert alert-info mt-2">{message}</div>}

          {loading ? (
            <p className="mt-3">Loading events...</p>
          ) : events.length === 0 ? (
            <p className="mt-3">No events found.</p>
          ) : (
            <div className="table-responsive mt-3">
              <table className="table table-striped table-bordered align-middle">
                <thead className="table-dark">
                  <tr>
                    <th>Image</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Date</th>
                    <th>Category</th>
                    <th>Address</th>
                    <th>Location</th>
                    <th>Standard Price</th>
                    <th>VIP Price</th>
                    <th>Time</th>
                    <th>Refreshments</th>
                    <th>Sponsor Logos</th>
                    <th>Created At</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {events.map((event) => {
                    const mainImage = event.imageUrl
                      ? `${BASE_URL}${event.imageUrl}`
                      : null;

                    return (
                      <tr key={event._id}>
                        {/* Image */}
                        <td>
                          {mainImage ? (
                            <img
                              src={mainImage}
                              alt={event.title}
                              style={{
                                width: "80px",
                                height: "60px",
                                objectFit: "cover",
                                borderRadius: "5px",
                              }}
                            />
                          ) : (
                            "No Image"
                          )}
                        </td>

                        <td>{event.title}</td>
                        <td>{event.description}</td>
                        <td>{event.date}</td>
                        <td>{event.category}</td>
                        <td>{event.address}</td>
                        <td>{event.location}</td>
                        <td>${event.standardPrice}</td>
                        <td>${event.vipPrice}</td>
                        <td>{event.eventTime || "N/A"}</td>
                        <td>{event.refreshments || "N/A"}</td>

                        {/* Sponsor Logos */}
                        <td>
                          {event.sponsorLogos?.length > 0
                            ? event.sponsorLogos.map((logo, index) => (
                                <img
                                  key={index}
                                  src={`${BASE_URL}${logo}`}
                                  alt="Sponsor"
                                  style={{
                                    width: "40px",
                                    height: "40px",
                                    marginRight: "4px",
                                    borderRadius: "4px",
                                    border: "1px solid #ccc",
                                  }}
                                />
                              ))
                            : "No Sponsors"}
                        </td>

                        <td>
                          {new Date(event.createdAt).toLocaleDateString()}
                        </td>

                        <td>
                          <button
                            className="btn btn-sm btn-warning me-2"
                            onClick={() =>
                              navigate(`/admin/edit-event/${event._id}`, {
                                state: event,
                              })
                            }
                          >
                            Edit
                          </button>

                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => handleDelete(event._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </main>
      </div>

      <style>{`
        .sidebar button:hover {
          background-color: #495057;
          color: white;
        }
      `}</style>
    </div>
  );
};

export default EventList;
