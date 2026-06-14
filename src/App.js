import { useState } from "react";
import "./App.css";

import Dashboard from "./components/Dashboard";
import Employees from "./components/Employees";
import Reports from "./components/Reports";
import Settings from "./components/Settings";
import DealerRetailer from "./components/DealerRetailer";

import ASEMaster from "./components/ASEMaster";
import ASMMaster from "./components/ASMMaster";
import SMMaster from "./components/SMMaster";
import StateMaster from "./components/StateMaster";
import ProductMaster from "./components/ProductMaster";
import OrderFormat from "./components/OrderFormat";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");
  const [activePage, setActivePage] = useState("dashboard");

  // 🔐 LOGIN FUNCTION (FIXED)
  const handleLogin = async () => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      console.log("LOGIN RESPONSE:", data);

      if (res.ok && data.role) {
        localStorage.setItem("token", data.token);

        setRole(data.role);
        setIsLoggedIn(true);
        setActivePage("dashboard");
        setMessage("");
      } else {
        setMessage("Invalid Username or Password");
      }
    } catch (err) {
      console.log(err);
      setMessage("Server error");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
    setPassword("");
    setRole("");
    setActivePage("dashboard");
    localStorage.removeItem("token");
  };

  // 🔐 ROLE-BASED ACCESS (UI CONTROL)
  const canApprove = role === "ASM" || role === "ADMIN" || role === "SM";
  const isAdmin = role === "ADMIN";

  const renderPage = () => {
    switch (activePage) {
      case "dashboard":
        return <Dashboard />;

      case "employees":
        return <Employees />;

      case "reports":
        return <Reports />;

      case "settings":
        return <Settings />;

      case "dealer":
        return <DealerRetailer />;

      case "ase":
        return <ASEMaster />;

      case "asm":
        return <ASMMaster />;

      case "sm":
        return <SMMaster />;

      case "state":
        return <StateMaster />;

      case "product":
        return <ProductMaster />;

      case "order":
        return <OrderFormat />;

      default:
        return <Dashboard />;
    }
  };

  // 🔐 LOGIN SCREEN
  if (!isLoggedIn) {
    return (
      <div className="App">
        <div className="login-container">
          <h2>Texco ERP Login</h2>

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

          <button onClick={handleLogin}>Login</button>

          {message && <p style={{ color: "red" }}>{message}</p>}
        </div>
      </div>
    );
  }

  // 🔐 MAIN APP
  return (
    <div className="dashboard">
      <div className="sidebar">
        <h2>Texco ERP</h2>

        <button onClick={() => setActivePage("dashboard")}>Dashboard</button>

        <button onClick={() => setActivePage("dealer")}>
          Dealer & Retailer
        </button>

        <button onClick={() => setActivePage("ase")}>ASE Master</button>

        <button onClick={() => setActivePage("asm")}>ASM Master</button>

        <button onClick={() => setActivePage("sm")}>SM Master</button>

        <button onClick={() => setActivePage("state")}>State Master</button>

        <hr />

        <button onClick={() => setActivePage("product")}>
          Product Master
        </button>

        <button onClick={() => setActivePage("order")}>Order Format</button>

        <hr />

        {/* ADMIN ONLY FEATURE EXAMPLE */}
        {isAdmin && (
          <button onClick={() => setActivePage("reports")}>
            Reports (Admin)
          </button>
        )}

        <button onClick={handleLogout}>Logout</button>
      </div>

      <div className="main-content">{renderPage()}</div>
    </div>
  );
}

export default App;