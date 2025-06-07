
import React, { useState } from 'react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

const SendIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
  </svg>
);


const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
  const [inputText, setInputText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim() && !isLoading) {
      onSendMessage(inputText.trim());
      setInputText('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as unknown as React.FormEvent);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-white border-t border-slate-200 flex items-center gap-2"
    >
      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="請在這裡輸入您的問題..."
        className="flex-grow p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-pink-400 resize-none transition-shadow duration-150"
        rows={1}
        disabled={isLoading}
        style={{ minHeight: '44px', maxHeight: '120px' }} // Control min/max height
        onInput={(e) => { // Auto-resize textarea
            const target = e.target as HTMLTextAreaElement;
            target.style.height = 'inherit';
            target.style.height = `${target.scrollHeight}px`;
        }}
      />
      <button
        type="submit"
        disabled={isLoading || !inputText.trim()}
        className="p-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors duration-150 flex items-center justify-center w-12 h-11"
        aria-label="傳送訊息"
      >
        {isLoading ? (
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        ) : (
          <SendIcon className="w-5 h-5" />
        )}
      </button>
    </form>
  );
};

export default ChatInput;
