import { useEffect, useState } from "react";
import API from "../api/axios";

export default function Dashboard() {
  const [boards, setBoards] = useState([]);
  const [showCreate, setShowCreate] = useState(false);
  const [name, setName] = useState("");

  // ✅ GET BOARDS
  const getBoards = async () => {
    try {
      const res = await API.get("/boards");
      setBoards(res.data);
    } catch {
      alert("Error fetching boards");
    }
  };

  useEffect(() => {
    getBoards();
  }, []);

  // ✅ CREATE BOARD
  const createBoard = async () => {
    if (!name.trim()) return alert("Enter board name");

    try {
      await API.post("/boards", { name });
      setName("");
      setShowCreate(false);
      getBoards();
    } catch {
      alert("Error creating board");
    }
  };

  // ✅ LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="main-bg">
      <style>{`
        body {
          margin: 0;
          font-family: Arial, sans-serif;
        }

        /* 🔥 BACKGROUND IMAGE */
        .main-bg {
          min-height: 100vh;
          background:
            linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)),
            url('https://stock.adobe.com/in/images/medium-shot-of-a-virtual-dashboard-displaying-bots-managing-trade-break-reconciliations-with-a-blurred-background-emphasizing-automated-processing-efficiency/1951804971');
          background-size: cover;
          background-position: center;
        }

        /* 🔷 NAVBAR */
        .navbar {
          height: 50px;
          background: rgba(1, 12, 18, 0.9);
          backdrop-filter: blur(6px);
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
          font-weight: bold;
        }

        .logo img {
          width: 24px;
        }

        .logout {
          background: rgba(255,255,255,0.2);
          padding: 6px 10px;
          border-radius: 4px;
          cursor: pointer;
        }

        .logout:hover {
          background: rgba(255,255,255,0.3);
        }

        /* 🔷 CONTENT */
        .container {
          padding: 20px 40px;
        }

        .section-title {
          font-size: 18px;
          color: #ffffff;
          margin-bottom: 15px;
        }

        /* 🔷 GRID */
        .boards {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 16px;
        }

        /* 🎯 BOARD CARD */
        .board-card {
          height: 110px;
          border-radius: 8px;
          padding: 12px;
          color: white;
          font-weight: bold;
          cursor: pointer;
          display: flex;
          align-items: flex-end;
          background: linear-gradient(135deg, #0079bf, #00c6ff);
          transition: 0.2s;
        }

        .board-card:hover {
          transform: translateY(-4px);
          opacity: 0.95;
        }

        /* ➕ CREATE TILE */
        .create-card {
          background: rgba(255,255,255,0.2);
          backdrop-filter: blur(10px);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 500;
        }

        .create-card:hover {
          background: rgba(255,255,255,0.3);
        }

        /* 🔥 POPUP */
        .overlay {
          position: fixed;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.6);
          top: 0;
          left: 0;
        }

        .popup {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: white;
          padding: 20px;
          border-radius: 8px;
          width: 300px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }

        .popup input {
          width: 100%;
          padding: 8px;
          margin-top: 10px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }

        .popup button {
          margin-top: 10px;
          width: 100%;
          padding: 8px;
          background: #5aac44;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
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

      {/* 🔷 CONTENT */}
      <div className="container">
        <div className="section-title">YOUR BOARDS</div>

        <div className="boards">
          {/* ➕ CREATE BOARD */}
          <div
            className="board-card create-card"
            onClick={() => setShowCreate(true)}
          >
            + Create new board
          </div>

          {/* 🧾 BOARDS */}
          {boards.map((b) => (
            <div
              key={b._id}
              className="board-card"
              onClick={() =>
                (window.location.href = `/board/${b._id}`)
              }
            >
              {b.name}
            </div>
          ))}
        </div>
      </div>

      {/* 🔥 CREATE POPUP */}
      {showCreate && (
        <>
          <div className="overlay" onClick={() => setShowCreate(false)} />

          <div className="popup">
            <h3>Create Board</h3>

            <input
              placeholder="Board title"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <button onClick={createBoard}>Create</button>
          </div>
        </>
      )}
    </div>
  );
}