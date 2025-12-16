import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import html2canvas from "html2canvas";
import QRCode from "react-qr-code";
import AdminSidebar from "../client/components/AdminSidebar";

const BookingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL;

  const [booking, setBooking] = useState(null);
  const [event, setEvent] = useState(null);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);

  const token = localStorage.getItem("adminToken");
  const ticketRef = useRef(null);

  // Email Modal
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailData, setEmailData] = useState({
    subject: "",
    message: "",
  });

  useEffect(() => {
    if (!token) {
      navigate("/admin/login");
      return;
    }
    fetchBooking();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // Fetch Booking
  const fetchBooking = async () => {
    try {
      const res = await axios.get(`${API}/api/booking/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setBooking(res.data);
      setStatus(res.data.status);

      // Handle event data (populated or just ID)
      const evtData = res.data?.eventId;
      if (!evtData) {
        setEvent(null);
      } else if (typeof evtData === "object" && evtData._id) {
        // evtData is populated
        setEvent(evtData);
      } else {
        // evtData is just an ID
        fetchEvent(evtData);
      }

      setEmailData({
        subject: "Your Event Ticket ✔",
        message: `Dear ${res.data.firstName},
Your event ticket has been confirmed. 
Below is your E-Ticket card. This is your entry pass.`,
      });
    } catch (err) {
      console.error("Booking Fetch Error:", err);
      setMessage("Failed to load booking details.");
    }
  };

  // Fetch Event by ID
  const fetchEvent = async (eventId) => {
    try {
      const res = await axios.get(`${API}/api/events/${eventId}`);
      setEvent(res.data);
    } catch (err) {
      console.error("Event fetch failed:", err);
      setEvent(null);
    }
  };

  // Update Status
  const updateStatus = async () => {
    try {
      await axios.put(
        `${API}/api/booking/update-status/${id}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage("Status updated successfully!");
      setBooking((prev) => ({ ...prev, status }));
    } catch (err) {
      console.error("Status Update Failed:", err);
      setMessage("Failed to update status.");
    }
  };

  // Download Ticket
  const downloadTicket = async () => {
    if (!ticketRef.current) return;

    try {
      const canvas = await html2canvas(ticketRef.current, {
        scale: 3,
        useCORS: true,
      });

      const image = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = image;
      a.download = `ticket-${booking.ticketNumber}.png`;
      a.click();
    } catch (err) {
      console.error("Download ticket failed:", err);
      alert("Failed to create PNG.");
    }
  };

  // Build Email HTML with Base64 Q

  // const buildEmailTicketHTML = async () => {
  //   const evTitle = event?.title || "";
  //   const evDate = event?.date || "";
  //   const evTime = event?.eventTime || "";
  //   const evLocation = event?.address || "";

  //   // Generate QR BASE64 using QRCode npm package (BEST + RELIABLE on Vercel)
  //   let qrBase64 = "";
  //   try {
  //     qrBase64 = await QRCode.toDataURL(
  //       `${API}/api/booking/verify/${booking.ticketNumber}`,
  //       { width: 200 }
  //     );
  //   } catch (err) {
  //     console.error("QR generation error:", err);
  //     qrBase64 = ""; // fallback
  //   }

  //   return `
  //   <div style="font-family: Arial, Helvetica, sans-serif; background:#f6f6f6; padding:20px;">
  //     <h3>Dear ${booking.firstName} ${booking.lastName},</h3>
  //     <p>Your event ticket has been confirmed. Below is your E-Ticket card. This is your entry pass.</p>

  //     <table width="100%" cellpadding="0" cellspacing="0">
  //       <tr>
  //         <td align="center">
  //           <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:8px; overflow:hidden;">
  //             <tr>
  //               <td style="background:#222831; color:#ffffff; padding:24px; text-align:center;">
  //                 <h2 style="margin:0; font-size:22px;">🎟️ ${evTitle}</h2>
  //                 <p style="margin:4px 0 0; opacity:0.8;">Entry Pass</p>
  //               </td>
  //             </tr>

  //             <tr>
  //               <td style="padding:20px;">
  //                 <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e9e9e9; border-radius:6px;">
  //                   <tr>
  //                     <td style="padding:16px; width:65%; vertical-align:top;">
  //                       <p><strong>Ticket No:</strong> ${
  //                         booking.ticketNumber
  //                       }</p>
  //                       <p><strong>Name:</strong> ${booking.firstName} ${
  //     booking.lastName
  //   }</p>
  //                       <p><strong>Category:</strong> ${booking.ticketType}</p>
  //                       <p><strong>City:</strong> ${booking.cityName || ""}</p>
  //                       <p><strong>Date:</strong> ${evDate}</p>
  //                       <p><strong>Time:</strong> ${evTime}</p>
  //                       <p><strong>Location:</strong> ${evLocation}</p>
  //                     </td>

  //                     <td style="padding:16px; width:35%; text-align:center; vertical-align:middle;">
  //                       <p style="margin-bottom:8px; font-size:12px; color:#666;">Scan QR to verify</p>

  //                       ${
  //                         qrBase64
  //                           ? `<img src="${qrBase64}" alt="QR Code" style="width:140px; height:140px;" />`
  //                           : "<p>No QR Generated</p>"
  //                       }
  //                     </td>
  //                   </tr>
  //                 </table>

  //                 <p style="margin-top:16px; color:#666;">
  //                   Please show this ticket at the entry gate. This ticket is valid for one person only.
  //                 </p>
  //               </td>
  //             </tr>

  //             <tr>
  //               <td style="text-align:center; background:#f7f7f7; padding:14px; color:#777;">
  //                 <small>Thank you for your purchase</small>
  //               </td>
  //             </tr>

  //           </table>
  //         </td>
  //       </tr>
  //     </table>
  //   </div>
  // `;
  // };

  // SEND EMAIL

  const sendEmail = async () => {
    if (!booking) return alert("Booking not loaded.");

    try {
      setSending(true);

      await axios.post(
        `${API}/api/booking/send-email/${booking._id}`,
        {
          subject: emailData.subject || "Your Event Ticket",
          message: emailData.message || "",
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Email sent successfully!");
      setShowEmailModal(false);
    } catch (error) {
      console.error("Send Email Error:", error);
      alert("Failed to send email!");
    } finally {
      setSending(false);
    }
  };

  if (!booking) {
    return (
      <div className="container text-center mt-5">
        <h4>Loading booking details...</h4>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="row">
        <AdminSidebar />
        <main className="col-md-10 ms-sm-auto px-4 py-4">
          <h2 className="mb-3 text-center">Booking Details</h2>
          {message && <div className="alert alert-info">{message}</div>}

          <div className="row">
            <div className="col-md-8 shadow-sm p-5">
              <div className="d-flex justify-content-between">
                <div className="col-md-7">
                  <p className="mb-2">Customer Information</p>
                  <h4 className="text-primary">
                    <b>Ticket #</b> {booking.ticketNumber}
                  </h4>
                  <p>
                    <b>Name:</b> {booking.firstName} {booking.lastName}
                  </p>
                  <p>
                    <b>Contact:</b> {booking.contactNumber}
                  </p>
                  <p>
                    <b>Email:</b> {booking.emailAddress}
                  </p>
                  <p>
                    <b>City:</b> {booking.cityName}
                  </p>
                  <p>
                    <b>Ticket Type:</b> {booking.ticketType}
                  </p>
                  <p>
                    <b>Booking Date:</b>{" "}
                    {new Date(booking.createdAt).toLocaleString()}
                  </p>

                  <div className="mt-3">
                    <button
                      className="btn btn-danger mt-3"
                      onClick={() => setShowEmailModal(true)}
                    >
                      Send Email Ticket
                    </button>
                    <button
                      className="btn btn-success mt-3 ms-3"
                      onClick={downloadTicket}
                    >
                      Download Ticket PNG
                    </button>
                  </div>
                </div>

                {/* Receipt */}
                <div className="col-md-5">
                  <h4>Receipt</h4>
                  {booking.receiptImage ? (
                    <img
                      src={booking.receiptImage}
                      alt="Receipt"
                      className="img-fluid rounded mt-2"
                    />
                  ) : (
                    <p>No receipt uploaded</p>
                  )}
                </div>
              </div>

              {/* Ticket Preview */}
              <div className="my-5 text-center">
                <div
                  ref={ticketRef}
                  className="ticket border rounded shadow-lg overflow-hidden bg-white"
                >
                  <div className="bg-dark text-white text-center p-4 position-relative">
                    <h2 className="mb-1">Event Ticket</h2>
                    <p className="mb-0" style={{ opacity: 0.8 }}>
                      Entry Pass
                    </p>
                    <span
                      className="position-absolute top-0 start-0 bg-danger text-white px-3 py-1"
                      style={{ borderBottomRightRadius: "12px" }}
                    >
                      {booking.ticketType}
                    </span>
                  </div>

                  <div className="p-4 bg-white">
                    <div className="row text-start">
                      <div className="col-md-8">
                        <h3 className="fw-bold mb-2">
                          # {booking?.ticketNumber}
                        </h3>
                        <p>
                          <b>Name:</b> {booking.firstName} {booking.lastName}
                        </p>
                        <p>
                          <b>Date:</b> {event?.date}
                        </p>
                        <p>
                          <b>Time:</b> {event?.eventTime}
                        </p>
                        <p>
                          <b>Location:</b> {event?.address}
                        </p>
                        <hr />
                        <p>
                          <b>Ticket No:</b> {booking.ticketNumber}
                        </p>
                        <p>
                          <b>Category:</b> {booking.ticketType}
                        </p>
                      </div>

                      <div className="col-md-4 text-center">
                        <div className="border rounded p-3">
                          <p className="small text-muted mb-2">
                            Scan to verify
                          </p>
                          <QRCode
                            value={`${API}/api/booking/verify/${booking.ticketNumber}`}
                            size={120}
                            level="H"
                            includeMargin={true}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-light text-center p-2 border-top">
                    <small className="text-muted">
                      Thank you for your purchase
                    </small>
                  </div>
                </div>
              </div>
            </div>

            {/* Event Info */}
            <div className="col-md-4 p-5" style={{ background: "#efefefff" }}>
              <h4 className="mb-3">Event Information</h4>
              {!event ? (
                <p className="text-danger">Event details not found.</p>
              ) : (
                <>
                  <p>
                    <b>Event Name:</b> {event.title}
                  </p>
                  <p>
                    <b>Category:</b> {event.category}
                  </p>
                  <p>
                    <b>Standard Price:</b> ${event.standardPrice}
                  </p>
                  <p>
                    <b>VIP Price:</b> ${event.vipPrice}
                  </p>
                  <p>
                    <b>Date:</b> {event.date}
                  </p>
                  <p>
                    <b>Time:</b> {event.eventTime}
                  </p>
                  <p>
                    <b>Address:</b> {event.address}
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Email Modal */}
          {showEmailModal && (
            <div
              className="modal d-block"
              tabIndex="-1"
              style={{ background: "rgba(0,0,0,0.6)" }}
            >
              <div className="modal-dialog modal-lg">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Send Email Ticket</h5>
                    <button
                      className="btn-close"
                      onClick={() => setShowEmailModal(false)}
                    ></button>
                  </div>

                  <div className="modal-body">
                    <label className="form-label">Subject</label>
                    <input
                      type="text"
                      disabled
                      className="form-control mb-3"
                      value={emailData.subject}
                    />

                    <label className="form-label">Message</label>
                    <textarea
                      className="form-control mb-4"
                      disabled
                      rows="4"
                      value={emailData.message}
                    />

                    <h5 className="mb-3">Ticket Preview (Email Version)</h5>
                    <div
                      id="email-ticket-template"
                      className="border rounded shadow-sm p-3 bg-white"
                    >
                      <div className="bg-dark text-white text-center p-3 position-relative">
                        <h4 className="mb-1">{event?.title}</h4>
                        <p style={{ opacity: 0.7 }}>Entry Pass</p>
                        <span
                          className="position-absolute top-0 start-0 bg-danger text-white px-3 py-1"
                          style={{ borderBottomRightRadius: "12px" }}
                        >
                          {booking.ticketType}
                        </span>
                      </div>
                      <div className="p-3 bg-white row justify-content-between">
                        <div className="col-md-8">
                          <h5>
                            <b>Ticket No:</b> {booking.ticketNumber}
                          </h5>
                          <p>
                            <b>Name:</b> {booking.firstName} {booking.lastName}
                          </p>
                          <p>
                            <b>Date:</b> {event?.date}
                          </p>
                          <p>
                            <b>Time:</b> {event?.eventTime}
                          </p>
                          <p>
                            <b>Location:</b> {event?.address}
                          </p>
                          <hr />
                          <p>
                            <b>Category:</b> {booking.ticketType}
                          </p>
                        </div>
                        <div className="col-md-4 text-center">
                          <div className="border rounded p-3">
                            <p className="small text-muted mb-2">
                              Scan to verify
                            </p>
                            <QRCode
                              value={`${API}/api/booking/verify/${booking.ticketNumber}`}
                              size={120}
                              level="H"
                              includeMargin={true}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="bg-light text-center p-2 border-top">
                        <small className="text-muted">
                          Thank you for your purchase
                        </small>
                      </div>
                    </div>
                  </div>

                  <div className="modal-footer">
                    <button
                      className="btn btn-secondary"
                      onClick={() => setShowEmailModal(false)}
                    >
                      Close
                    </button>
                    <button
                      className="btn btn-success"
                      onClick={sendEmail}
                      disabled={sending}
                    >
                      {sending ? "Sending..." : "Send Email"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default BookingDetails;
