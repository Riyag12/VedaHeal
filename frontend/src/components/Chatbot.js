import React, { useState } from "react";
import "../styles/Chatbot.css"; // Create this CSS file for styling

const Chatbot = () => {
    const [message, setMessage] = useState("");
    const [response, setResponse] = useState("");
    const [loading, setLoading] = useState(false);

    const sendMessage = async () => {
        if (!message.trim()) return;
        setLoading(true);
    
        try {
            const res = await fetch("http://127.0.0.1:8000/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ query: message }),
            });
    
            const data = await res.json();
            
            // ✅ Ensure response is treated as a string
            setResponse(data.response || "No response received.");
            
        } catch (error) {
            console.error("Error:", error);
            setResponse("Error connecting to the chatbot.");
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <div className="chatbot-container">
            <h2>VedaHeal Chatbot</h2>
            <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask anything about Ayurveda..."
            />
            <button onClick={sendMessage} disabled={loading}>
                {loading ? "Thinking..." : "Ask"}
            </button>
            {!loading && response && <p className="chat-response">{response}</p>}
        </div>
    );
};

export default Chatbot;
