'use client';

import { useState } from 'react';
import { supabase } from '../lib/supabase-browser';

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleAuth = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });
    setLoading(true);

    try {
      if (isSignUp) {
        // Sign Up / Create Account Logic
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });

        if (error) throw error;

        if (data?.user?.identities?.length === 0) {
          setMessage({
            type: 'error',
            text: 'Is email se account pehle se maujood hai. Kripya login karein.',
          });
        } else {
          setMessage({
            type: 'success',
            text: 'Account safaltapoorvak ban gaya! Kripya apna email verify karein ya login karein.',
          });
        }
      } else {
        // Login Logic
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        setMessage({
          type: 'success',
          text: 'Login safal raha! Redirecting...',
        });

        // Dashboard par redirect
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 1000);
      }
    } catch (err) {
      setMessage({
        type: 'error',
        text: err.message || 'Kuch galat hua. Phir se koshish karein.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.title}>WiftyUp</h1>
          <p style={styles.subtitle}>
            {isSignUp ? 'Naya account banayein' : 'Apne account mein login karein'}
          </p>
        </div>

        <form onSubmit={handleAuth} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email Address</label>
            <input
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <div style={styles.passwordWrapper}>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Min 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={styles.input}
                minLength={6}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={styles.showBtn}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          <button type="submit" style={styles.button} disabled={loading}>
            {loading
              ? 'Processing...'
              : isSignUp
              ? 'Create Account'
              : 'Sign In'}
          </button>
        </form>

        {message.text && (
          <div
            style={{
              ...styles.messageBox,
              backgroundColor:
                message.type === 'error'
                  ? 'rgba(255, 77, 79, 0.1)'
                  : 'rgba(82, 196, 26, 0.1)',
              borderColor: message.type === 'error' ? '#ff4d4f' : '#52c41a',
              color: message.type === 'error' ? '#ff7875' : '#73d13d',
            }}
          >
            {message.text}
          </div>
        )}

        <div style={styles.footer}>
          <p style={styles.toggleText}>
            {isSignUp
              ? 'Pehle se account hai?'
              : "Account nahi hai?"}
            <button
              type="button"
              onClick={() => {
                setIsSignUp(!isSignUp);
                setMessage({ type: '', text: '' });
              }}
              style={styles.toggleButton}
            >
              {isSignUp ? 'Sign In' : 'Create Account'}
            </button>
          </p>
        </div>
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
    background: '#0a0a0c',
    color: '#ffffff',
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    padding: '20px',
  },
  card: {
    width: '100%',
    maxWidth: '420px',
    padding: '36px 30px',
    borderRadius: '20px',
    background: '#141418',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6)',
    border: '1px solid #23232a',
  },
  header: {
    marginBottom: '28px',
    textAlign: 'center',
  },
  title: {
    fontSize: '32px',
    fontWeight: '800',
    letterSpacing: '-0.5px',
    color: '#ffffff',
    margin: '0 0 6px 0',
  },
  subtitle: {
    fontSize: '14px',
    color: '#9090a0',
    margin: 0,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '18px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  label: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#ccc',
  },
  passwordWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    padding: '14px 16px',
    borderRadius: '12px',
    border: '1px solid #2a2a35',
    background: '#1a1a22',
    color: '#fff',
    fontSize: '15px',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s',
  },
  showBtn: {
    position: 'absolute',
    right: '12px',
    background: 'transparent',
    border: 'none',
    color: '#808095',
    fontSize: '12px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  button: {
    width: '100%',
    padding: '14px',
    marginTop: '8px',
    borderRadius: '12px',
    border: 'none',
    background: '#ffffff',
    color: '#000000',
    fontSize: '16px',
    fontWeight: '700',
    cursor: 'pointer',
  },
  messageBox: {
    marginTop: '20px',
    padding: '12px 16px',
    borderRadius: '10px',
    border: '1px solid',
    fontSize: '13px',
    textAlign: 'center',
    lineHeight: '1.4',
  },
  footer: {
    marginTop: '24px',
    textAlign: 'center',
  },
  toggleText: {
    fontSize: '14px',
    color: '#808095',
    margin: 0,
  },
  toggleButton: {
    background: 'none',
    border: 'none',
    color: '#ffffff',
    fontWeight: '700',
    marginLeft: '8px',
    cursor: 'pointer',
    textDecoration: 'underline',
  },
};

