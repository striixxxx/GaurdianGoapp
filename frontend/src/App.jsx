import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import ChatBot from "./components/shared/Chatbot.jsx";

// ✅ Pages
import Home from "./Pages/Home";
import Alerts from "./Pages/Alerts.jsx";
import Map from "./Pages/Map.jsx";
import Profile from "./Pages/Profile.jsx";
import Resources from "./Pages/Resources.jsx";
import DidYouKnow from "./Pages/DidYouKnow.jsx";
import Login from "./Pages/Login.jsx";

// ✅ Shared / layout components
import PanicButton from "./components/shared/PanicButton";
import Layout from "./layout.jsx";

function App() {
  // --- Did-You-Know splash ---
  const [showFact, setShowFact] = useState(true);

  // --- Login state ---
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the user has already logged in before
    const hasLoggedIn = localStorage.getItem("isLoggedIn");
    if (hasLoggedIn === "true") {
      setLoggedIn(true);
    }
  }, []);

  // 1️⃣ Show DidYouKnow first
  if (showFact) {
    return <DidYouKnow onContinue={() => setShowFact(false)} />;
  }

  // 2️⃣ After fact, show login if not already logged in
  if (!loggedIn&&loggedIn) {
    return (
      <Login
        onLogin={() => {
          localStorage.setItem("isLoggedIn", "true");
          setLoggedIn(true);
        }}
      />
    );
  }

  // 3️⃣ Normal app once logged in
  return (
    <Router>
      <Layout>
        <PanicButton />
        <ChatBot /> 

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/map" element={<Map />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/home" element={<Home />} />

          {/* 404 fallback */}
          <Route
            path="*"
            element={
              <div className="p-6 text-center text-xl">Page Not Found</div>
            }
          />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
