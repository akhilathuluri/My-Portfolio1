'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useDragControls } from 'motion/react';
import { Terminal, X, Minus, Square } from 'lucide-react';
import { type PortfolioData } from '@/lib/portfolio-sections';

interface TerminalWidgetProps {
  data: PortfolioData;
}

type CommandEntry = {
  command: string;
  output: React.ReactNode;
};

const BootSequence = ({ onComplete }: { onComplete: () => void }) => (
  <div className="text-[#abb2bf] font-mono flex flex-col gap-1">
    <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 }}>portfolio OS v2.0.26 [Athuluri Akhil Edition]</motion.div>
    <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}>Loading modules... done.</motion.div>
    <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 }}>Initializing file system... done.</motion.div>
    <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35 }} className="text-[#98c379] font-semibold mb-2">AI assistant ready.</motion.div>
    
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}>Type &quot;<span className="text-[#98c379]">help</span>&quot; to see available commands.</motion.div>
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }} onAnimationComplete={onComplete}>Type &quot;<span className="text-[#98c379]">ai &lt;message&gt;</span>&quot; to chat with an AI that knows about akhil.</motion.div>
  </div>
);

export default function TerminalWidget({ data }: TerminalWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [showPrompt, setShowPrompt] = useState(true);
  const [aiMessages, setAiMessages] = useState<{role: 'user'|'assistant', content: string}[]>([]);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [isBooted, setIsBooted] = useState(false);

  const [history, setHistory] = useState<CommandEntry[]>([
    {
      command: '',
      output: <BootSequence onComplete={() => setIsBooted(true)} />
    }
  ]);
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();

  // Focus input when opened or clicked
  useEffect(() => {
    if (isOpen && !isMinimized && isBooted) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, isMinimized, isBooted]);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'q') {
        e.preventDefault();
        setIsOpen((prev) => {
          if (!prev) return true;
          if (isMinimized) {
            setIsMinimized(false);
            return true;
          }
          return false;
        });
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMinimized]);

  // Hide prompt after 5 seconds to show circle
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPrompt(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleCommand = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isAiLoading) return;
    const cmd = input.trim().toLowerCase();
    const rawCmd = input.trim();
    if (!cmd) return;

    if (cmd.startsWith('ai ') || cmd === 'ai') {
      const userMessage = rawCmd.substring(3).trim();
      if (!userMessage) {
        setHistory((prev) => [...prev, { command: rawCmd, output: <div className="text-red-400">Please provide a message. Usage: ai &lt;message&gt;</div> }]);
        setInput('');
        return;
      }

      setHistory((prev) => [...prev, { 
        command: rawCmd, 
        output: <div className="text-gray-400 animate-pulse">AI is thinking...</div> 
      }]);
      setInput('');
      setIsAiLoading(true);

      try {
        const newAiMessages = [...aiMessages, { role: 'user' as const, content: userMessage }];
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: newAiMessages })
        });
        const data = await res.json();
        
        if (data.error) throw new Error(data.error);

        setAiMessages([...newAiMessages, { role: 'assistant', content: data.response }]);
        
        setHistory((prev) => {
          const newHistory = [...prev];
          newHistory[newHistory.length - 1] = {
            command: rawCmd,
            output: <div className="text-gray-300 max-w-3xl leading-relaxed whitespace-pre-wrap">{data.response}</div>
          };
          return newHistory;
        });
      } catch (error) {
        setHistory((prev) => {
          const newHistory = [...prev];
          newHistory[newHistory.length - 1] = {
            command: rawCmd,
            output: <div className="text-red-400">Error connecting to AI. Please try again.</div>
          };
          return newHistory;
        });
      } finally {
        setIsAiLoading(false);
      }
      return;
    }

    let output: React.ReactNode = null;

    switch (cmd) {
      case 'help':
        output = (
          <div className="text-[#abb2bf] space-y-6 mt-2">
            <div>
              <div className="text-[#e5c07b] font-bold mb-1">Portfolio:</div>
              <div className="grid grid-cols-[120px_1fr] gap-x-4 gap-y-1 ml-4">
                <div className="text-[#98c379]">about</div><div>Display bio and about info</div>
                <div className="text-[#98c379]">expertise</div><div>List technical skills</div>
                <div className="text-[#98c379]">experience</div><div>Show work experience</div>
                <div className="text-[#98c379]">projects</div><div>List portfolio projects</div>
                <div className="text-[#98c379]">blog</div><div>Show latest posts</div>
                <div className="text-[#98c379]">socials</div><div>Show social links</div>
              </div>
            </div>

            <div>
              <div className="text-[#e5c07b] font-bold mb-1">Utility:</div>
              <div className="grid grid-cols-[120px_1fr] gap-x-4 gap-y-1 ml-4">
                <div className="text-[#98c379]">help</div><div>Show available commands</div>
                <div className="text-[#98c379]">clear</div><div>Clear terminal</div>
              </div>
            </div>

            <div>
              <div className="text-[#e5c07b] font-bold mb-1">AI:</div>
              <div className="grid grid-cols-[120px_1fr] gap-x-4 gap-y-1 ml-4">
                <div className="text-[#98c379]">ai &lt;msg&gt;</div><div>Chat with AI (e.g. ai who are you?)</div>
              </div>
            </div>
          </div>
        );
        break;
      case 'about':
        output = (
          <div className="text-[#abb2bf] space-y-2">
            <div>Hi, my name is <span className="font-bold text-white">{data.personal.name}</span>!</div>
            <div>I am a {data.personal.role} based in {data.personal.location}.</div>
            <div className="mt-2 text-[#5c6370]">{(data.about as any).intro}</div>
          </div>
        );
        break;
      case 'expertise':
        output = (
          <div className="text-[#abb2bf]">
            {(data.expertise as any[]).map((exp, i) => (
              <div key={i} className="mb-2">
                <div className="text-[#e5c07b] font-bold">{exp.category}</div>
                <div>{exp.skills.join(', ')}</div>
              </div>
            ))}
          </div>
        );
        break;
      case 'experience':
        output = (
          <div className="text-[#abb2bf]">
            {(data.experience as any[]).map((job, i) => (
              <div key={i} className="mb-4">
                <div className="text-[#98c379] font-bold">{job.title} @ {job.company}</div>
                <div className="text-sm text-[#5c6370]">{job.duration} | {job.location}</div>
                <ul className="list-disc pl-5 mt-1 text-sm text-[#abb2bf]">
                  {job.achievements.map((ach: string, j: number) => (
                    <li key={j}>{ach}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        );
        break;
      case 'projects':
        output = (
          <div className="text-[#abb2bf]">
            {(data.projects as any[]).map((proj, i) => (
              <div key={i} className="mb-4">
                <div className="text-[#61afef] font-bold">{proj.name}</div>
                <div className="text-sm">{proj.description}</div>
                <div className="flex items-center gap-3 mt-1">
                  <div className="text-xs text-[#5c6370]">[{proj.tags.join(', ')}]</div>
                  {proj.link && (
                    <a href={proj.link} target="_blank" rel="noreferrer" className="text-xs text-[#e5c07b] hover:text-white underline">
                      View Project ↗
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        );
        break;
      case 'blog':
        output = (
          <div className="text-[#abb2bf]">
            {(data.blog as any[]).map((post, i) => (
              <div key={i} className="mb-2">
                <div className="text-[#61afef] font-bold">{post.title}</div>
                <div className="text-sm text-[#5c6370]">{post.date} - {post.readTime}</div>
              </div>
            ))}
          </div>
        );
        break;
      case 'socials':
        output = (
          <div className="text-[#abb2bf] space-y-1">
            <div className="text-[#e5c07b] font-bold">Social Links:</div>
            {Object.entries(data.personal.socials).map(([key, url], i) => (
              <div key={key}>
                <span className="text-[#98c379]">{i + 1}. {key.charAt(0).toUpperCase() + key.slice(1)}</span> - <a href={url} target="_blank" rel="noreferrer" className="underline hover:text-[#61afef]">{url}</a>
              </div>
            ))}
          </div>
        );
        break;
      case 'clear':
        setHistory([]);
        setInput('');
        return;
      case 'sudo':
        output = <div className="text-red-400">Nice try, but you are not in the sudoers file. This incident will be reported.</div>;
        break;
      default:
        output = <div className="text-red-400">Command not found: {cmd}. Type &apos;help&apos; for a list of commands.</div>;
    }

    setHistory((prev) => [...prev, { command: cmd, output }]);
    setInput('');
  };

  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  return (
    <>
      {/* Floating Button / Initial Popup */}
      <div className="hidden md:block fixed bottom-6 right-6 z-50">
        <AnimatePresence>
          {!isOpen && (
            <motion.button
              initial={{ scale: 0, opacity: 0, borderRadius: '12px' }}
              animate={{ 
                scale: 1, 
                opacity: 1,
                borderRadius: showPrompt ? '12px' : '28px',
                width: showPrompt ? '170px' : '56px',
              }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => setIsOpen(true)}
              className="bg-[#282c34] border border-[#181a1f] text-white shadow-xl flex items-center justify-center overflow-hidden hover:bg-[#3e4451] transition-colors h-[56px]"
            >
              <div className="flex items-center justify-center h-full w-full relative">
                <Terminal size={20} className="text-[#98c379] shrink-0 absolute left-4" style={{ left: showPrompt ? '16px' : '50%', transform: showPrompt ? 'none' : 'translateX(-50%)', transition: 'left 0.4s cubic-bezier(0.16, 1, 0.3, 1), transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)' }} />
                <AnimatePresence>
                  {showPrompt && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-[44px] whitespace-nowrap text-sm font-mono text-[#abb2bf]"
                    >
                      Cmd + Q to open
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Terminal Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10, x: '-50%' }}
            animate={{ 
              opacity: isMinimized ? 0 : 1, 
              scale: isMinimized ? 0.9 : 1, 
              y: isMinimized ? 50 : 0,
              pointerEvents: isMinimized ? 'none' : 'auto',
              x: isMaximized ? '0%' : '-50%'
            }}
            exit={{ opacity: 0, scale: 0.9, y: 10, x: '-50%' }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed z-[100]"
            style={{
              top: isMaximized ? 0 : '10vh',
              left: isMaximized ? 0 : '50%',
              width: isMaximized ? '100vw' : '850px',
              height: isMaximized ? '100vh' : '450px',
              maxWidth: isMaximized ? 'none' : '95vw',
            }}
            drag={!isMaximized}
            dragControls={dragControls}
            dragListener={false}
            dragMomentum={false}
          >
            <div className="w-full h-full bg-[#282c34] border border-[#181a1f] shadow-2xl flex flex-col overflow-hidden rounded-xl font-mono text-sm selection:bg-[#3e4451]">
              {/* Window Controls / Title Bar */}
              <div 
                className="flex items-center px-4 py-3 bg-[#21252b] border-b border-[#181a1f] cursor-move select-none"
                onPointerDown={(e) => dragControls.start(e)}
              >
                <div className="flex gap-2 w-16">
                  <button 
                    onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
                    className="w-3 h-3 rounded-full bg-[#ff5f56] flex items-center justify-center group"
                  >
                    <X size={8} className="opacity-0 group-hover:opacity-100 text-red-900" />
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); setIsMinimized(true); }}
                    className="w-3 h-3 rounded-full bg-[#ffbd2e] flex items-center justify-center group"
                  >
                    <Minus size={8} className="opacity-0 group-hover:opacity-100 text-yellow-900" />
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); setIsMaximized(!isMaximized); }}
                    className="w-3 h-3 rounded-full bg-[#27c93f] flex items-center justify-center group"
                  >
                    <Square size={6} className="opacity-0 group-hover:opacity-100 text-green-900" />
                  </button>
                </div>
                <div className="flex-1 text-center text-gray-400 text-xs font-semibold flex items-center justify-center gap-2">
                  <Terminal size={14} /> visitor@akhil.portfolio:~
                </div>
                <div className="w-16"></div> {/* Spacer for centering */}
              </div>

              {/* Terminal Body */}
              <div 
                className="flex-1 p-5 overflow-y-auto cursor-text text-[#abb2bf] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#4b5263] [&::-webkit-scrollbar-thumb]:rounded-full"
                onClick={handleTerminalClick}
              >
                {history.map((entry, idx) => (
                  <div key={idx} className="mb-2">
                    {entry.command && (
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[#98c379] font-bold">visitor@akhil.portfolio:~$</span>
                        <span className="text-white">{entry.command}</span>
                      </div>
                    )}
                    {entry.output}
                  </div>
                ))}
                
                {/* Input Line */}
                {isBooted && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2">
                    <span className="text-[#98c379] font-bold whitespace-nowrap">visitor@akhil.portfolio:~$</span>
                    <form onSubmit={handleCommand} className="flex-1">
                      <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        disabled={isAiLoading}
                        className="w-full bg-transparent outline-none border-none text-white focus:ring-0 p-0 font-mono disabled:opacity-50"
                        autoFocus
                        spellCheck={false}
                        autoComplete="off"
                      />
                    </form>
                  </motion.div>
                )}
                <div ref={terminalEndRef} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Restore Button when Minimized */}
      {isOpen && isMinimized && (
        <div className="fixed bottom-6 right-6 z-50">
           <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              onClick={() => setIsMinimized(false)}
              className="bg-[#282c34] border border-[#181a1f] text-white shadow-xl flex items-center justify-center w-14 h-14 rounded-full hover:bg-[#3e4451] transition-colors"
            >
              <Terminal size={20} className="text-[#98c379]" />
            </motion.button>
        </div>
      )}
    </>
  );
}
