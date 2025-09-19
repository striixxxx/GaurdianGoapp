import { useState } from "react";
import "./ChatBot.css"; // we'll style it separately

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "👋 Hey! Want me to suggest nearby attractions?" }
  ]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);

    try {
    // Get location
    const position = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });

    const { latitude, longitude } = position.coords;
    
    const res = await fetch("/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });

    const data = await res.json();
    // TODO: replace with your backend API call (AI + Places API)
    const reply = data.reply || "⚠️ No response from AI";

    setMessages([...newMessages, { sender: "bot", text: reply }]);
    } catch (err) {
    console.error(err);
    setMessages([
      ...newMessages,
      { sender: "bot", text: "⚠️ Error reaching AI server" },
    ]);
  }
    setInput("");
  };

  return (
    <div className="chatbot-container">
      {/* Floating button */}
      {!open && (
        <button className="chatbot-toggle" onClick={() => setOpen(true)}>
          💬
        </button>
      )}

      {/* Popup box */}
      {open && (
        <div className="chatbot-popup">
          <div className="chatbot-header">
            <h3>Travel Assistant</h3>
            <button onClick={() => setOpen(false)}>✖</button>
          </div>

          <div className="chatbot-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`msg ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>

          <div className="chatbot-input">
            <input
              type="text"
              value={input}
              placeholder="Ask about nearby attractions..."
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
}
