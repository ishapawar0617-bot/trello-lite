import { useEffect, useState, useCallback } from "react";
import API from "../api/axios";
import Column from "../components/Column";
import TaskModal from "../components/TaskModal";
import { DragDropContext } from "@hello-pangea/dnd";

export default function Board() {
  const boardId = window.location.pathname.split("/")[2];

  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // ✅ FETCH TASKS
  const getTasks = useCallback(async () => {
    try {
      const res = await API.get(`/tasks/${boardId}`);
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  }, [boardId]);

  useEffect(() => {
    getTasks();
  }, [getTasks]);

  // ✅ DRAG & DROP
  const onDragEnd = async (result) => {
    if (!result.destination) return;

    const taskId = result.draggableId;
    const newStatus = result.destination.droppableId;

    // 🔥 instant UI update
    const updated = tasks.map((t) =>
      t._id === taskId ? { ...t, status: newStatus } : t
    );
    setTasks(updated);

    try {
      await API.put(`/tasks/${taskId}`, { status: newStatus });
    } catch (err) {
      console.error(err);
      getTasks(); // rollback
    }
  };

  // ✅ LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="board-bg">
      <style>{`
        body {
          margin: 0;
          font-family: 'Segoe UI', sans-serif;
        }

        /* 🔥 BACKGROUND */
        .board-bg {
          min-height: 100vh;
          background:
            linear-gradient(rgba(160, 204, 226, 0.35), rgba(87, 213, 217, 0.55)),
            url("https://stock.adobe.com/in/images/software-development-digital-technology-concept-software-developer-coding-web-banner-or-background/886495385");
          background-size: cover;
          background-position: center;
        }

        /* 🔷 NAVBAR */
        .navbar {
          height: 50px;
          background: rgba(1, 8, 12, 0.85);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 20px;
          color: white;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 600;
        }

        .logo img {
          width: 24px;
        }

        .logout {
          background: rgba(255, 255, 255, 0.14);
          padding: 6px 12px;
          border-radius: 4px;
          cursor: pointer;
        }

        .logout:hover {
          background: rgba(107, 220, 240, 0.26);
        }

        /* 🔷 BOARD HEADER */
        .board-header {
          padding: 20px;
          color: white;
          font-size: 22px;
          font-weight: 600;
        }

        /* ➕ ADD TASK BUTTON */
        .add-btn {
          margin-left: 20px;
          margin-bottom: 10px;
          padding: 8px 14px;
          border-radius: 6px;
          border: none;
          background: rgba(105, 200, 216, 0.23);
          color: white;
          cursor: pointer;
        }

        .add-btn:hover {
          background: rgba(108, 235, 224, 0.28);
        }

        /* 🔷 BOARD AREA */
        .board-container {
          display: flex;
          gap: 20px;
          padding: 20px;
          overflow-x: auto;
        }

        /* Scrollbar */
        .board-container::-webkit-scrollbar {
          height: 8px;
        }

        .board-container::-webkit-scrollbar-thumb {
          background: rgba(155, 226, 234, 0.4);
          border-radius: 10px;
        }
      `}</style>

      {/* 🔷 NAVBAR */}
      <div className="navbar">
        <div className="logo">
          <img
            src="https://cdn.worldvectorlogo.com/logos/trello.svg"
            alt="Trello logo"
          />
          Trello
        </div>

        <div className="logout" onClick={logout}>
          Logout
        </div>
      </div>

      {/* 🔷 HEADER */}
      <div className="board-header">My Board</div>

      {/* ➕ ADD TASK */}
      <button className="add-btn" onClick={() => setShowModal(true)}>
        + Add Task
      </button>

      {/* 🔥 DRAG AREA */}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="board-container">
          <Column title="todo" tasks={tasks} setTasks={setTasks} />
          <Column title="doing" tasks={tasks} setTasks={setTasks} />
          <Column title="done" tasks={tasks} setTasks={setTasks} />
        </div>
      </DragDropContext>

      {/* 🔥 MODAL */}
      {showModal && (
        <TaskModal
          close={() => setShowModal(false)}
          refresh={getTasks}
          boardId={boardId}
        />
      )}
    </div>
  );
}