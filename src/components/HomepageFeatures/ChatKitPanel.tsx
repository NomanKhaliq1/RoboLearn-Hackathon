// src/components/HomepageFeatures/ChatKitPanel.tsx
import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";

type Props = {
  selectedText?: string | null;
  onThreadChange: (id: string | null) => void;
  onResponseCompleted: () => void;
};

type Message = {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
};

// Get backend URL from window config or use default
const getApiUrl = () => {
  if (typeof window === 'undefined') return 'http://localhost:8000';
  if ((window as any).BACKEND_API_URL) {
    return (window as any).BACKEND_API_URL;
  }
  return 'http://localhost:8000';
};

const API_URL = getApiUrl();


export default function ChatKitPanel({ selectedText, onThreadChange, onResponseCompleted }: Props) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: '👋 Hello! I am your AI assistant for Physical AI & Humanoid Robotics. How can I help you today?',
      timestamp: Date.now()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle selected text
  useEffect(() => {
    if (selectedText) {
      setInputValue(`Explain this: "${selectedText}"`);
    }
  }, [selectedText]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();

    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/query`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: userMessage.content,
          selected_text: selectedText || null
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      const aiContent = data.choices?.[0]?.message?.content || "I couldn't generate a response.";

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiContent,
        timestamp: Date.now()
      };

      setMessages(prev => [...prev, aiMessage]);
      onResponseCompleted();
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'system',
        content: "⚠️ Connection error. Please check if the backend is running or try again in a moment.",
        timestamp: Date.now()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chatkit-interface" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Messages Area */}
      <div className="chatkit-body">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={clsx(
              msg.role === 'user' ? 'chatkit-message-user' : 'chatkit-message-bot'
            )}
          >
            {msg.content}
          </div>
        ))}
        {isLoading && (
          <div className="chatkit-message-bot">
            <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
              <span className="typing-dot">●</span>
              <span className="typing-dot" style={{ animationDelay: '0.2s' }}>●</span>
              <span className="typing-dot" style={{ animationDelay: '0.4s' }}>●</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form onSubmit={handleSendMessage} className="chatkit-input-area">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Ask about robotics..."
          disabled={isLoading}
          className="chatkit-input"
        />
        <button
          type="submit"
          disabled={isLoading || !inputValue.trim()}
          className="chatkit-send-button"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </form>

      <style>{`
        .typing-dot {
          color: #71717a;
          font-size: 8px;
          animation: typing 1.4s infinite ease-in-out both;
        }
        
        @keyframes typing {
          0%, 80%, 100% { transform: scale(0); }
          40% { transform: scale(1); }
        }
      `}</style>
    </div>
  );
}