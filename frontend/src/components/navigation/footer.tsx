import React from "react";

const Footer = () => {
  return (
    <div
      style={{
        padding: "10px 0",
        textAlign: "center",
        fontSize: "14px",
        color: "white",
      }}
    >
      <hr className="sidebar-divider" />
      <p style={{ marginTop: "30px" }}>
        &copy; {new Date().getFullYear()} Built With ❣️ By SIJARA
      </p>
    </div>
  );
};

export default Footer;
