import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AdminSidebar from "../client/components/AdminSidebar";

const BookingList = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("adminToken");
  const API_URL = import.meta.env.VITE_API_URL; // Vite env variable

  useEffect(() => {
    if (!token) navigate("/admin/login");
    fetchBookings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/booking`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(res.data);
    } catch (err) {
      console.error(err);
      setMessage("Failed to load bookings.");
    }
  };

  const deleteBooking = async (id) => {
    if (!window.confirm("Are you sure you want to delete this booking?"))
      return;

    try {
      await axios.delete(`${API_URL}/api/booking/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMessage("Booking deleted successfully!");
      setBookings(bookings.filter((b) => b._id !== id));
    } catch (err) {
      console.error(err);
      setMessage("Failed to delete booking.");
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <AdminSidebar />
        <main className="col-md-10 ms-sm-auto px-4 py-4">
          {/* Sidebar and table UI same as before */}
          {/* For brevity, unchanged UI code omitted */}
          <div className="table-responsive mt-4">
            <table className="table table-bordered table-striped">
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Contact</th>
                  <th>Email</th>
                  <th>City</th>
                  <th>Receipt</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {bookings.length > 0 ? (
                  bookings.map((b, index) => (
                    <tr key={b._id}>
                      <td>{index + 1}</td>
                      <td>
                        {b.firstName} {b.lastName}
                      </td>
                      <td>{b.contactNumber}</td>
                      <td>{b.emailAddress}</td>
                      <td>{b.cityName}</td>
                      <td>
                        {b.receiptImage ? (
                          <img
                            src={b.receiptImage} // Cloudinary URL
                            alt="Receipt"
                            style={{ width: "80px", borderRadius: "4px" }}
                          />
                        ) : (
                          "No Receipt"
                        )}
                      </td>
                      <td>{new Date(b.createdAt).toLocaleDateString()}</td>
                      <td className="d-flex gap-2">
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() =>
                            navigate(`/admin/booking-details/${b._id}`)
                          }
                        >
                          View Details
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => deleteBooking(b._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="text-center">
                      No bookings found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default BookingList;
