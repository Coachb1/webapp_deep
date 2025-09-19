// const ChatBot = () => {
//   return (
//     <div className="c-background">
//       <div className="containerrr" id="section1">
//         <div className="course-interface">
//           <div className="header">
//             <h1>AI Coaching Coachbot</h1>
//           </div>
//           <div className="course-sections"></div>
//           <div className="chat-section">
//             <iframe 
//               src="https://dashboard.tinytalk.ai/bots/01c25edb-a32c-4112-ad29-d413a1771583/chat" 
//               width="100%" 
//               height="560" 
//               style={{ border: 'none' }}
//               title="Chat Bot"
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatBot;

const ChatBot = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div
        id="section1"
        className="w-full max-w-5xl bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="bg-[#00c193] text-white py-4 px-6">
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-center">
            AI Coaching Coachbot
          </h1>
        </div>

        {/* Course Sections Placeholder */}
        <div className="hidden md:block border-b border-gray-200 py-3 px-6">
          {/* You can add course navigation or tabs here */}
        </div>

        {/* Chat Section */}
        <div className="flex-1">
          <iframe
            src="https://dashboard.tinytalk.ai/bots/01c25edb-a32c-4112-ad29-d413a1771583/chat"
            width="100%"
            height="560"
            className="w-full h-[70vh] sm:h-[560px] border-0"
            title="Chat Bot"
          />
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
