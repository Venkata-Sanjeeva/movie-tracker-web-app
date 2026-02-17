import React from "react";

const Loader = ({ text = "Loading..." }) => {
  return (
    <div className="text-center py-5">
      <div
        className="spinner-border text-info"
        style={{ width: "4rem", height: "4rem" }}
        role="status"
      ></div>

      <p className="mt-3 text-secondary fw-semibold">{text}</p>
    </div>
  );
};

export default Loader;
