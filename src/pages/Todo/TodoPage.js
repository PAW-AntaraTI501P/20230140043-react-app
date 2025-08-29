// src/pages/TodoPage.js

import React, { useState, useEffect,useCallback } from "react";
import TodoForm from "../../components/TodoForm.js";
import TodoList from "../../components/TodoList.js";
import SearchInput from "../../components/SearchInput.js";

const TodoPage = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // --- FUNGSI-FUNGSI API ---

  const fetchTodos = useCallback((searchQuery) => {
    setLoading(true);
    const url = searchQuery
      ? `/api/todos?search=${encodeURIComponent(searchQuery)}`
      : "/api/todos";

    fetch(url)
      .then((response) => {
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
      })
      .then((data) => {
        setTodos(data.todos);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setTodos([]);
      })
      .finally(() => setLoading(false));
  }, []);

  // useEffect untuk debounce pencarian tidak berubah
  useEffect(() => {
    const timerId = setTimeout(() => {
      fetchTodos(searchTerm);
    }, 500);
    return () => clearTimeout(timerId);
  }, [searchTerm, fetchTodos]);

  const handleAddTodo = (task) => {
    fetch("http://localhost:3001/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task }),
    })
      .then((response) => response.json())
      .then((newTodo) => {
        setTodos([...todos, newTodo]);
      })
      .catch((err) => console.error("Error adding todo:", err));
  };

  const handleDeleteTodo = (id) => {
    fetch(`http://localhost:3001/api/todos/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setTodos(todos.filter((todo) => todo.id !== id));
      })
      .catch((err) => console.error("Error deleting todo:", err));
  };

  const handleToggleCompleted = (id, completed) => {
    fetch(`http://localhost:3001/api/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !completed }),
    })
      .then(() => {
        setTodos(
          todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !completed } : todo
          )
        );
      })
      .catch((err) => console.error("Error updating todo status:", err));
  };

  // FUNGSI BARU UNTUK UPDATE TUGAS (EDIT)
  const handleUpdateTodo = (id, updatedTask) => {
    fetch(`http://localhost:3001/api/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task: updatedTask }), // Kirim teks tugas yang baru
    })
      .then((response) => {
        if (!response.ok) throw new Error("Gagal mengupdate todo");
        return response.json();
      })
      .then(() => {
        // Perbarui state di frontend
        setTodos(
          todos.map((todo) =>
            todo.id === id ? { ...todo, task: updatedTask } : todo
          )
        );
        setEditingTodoId(null); // Keluar dari mode edit
      })
      .catch((err) => console.error("Error updating todo task:", err));
  };

  // --- RENDER ---

  if (loading) {
    return <div style={{ textAlign: "center", marginTop: "50px" }}>Memuat data...</div>;
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", color: "red", marginTop: "50px" }}>
        Error: {error}
      </div>
    );
  }

  return (
<div
  style={{
    padding: "20px 40px 40px 40px",
    maxWidth: "800px",
    margin: "40px auto",
    backgroundColor: "#282c34",
    color: "white",
    borderRadius: "15px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
    fontFamily: "'Gilroy', sans-serif", 
  }}
>
      <header style={{ textAlign: "center" }}>
        <h1 style={{ color: "#61dafb", fontSize: "2.5em" }}>Aplikasi Todo List</h1>
        <TodoForm onAddTodo={handleAddTodo} />
        <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <h2 style={{marginTop: "40px", borderTop: "1px solid #444", paddingTop: "30px"}}>Daftar Tugas Anda</h2>
        <TodoList
          todos={todos}
          onToggleCompleted={handleToggleCompleted}
          onDeleteTodo={handleDeleteTodo}
          // PROPS BARU UNTUK FUNGSI EDIT
          editingTodoId={editingTodoId}
          onSetEditing={setEditingTodoId}
          onUpdateTodo={handleUpdateTodo}
        />;
      </header>
    </div>
  );
};

export default TodoPage;