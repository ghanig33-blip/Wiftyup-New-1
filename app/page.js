"use client";

import { useState } from "react";
import { supabase } from "../lib/supabase-browser";

export default function Home() {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (mode === "signup") {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
          },
        },
      });

      if (error) {
        setMessage(error.message);
      } else {
        setMessage("Account created. Please check your email.");
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setMessage(error.message);
      } else {
        setMessage("Login successful!");
      }
    }

    setLoading(false);
  }

  async function googleLogin() {
    setMessage("");

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin,
      },
    });

    if (error) {
      setMessage(error.message);
    }
  }

  return (
    <main style={styles.main}>
      <div style={styles.card}>
        <h1 style={styles.logo}>WiftyUp</h1>
        <p style={styles.tagline}>Connect • Create • Earn</p>

        <div style={styles.tabs}>
          <button
            onClick={() => setMode("login")}
            style={mode === "login" ? styles.activeTab : styles.tab}
          >
            Login
          </button>

          <button
            onClick={() => setMode("signup")}
            style={mode === "signup" ? styles.activeTab : styles.tab}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {mode === "signup" && (
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={styles.input}
              required
            />
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />

          <button type="submit" style={styles.button} disabled={loading}>
            {loading
              ? "Please wait..."
              : mode === "login"
              ? "Login"
              : "Create Account"}
          </button>
        </form>

        <button onClick={googleLogin} style={styles.googleButton}>
          Continue with Google
        </button>

        {message && <p style={styles.message}>{message}</p>}

        <p style={styles.footer}>WiftyUp — Your social world</p>
      </div>
    </main>
  );
}

const styles = {
  main: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#080808",
    padding: "20px",
    color: "white",
    fontFamily: "Arial, sans-serif",
  },

  card: {
    width: "100%",
    maxWidth: "420px",
    background: "#151515",
    borderRadius: "20px",
    padding: "30px",
    boxSizing: "border-box",
  },

  logo: {
    textAlign: "center",
    fontSize: "38px",
    margin: "0",
  },

  tagline: {
    textAlign: "center",
    color: "#aaa",
    marginBottom: "30px",
  },

  tabs: {
    display: "flex",
    marginBottom: "20px",
  },

  tab: {
    flex: 1,
    padding: "12px",
    background: "#222",
    color: "#aaa",
    border: "none",
  },

  activeTab: {
    flex: 1,
    padding: "12px",
    background: "#fff",
    color: "#000",
    border: "none",
  },

  input: {
    width: "100%",
    padding: "14px",
    marginBottom: "12px",
    boxSizing: "border-box",
    borderRadius: "10px",
    border: "1px solid #333",
    background: "#0d0d0d",
    color: "white",
    fontSize: "16px",
  },

  button: {
    width: "100%",
    padding: "14px",
    border: "none",
    borderRadius: "10px",
    background: "#fff",
    color: "#000",
    fontSize: "16px",
    fontWeight: "bold",
  },

  googleButton: {
    width: "100%",
    padding: "14px",
    marginTop: "12px",
    border: "1px solid #444",
    borderRadius: "10px",
    background: "#222",
    color: "#fff",
    fontSize: "16px",
  },

  message: {
    textAlign: "center",
    marginTop: "15px",
    color: "#ddd",
    fontSize: "14px",
  },

  footer: {
    textAlign: "center",
    color: "#777",
    marginTop: "25px",
    fontSize: "13px",
  },

