import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import AdminSidebar from "../client/components/AdminSidebar";

const EditEvent = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const token = localStorage.getItem("adminToken");

  const [event, setEvent] = useState({
    title: "",
    description: "",
    date: "",
    category: "",
    address: "",
    location: "",
    standardPrice: "",
    vipPrice: "",
    eventTime: "",
    refreshments: "",
    imageUrl: "",
    sponsorLogos: [],
  });

  const [newImage, setNewImage] = useState(null);
  const [newSponsors, setNewSponsors] = useState([]);
  const [previewImage, setPreviewImage] = useState("");
  const [previewSponsors, setPreviewSponsors] = useState([]);

  const [message, setMessage] = useState("");

  // Redirect if token missing
  useEffect(() => {
    if (!token) navigate("/admin/login");
  }, [navigate, token]);

  // Fetch event
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/events/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setEvent(res.data);

        // Set preview images (Cloudinary URLs)
        setPreviewImage(res.data.imageUrl || "");
        setPreviewSponsors(res.data.sponsorLogos || []);
      } catch (err) {
        console.error(err);
        setMessage("Failed to load event details.");
      }
    };

    fetchEvent();
  }, [id, token]);

  // Handle text input change
  const handleChange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  // Handle main image
  const handleMainImage = (e) => {
    const file = e.target.files[0];
    setNewImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  // Handle sponsor logos
  const handleSponsorImages = (e) => {
    const files = [...e.target.files];
    setNewSponsors(files);

    const previews = files.map((file) => URL.createObjectURL(file));
    setPreviewSponsors(previews);
  };

  // Submit update
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      // Append all text fields
      Object.keys(event).forEach((key) => {
        if (key !== "imageUrl" && key !== "sponsorLogos") {
          formData.append(key, event[key]);
        }
      });

      // Append main image if updated
      if (newImage) formData.append("imageUrl", newImage);

      // Append sponsor logos if updated
      newSponsors.forEach((file) => {
        formData.append("sponsorLogos", file);
      });

      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/events/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setMessage("Event updated successfully!");
      setTimeout(() => navigate("/admin/event-list"), 1500);
    } catch (err) {
      console.error(err);
      setMessage("Failed to update event.");
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <AdminSidebar />
        {/* Main Content */}
        <main className="col-md-10 ms-sm-auto px-4 py-4">
          <h2>Edit Event</h2>
          {message && <div className="alert alert-info mt-2">{message}</div>}

          <form onSubmit={handleSubmit} className="mt-4">
            {/* Title */}
            <div className="mb-3">
              <label className="form-label">Title</label>
              <input
                type="text"
                className="form-control"
                name="title"
                value={event.title}
                onChange={handleChange}
                required
              />
            </div>

            {/* Description */}
            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea
                name="description"
                className="form-control"
                rows="3"
                value={event.description}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            {/* Category */}
            <div className="mb-3">
              <label className="form-label">Category</label>
              <input
                type="text"
                className="form-control"
                name="category"
                value={event.category}
                onChange={handleChange}
              />
            </div>

            {/* Address */}
            <div className="mb-3">
              <label className="form-label">Address</label>
              <input
                type="text"
                className="form-control"
                name="address"
                value={event.address}
                onChange={handleChange}
              />
            </div>

            {/* Location */}
            <div className="mb-3">
              <label className="form-label">Location</label>
              <input
                type="text"
                className="form-control"
                name="location"
                value={event.location}
                onChange={handleChange}
              />
            </div>

            {/* Prices */}
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Standard Price</label>
                <input
                  type="text"
                  className="form-control"
                  name="standardPrice"
                  value={event.standardPrice}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">VIP Price</label>
                <input
                  type="text"
                  className="form-control"
                  name="vipPrice"
                  value={event.vipPrice}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Event Time */}
            <div className="mb-3">
              <label className="form-label">Event Time</label>
              <input
                type="text"
                className="form-control"
                name="eventTime"
                value={event.eventTime}
                onChange={handleChange}
              />
            </div>

            {/* Refreshments */}
            <div className="mb-3">
              <label className="form-label">Refreshments</label>
              <input
                type="text"
                className="form-control"
                name="refreshments"
                value={event.refreshments}
                onChange={handleChange}
              />
            </div>

            {/* Date */}
            <div className="mb-3">
              <label className="form-label">Event Date</label>
              <input
                type="date"
                className="form-control"
                name="date"
                value={event.date}
                onChange={handleChange}
              />
            </div>

            {/* Main Image */}
            <div className="mb-3">
              <label className="form-label">Event Image</label>
              <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={handleMainImage}
              />
            </div>

            {previewImage && (
              <div className="mb-3">
                <img
                  src={previewImage}
                  alt="Event"
                  style={{
                    width: "180px",
                    borderRadius: "8px",
                    border: "1px solid #ddd",
                  }}
                />
              </div>
            )}

            {/* Sponsor Logos */}
            <div className="mb-3">
              <label className="form-label">Sponsor Logos</label>
              <input
                type="file"
                className="form-control"
                accept="image/*"
                multiple
                onChange={handleSponsorImages}
              />
            </div>

            {/* Sponsor Preview */}
            <div className="d-flex flex-wrap gap-3">
              {previewSponsors.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt="Sponsor"
                  style={{
                    height: "80px",
                    borderRadius: "5px",
                    border: "1px solid #ddd",
                  }}
                />
              ))}
            </div>

            {/* Submit */}
            <button type="submit" className="btn btn-primary w-100 mt-4">
              Update Event
            </button>
          </form>
        </main>
      </div>
    </div>
  );
};

export default EditEvent;
