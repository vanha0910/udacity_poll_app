import React from "react";

const Loader = ({ open }) => {
  return (
    <div className="loading-container" style={{ display: open ? 'flex' : 'none' }}>
      <div className="loading" />
    </div>
  );
};

export default Loader;
