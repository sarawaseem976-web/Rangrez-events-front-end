import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BookingList = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    if (!token) navigate("/admin/login");
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/booking", {
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
      await axios.delete(`http://localhost:5000/api/booking/${id}`, {
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
        {/* Sidebar */}
        <nav className="col-md-2 d-none d-md-block bg-dark sidebar p-3 min-vh-100 text-white">
          <h4 className="text-center mb-4">Admin Panel</h4>

          <ul className="nav flex-column">
            <li className="nav-item mb-2">
              <button
                className="btn btn-dark w-100 text-start"
                onClick={() => navigate("/admin/dashboard")}
              >
                Dashboard
              </button>
            </li>

            <li className="nav-item mb-2">
              <button
                className="btn btn-dark w-100 text-start"
                onClick={() => navigate("/admin/event-list")}
              >
                Event List
              </button>
            </li>

            <li className="nav-item mb-2">
              <button
                className="btn btn-dark w-100 text-start"
                onClick={() => navigate("/admin/booking-list")}
              >
                Booking List
              </button>
            </li>

            <li className="nav-item mt-4">
              <button
                className="btn btn-danger w-100 text-start"
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
          <h2>Booking List</h2>

          {message && <div className="alert alert-info">{message}</div>}

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
                            src={`http://localhost:5000${b.receiptImage}`}
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

      <style>{`
        .sidebar button:hover {
          background-color: #495057 !important;
        }
      `}</style>
    </div>
  );
};

export default BookingList;
