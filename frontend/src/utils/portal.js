

import { useEffect, useState } from "react";
import ReactDOM from "react-dom";

const Portal = ({ close, component }) => {
  const [isMounted, setIsMounted] = useState(false);


  useEffect(() => {
    setIsMounted(true);
  }, []);

  // If it's not mounted, return null
  if (!isMounted) {
    return null;
  }

  const target = document.getElementById("root-model") || document.body;

  const removePortal = () => {
    close();
  };

  const handleClickContent = (e) => {
    e.stopPropagation();
  };

  return ReactDOM.createPortal(
    <>
      <div style={overlayStyle} onClick={removePortal}>
        <div style={portalContentStyle} onClick={handleClickContent}>
          <button style={closeButtonStyle} onClick={removePortal}>
            &times;
          </button>
          {component}
        </div>
      </div>
    </>,
    target
  );
};

export default Portal;

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: "rgba(48, 61, 67, 0.55)",
  backdropFilter: "blur(0px)",
  zIndex: 1000,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const portalContentStyle = {
  borderRadius: "8px",
  zIndex: 1001,
  position: "relative",
  display:'flex',
  background: "white", // Ensure the content has a background color
  padding: "10px",
  width: "auto",
};

const closeButtonStyle = {
  position: "absolute",
  top: "8px",
  right: "8px",
  background: "none",
  border: "none",
  color: "#333",
  fontSize: "20px",
  fontWeight: "bold",
  cursor: "pointer",
};
