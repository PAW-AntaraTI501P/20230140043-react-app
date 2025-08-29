// src/pages/HomePage.js

import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  // --- STYLES ---

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#282c34",
    color: "white",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  };

  const contentWrapperStyle = {
    textAlign: "center",
    padding: "40px",
    borderRadius: "15px",
    backgroundColor: "#3a3f4a", // Warna sedikit lebih terang untuk kontras
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
  };

  const headingStyle = {
    fontSize: "3.5em", // Lebih besar dan menonjol
    fontWeight: "bold",
    margin: "0 0 15px 0",
    color: "#61dafb", // Menggunakan warna aksen untuk judul
    textShadow: "0 2px 10px rgba(97, 218, 251, 0.3)", // Efek glow
  };

  const paragraphStyle = {
    fontSize: "1.2em",
    maxWidth: "500px", // Batasi lebar agar mudah dibaca
    lineHeight: "1.6",
    color: "#c7c9ce", // Warna abu-abu terang agar tidak terlalu mencolok
    marginBottom: "30px",
  };

  const buttonStyle = {
    display: "inline-block",
    padding: "15px 30px",
    fontSize: "1.2em",
    fontWeight: "bold",
    backgroundColor: "#61dafb",
    color: "#282c34",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    textDecoration: "none",
    boxShadow: "0 4px 15px rgba(97, 218, 251, 0.2)",
    transition: "transform 0.2s ease, box-shadow 0.2s ease", // Transisi untuk hover
  };

  // --- JSX ---

  return (
    <div style={containerStyle}>
      <div style={contentWrapperStyle}>
        <h1 style={headingStyle}>Aplikasi Todo List</h1>
        <p style={paragraphStyle}>
          Kelola semua tugas Anda dengan mudah dan efisien.
        </p>
        <Link
          to="/todos"
          style={buttonStyle}
          // Efek hover sederhana dengan JavaScript
          onMouseOver={(e) => {
            e.currentTarget.style.transform = "translateY(-3px)";
            e.currentTarget.style.boxShadow =
              "0 8px 25px rgba(97, 218, 251, 0.4)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow =
              "0 4px 15px rgba(97, 218, 251, 0.2)";
          }}
        >
          Lihat Daftar Todo
        </Link>
      </div>
    </div>
  );
};

export default HomePage;