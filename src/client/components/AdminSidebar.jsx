import React from "react";
import { useNavigate } from "react-router-dom";

function AdminSidebar() {
  const navigate = useNavigate();
  return (
    <>
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
              onClick={() => navigate("/admin/booking-list")}
            >
              <i class="bi bi-list me-2"></i> Booking List
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
    </>
  );
}

export default AdminSidebar;
