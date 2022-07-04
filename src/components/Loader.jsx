import React from "react";

function Loader({ showText = false, height, width, style }) {
  return (
    <div
      className={showText ? "loader center" : "loader"}
      style={{ ...style, height, width }}
    >
      <div className="spinner"></div>
      {showText && <span className="loader-text">Loading...</span>}
    </div>
  );
}

export default Loader;
