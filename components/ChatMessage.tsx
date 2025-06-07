
import React from 'react';
import { Message } from '../types';

interface ChatMessageProps {
  message: Message;
}

const BotAvatar: React.FC = () => (
  <div className="w-8 h-8 rounded-full bg-pink-400 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
    飛
  </div>
);

const UserAvatar: React.FC = () => (
  <div className="w-8 h-8 rounded-full bg-sky-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
    您
  </div>
);

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.sender === 'user';
  const isBot = message.sender === 'bot';
  const isError = message.sender === 'system_error';

  const timeString = message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className={`flex items-end mb-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && isBot && <BotAvatar />}
      <div
        className={`mx-2 p-3 rounded-xl max-w-[70%] md:max-w-[60%] break-words shadow-md ${
          isUser
            ? 'bg-sky-500 text-white rounded-br-none'
            : isBot
            ? 'bg-white text-slate-700 rounded-bl-none border border-slate-200'
            : 'bg-red-100 text-red-700 border border-red-300 rounded-bl-none'
        }`}
      >
        <p className="text-sm whitespace-pre-wrap">{message.text}</p>
        <p className={`text-xs mt-1 ${isUser ? 'text-sky-200' : 'text-slate-400'} text-right`}>
          {timeString}
        </p>
      </div>
      {isUser && <UserAvatar />}
    </div>
  );
};

export default ChatMessage;
