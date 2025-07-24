// import React, { useState, useEffect } from "react";
// import axios from "axios";

// // Correct API base to match your backend router mount path
// const API_BASE = "http://localhost:2500/ai/chat";

// const Sample = () => {
//   const [conversations, setConversations] = useState([]);
//   const [currentMessages, setCurrentMessages] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(null);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);

//   // Load conversations on mount
//   useEffect(() => {
//     fetchConversations();
//   }, []);

//   // Fetch all conversations from backend
//   const fetchConversations = async () => {
//     try {
//       console.log("Fetching conversations...");
//       const res = await axios.get(`${API_BASE}/conversations`);
//       console.log("Conversations fetched:", res.data);
//       if (res.data.length === 0) {
//         await createConversation();
//       } else {
//         setConversations(res.data);
//         selectConversation(0, res.data);
//       }
//     } catch (error) {
//       console.error("Fetch conversations error:", error);
//     }
//   };

//   // Create a new conversation
//   const createConversation = async () => {
//     try {
//       console.log("Creating conversation...");
//       const res = await axios.post(`${API_BASE}/conversations`);
//       console.log("Created conversation:", res.data);
//       const updated = [res.data, ...conversations];
//       setConversations(updated);
//       selectConversation(0, updated);
//     } catch (error) {
//       console.error("Create conversation error:", error);
//     }
//   };

//   // Select a conversation and load messages
//   const selectConversation = async (index, convs = conversations) => {
//     const conv = convs[index];
//     if (!conv) {
//       console.warn("No conversation found at index", index);
//       return;
//     }
//     setCurrentIndex(index);
//     try {
//       console.log(`Fetching messages for conversation ${conv._id}`);
//       const res = await axios.get(`${API_BASE}/messages/${conv._id}`);
//       console.log("Messages fetched:", res.data);
//       setCurrentMessages(res.data);
//     } catch (error) {
//       console.error("Error fetching messages:", error);
//       setCurrentMessages([]);
//     }
//   };

//   // Send a user message and get AI response
//   const sendMessage = async () => {
//     if (!input.trim() || currentIndex === null) return;

//     const conversationId = conversations[currentIndex]._id;
//     const userMessage = { role: "user", content: input.trim() };

//     // Optimistically add the user message
//     setCurrentMessages([...currentMessages, userMessage]);
//     setInput("");
//     setLoading(true);

//     try {
//       // POST to backend's main chat route (send message and get AI reply)
//       const res = await axios.post(`${API_BASE}`, {
//         userMessage: userMessage.content,
//         conversationId,
//       });

//       const assistantMessage = {
//         role: "assistant",
//         content: res.data.message || "Error: No response from AI.",
//       };

//       setCurrentMessages((prev) => [...prev, assistantMessage]);
//     } catch (error) {
//       console.error("Send message error:", error);
//       setCurrentMessages((prev) => [
//         ...prev,
//         { role: "assistant", content: "❌ Server error, try again." },
//       ]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <div style={styles.sidebar}>
//         <h3 style={styles.sidebarTitle}>Conversations</h3>
//         <button style={styles.newButton} onClick={createConversation}>
//           + New
//         </button>
//         <ul style={styles.convoList}>
//           {conversations.map((conv, idx) => (
//             <li
//               key={conv._id}
//               onClick={() => selectConversation(idx)}
//               style={{
//                 ...styles.convoItem,
//                 backgroundColor: idx === currentIndex ? "#444" : "#333",
//               }}
//             >
//               {conv.title || conv._id.slice(0, 6)}
//             </li>
//           ))}
//         </ul>
//       </div>

