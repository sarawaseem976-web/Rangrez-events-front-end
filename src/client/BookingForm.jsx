import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "./components/Header";
import HelloTech from "../assets/media/HelloTech.jpg";

const BookingForm = () => {
  const { id } = useParams(); // EVENT ID
  const API = import.meta.env.VITE_API_URL;

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    contactNumber: "",
    emailAddress: "",
    cityName: "",
    ticketType: "",
    eventId: id, // SEND EVENT ID
  });

  const [receiptImage, setReceiptImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!receiptImage) {
      return setMessage("Please upload a receipt image.");
    }

    try {
      setLoading(true);
      setMessage("");

      const form = new FormData();

      Object.keys(formData).forEach((key) => {
        form.append(key, formData[key]);
      });

      form.append("receiptImage", receiptImage);

      const res = await axios.post(`${API}/api/booking/create`, form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage("Booking submitted successfully!");

      // Reset Form
      setFormData({
        firstName: "",
        lastName: "",
        contactNumber: "",
        emailAddress: "",
        cityName: "",
        ticketType: "",
        eventId: id,
      });

      setReceiptImage(null);
    } catch (err) {
      console.error(err);
      setMessage("Booking failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // ============================
  // FETCH EVENT DETAILS
  // ============================
  const [event, setEvent] = useState(null);

  const fetchEvent = async () => {
    try {
      const res = await axios.get(`${API}/api/events/${id}`);
      setEvent(res.data);
    } catch {
      try {
        const res = await axios.get(`${API}/api/event/${id}`);
        setEvent(res.data);
      } catch (error) {
        console.error("Event Fetch Failed:", error);
        setEvent(null);
      }
    }
  };

  useEffect(() => {
    fetchEvent();
  }, [id]);

  return (
    <>
      <Header />

      <div className="container mt-4" style={{ maxWidth: "600px" }}>
        <h2 className="mb-3 text-center">Event Booking Form</h2>

        {message && <div className="alert alert-info">{message}</div>}

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          {/* First & Last Name */}
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">First Name</label>
              <input
                type="text"
                name="firstName"
                className="form-control"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Last Name</label>
              <input
                type="text"
                name="lastName"
                className="form-control"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Contact */}
          <div className="mb-3">
            <label className="form-label">Contact Number</label>
            <input
              type="text"
              name="contactNumber"
              className="form-control"
              value={formData.contactNumber}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              name="emailAddress"
              className="form-control"
              value={formData.emailAddress}
              onChange={handleChange}
              required
            />
          </div>

          {/* City */}
          <div className="mb-3">
            <label className="form-label">City Name</label>
            <input
              type="text"
              name="cityName"
              className="form-control"
              value={formData.cityName}
              onChange={handleChange}
              required
            />
          </div>

          {/* Ticket Type */}
          <div className="mb-3">
            <label className="form-label">Ticket Type</label>
            <select
              name="ticketType"
              className="form-select"
              value={formData.ticketType}
              onChange={handleChange}
              required
            >
              <option value="">Select Ticket Type</option>
              {event && (
                <>
                  <option value="Standard">
                    Standard – ${event.standardPrice}
                  </option>

                  <option value="VIP">VIP – ${event.vipPrice}</option>
                </>
              )}
            </select>
          </div>

          {/* Receipt Upload */}
          <div className="mb-3">
            <p>
              <b className="text-primary">Manual Payment</b> (Please use our
              Bank Account Details for ticket booking)
            </p>
            <div className="d-flex justify-content-between">
              <div className="">
                <p className="mb-0">Bank Name: Standard Chartard</p>
                <p className="mb-0">Acc Title: Mr. John Doe</p>
                <p className="mb-0">Acc Number: 000000463874637473436</p>
                <h5 className="text-danger">*Upload payment receipt</h5>
              </div>
              <div className="">
                <h6>Or Scan QR Code</h6>
                <img src={HelloTech} style={{ width: "60px" }} />
              </div>
            </div>
            <input
              type="file"
              accept="image/*"
              className="form-control"
              onChange={(e) => setReceiptImage(e.target.files[0])}
              required
            />
          </div>

          <button className="btn btn-primary w-100" disabled={loading}>
            {loading ? "Submitting..." : "Submit Booking"}
          </button>
        </form>
      </div>
    </>
  );
};

export default BookingForm;
