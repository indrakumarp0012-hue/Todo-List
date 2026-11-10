import { useState } from "react";
import "./TodoList.css";

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [editId, setEditId] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const text = task.trim();

    if (!text) return;

    if (editId !== null) {
      setTasks((currentTasks) =>
        currentTasks.map((item) =>
          item.id === editId ? { ...item, text } : item,
        ),
      );
      setEditId(null);
    } else {
      setTasks((currentTasks) => [
        ...currentTasks,
        { id: crypto.randomUUID(), text, completed: false },
      ]);
    }

    setTask("");
  };

  const handleEdit = (item) => {
    setTask(item.text);
    setEditId(item.id);
  };

  const handleDelete = (id) => {
    setTasks((currentTasks) => currentTasks.filter((item) => item.id !== id));
    if (editId === id) {
      setEditId(null);
      setTask("");
    }
  };

  const handleComplete = (id) => {
    setTasks((currentTasks) =>
      currentTasks.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item,
      ),
    );
  };

  const cancelEdit = () => {
    setEditId(null);
    setTask("");
  };

  const completedCount = tasks.filter((item) => item.completed).length;

  return (
    <main className="todo-container">
      <section className="todo-card" aria-labelledby="todo-title">
        <header className="todo-header">
          <div>
            <span className="eyebrow">YOUR DAY, IN FOCUS</span>
            <h1 id="todo-title">My TodoList</h1>
          </div>
          <div className="task-total" aria-label={`${tasks.length} total tasks`}>
            <strong>{tasks.length}</strong>
            <span>{tasks.length === 1 ? "Task" : "Tasks"}</span>
          </div>
        </header>

        <form className="task-form" onSubmit={handleSubmit}>
          <label className="sr-only" htmlFor="task-input">
            Task description
          </label>
          <input
            id="task-input"
            type="text"
            placeholder="e.g. Plan the week"
            value={task}
            onChange={(event) => setTask(event.target.value)}
            maxLength={200}
          />
          <button type="submit" className="add-btn" disabled={!task.trim()}>
            {editId !== null ? "Save changes" : "Add task"}
          </button>
          {editId !== null && (
            <button type="button" className="cancel-btn" onClick={cancelEdit}>
              Cancel
            </button>
          )}
        </form>

        <div className="task-info" aria-label="Task summary">
          <div className="stat">
            <span className="stat-label">Total Tasks</span>
            <strong className="stat-number">{tasks.length}</strong>
          </div>
          <div className="stat">
            <span className="stat-label">Pending</span>
            <strong className="stat-number">{tasks.length - completedCount}</strong>
          </div>
          <div className="stat">
            <span className="stat-label">Completed</span>
            <strong className="stat-number">{completedCount}</strong>
          </div>
        </div>

        <section className="task-section" aria-label="Your tasks">
          <h2 className="list-heading">Tasks</h2>
          {tasks.length === 0 ? (
            <div className="empty">
              <span className="empty-icon" aria-hidden="true">✓</span>
              <p>No tasks yet</p>
              <span>Add a task above and it will show up here.</span>
            </div>
          ) : (
            <ul className="task-list">
              {tasks.map((item) => (
                <li className="task-item" key={item.id}>
                  <button
                    type="button"
                    className={`check-btn${item.completed ? " is-checked" : ""}`}
                    onClick={() => handleComplete(item.id)}
                    aria-label={
                      item.completed
                        ? `Mark ${item.text} as incomplete`
                        : `Mark ${item.text} as complete`
                    }
                    aria-pressed={item.completed}
                  >
                    {item.completed ? "✓" : ""}
                  </button>
                  <span
                    className={`task-text${item.completed ? " completed" : ""}`}
                  >
                    {item.text}
                  </span>
                  <div className="actions">
                    <button
                      type="button"
                      className="edit-btn"
                      onClick={() => handleEdit(item)}
                      aria-label={`Edit ${item.text}`}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="delete-btn"
                      onClick={() => handleDelete(item.id)}
                      aria-label={`Delete ${item.text}`}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
        <footer className="task-footer">
          {completedCount} of {tasks.length} tasks completed
        </footer>
      </section>
    </main>
  );
}

export default TodoList;
