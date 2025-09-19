// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import ChatBot from "./components/shared/Chatbot.jsx";

// ✅ Pages
import Home from "./Pages/Home";
import Alerts from "./Pages/Alerts.jsx";
import Map from "./Pages/Map.jsx";
import Profile from "./Pages/Profile.jsx";
import Resources from "./Pages/Resources.jsx";

// ✅ Shared / layout components
import PanicButton from "./components/shared/PanicButton";
import Layout from "./layout.jsx"; // if layout/index.js exports a wrapper

function App() {
  return (
    <Router>
      {/* Optional global wrapper, remove if you don't have a layout */}
      <Layout>
        {/* Global panic button always visible */}
        <PanicButton />
        <ChatBot /> 

        {/* Define page routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/map" element={<Map />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/resources" element={<Resources />} />

          {/* 404 fallback */}
          <Route
            path="*"
            element={
              <div className="p-6 text-center text-xl">
                Page Not Found
              </div>
            }
          />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;