"use client";

import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [chat, setChat] = useState([]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const updated = [...chat, { role: "user", text: input }];
    setChat(updated);

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: input }),
    });

    const data = await res.json();

    setChat([...updated, { role: "ai", text: data.reply }]);
    setInput("");
  };

  return (
    <div style={{
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      background: "#f7f7f8"
    }}>

      {/* HEADER */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "12px 16px",
        background: "white",
        borderBottom: "1px solid #eee"
      }}>
        <div style={{ fontWeight: "600" }}>Air Waves</div>

        <div style={{ display: "flex", gap: "10px" }}>
          <button>＋</button>
          <button>⋮</button>
        </div>
      </div>

      {/* CHAT AREA */}
      <div style={{
        flex: 1,
        overflowY: "auto",
        padding: "16px"
      }}>
        {chat.length === 0 && (
          <div style={{
            textAlign: "center",
            marginTop: "40%",
            color: "#999"
          }}>
            <h2>Air Waves</h2>
            <p>Ask anything...</p>
          </div>
        )}

        {chat.map((msg, i) => (
          <div key={i} style={{ marginBottom: "12px" }}>
            
            {msg.role === "user" ? (
              <div style={{
                background: "#e5e5ea",
                padding: "10px 14px",
                borderRadius: "16px",
                maxWidth: "75%",
                marginLeft: "auto"
              }}>
                {msg.text}
              </div>
            ) : (
              <div style={{
                background: "white",
                padding: "12px",
                borderRadius: "16px",
                border: "1px solid #ddd",
                maxWidth: "75%",
                position: "relative"
              }}>
                <button
                  onClick={() => navigator.clipboard.writeText(msg.text)}
                  style={{
                    position: "absolute",
                    top: "5px",
                    right: "8px",
                    fontSize: "10px",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer"
                  }}
                >
                  📋
                </button>
                {msg.text}
              </div>
            )}

          </div>
        ))}
      </div>

      {/* INPUT AREA */}
      <div style={{
        padding: "10px",
        background: "white",
        borderTop: "1px solid #eee"
      }}>
        
        <div style={{
          display: "flex",
          alignItems: "center",
          background: "#f1f1f1",
          borderRadius: "25px",
          padding: "6px 10px"
        }}>
          
          {/* PLUS BUTTON */}
          <button style={{ marginRight: "6px" }}>＋</button>

          {/* INPUT */}
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Air Waves can make mistakes, check important info."
            style={{
              flex: 1,
              border: "none",
              outline: "none",
              background: "transparent",
              padding: "8px"
            }}
          />

          {/* MIC */}
          <button style={{ marginLeft: "6px" }}>🎤</button>

          {/* SEND */}
          <button
            onClick={sendMessage}
            style={{
              marginLeft: "6px",
              background: "black",
              color: "white",
              borderRadius: "20px",
              padding: "6px 12px"
            }}
          >
            ➤
          </button>

        </div>

      </div>
    </div>
  );
}
