import React, { useEffect, useRef } from "react";
import { Toast } from "bootstrap";

const ToastMessage = ({ message, type }) => {
  const toastRef = useRef(null);

  useEffect(() => {
    if (toastRef.current) {
      const toast = new Toast(toastRef.current);
      toast.show();
    }
  }, [message]);

  if (!message) return null;

  return (
    <div className="toast-container position-fixed top-0 end-0 p-3">
      <div
        ref={toastRef}
        className={`toast align-items-center text-bg-${type} border-0`}
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className="d-flex">
          <div className="toast-body fw-bold">{message}</div>
          <button
            type="button"
            className="btn-close btn-close-white me-2 m-auto"
            data-bs-dismiss="toast"
            aria-label="Close"
          ></button>
        </div>
      </div>
    </div>
  );
};

export default ToastMessage;
