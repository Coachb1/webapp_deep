const ChatBot = () => {
  return (
    <div className="c-background">
      <div className="containerrr" id="section1">
        <div className="course-interface">
          <div className="header">
            <h1>AI Coaching Coachbot</h1>
          </div>
          <div className="course-sections"></div>
          <div className="chat-section">
            <iframe 
              src="https://dashboard.tinytalk.ai/bots/01c25edb-a32c-4112-ad29-d413a1771583/chat" 
              width="100%" 
              height="560" 
              style={{ border: 'none' }}
              title="Chat Bot"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;