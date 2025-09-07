// src/pages/HomePage.js

import React from "react";
import { Link, useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  // 🎨 Styles
  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "linear-gradient(135deg, #1e3c72, #2a5298)", // gradient biru
    fontFamily: '"Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    padding: "20px",
    color: "white",
  };

  const cardStyle = {
    textAlign: "center",
    padding: "40px",
    borderRadius: "15px",
    backgroundColor: "rgba(255,255,255,0.1)",
    boxShadow: "0 8px 30px rgba(0,0,0,0.3)",
    backdropFilter: "blur(10px)",
    width: "100%",
    maxWidth: "500px",
  };

  const headingStyle = {
    fontSize: "2.2em",
    marginBottom: "10px",
    color: "#ffffff",
    textShadow: "0 2px 10px rgba(0,0,0,0.3)",
  };

  const subHeadingStyle = {
    marginBottom: "20px",
    fontSize: "1.2em",
    color: "#e0e0e0",
  };

  const buttonStyle = {
    display: "inline-block",
    padding: "12px 20px",
    fontSize: "1.1em",
    fontWeight: "bold",
    margin: "10px 5px",
    backgroundColor: "#61dafb",
    color: "#282c34",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    textDecoration: "none",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
  };

  const buttonHover = {
    backgroundColor: "#4fa3d7",
    transform: "scale(1.05)",
  };

  // Ambil nama user
  let userName = null;
  if (isLoggedIn) {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      userName = user?.name
        ? user.name
        : user?.email
        ? user.email.split("@")[0]
        : null;
    } catch {}
  }

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h1 style={headingStyle}>Selamat Datang di Aplikasi Todo List</h1>
        {userName && (
          <h2 style={subHeadingStyle}>Halo, {userName}! 👋</h2>
        )}
        <p style={{ marginBottom: "30px" }}>
          Kelola semua tugas Anda dengan mudah dan efisien.
        </p>

        <Link
          to="/todos"
          style={{ ...buttonStyle }}
          onMouseEnter={(e) =>
            Object.assign(e.target.style, buttonHover)
          }
          onMouseLeave={(e) =>
            Object.assign(e.target.style, buttonStyle)
          }
        >
          📋 Lihat Daftar Todo
        </Link>

        {isLoggedIn ? (
          <button
            style={buttonStyle}
            onClick={handleLogout}
            onMouseEnter={(e) =>
              Object.assign(e.target.style, buttonHover)
            }
            onMouseLeave={(e) =>
              Object.assign(e.target.style, buttonStyle)
            }
          >
            🚪 Logout
          </button>
        ) : (
          <>
            <Link
              to="/login"
              style={buttonStyle}
              onMouseEnter={(e) =>
                Object.assign(e.target.style, buttonHover)
              }
              onMouseLeave={(e) =>
                Object.assign(e.target.style, buttonStyle)
              }
            >
              Login
            </Link>
            <Link
              to="/register"
              style={buttonStyle}
              onMouseEnter={(e) =>
                Object.assign(e.target.style, buttonHover)
              }
              onMouseLeave={(e) =>
                Object.assign(e.target.style, buttonStyle)
              }
            >
             Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;
