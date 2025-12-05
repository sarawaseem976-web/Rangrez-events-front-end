import React from "react";

function Feature() {
  return (
    <>
      <section className="py-5 bg-light">
        <div className="container text-center">
          <h2 className="fw-bold mb-5">How It Works</h2>

          <div className="row">
            {/* Step 1 */}
            <div className="col-12 col-md-4 mb-4">
              <div
                className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                style={{ width: "80px", height: "80px", background: "#cdd6ff" }}
              >
                <h4 className="fw-bold">01</h4>
              </div>
              <h5 className="fw-bold">Find Events</h5>
              <p className="text-muted mx-auto" style={{ maxWidth: "300px" }}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime,
                rerum big occasion!
              </p>
            </div>

            {/* Step 2 */}
            <div className="col-12 col-md-4 mb-4">
              <div
                className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                style={{ width: "80px", height: "80px", background: "#cdd6ff" }}
              >
                <h4 className="fw-bold">02</h4>
              </div>
              <h5 className="fw-bold">Select Events</h5>
              <p className="text-muted mx-auto" style={{ maxWidth: "300px" }}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime,
                rerum Trick Question!
              </p>
            </div>

            {/* Step 3 */}
            <div className="col-12 col-md-4 mb-4">
              <div
                className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                style={{ width: "80px", height: "80px", background: "#cdd6ff" }}
              >
                <h4 className="fw-bold">03</h4>
              </div>
              <h5 className="fw-bold">Confirm Tickets</h5>
              <p className="text-muted mx-auto" style={{ maxWidth: "300px" }}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime,
                rerum Array too!
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Feature;
