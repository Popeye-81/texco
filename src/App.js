import { useState } from 'react';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [message, setMessage] = useState('');

  const handleLogin = () => {
    if (username === 'admin' && password === 'admin123') {
      setIsLoggedIn(true);
      setMessage('');
    } else {
      setMessage('Invalid Username or Password');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
    setMessage('');
  };

  // Dashboard View
  if (isLoggedIn) {
    return (
      <div className="dashboard">
        <div className="sidebar">
          <h2>Texco</h2>

          <button>Dashboard</button>
          <button>Employee Management</button>
          <button>Reports</button>
          <button>Settings</button>

          <button onClick={handleLogout}>
            Logout
          </button>
        </div>

        <div className="main-content">
          <h1>Welcome to Texco</h1>
          <p>Select an option from the menu.</p>

          <div className="dashboard-cards">
            <div className="card">
              <h3>Employees</h3>
              <p>125</p>
            </div>

            <div className="card">
              <h3>Reports</h3>
              <p>18</p>
            </div>

            <div className="card">
              <h3>Pending Tasks</h3>
              <p>7</p>
            </div>

            <div className="card">
              <h3>Settings</h3>
              <p>Updated</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Login View
  return (
    <div className="App">
      <div className="login-container">
        <h2>Texco Login</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>
          Login
        </button>

        {message && <p>{message}</p>}
      </div>
    </div>
  );
}

export default App;