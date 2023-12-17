import { ChatContent, ChatSidebar } from "./components";

const Chat = () => {
  return (<div className="h-[75vh] w-full bg-white rounded-2xl shadow-card">
    <div className="flex  w-ful h-full">
      <div className="flex-3 border-r">
        <ChatSidebar />
      </div>
      <div className="flex-[7]">
        <ChatContent />
      </div>
    </div>
  </div>)

};

export default Chat;
