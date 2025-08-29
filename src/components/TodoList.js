// src/components/TodoList.js
import React from "react";
import TodoItem from "./TodoItem";

// ▼▼▼ 1. PASTIKAN 'onSetEditing' dan props lain ada di sini ▼▼▼
const TodoList = ({
  todos,
  onToggleCompleted,
  onDeleteTodo,
  editingTodoId,
  onSetEditing,
  onUpdateTodo,
}) => {

  if (todos.length === 0) {
    // ... (kode pesan kosong Anda)
  }

  return (
    <ul style={{ listStyleType: "none", padding: 0 }}>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggleCompleted={onToggleCompleted}
          onDeleteTodo={onDeleteTodo}
          // ▼▼▼ 2. PASTIKAN props ini diteruskan ke TodoItem ▼▼▼
          editing={editingTodoId === todo.id}
          onSetEditing={onSetEditing}
          onUpdateTodo={onUpdateTodo}
        />
      ))}
    </ul>
  );
};

export default TodoList;