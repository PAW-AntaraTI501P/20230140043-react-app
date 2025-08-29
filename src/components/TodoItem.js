// src/components/TodoItem.js

import React, { useState } from "react";

// ▼▼▼ Menerima props baru untuk fungsi edit ▼▼▼
const TodoItem = ({
  todo,
  onToggleCompleted,
  onDeleteTodo,
  editing,
  onSetEditing,
  onUpdateTodo,
}) => {
  // State lokal untuk menyimpan teks yang sedang diedit
  const [editText, setEditText] = useState(todo.task);

  const handleUpdate = (e) => {
    e.preventDefault();
    if (editText.trim()) {
      onUpdateTodo(todo.id, editText.trim());
    }
  };

  // --- STYLES ---

  const listItemStyle = {
    listStyle: "none",
    marginBottom: "15px",
    padding: "20px",
    backgroundColor: "#3a3f4a",
    borderRadius: "15px",
    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    transition: "all 0.4s ease",
  };
  
  const completedStyle = {
    backgroundColor: "#282c34",
    boxShadow: "none",
  };

  const combinedItemStyle = todo.completed
    ? { ...listItemStyle, ...completedStyle }
    : listItemStyle;

  const taskTextStyle = {
    margin: 0,
    fontSize: "1.2em",
    color: todo.completed ? "#777" : "#f1f1f1",
    textDecoration: todo.completed ? "line-through" : "none",
    transition: "color 0.4s ease",
  };
  
  const buttonContainerStyle = { 
    display: "flex", 
    gap: "10px" 
  };
  
  const baseButtonStyle = {
    padding: "8px 15px",
    fontWeight: "bold",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "transform 0.2s ease, background-color 0.2s ease",
  };
  
  const inputStyle = {
    flexGrow: 1,
    padding: "12px",
    fontSize: "1.1em",
    backgroundColor: "#282c34",
    color: "white",
    border: "2px solid #61dafb",
    borderRadius: "8px",
    outline: "none",
    boxShadow: "0 0 10px rgba(97, 218, 251, 0.3)",
  };

  // --- KONDISIONAL RENDER ---
  // Jika item ini dalam mode edit, tampilkan form
  if (editing) {
    return (
      <li style={combinedItemStyle}>
        <form onSubmit={handleUpdate} style={{ display: "flex", width: "100%", gap: "10px" }}>
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            style={inputStyle}
            autoFocus // Langsung fokus ke input
          />
          <button type="submit" style={{ ...baseButtonStyle, backgroundColor: "#81c784" }}>
            Simpan
          </button>
          <button
            type="button"
            onClick={() => onSetEditing(null)}
            style={{ ...baseButtonStyle, backgroundColor: "#9e9e9e" }}
          >
            Batal
          </button>
        </form>
      </li>
    );
  }

  // Jika tidak, tampilkan mode normal
  return (
    <li style={combinedItemStyle}>
      <h3 style={taskTextStyle}>{todo.task}</h3>
      <div style={buttonContainerStyle}>
        {/* ▼▼▼ TOMBOL EDIT DITAMBAHKAN DI SINI ▼▼▼ */}
        <button
          onClick={() => onSetEditing(todo.id)}
          style={{ ...baseButtonStyle, backgroundColor: "#64b5f6" }}
          onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
          onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1.0)")}
        >
          Edit
        </button>
        <button
          onClick={() => onToggleCompleted(todo.id, !todo.completed)}
          style={{
            ...baseButtonStyle,
            backgroundColor: todo.completed ? "#555" : "#61dafb",
            color: todo.completed ? "#ccc" : "#282c34",
          }}
          onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
          onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1.0)")}
        >
          {todo.completed ? "Batal" : "Selesai"}
        </button>
        <button
          onClick={() => onDeleteTodo(todo.id)}
          style={{ ...baseButtonStyle, backgroundColor: "#e57373", color: "white" }}
          onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
          onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1.0)")}
        >
          Hapus
        </button>
      </div>
    </li>
  );
};

export default TodoItem;