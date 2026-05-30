import { useState } from "react";
import API from "../api/axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) return alert("Fill all fields");

    try {
      setLoading(true);

      const res = await API.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      window.location.href = "/dashboard";
    } catch (err) {
      alert(err.response?.data || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      {/* BACKGROUND OVERLAY */}
      <div style={styles.overlay}></div>

      {/* LOGIN CARD */}
      <div style={styles.card}>
        
        {/* ✅ TRELLO LOGO */}
        <div style={styles.logoBox}>
          <img
            src="https://cdn.worldvectorlogo.com/logos/trello.svg"
            alt="Trello"
            style={styles.logoImg}
          />
          <h1 style={styles.logo}>Task Management System</h1>
        </div>

        <p style={styles.subtitle}></p>

        <input
          style={styles.input}
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button style={styles.button} onClick={handleLogin}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <p style={styles.link}>
          Don't have account?{" "}
          <span onClick={() => (window.location.href = "/register")}>
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    background:
      "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url('https://images.unsplash.com/photo-1517430816045-df4b7de11d1d')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backdropFilter: "blur(8px)",
  },

  card: {
    position: "relative",
    width: "340px",
    padding: "35px",
    borderRadius: "15px",
    background: "rgba(123, 224, 250, 0.1)",
    backdropFilter: "blur(20px)",
    boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
    textAlign: "center",
    color: "#000000",
  },

  /* ✅ NEW LOGO STYLES */
  logoBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "10px",
  },

  logoImg: {
    width: "35px",
  },

  logo: {
    fontSize: "24px",
  },

  subtitle: {
    fontSize: "15px",
    marginBottom: "20px",
    opacity: 0.8,
  },

  input: {
    width: "90%",
    padding: "14px",
    marginBottom: "16px",
    borderRadius: "8px",
    border: "none",
    outline: "none",
    background: "rgba(17, 8, 8, 0.2)",
    color: "#ffffff",
  },

  button: {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    background: "#084ee56b",
    color: "#fff",
    cursor: "pointer",
    transition: "0.3s",
  },

  link: {
    marginTop: "15px",
    fontSize: "13px",
    cursor: "pointer",
  },
};