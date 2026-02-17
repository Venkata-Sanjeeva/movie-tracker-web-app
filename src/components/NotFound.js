import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="container text-center mt-5">
      <div className="py-5">
        <h1 className="display-1 fw-bold text-info">404</h1>

        <h2 className="fw-bold text-white mt-3">
          Oops! This scene doesn't exist.
        </h2>

        <p className="lead text-secondary mt-3">
          Looks like you wandered into a deleted movie clip.
          <br />
          Let's get you back to the main screen.
        </p>

        <div className="mt-4">
          <Link to="/" className="btn btn-info btn-lg px-5 fw-bold me-3">
            Back to Home
          </Link>

          <Link to="/dashboard" className="btn btn-outline-light btn-lg px-5">
            Go to Library
          </Link>
        </div>
      </div>

      <div className="mt-5 text-secondary">
        <p className="fst-italic">
          🎬 "Every great story has a missing scene..."
        </p>
      </div>
    </div>
  );
};

export default NotFound;
