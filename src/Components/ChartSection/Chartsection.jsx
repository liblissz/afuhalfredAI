









import React, { useRef, useEffect } from 'react';
import './Chartsection.css';
import ReactMarkdown from 'react-markdown'; // ✅ required for markdown rendering
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
const ChatSection = ({ isOpen, currentMessages, sendMessage, loading, setInput, input }) => {
  const textareaRef = useRef(null);

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    const resize = () => {
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
    };

    textarea.addEventListener('input', resize);
    return () => textarea.removeEventListener('input', resize);
  }, []);

  // Reset textarea height on input clear
  useEffect(() => {
    if (textareaRef.current && input === '') {
      textareaRef.current.style.height = 'auto';
    }
  }, [input]);

  // Scroll to bottom when new messages are added
  useEffect(() => {
    const messageContainer = document.getElementById('messages');
    if (messageContainer) {
      messageContainer.scrollTop = messageContainer.scrollHeight;
    }
  }, [currentMessages, loading]);

  return (
    <div className="chat-wrapper">
      <div className="messages" id="messages">
        <div className="intro-message">
          <h1>Welcome to Afuh Alfred's AI</h1>
          <p>Ask me anything. I'm powered by Che Fortune Orsa</p>
          <div className="suggestion-chips">
            {["How many projects do we have in stock?", "help me annd write a script", "tell me more about projects?", "what is the latest trends on organisations out now?"].map((text) => (
              <button
                key={text}
                className="suggestion-chip"
                onClick={() => {
                  setInput(text);
                  setTimeout(() => {
                    sendMessage();
                  }, 100);
                }}
              >
                {text}
              </button>
            ))}
          </div>
        </div>

        {currentMessages.map((msg, i) => (
          <div key={i} className={`message ${msg.role}`}>
            <div className="message-content">
              <ReactMarkdown  style={{color: "white"}} rehypePlugins={[rehypeRaw, rehypeSanitize]}>{msg.content}</ReactMarkdown>
            </div>
          </div>
        ))}

        {loading && (
          <div className="message assistant">
            <div className="message-content">Typing...</div>
          </div>
        )}
      </div>

      {!isOpen && (
        <div className="input-area">
          <div className="input-container">
            <button
              id="file-upload-button"
              title="Upload File"
              onClick={() => document.getElementById("file-upload").click()}
            >
              <i className="fas fa-paperclip"></i>
            </button>
           
            <textarea
              ref={textareaRef}
              id="user-input"
              placeholder="Type your message here..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows="1"
              style={{ overflow: 'hidden', resize: 'none' }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              disabled={loading}
            />
            <button
              id="send-button"
              title="Send message"
              onClick={sendMessage}
              disabled={loading || !input.trim()}
            >
              <i className="fas fa-paper-plane"></i>
            </button>
          </div>
          <div className="disclaimer">
            Fortune's AI produces accurate information but it can make mistakes.
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatSection;




















