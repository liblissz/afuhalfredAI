// Sidebar.js
import React, { useState, useEffect } from "react";
import "./Sidebar.css";

import { Link } from "react-router-dom";

const Sidebar = ({ isOpen, currentIndex, selectConversation, onToggleSidebar,conversations,loading, createConversation, fetchConversations, clearHistory, currentConversationId }) => {
  const [isDark, setIsDark] = useState(false);
  // Load theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setIsDark(savedTheme === "dark");
    document.body.classList.toggle("dark-mode", savedTheme === "dark");
  }, []);

   const toggleTheme = () => {
    const newTheme = isDark ? "light" : "dark";
    setIsDark(!isDark);
    localStorage.setItem("theme", newTheme);
    document.body.classList.toggle("dark-mode", newTheme === "dark");
  };
 
 


  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="logo">

        <div>
          <i className="fas fa-robot"></i>
          <span>Fortune's Chat</span>
        </div>


        <div>
          <i className="fas fa-close" onClick={onToggleSidebar}></i>
        </div>
      </div>

      <button id="new-chat" onClick={createConversation} className="new-chat-btn" >
        <span>+ New Chat</span>
      </button>

      <div className="history-container">
        <h3>Chat History  <span>{conversations.length}</span></h3>
        <div id="chat-history">
          {loading && <p>loading....</p>}
          {/* {conversations.length === 0 && <p className="empty">No history</p>}
         */}
          {/* {conversations.map((conv) => (
            <div
              key={conv._id}
              className={`history-item ${currentConversationId === conv._id ? "active" : ""}`}
              
              onClick={() => onSelectConversation(conv._id)}
            >
              <i className="fas fa-comments"></i>
              <span>{conv.title || `Conversation ${conv._id.slice(-4)}`}</span>
            
              </div>
          ))} */}
           {conversations.map((conv, idx) => (
            <li
              key={conv._id}
              onClick={() => selectConversation(idx)}
              style={{  
                backgroundColor: idx === currentIndex ? "#444" : "#333",
              }}
               className={`history-item`}
              
            >
                <i className="fas fa-comments"></i>
              <span>   {conv.title || conv._id.slice(0, 6)} <span>{idx}</span></span>
            
           
            </li>
          ))}
        </div>
      </div>

      <div className="settings">
           <button onClick={toggleTheme}>
          <i className={`fas ${isDark ? "fa-sun" : "fa-moon"}`}></i>
          <span>{isDark ? "Light Mode" : "Dark Mode"}</span>
        </button>
        <button onClick={clearHistory}>
          <i className="fas fa-trash"></i>
          <span>Clear History</span>
        </button>
     
      </div>
    </div>
  );
};

export default Sidebar;








// import React from "react";
// import "./Sidebar.css";

// const Sidebar = ({
//   isOpen,
//   onToggleSidebar,
//   conversations,
//   onSelectConversation,
//   onNewConversation,
//   onClearHistory,
//   currentConversationId,
// }) => {
//   const [isDark, setIsDark] = React.useState(false);

//   React.useEffect(() => {
//     const savedTheme = localStorage.getItem("theme") || "light";
//     setIsDark(savedTheme === "dark");
//     document.body.classList.toggle("dark-mode", savedTheme === "dark");
//   }, []);

//   const toggleTheme = () => {
//     const newTheme = isDark ? "light" : "dark";
//     setIsDark(!isDark);
//     localStorage.setItem("theme", newTheme);
//     document.body.classList.toggle("dark-mode", newTheme === "dark");
//   };

//   return (
//     <div className={`sidebar ${isOpen ? "open" : ""}`}>
//       <div className="logo">
//         <div>
//           <i className="fas fa-robot"></i>
//           <span>BtC Chart</span>
//         </div>
//         <div>
//           <i className="fas fa-close" onClick={onToggleSidebar}></i>
//         </div>
//       </div>

//       <button id="new-chat" className="new-chat-btn" onClick={onNewConversation}>
//         <span>New Chat</span>
//       </button>

//       <div className="history-container">
//         <h3>Chat History</h3>
//         <div id="chat-history" style={{ maxHeight: '60vh', overflowY: 'auto' }}>
//           {conversations.length === 0 && <p>No conversations yet</p>}
//           {conversations.map((conv) => (
//             <div
//               key={conv.id}
//               className={`chat-item ${conv.id === currentConversationId ? "active" : ""}`}
//               onClick={() => onSelectConversation(conv.id)}
//               style={{
//                 cursor: "pointer",
//                 padding: "10px",
//                 borderBottom: "1px solid #ccc",
//                 backgroundColor: conv.id === currentConversationId ? "#ddd" : "transparent",
//               }}
//               title={conv.title || "Untitled Conversation"}
//             >
//               <strong>{conv.title || "Untitled Conversation"}</strong>
//               <br />
//               <small>{new Date(conv.lastUpdated).toLocaleString()}</small>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="settings">
//         <button id="clear-history" onClick={onClearHistory}>
//           <i className="fas fa-trash"></i>
//           <span>Clear History</span>
//         </button>
//         <button id="toggle-theme" onClick={toggleTheme}>
//           <i className={`fas ${isDark ? "fa-sun" : "fa-moon"}`}></i>
//           <span>{isDark ? "Light Mode" : "Dark Mode"}</span>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;















