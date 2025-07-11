import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      textAlign: "center",
      padding: "0 20px"
    }}>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link to="/" style={{
        marginTop: "20px",
        textDecoration: "none",
        color: "#FF6B0A",
        fontWeight: "bold"
      }}>
        Return to Home Page
      </Link>
    </div>
  );
};

export default NotFoundPage;
