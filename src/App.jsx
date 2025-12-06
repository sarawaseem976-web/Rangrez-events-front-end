import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLogin from "./adminpanel/AdminLogin";
import AdminDashboard from "./adminpanel/AdminDashboard";
import CreateEvent from "./adminpanel/CreateEvent";
import EventList from "./adminpanel/EventList";
import EditEvent from "./adminpanel/EditEvent";
import BookingList from "./adminpanel/BookingList";
import Home from "./client/Home";
import EventDetails from "./client/EventDetails";
import BookingForm from "./client/BookingForm";
import BookingDetails from "./adminpanel/BookingDetails";
import VerifyTicket from "./client/VerifyTicket";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/create-event" element={<CreateEvent />} />
        <Route path="/admin/event-list" element={<EventList />} />
        <Route path="/admin/edit-event/:id" element={<EditEvent />} />

        <Route path="/admin/booking-list" element={<BookingList />} />
        <Route path="/admin/booking-details/:id" element={<BookingDetails />} />

        <Route path="/booking-form/:id" element={<BookingForm />} />

        <Route path="event-details/:id" element={<EventDetails />} />

        <Route path="/verify-ticket/:ticketNumber" element={<VerifyTicket />} />
      </Routes>
    </Router>
  );
}

export default App;
