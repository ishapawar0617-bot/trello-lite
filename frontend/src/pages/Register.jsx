import { useState } from "react";
import API from "../api/axios";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      return alert("Please fill all fields");
    }

    try {
      setLoading(true);
      await API.post("/auth/register", form);
      alert("Account created 🎉");
      window.location.href = "/";
    } catch (err) {
      alert(err.response?.data || "Register failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* 🔥 STYLES */}
      <style>{`
        body {
          margin: 0;
          font-family: Arial, sans-serif;
        }

        .container {
          height: 100vh;

          /* 🔥 BACKGROUND IMAGE ADDED */
          background: 
            linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)),
            url('https://images.unsplash.com/photo-1557683316-973673baf926');

          background-size: cover;
          background-position: center;

          display: flex;
          flex-direction: column;
          align-items: center;
        }

        /* NAVBAR */
        .navbar {
          width: 100%;
          height: 50px;
          background: rgba(18, 12, 12, 0.9);
          backdrop-filter: blur(8px);
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 30px;
          box-shadow: 0 1px 5px rgba(0,0,0,0.1);
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .logo img {
          width: 28px;
        }

        .logo span {
          font-size: 20px;
          font-weight: bold;
          color: #405271;
        }

        .login-btn {
          background: none;
          border: none;
          color: #3f81e4;
          font-weight: 500;
          cursor: pointer;
        }

        /* CARD */
        .card {
          background: rgba(245, 243, 243, 0.95);
          width: 350px;
          margin-top: 100px;
          padding: 60px;
          border-radius: 8px;
          box-shadow: 0 8px 20px rgba(0,0,0,0.25);
          text-align: center;
        }

        .card h2 {
          margin-bottom: 20px;
          color: #b1c5e9;
        }

        .card input {
          width: 90%;
          padding: 10px;
          margin-top: 12px;
          border: 1px solid #dfe1e6;
          border-radius: 5px;
          outline: none;
        }

        .card input:focus {
          border-color: #4c9aff;
        }

        .card button {
          width: 100%;
          margin-top: 15px;
          padding: 10px;
          background: #2bc7f7;
          color: #fff;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }

        .card button:hover {
          background: #1dacdc;
        }

        .card p {
          margin-top: 15px;
          font-size: 14px;
        }

        .card span {
          color: #0052cc;
          cursor: pointer;
        }
      `}</style>

      <div className="container">
        {/* NAVBAR */}
        <div className="navbar">
          <div className="logo">
            <img
              src="https://cdn.worldvectorlogo.com/logos/trello.svg"
              alt="Trello"
            />
            <span>Trello</span>
          </div>

          <button
            className="login-btn"
            onClick={() => (window.location.href = "/")}
          >
            Log in
          </button>
        </div>

        {/* REGISTER CARD */}
        <div className="card">
          <h2>Sign up for your account</h2>

          <form onSubmit={handleRegister}>
            <input
              type="text"
              name="name"
              placeholder="Full name"
              onChange={handleChange}
            />

            <input
              type="email"
              name="email"
              placeholder="Email address"
              onChange={handleChange}
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
            />

            <button type="submit">
              {loading ? "Creating..." : "Sign up"}
            </button>
          </form>

          <p>
            Already have an account?{" "}
            <span onClick={() => (window.location.href = "/")}>
              Log in
            </span>
          </p>
        </div>
      </div>
    </>
  );
}