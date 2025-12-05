import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const VerifyTicket = () => {
  const { ticketNumber } = useParams();
  const API = import.meta.env.VITE_API_URL;

  const [loading, setLoading] = useState(true);
  const [ticketData, setTicketData] = useState(null);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    verifyTicket();
  }, [ticketNumber]);

  const verifyTicket = async () => {
    try {
      const res = await axios.get(`${API}/api/booking/verify/${ticketNumber}`);
      setIsValid(res.data.valid);
      setTicketData(res.data.booking);
    } catch (err) {
      setIsValid(false);
      setTicketData(null);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="container text-center mt-5">
        <div className="spinner-border text-primary"></div>
        <p className="mt-3">Verifying Ticket...</p>
      </div>
    );
  }

  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      {/* VALID TICKET */}
      {isValid && ticketData ? (
        <div className="card shadow-lg border-success">
          <div className="card-header bg-success text-white text-center">
            <h3 className="mb-0">✔ Ticket Verified</h3>
          </div>

          <div className="card-body">
            <h5 className="text-success text-center mb-4">
              Ticket #{ticketData.ticketNumber}
            </h5>

            <h6 className="fw-bold">Customer Details</h6>
            <p>
              <b>Name:</b> {ticketData.firstName} {ticketData.lastName}
            </p>
            <p>
              <b>Contact:</b> {ticketData.contactNumber}
            </p>
            <p>
              <b>Email:</b> {ticketData.emailAddress}
            </p>

            <hr />

            <p className="text-center text-muted small">
              This is a valid and authentic ticket.
            </p>
          </div>
        </div>
      ) : (
        /* INVALID TICKET */
        <div className="card shadow-lg border-danger">
          <div className="card-header bg-danger text-white text-center">
            <h3 className="mb-0">✖ Invalid Ticket</h3>
          </div>

          <div className="card-body text-center">
            <h5 className="text-danger mb-3">Ticket Not Found or Fake</h5>
            <p className="text-muted">
              The ticket number <b>{ticketNumber}</b> does not match any record.
            </p>

            <hr />

            <p className="small text-muted">
              Please contact support or check again.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerifyTicket;
