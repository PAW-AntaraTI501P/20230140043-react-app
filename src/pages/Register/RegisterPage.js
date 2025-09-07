import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // --- STYLES ---
  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "linear-gradient(135deg, #1e3c72, #2a5298)", // gradasi modern
    fontFamily: '"Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    padding: "20px",
  };

  const contentWrapperStyle = {
    textAlign: "center",
    padding: "40px",
    borderRadius: "15px",
    backgroundColor: "rgba(255,255,255,0.1)",
    boxShadow: "0 8px 30px rgba(0,0,0,0.3)",
    width: "100%",
    maxWidth: "400px",
    backdropFilter: "blur(10px)", // efek kaca
    color: "white",
  };

  const headingStyle = {
    fontSize: "2.2em",
    fontWeight: "bold",
    marginBottom: "20px",
    color: "#ffffff",
    textShadow: "0 2px 10px rgba(0,0,0,0.3)",
  };

  const inputContainerStyle = {
    marginBottom: "15px",
    textAlign: "left",
  };

  const labelStyle = {
    display: "block",
    marginBottom: "5px",
    color: "#e0e0e0",
    fontSize: "0.95em",
    fontWeight: "bold",
  };

  const inputStyle = {
    width: "100%",
    padding: "12px",
    backgroundColor: "rgba(255,255,255,0.2)",
    border: "1px solid #61dafb",
    borderRadius: "8px",
    color: "white",
    fontSize: "1em",
    outline: "none",
    transition: "0.3s ease",
  };

  const buttonStyle = {
    width: "100%",
    padding: "12px",
    fontSize: "1.1em",
    fontWeight: "bold",
    backgroundColor: "#61dafb",
    color: "#282c34",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    marginTop: "20px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
    transition: "all 0.3s ease",
  };

  const linkTextStyle = {
    marginTop: "20px",
    color: "#f1f1f1",
    fontSize: "0.9em",
  };

  const linkStyle = {
    color: "#61dafb",
    textDecoration: "none",
    fontWeight: "bold",
    marginLeft: "5px",
  };

  // --- JSX ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/api/auth/register", {
        name,
        email,
        password,
      });
      alert("Registrasi berhasil! Silakan login.");
      navigate("/login");
    } catch (error) {
      console.error("Registrasi gagal:", error.response.data);
      alert(
        "Registrasi gagal. " +
          (error.response.data.msg || "Silakan coba lagi.")
      );
    }
  };

  return (
    <div style={containerStyle}>
      <div style={contentWrapperStyle}>
        <h2 style={headingStyle}>Halaman Registrasi</h2>
        <form onSubmit={handleSubmit}>
          <div style={inputContainerStyle}>
            <label style={labelStyle}>Nama:</label>
            <input
              style={inputStyle}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div style={inputContainerStyle}>
            <label style={labelStyle}>Email:</label>
            <input
              style={inputStyle}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div style={inputContainerStyle}>
            <label style={labelStyle}>Password:</label>
            <input
              style={inputStyle}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button style={buttonStyle} type="submit">
            Daftar
          </button>
        </form>
        <p style={linkTextStyle}>
          Sudah punya akun?
          <Link to="/login" style={linkStyle}>
            Login di sini
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
