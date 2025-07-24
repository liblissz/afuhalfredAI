// import React, { useEffect, useState } from 'react'
// import Sidebar from '../Components/Sidebar/Sidebar'
// import Header from '../Components/Header/Header'
// import Chartsection from '../Components/ChartSection/Chartsection'
// import axios from 'axios'
// const Realone = () => {
//   const API_BASE = "http://localhost:2500/ai/chat";
  
//       const [opennav, setopennav] = useState(false);
          
//   const [conversations, setConversations] = useState([]);
//    const [currentMessages, setCurrentMessages] = useState([]);
//    const [currentIndex, setCurrentIndex] = useState(null);
//    const [input, setInput] = useState("");
 
//       const toggleSidebar = () => {
//         setopennav(!opennav);
//       };
//   const [loading, setloading] = useState(false)
      
//        // Load chat history
//    useEffect(() => {
//     fetchConversations();
//   }, []);
//   // Fetch all conversations from backend
//   const fetchConversations = async () => {
//     try {
//       setloading(true)
//       console.log("Fetching conversations...");
//       const res = await axios.get(`${API_BASE}/conversations`);
//       console.log("Conversations fetched:", res.data);
//       if (res.data.length === 0) {
//         await createConversation();
//       } else {
//         setConversations(res.data);
//         // selectConversation(0, res.data);
//       }
//     } catch (error) {
//       console.error("Fetch conversations error:", error);
//     }finally{
//       setloading(false)
//     }
//   };
//    // Select a conversation and load messages
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


//   // Toggle theme (light/dark)


//   // Clear chat history
//   const clearHistory = async () => {
//     try {
//       await axios.delete("http://localhost:2500/api/chat/conversations");
//       setConversations([]);
//     } catch (error) {
//       console.error("Failed to clear history:", error);
//     }
//   };

//        const createConversation = async () => {
//     try {
//       console.log("Creating conversation...");
//       const res = await axios.post(`${API_BASE}/conversations`);
//       console.log("Created conversation:", res.data);
//       const updated = [res.data, ...conversations];
//       setConversations(updated);
//       // selectConversation(0, updated);
//     } catch (error) {
//       console.error("Create conversation error:", error);
//     }
//   };
//    const sendMessage = async () => {
//     if (!input.trim() || currentIndex === null) return;

//     const conversationId = conversations[currentIndex]._id;
//     const userMessage = { role: "user", content: input.trim() };

//     // Optimistically add the user message
//     setCurrentMessages([...currentMessages, userMessage]);
//     setInput("");
//     setloading(true);

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
//       setloading(false);
//     }
//   };

//   return (
//    <div className="container">
//     <div className="app-container">
// <Sidebar isOpen={opennav} loading={loading} sendMessage={sendMessage} currentIndex={currentIndex} selectConversation={selectConversation}  conversations={conversations} clearHistory={clearHistory}  onToggleSidebar={toggleSidebar} createConversation={createConversation} fetchConversations={fetchConversations}/>
//  <div className="chat-container">
//   <Header onToggleSidebar={toggleSidebar}/>
//   <Chartsection isOpen={opennav} currentMessages={currentMessages} sendMessage={sendMessage} setInput={setInput}  loading={loading}/>
//   </div>
//     </div>
//     </div>
//   )
// }

// export default Realone


















import React, { useEffect, useState } from 'react';
import Sidebar from '../Components/Sidebar/Sidebar';
import Header from '../Components/Header/Header';
import ChatSection from '../Components/ChartSection/Chartsection'; // ✅ Correct import name
import axios from 'axios';