//       <div style={styles.chat}>
//         <div style={styles.messages}>
//           {currentMessages.map((msg, i) => (
//             <div
//               key={i}
//               style={{
//                 ...styles.message,
//                 alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
//                 backgroundColor: msg.role === "user" ? "#4caf50" : "#555",
//               }}
//             >
//               {msg.content}
//             </div>
//           ))}
//           {loading && (
//             <div
//               style={{
//                 ...styles.message,
//                 alignSelf: "flex-start",
//                 backgroundColor: "#555",
//               }}
//             >
//               Typing...
//             </div>
//           )}
//         </div>
//         <div style={styles.inputArea}>
//           <input
//             style={styles.input}
//             placeholder="Type a message..."
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//             disabled={loading}
//           />
//           <button style={styles.sendBtn} onClick={sendMessage} disabled={loading}>
//             Send
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Sample;

// const styles = {
//   container: {
//     display: "flex",
//     height: "100vh",
//     fontFamily: "sans-serif",
//     backgroundColor: "#1e1e1e",
//     color: "#fff",
//   },
//   sidebar: {
//     width: "240px",
//     backgroundColor: "#2d2d2d",
//     padding: "16px",
//     borderRight: "1px solid #444",
//     boxSizing: "border-box",
//   },
//   sidebarTitle: {
//     marginBottom: "12px",
//   },
//   newButton: {
//     backgroundColor: "#4caf50",
//     color: "#fff",
//     padding: "8px 12px",
//     border: "none",
//     marginBottom: "10px",
//     cursor: "pointer",
//     borderRadius: "4px",
//   },
//   convoList: {
//     listStyle: "none",
//     padding: 0,
//     marginTop: "10px",
//   },
//   convoItem: {
//     padding: "10px",
//     marginBottom: "6px",
//     borderRadius: "4px",
//     cursor: "pointer",
//     backgroundColor: "#333",
//   },
//   chat: {
//     flex: 1,
//     display: "flex",
//     flexDirection: "column",
//     padding: "16px",
//   },
//   messages: {
//     flex: 1,
//     overflowY: "auto",
//     display: "flex",
//     flexDirection: "column",
//     gap: "10px",
//     paddingBottom: "20px",
//   },
//   message: {
//     maxWidth: "60%",
//     padding: "10px 14px",
//     borderRadius: "8px",
//     wordBreak: "break-word",
//   },
//   inputArea: {
//     display: "flex",
//     gap: "8px",
//     paddingTop: "10px",
//     borderTop: "1px solid #444",
//   },
//   input: {
//     flex: 1,
//     padding: "10px",
//     borderRadius: "6px",
//     border: "1px solid #555",
//     backgroundColor: "#2c2c2c",
//     color: "#fff",
//   },
//   sendBtn: {
//     padding: "10px 16px",
//     backgroundColor: "#4caf50",
//     color: "#fff",
//     border: "none",
//     borderRadius: "6px",
//     cursor: "pointer",
//   },
// };




import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown"; 
// <-- import react-markdown
import "./style.css"

// Correct API base to match your backend router mount path
const API_BASE = "http://localhost:2500/ai/chat";

