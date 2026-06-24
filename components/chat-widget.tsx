'use client';

import { useState, useEffect, useRef } from 'react';
import { Send, X, Loader2, User, Bot, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import { createBrowserSupabaseClient } from '@/lib/supabase/client';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

// Add TS declarations for experimental window.ai
declare global {
  interface Window {
    ai?: {
      languageModel?: {
        create: (options: any) => Promise<any>;
        capabilities: () => Promise<any>;
      }
    }
  }
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: `Hello! I'm your AI assistant for Athuluri Akhil's portfolio. I can answer questions about Akhil's skills, projects, and experience.\n\nFor example:\n- "What are Akhil's AI projects?"\n- "Tell me about his work experience."` }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [localSession, setLocalSession] = useState<any>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Initialize local AI if available
  useEffect(() => {
    async function initLocalAI() {
      try {
        const supabase = createBrowserSupabaseClient();
        const { data: dbData } = await supabase.from('ai_context').select('content').single();
        const context = dbData?.content || "";
        
        const systemPrompt = `You are a helpful, professional AI assistant embedded in the portfolio of Athuluri Akhil (often just called "Akhil"). Your job is ONLY to answer questions about Akhil, his experience, projects, skills, and background based on the provided context.\n\nWhen asked general questions like "who is Akhil?" or "tell me about him", provide a warm summary based on his Bio and About sections. Do not say "I couldn't find a detailed overview" - be confident using the information provided.\n\nGUARDRAILS: If the user asks about ANY topic unrelated to Athuluri Akhil (like "who is the president", "write python code", math problems), you MUST decline and state you only answer questions about Athuluri Akhil.\n\nContext about Akhil:\n${context}`;

        if ('ai' in window) {
          const ai = (window as any).ai;
          
          // Newer Chrome versions (129+)
          if (ai.languageModel) {
            const capabilities = await ai.languageModel.capabilities();
            console.log("Chrome AI languageModel capabilities:", capabilities.available);
            if (capabilities.available === 'readily' || capabilities.available === 'after-download') {
              const session = await ai.languageModel.create({ systemPrompt: systemPrompt });
              setLocalSession(session);
            }
          // Older experimental Chrome versions (128)
          } else if (ai.createTextSession) {
            const canCreate = await ai.canCreateTextSession();
            console.log("Chrome AI createTextSession capabilities:", canCreate);
            if (canCreate === 'readily' || canCreate === 'after-download') {
              const session = await ai.createTextSession({ systemPrompt: systemPrompt });
              setLocalSession(session);
            }
          }
        } else {
          console.warn("window.ai is not defined. The Prompt API is likely disabled.");
        }
      } catch (error) {
        console.error("Failed to initialize local AI:", error);
      }
    }
    
    initLocalAI();
  }, []);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setIsOpen(true); // Ensure window is open when sending
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      if (localSession) {
        // Use Chrome On-Device AI
        const response = await localSession.prompt(userMessage);
        setMessages(prev => [...prev, { role: 'assistant', content: response }]);
      } else {
        // Fallback to Groq API
        const apiMessages = messages.map(m => ({ role: m.role, content: m.content }));
        apiMessages.push({ role: 'user', content: userMessage });
        
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: apiMessages })
        });
        
        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
      }
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, I'm having trouble connecting right now. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-50 w-full max-w-[600px] px-4 sm:px-0 flex flex-col justify-end pointer-events-none">
      
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="w-full h-[450px] max-h-[calc(100vh-120px)] bg-card border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden pointer-events-auto mb-4"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border bg-card/80 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                  <Bot size={18} />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Akhil's AI Assistant</h3>
                  <div className="flex items-center gap-1.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${localSession ? 'bg-blue-500' : 'bg-green-500'}`}></span>
                    <span className="text-xs text-muted-foreground">
                      {localSession ? 'On-Device AI (Chrome)' : 'Cloud AI (Groq)'}
                    </span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-muted rounded-full transition-colors text-muted-foreground hover:text-foreground"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-5">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-muted text-muted-foreground' : 'bg-primary/10 text-primary'}`}>
                    {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                  </div>
                  <div className={`rounded-2xl p-3 text-sm leading-relaxed ${msg.role === 'user' ? 'bg-muted text-foreground rounded-tr-sm' : 'bg-transparent border border-border text-foreground rounded-tl-sm'}`}>
                      <ReactMarkdown
                        components={{
                          strong: ({node, ...props}) => <strong className="font-semibold" {...props}/>,
                          ul: ({node, ...props}) => <ul className="list-disc pl-4 my-2 space-y-1" {...props}/>,
                          ol: ({node, ...props}) => <ol className="list-decimal pl-4 my-2 space-y-1" {...props}/>,
                          li: ({node, ...props}) => <li className="leading-relaxed" {...props}/>,
                          p: ({node, ...props}) => <p className="mb-2 last:mb-0" {...props}/>,
                          a: ({node, ...props}) => <a className="text-blue-400 hover:underline" {...props}/>,
                        }}
                      >
                        {msg.content}
                      </ReactMarkdown>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-3 max-w-[85%]">
                  <div className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <Bot size={14} />
                  </div>
                  <div className="rounded-2xl rounded-tl-sm p-4 border border-border flex items-center gap-2">
                    <Loader2 size={14} className="animate-spin text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Thinking...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            
            {/* Inner Disclaimer */}
            <div className="text-center pb-2 bg-card">
              <span className="text-[10px] text-muted-foreground">
                Everyone makes mistakes, including this AI. Please verify important information.
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Persistent Centered Input Area */}
      <div className="w-full pointer-events-auto bg-card border border-border rounded-xl shadow-xl flex flex-col p-1.5 transition-all">
        <form onSubmit={handleSend} className="relative flex items-center">
          <Sparkles className="absolute left-3 text-muted-foreground" size={16} />
          <input 
            type="text"
            value={input}
            onClick={() => setIsOpen(true)}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything about Akhil..."
            className="w-full bg-transparent border-none rounded-xl pl-10 pr-12 py-3 text-sm focus:outline-none text-foreground placeholder:text-muted-foreground"
          />
          <button 
            type="submit"
            disabled={!input.trim() || isLoading}
            className="absolute right-1 p-2 bg-foreground text-background rounded-lg hover:bg-foreground/90 disabled:opacity-50 disabled:bg-muted disabled:text-muted-foreground transition-colors flex items-center justify-center"
          >
            <Send size={16} className="-ml-0.5 mt-0.5" />
          </button>
        </form>
      </div>

    </div>
  );
}