const Realone = () => {
  const API_BASE = "https://zozacbackend.onrender.com";

  const [opennav, setopennav] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [currentMessages, setCurrentMessages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  // Toggle sidebar
  const toggleSidebar = () => {
    setopennav(!opennav);
  };

  // Load conversations on mount
  useEffect(() => {
    fetchConversations();
  }, []);

  // Fetch all conversations
  const fetchConversations = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE}/conversations`);
      if (res.data.length === 0) {
        await createConversation();
      } else {
        setConversations(res.data);
      }
    } catch (error) {
      console.error("Fetch conversations error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Create a new conversation
  const createConversation = async () => {
    try {
      const res = await axios.post(`${API_BASE}/conversations`);
      const newConvs = [res.data, ...conversations];
      setConversations(newConvs);
      setCurrentIndex(0);
      setCurrentMessages([]);
    } catch (error) {
      console.error("Create conversation error:", error);
    }
  };

  // Select conversation
  const selectConversation = async (index, convs = conversations) => {
    const conv = convs[index];
    if (!conv) return;

    setCurrentIndex(index);
    try {
      const res = await axios.get(`${API_BASE}/messages/${conv._id}`);
      setCurrentMessages(res.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
      setCurrentMessages([]);
    }
  };

  // Clear all history
  const clearHistory = async () => {
    try {
      await axios.delete(`${API_BASE}/conversations`);
      setConversations([]);
      setCurrentMessages([]);
      setCurrentIndex(null);
    } catch (error) {
      console.error("Failed to clear history:", error);
    }
  };

  // Send user message
  const sendMessage = async () => {
    if (!input.trim() || currentIndex === null) return;

    const conversationId = conversations[currentIndex]._id;
    const userMessage = { role: "user", content: input.trim() };

    setCurrentMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const res = await axios.post(`${API_BASE}`, {
        userMessage: userMessage.content,
        conversationId,
      });

      const assistantMessage = {
        role: "assistant",
        content: res.data.message || "⚠️ AI returned no message.",
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
const PROTECTED_PASSWORD = "goldblissz";
const STORAGE_KEY = "password";

const [enterpass, setpass] = useState('');
const [unlock, setunlock] = useState(false);

useEffect(() => {
  // Auto‑unlock if already stored
  if (localStorage.getItem(STORAGE_KEY) === PROTECTED_PASSWORD) {
    setunlock(true);
  }
}, []);

const handlesubmit = e => {
  e.preventDefault();

  // Check against the constant
  if (enterpass === PROTECTED_PASSWORD) {
    // Only now store it
    localStorage.setItem(STORAGE_KEY, PROTECTED_PASSWORD);
    setunlock(true);
    // Optionally reload or redirect
  
  } else {
    alert("Wrong password—please enter the correct password");
    setpass('');
  }
};


 const styles = {
    form: {
      width: '100%',
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#333"
    },
    formGroup: {
      position: 'relative',
      marginBottom: '1.5rem',
      width: "80%"
    },
    input: {
      width: '100%',
      padding: '0.75rem 1rem',
      fontSize: '1rem',
      border: '2px solid #ccc',
      borderRadius: '0.5rem',
      background: '#f9f9f9',
      transition: 'border-color 0.2s, background 0.2s',
    },
    label: {
      position: 'absolute',
      top: '50%',
      left: '1rem',
      transform: 'translateY(-50%)',
      fontSize: '0.9rem',
      color: '#777',
      pointerEvents: 'none',
      transition: 'all 0.2s',
      background: '#f9f9f9',
      padding: '0 0.25rem',
    },
    labelFocused: {
      top: '-0.5rem',
      fontSize: '0.8rem',
      color: '#0070f3',
      background: '#fff',
    },
  };
  const [focused, setFocused] = useState(false);


  return (
    <>

{ !unlock? <form className='inti'  onSubmit={handlesubmit}  style={styles.form} action="">
  <div style={styles.formGroup}>
        <input
          type="text"
          style={{
            ...styles.input,
            borderColor: focused ? '#0070f3' : styles.input.border,
            background: focused ? '#fff' : styles.input.background,
          }}
          placeholder="enter the password to this AI... " 
          value={enterpass}
          onChange={(e)=> setpass(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
        <label
          style={{
            ...styles.label,
            ...(focused || enterpass ? styles.labelFocused : {}),
          }}
        >
          {enterpass}
        </label>
  <button
        type="submit"
        style={{
          padding: '0.75rem 1.5rem',
          fontSize: '1rem',
          borderRadius: '4px',
          border: 'none',
          backgroundColor: '#0070f3',
          color: 'white',
          cursor: 'pointer'
        }}
      >
        Submit
      </button>
      </div>

</form>:
    <div className="container">
      <div className="app-container">
        <Sidebar
          isOpen={opennav}
          loading={loading}
          conversations={conversations}
          currentIndex={currentIndex}
          selectConversation={selectConversation}
          clearHistory={clearHistory}
          createConversation={createConversation}
          fetchConversations={fetchConversations}
          onToggleSidebar={toggleSidebar}
        />

        <div className="chat-container">
          <Header onToggleSidebar={toggleSidebar} />
          <ChatSection
            isOpen={opennav}
            currentMessages={currentMessages}
            sendMessage={sendMessage}
            setInput={setInput}
            input={input}
            loading={loading}
          />
        </div>
      </div>
    </div>}
    </>
  );
};

export default Realone;











