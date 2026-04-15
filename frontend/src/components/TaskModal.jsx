import { useState } from "react";
import API from "../api/axios";

export default function TaskModal({ close, refresh, boardId }) {
  const [text, setText] = useState("");
  const [status, setStatus] = useState("todo");
  const [dueDate, setDueDate] = useState("");

  const saveTask = async () => {
    try {
      const payload = {
        text,
        status,
        boardId, // ✅ correct boardId from props
        dueDate: dueDate ? new Date(dueDate) : null,
      };

      console.log("PAYLOAD 👉", payload);

      await API.post("/tasks", payload);

      refresh(); // reload tasks
      close();   // close modal
    } catch (err) {
      console.error(err);
      alert("Error saving task");
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2>New Task</h2>

        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Task name"
          style={styles.input}
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          style={styles.input}
        >
          <option value="todo">Todo</option>
          <option value="doing">Doing</option>
          <option value="done">Done</option>
        </select>

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          style={styles.input}
        />

        <button onClick={saveTask} style={styles.save}>
          Save
        </button>

        <button onClick={close} style={styles.cancel}>
          Cancel
        </button>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0,0,0,0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    background: "#6665b9",
    padding: "30px",
    borderRadius: "10px",
    width: "300px",
  },
  input: {
    width: "90%",
    padding: "10px",
    marginTop: "10px",
  },
  save: {
    marginTop: "10px",
    background: "green",
    color: "#fff",
    padding: "10px",
    width: "100%",
    border: "none",
  },
  cancel: {
    marginTop: "10px",
    background: "red",
    color: "#dad1d1",
    padding: "10px",
    width: "100%",
    border: "none",
  },
};