const Sample = () => {
  const [conversations, setConversations] = useState([]);
  const [currentMessages, setCurrentMessages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // Load conversations on mount
  useEffect(() => {
    fetchConversations();
  }, []);

  // Fetch all conversations from backend
  const fetchConversations = async () => {
    try {
      console.log("Fetching conversations...");
      const res = await axios.get(`${API_BASE}/conversations`);
      console.log("Conversations fetched:", res.data);
      if (res.data.length === 0) {
        await createConversation();
      } else {
        setConversations(res.data);
        selectConversation(0, res.data);
      }
    } catch (error) {
      console.error("Fetch conversations error:", error);
    }
  };

  // Create a new conversation
  const createConversation = async () => {
    try {
      console.log("Creating conversation...");
      const res = await axios.post(`${API_BASE}/conversations`);
      console.log("Created conversation:", res.data);
      const updated = [res.data, ...conversations];
      setConversations(updated);
      selectConversation(0, updated);
    } catch (error) {
      console.error("Create conversation error:", error);
    }
  };

  // Select a conversation and load messages
  const selectConversation = async (index, convs = conversations) => {
    const conv = convs[index];
    if (!conv) {
      console.warn("No conversation found at index", index);
      return;
    }
    setCurrentIndex(index);
    try {
      console.log(`Fetching messages for conversation ${conv._id}`);
      const res = await axios.get(`${API_BASE}/messages/${conv._id}`);
      console.log("Messages fetched:", res.data);
      setCurrentMessages(res.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
      setCurrentMessages([]);
    }
  };

  // Send a user message and get AI response
  const sendMessage = async () => {
    if (!input.trim() || currentIndex === null) return;

    const conversationId = conversations[currentIndex]._id;
    const userMessage = { role: "user", content: input.trim() };

    // Optimistically add the user message
    setCurrentMessages([...currentMessages, userMessage]);
    setInput("");
    setLoading(true);

    try {
      // POST to backend's main chat route (send message and get AI reply)
      const res = await axios.post(`${API_BASE}`, {
        userMessage: userMessage.content,
        conversationId,
      });

      const assistantMessage = {
        role: "assistant",
        content: res.data.message || "Error: No response from AI.",
      };

      setCurrentMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Send message error:", error);
      setCurrentMessages((prev) => [
        ...prev,
        { role: "assistant", content: "❌ Server error, try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <h3 style={styles.sidebarTitle}>Conversations</h3>
        <button style={styles.newButton} onClick={createConversation}>
          + New
        </button>
        <ul style={styles.convoList}>
          {conversations.map((conv, idx) => (
            <li
              key={conv._id}
              onClick={() => selectConversation(idx)}
              style={{
                ...styles.convoItem,
                backgroundColor: idx === currentIndex ? "#444" : "#333",
              }}
            >
              {conv.title || conv._id.slice(0, 6)}
            </li>
          ))}
        </ul>
      </div>

      <div style={styles.chat}>
        <div style={styles.messages}>
          {currentMessages.map((msg, i) => (
            <div
              key={i}
              style={{
                ...styles.message,
                alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
                backgroundColor: msg.role === "user" ? "#4caf50" : "#555",
            
              }}
              className={msg.role === "assistant" ? "ai-message" : ""}
            >
              <ReactMarkdown>{msg.content}</ReactMarkdown> {/* <-- render markdown */}
            </div>
          ))}
          {loading && (
            <div
              style={{
                ...styles.message,
                alignSelf: "flex-start",
                backgroundColor: "#555",
              }}
            >
              Typing...
            </div>
          )}
        </div>
        <div style={styles.inputArea}>
          <input
            style={styles.input}
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            disabled={loading}
          />
          <button style={styles.sendBtn} onClick={sendMessage} disabled={loading}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sample;

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    fontFamily: "sans-serif",
    backgroundColor: "#1e1e1e",
    color: "#fff",
  },
  sidebar: {
    width: "240px",
    backgroundColor: "#2d2d2d",
    padding: "16px",
    borderRight: "1px solid #444",
    boxSizing: "border-box",
  },
  sidebarTitle: {
    marginBottom: "12px",
  },
  newButton: {
    backgroundColor: "#4caf50",
    color: "#fff",
    padding: "8px 12px",
    border: "none",
    marginBottom: "10px",
    cursor: "pointer",
    borderRadius: "4px",
  },
  convoList: {
    listStyle: "none",
    padding: 0,
    marginTop: "10px",
  },
  convoItem: {
    padding: "10px",
    marginBottom: "6px",
    borderRadius: "4px",
    cursor: "pointer",
    backgroundColor: "#333",
  },
  chat: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    padding: "16px",
  },
  messages: {
    flex: 1,
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    paddingBottom: "20px",
  },
  message: {
    maxWidth: "60%",
    padding: "10px 14px",
    borderRadius: "8px",
    wordBreak: "break-word",
  },
  inputArea: {
    display: "flex",
    gap: "8px",
    paddingTop: "10px",
    borderTop: "1px solid #444",
  },
  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #555",
    backgroundColor: "#2c2c2c",
    color: "#fff",
  },
  sendBtn: {
    padding: "10px 16px",
    backgroundColor: "#4caf50",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  
};
