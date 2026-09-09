import { useState } from "react";
import { arrayMove } from "@dnd-kit/sortable";
import TodoInput from "./components/TodoInput.jsx";
import TodoList from "./components/TodoList.jsx";

export default function App() {
  const [tasks, setTasks] = useState([]);

  function handleAdd(text) {
    setTasks((prev) => [
      ...prev,
      { id: crypto.randomUUID(), text, completed: false },
    ]);
  }

  function handleToggle(id) {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  }

  function handleDelete(id) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  function handleDragEnd(event) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setTasks((prev) => {
      const oldIndex = prev.findIndex((t) => t.id === active.id);
      const newIndex = prev.findIndex((t) => t.id === over.id);
      return arrayMove(prev, oldIndex, newIndex);
    });
  }

  return (
    <div className="mx-auto max-w-lg px-4 pt-12">
      <h1 className="mb-6 text-center text-2xl font-bold text-gray-800">
        📝 待办清单
      </h1>

      <TodoInput onAdd={handleAdd} />

      <div className="mt-6">
        <TodoList
          tasks={tasks}
          onToggle={handleToggle}
          onDelete={handleDelete}
          onDragEnd={handleDragEnd}
        />
      </div>
    </div>
  );
}
