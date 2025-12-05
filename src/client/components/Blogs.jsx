import React from "react";

function Blogs() {
  return (
    <>
      <section className=" py-5">
        <div className="container">
          <h2 className="fw-bold mb-4 text-center">Recent Blogs</h2>

          <div className="row">
            <div className="col-12 col-md-4 mb-4">
              <div
                className="card shadow-sm border-0"
                style={{ borderRadius: "12px" }}
              >
                {/* Image */}
                <img
                  src="https://images.unsplash.com/photo-1506157786151-b8491531f063"
                  className="card-img-top"
                  alt="Event"
                  style={{
                    borderTopLeftRadius: "12px",
                    borderTopRightRadius: "12px",
                  }}
                />

                {/* Body */}
                <div className="card-body">
                  <h5 className="fw-bold mb-2">Extreme Concert & Shows</h5>

                  <p className="text-muted mb-3" style={{ fontSize: "14px" }}>
                    Concerts are a beloved form of entertainment for music
                    lovers of all ages. From intimate perfor..
                  </p>

                  <hr />

                  {/* Footer Row */}
                  <div className="d-flex justify-content-between align-items-center">
                    {/* Date */}
                    <div
                      className="d-flex align-items-center text-muted"
                      style={{ fontSize: "14px" }}
                    >
                      <i className="bi bi-clock me-2"></i>
                      18-03-2023
                    </div>

                    {/* Share Icon */}
                    <i
                      className="bi bi-share text-muted"
                      style={{ cursor: "pointer" }}
                    ></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-4 mb-4">
              <div
                className="card shadow-sm border-0"
                style={{ borderRadius: "12px" }}
              >
                {/* Image */}
                <img
                  src="https://images.unsplash.com/photo-1506157786151-b8491531f063"
                  className="card-img-top"
                  alt="Event"
                  style={{
                    borderTopLeftRadius: "12px",
                    borderTopRightRadius: "12px",
                  }}
                />

                {/* Body */}
                <div className="card-body">
                  <h5 className="fw-bold mb-2">Extreme Concert & Shows</h5>

                  <p className="text-muted mb-3" style={{ fontSize: "14px" }}>
                    Concerts are a beloved form of entertainment for music
                    lovers of all ages. From intimate perfor..
                  </p>

                  <hr />

                  {/* Footer Row */}
                  <div className="d-flex justify-content-between align-items-center">
                    {/* Date */}
                    <div
                      className="d-flex align-items-center text-muted"
                      style={{ fontSize: "14px" }}
                    >
                      <i className="bi bi-clock me-2"></i>
                      18-03-2023
                    </div>

                    {/* Share Icon */}
                    <i
                      className="bi bi-share text-muted"
                      style={{ cursor: "pointer" }}
                    ></i>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-4 mb-4">
              <div
                className="card shadow-sm border-0"
                style={{ borderRadius: "12px" }}
              >
                {/* Image */}
                <img
                  src="https://images.unsplash.com/photo-1506157786151-b8491531f063"
                  className="card-img-top"
                  alt="Event"
                  style={{
                    borderTopLeftRadius: "12px",
                    borderTopRightRadius: "12px",
                  }}
                />

                {/* Body */}
                <div className="card-body">
                  <h5 className="fw-bold mb-2">Extreme Concert & Shows</h5>

                  <p className="text-muted mb-3" style={{ fontSize: "14px" }}>
                    Concerts are a beloved form of entertainment for music
                    lovers of all ages. From intimate perfor..
                  </p>

                  <hr />

                  {/* Footer Row */}
                  <div className="d-flex justify-content-between align-items-center">
                    {/* Date */}
                    <div
                      className="d-flex align-items-center text-muted"
                      style={{ fontSize: "14px" }}
                    >
                      <i className="bi bi-clock me-2"></i>
                      18-03-2023
                    </div>

                    {/* Share Icon */}
                    <i
                      className="bi bi-share text-muted"
                      style={{ cursor: "pointer" }}
                    ></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Blogs;
