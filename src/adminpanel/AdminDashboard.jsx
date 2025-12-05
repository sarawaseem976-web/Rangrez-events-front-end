// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const AdminDashboard = () => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem("adminToken");
//     if (!token) navigate("/admin/login");
//   }, [navigate]);

//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>Admin Dashboard</h1>
//       <button onClick={() => navigate("/admin/create-event")}>
//         Create New Event
//       </button>
//       <button
//         onClick={() => {
//           localStorage.removeItem("adminToken");
//           navigate("/admin/login");
//         }}
//       >
//         Logout
//       </button>
//     </div>
//   );
// };

// export default AdminDashboard;

import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  console.log(events.length);

  const token = localStorage.getItem("adminToken");
  // Auth check
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) navigate("/admin/login");
  }, [navigate]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/events`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        // If API returns an array of events
        setEvents(res.data);

        // If API returns { events: [...], total: n }
        // setEvents(res.data.events);
      } catch (err) {
        console.error("Failed to fetch events:", err);
      }
    };

    fetchEvents();
  }, [token]);

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <nav className="col-md-2 d-none d-md-block bg-dark sidebar p-3 min-vh-100 text-white">
          <h4 className="text-center mb-4">Admin Panel</h4>
          <ul className="nav flex-column">
            <li className="nav-item mb-2">
              <button
                className="btn btn-dark w-100 text-start d-flex align-items-center"
                onClick={() => navigate("/admin/dashboard")}
              >
                <i className="bi bi-speedometer2 me-2"></i> Dashboard
              </button>
            </li>
            <li className="nav-item mb-2">
              <button
                className="btn btn-dark w-100 text-start d-flex align-items-center"
                onClick={() => navigate("/admin/create-event")}
              >
                <i className="bi bi-calendar-plus me-2"></i> Create Event
              </button>
            </li>
            <li className="nav-item mb-2">
              <button
                className="btn btn-dark w-100 text-start d-flex align-items-center"
                onClick={() => navigate("/admin/event-list")}
              >
                <i class="bi bi-list me-2"></i> Event List
              </button>
            </li>
            <li className="nav-item mt-4">
              <button
                className="btn btn-danger w-100 text-start d-flex align-items-center"
                onClick={() => {
                  localStorage.removeItem("adminToken");
                  navigate("/admin/login");
                }}
              >
                <i className="bi bi-box-arrow-right me-2"></i> Logout
              </button>
            </li>
          </ul>
        </nav>

        {/* Main Content */}
        <main className="col-md-10 ms-sm-auto px-4 py-4">
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
            <h2>Welcome to Admin Dashboard</h2>
          </div>

          {/* Action Buttons */}
          <div className="mb-4">
            <button
              className="btn btn-primary me-2"
              onClick={() => navigate("/admin/create-event")}
            >
              <i className="bi bi-calendar-plus me-1"></i> Create New Event
            </button>
            <button
              className="btn btn-danger"
              onClick={() => {
                localStorage.removeItem("adminToken");
                navigate("/admin/login");
              }}
            >
              <i className="bi bi-box-arrow-right me-1"></i> Logout
            </button>
          </div>

          {/* Dashboard Cards */}
          <div className="row g-4">
            <div className="col-md-3">
              <div className="card text-white bg-primary">
                <div className="card-body d-flex align-items-center">
                  <i className="bi bi-people fs-1 me-3"></i>
                  <div>
                    <h5 className="card-title">Users</h5>
                    <p className="card-text fs-4">1,245</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card text-white bg-success">
                <div className="card-body d-flex align-items-center">
                  <i className="bi bi-calendar-event fs-1 me-3"></i>
                  <div>
                    <h5 className="card-title">Events</h5>
                    <p className="card-text fs-4">{events.length}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card text-white bg-warning">
                <div className="card-body d-flex align-items-center">
                  <i className="bi bi-currency-dollar fs-1 me-3"></i>
                  <div>
                    <h5 className="card-title">Sales</h5>
                    <p className="card-text fs-4">$8,342</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card text-white bg-danger">
                <div className="card-body d-flex align-items-center">
                  <i className="bi bi-chat-left-text fs-1 me-3"></i>
                  <div>
                    <h5 className="card-title">Feedback</h5>
                    <p className="card-text fs-4">87</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Inline CSS */}
      <style>{`
        .sidebar button:hover {
          background-color: #495057;
          color: white;
        }
        .card:hover {
          transform: scale(1.03);
          transition: 0.3s;
          box-shadow: 0 5px 20px rgba(0,0,0,0.1);
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;
