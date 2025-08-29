// src/components/TodoForm.js
import React, { useState } from "react";

const TodoForm = ({ onAddTodo }) => {
  const [newTask, setNewTask] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false); // State untuk efek focus

  const handleInputChange = (e) => {
    setNewTask(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTask.trim()) { // Gunakan trim() untuk menghindari spasi kosong
      onAddTodo(newTask.trim());
      setNewTask("");
    }
  };

  // --- STYLES ---

  const formContainerStyle = {
    marginBottom: "30px",
    padding: "25px",
    backgroundColor: "#3a3f4a", // Warna latar serasi dengan HomePage
    borderRadius: "15px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
  };

  const headingStyle = {
    color: "#61dafb",
    marginBottom: "20px",
    textAlign: "center",
    fontWeight: "bold",
  };
  
  const formStyle = { 
    display: "flex", 
    gap: "15px" // Sedikit lebih banyak ruang
  };

  // Style dinamis untuk input berdasarkan state 'isInputFocused'
  const inputStyle = {
    flexGrow: 1, // Agar input memenuhi sisa ruang
    padding: "15px",
    fontSize: "1.1em",
    backgroundColor: "#282c34",
    color: "white",
    border: "2px solid #555", // Border awal
    borderRadius: "10px",
    outline: "none",
    transition: "border-color 0.3s ease, box-shadow 0.3s ease",
    // Efek glow saat focus
    borderColor: isInputFocused ? "#61dafb" : "#555",
    boxShadow: isInputFocused ? "0 0 10px rgba(97, 218, 251, 0.3)" : "none",
  };

  const buttonStyle = {
    padding: "15px 30px",
    fontSize: "1.1em",
    fontWeight: "bold",
    backgroundColor: "#61dafb",
    color: "#282c34",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    transition: "transform 0.2s ease, background-color 0.2s ease",
  };

  // --- JSX ---
  
  return (
    <div style={formContainerStyle}>
      <h2 style={headingStyle}>Tambah Todo Baru</h2>
      <form onSubmit={handleSubmit} style={formStyle}>
        <input
          type="text"
          name="task"
          placeholder="Tulis tugas baru di sini..."
          value={newTask}
          onChange={handleInputChange}
          required
          style={inputStyle}
          onFocus={() => setIsInputFocused(true)} // Set focus ke true
          onBlur={() => setIsInputFocused(false)}  // Set focus ke false
        />
        <button
          type="submit"
          style={buttonStyle}
          onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
          onMouseOut={(e) => e.currentTarget.style.transform = "translateY(0)"}
        >
          Tambah
        </button>
      </form>
    </div>
  );
};

export default TodoForm;