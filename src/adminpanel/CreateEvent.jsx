import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateEvent = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    category: "",
    address: "",
    standardPrice: "",
    vipPrice: "",
    eventTime: "",
    refreshments: "",
    location: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [sponsorFiles, setSponsorFiles] = useState([]);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        setMessage("Admin token missing — please login again.");
        return;
      }

      const formData = new FormData();

      // Append all text fields
      Object.keys(form).forEach((key) => {
        formData.append(key, form[key]);
      });

      // Append event image
      if (imageFile) {
        formData.append("imageUrl", imageFile);
      }

      // Append sponsor logos
      sponsorFiles.forEach((file) => {
        formData.append("sponsorLogos", file);
      });

      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/events/add`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setMessage("🎉 Event created successfully!");

      // Reset form
      setForm({
        title: "",
        description: "",
        date: "",
        category: "",
        address: "",
        standardPrice: "",
        vipPrice: "",
        eventTime: "",
        refreshments: "",
        location: "",
      });

      setImageFile(null);
      setSponsorFiles([]);
    } catch (err) {
      console.error("Event creation error:", err);
      setMessage(err.response?.data?.message || "Failed to create event");
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
          <h2>Create New Event</h2>

          {message && (
            <div
              className={`alert ${
                message.includes("success") ? "alert-success" : "alert-danger"
              }`}
            >
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-4">
            {/* Title */}
            <div className="mb-3">
              <label className="form-label">Title</label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                required
                className="form-control"
              />
            </div>

            {/* Description */}
            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                required
                className="form-control"
              ></textarea>
            </div>

            {/* Category */}
            <div className="mb-3">
              <label className="form-label">Category</label>
              <input
                type="text"
                name="category"
                value={form.category}
                onChange={handleChange}
                required
                className="form-control"
              />
            </div>

            {/* Address */}
            <div className="mb-3">
              <label className="form-label">Address</label>
              <input
                type="text"
                name="address"
                value={form.address}
                onChange={handleChange}
                required
                className="form-control"
              />
            </div>

            {/* Location */}
            <div className="mb-3">
              <label className="form-label">Location</label>
              <input
                type="text"
                name="location"
                value={form.location}
                onChange={handleChange}
                required
                className="form-control"
              />
            </div>

            {/* Standard Price */}
            <div className="mb-3">
              <label className="form-label">Standard Price</label>
              <input
                type="text"
                name="standardPrice"
                value={form.standardPrice}
                onChange={handleChange}
                required
                className="form-control"
              />
            </div>

            {/* VIP Price */}
            <div className="mb-3">
              <label className="form-label">VIP Price</label>
              <input
                type="text"
                name="vipPrice"
                value={form.vipPrice}
                onChange={handleChange}
                required
                className="form-control"
              />
            </div>

            {/* Event Time */}
            <div className="mb-3">
              <label className="form-label">Event Time</label>
              <input
                type="text"
                name="eventTime"
                value={form.eventTime}
                onChange={handleChange}
                placeholder="7:00 PM - 10:00 PM"
                className="form-control"
              />
            </div>

            {/* Refreshments */}
            <div className="mb-3">
              <label className="form-label">Refreshments</label>
              <input
                type="text"
                name="refreshments"
                value={form.refreshments}
                onChange={handleChange}
                placeholder="Snacks, Drinks, etc."
                className="form-control"
              />
            </div>

            {/* Main Image */}
            <div className="mb-3">
              <label className="form-label">Event Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files[0])}
                className="form-control"
              />
            </div>

            {/* Sponsor Logos */}
            <div className="mb-3">
              <label className="form-label">Sponsor Logos (Multiple)</label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => setSponsorFiles([...e.target.files])}
                className="form-control"
              />
            </div>

            {/* Date */}
            <div className="mb-3">
              <label className="form-label">Event Date</label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                required
                className="form-control"
              />
            </div>

            <button type="submit" className="btn btn-success">
              Create Event
            </button>
          </form>
        </main>
      </div>
    </div>
  );
};

export default CreateEvent;
