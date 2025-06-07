
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { Message } from './types';
import ChatMessage from './components/ChatMessage';
import ChatInput from './components/ChatInput';
import LoadingSpinner from './components/LoadingSpinner';
import { GEMINI_MODEL_NAME, XIAO_FEI_SYSTEM_INSTRUCTION } from './constants';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [chat, setChat] = useState<Chat | null>(null);
  const [error, setError] = useState<string | null>(null);
  const chatAreaRef = useRef<HTMLDivElement>(null);
  const apiKey = process.env.API_KEY;

  useEffect(() => {
    if (!apiKey) {
      setError("API Key 未設定。請檢查您的環境變數。");
      console.error("API Key is not set. Please check your environment variables.");
      setIsLoading(false);
      return;
    }

    try {
      const ai = new GoogleGenAI({ apiKey });
      const newChat = ai.chats.create({
        model: GEMINI_MODEL_NAME,
        config: {
          systemInstruction: XIAO_FEI_SYSTEM_INSTRUCTION,
        },
      });
      setChat(newChat);

      // Initial welcome message from bot
      const welcomeMessage: Message = {
        id: Date.now().toString() + '-bot-welcome',
        text: "您好！我是小飛，信桑雲端髮型診所的客服小助手，請問有什麼可以為您服務的嗎？😊",
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);

    } catch (e) {
      console.error("初始化 Gemini AI 失敗:", e);
      setError("初始化聊天機器人失敗，請稍後再試。");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiKey]); // Dependency on apiKey to re-init if it were to change (though typically static)

  useEffect(() => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (inputText: string) => {
    if (!chat || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString() + '-user',
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setIsLoading(true);
    setError(null);

    // Prepare for streaming bot response
    const botMessageId = Date.now().toString() + '-bot';
    const initialBotMessage: Message = {
      id: botMessageId,
      text: '', // Start with empty text
      sender: 'bot',
      timestamp: new Date(),
    };
    setMessages((prevMessages) => [...prevMessages, initialBotMessage]);

    let accumulatedBotText = '';

    try {
      const stream = await chat.sendMessageStream({ message: inputText });
      for await (const chunk of stream) { // chunk is GenerateContentResponse
        if (chunk.text) {
          accumulatedBotText += chunk.text;
          setMessages((prevMessages) =>
            prevMessages.map((msg) =>
              msg.id === botMessageId ? { ...msg, text: accumulatedBotText } : msg
            )
          );
        }
      }
    } catch (e: any) {
      console.error("Gemini API 錯誤:", e);
      let errorText = "哎呀，小飛好像有點秀逗了，請您稍後再試一次喔！";
      if (e.message && e.message.includes("API key not valid")) {
        errorText = "API Key 驗證失敗，請確認 API Key 是否正確。";
      } else if (e.message && e.message.includes("quota")) {
        errorText = "哎呀，今天太多人找小飛了，服務暫時超過負荷，請稍後再試喔！";
      }
      
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === botMessageId ? { ...msg, text: errorText, sender: 'system_error' } : msg
        )
      );
      setError(errorText); // Also set a general error if needed
    } finally {
      setIsLoading(false);
    }
  };


  if (!apiKey && !error) { // Still checking for API key
    return <LoadingSpinner text="正在檢查 API 金鑰設定..." />;
  }

  if (error && !messages.some(msg => msg.sender === 'system_error') && messages.length === 0) { // Display general error if no chat started and no messages yet
     return (
        <div className="flex flex-col h-screen items-center justify-center bg-slate-100 p-4">
          <div className="bg-white p-8 rounded-lg shadow-xl text-center">
            <h1 className="text-2xl font-bold text-pink-600 mb-4">糟糕！出錯了</h1>
            <p className="text-slate-700">{error}</p>
            {error.includes("API Key") && <p className="mt-2 text-sm text-slate-500">請確認您的環境變數 `process.env.API_KEY` 已正確設定。</p>}
          </div>
        </div>
      );
  }


  return (
    <div className="flex flex-col h-screen max-h-screen font-sans antialiased">
      <header className="bg-gradient-to-r from-pink-500 via-rose-400 to-fuchsia-500 text-white p-4 shadow-md flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-pink-500 text-xl font-bold mr-3 shadow">
            飛
          </div>
          <div>
            <h1 className="text-xl font-semibold">小飛客服</h1>
            <p className="text-xs text-pink-100">信桑雲端髮型診所</p>
          </div>
        </div>
      </header>

      <main ref={chatAreaRef} className="flex-grow p-4 space-y-4 overflow-y-auto bg-slate-50 chat-area">
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}
        {isLoading && messages[messages.length-1]?.sender === 'bot' && messages[messages.length-1]?.text === '' && ( 
             <div className="flex justify-start items-end mb-4">
                <div className="w-8 h-8 rounded-full bg-pink-400 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">飛</div>
                <div className="mx-2 p-3 rounded-xl max-w-[70%] md:max-w-[60%] bg-white text-slate-700 rounded-bl-none border border-slate-200 shadow-md">
                    <div className="flex items-center space-x-1 py-1">
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse delay-75"></div>
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse delay-150"></div>
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse delay-300"></div>
                    </div>
                </div>
            </div>
        )}
      </main>
      
      {chat ? (
        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      ) : (
         !error && <LoadingSpinner text="小飛準備中，請稍候..." /> 
      )}
       {error && messages.some(msg => msg.sender === 'system_error') && (
        <div className="p-2 bg-red-100 text-red-700 text-center text-sm">
          系統訊息：{error}
        </div>
      )}
    </div>
  );
};

export default App;
