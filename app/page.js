'use client';

import { useState } from 'react';
import { supabase } from '../lib/supabase-browser';

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage('Login successful!');
      window.location.href = '/';
    }
  };

  return (
    <main style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>WiftyUp</h1>
        <p style={styles.subtitle}>Sign in to your account</p>

        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />

        <button onClick={handleLogin} style={styles.button}>
          Login
        </button>

        {message && <p style={styles.message}>{message}</p>}
      </div>
    </main>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#080808',
    color: '#fff',
  },
  card: {
    width: '100%',
    maxWidth: '400px',
    padding: '30px',
    borderRadius: '16px',
    background: '#121212',
    boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
    border: '1px solid #222',
  },
  title: {
    fontSize: '28px',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '8px',
  },
  subtitle: {
    fontSize: '14px',
    color: '#888',
    textAlign: 'center',
    marginBottom: '24px',
  },
  input: {
    width: '100%',
    padding: '14px',
    marginBottom: '14px',
    borderRadius: '10px',
    border: '1px solid #333',
    background: '#1e1e1e',
    color: '#fff',
    fontSize: '15px',
    outline: 'none',
  },
  button: {
    width: '100%',
    padding: '14px',
    marginTop: '10px',
    borderRadius: '10px',
    border: 'none',
    background: '#fff',
    color: '#000',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  message: {
    textAlign: 'center',
    marginTop: '15px',
    color: '#00ff88',
    fontSize: '14px',
  },
};


