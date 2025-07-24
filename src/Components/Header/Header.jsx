
import './Header.css'
const Header = ({onToggleSidebar}) => {
   
  return (
    
   <div className="chat-header">
          <div className="current-chat-title" id="current-chat-title">
           <p className='none'> New Conversation </p>
             <i className="fas fa-bars" onClick={onToggleSidebar}></i>

          </div>
          <div className="header-actions">
            <button id="regenerate-response" title="Regenerate response">
              <i className="fas fa-sync"></i>
            </button>
            <button id="stop-response" title="Stop generating" style={{display: "none"}}>
              <i className="fas fa-stop"></i>
            </button>
            <button id="export-chat" title="Export conversation">
              <i className="fas fa-download"></i>
            </button>
          </div>
        </div>
  )
}

export default Header
