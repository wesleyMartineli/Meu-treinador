'use client';

import React from 'react';
import { Bot, Send, User, Sparkles, Dumbbell, Zap, HeartPulse, RefreshCw } from 'lucide-react';
import { AICoachMessage } from '@/types/database';
import { appStorage } from '@/lib/storage';
import { generateCoachResponse } from '@/lib/coach-ai';

export function CoachAIChat() {
  const [messages, setMessages] = React.useState<AICoachMessage[]>(() => appStorage.getCoachMessages());
  const [inputMessage, setInputMessage] = React.useState('');
  const [isTyping, setIsTyping] = React.useState(false);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = (textToSend?: string) => {
    const query = (textToSend || inputMessage).trim();
    if (!query) return;

    const userMsg: AICoachMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      content: query,
      timestamp: new Date().toISOString(),
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI thinking and smart context retrieval
    setTimeout(() => {
      const response = generateCoachResponse(query);
      const aiMsg: AICoachMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'assistant',
        content: response.message,
        timestamp: new Date().toISOString(),
        category: response.category,
      };

      const finalMessages = [...newMessages, aiMsg];
      setMessages(finalMessages);
      appStorage.saveCoachMessages(finalMessages);
      setIsTyping(false);
    }, 600);
  };

  const quickPrompts = [
    { label: '📊 Como foi minha evolução?', icon: Sparkles },
    { label: '🏋️‍♂️ Devo aumentar a carga no supino?', icon: Dumbbell },
    { label: '🏃 Como melhorar meu pace nos 5km?', icon: Zap },
    { label: '🧬 Análise da minha recuperação', icon: HeartPulse },
    { label: '🥗 Qual minha meta de proteínas e dieta?', icon: RefreshCw },
  ];

  return (
    <div className="card-athletic flex h-[620px] flex-col overflow-hidden bg-surface-card border-surface-border">
      {/* Top Coach Header */}
      <div className="flex items-center justify-between border-b border-surface-border bg-surface-elevated/70 p-4">
        <div className="flex items-center gap-3">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-emerald-600 text-black font-black shadow-lg shadow-primary-500/20">
            <Bot className="h-5 w-5 text-black" />
            <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-primary-400 border-2 border-surface-card animate-ping" />
            <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-primary-400 border-2 border-surface-card" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-white">Coach IA — Treinador Inteligente</h3>
              <span className="rounded bg-primary-500/10 px-2 py-0.5 text-[9px] font-bold text-primary-400 uppercase tracking-wider border border-primary-500/20">
                Online
              </span>
            </div>
            <p className="text-[11px] text-gray-400">
              Análise em tempo real de força, corrida, sobrecarga e prontidão
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            const initial = appStorage.getCoachMessages().slice(0, 1);
            setMessages(initial);
            appStorage.saveCoachMessages(initial);
          }}
          className="rounded-xl border border-surface-border bg-surface-card p-2 text-xs text-gray-400 hover:text-white"
          title="Limpar conversa"
        >
          <RefreshCw className="h-4 w-4" />
        </button>
      </div>

      {/* Quick Prompts Carousel */}
      <div className="flex gap-2 overflow-x-auto p-3 border-b border-surface-border/50 bg-surface-subtle no-scrollbar">
        {quickPrompts.map((prompt, i) => {
          const Icon = prompt.icon;
          return (
            <button
              key={i}
              onClick={() => handleSendMessage(prompt.label.substring(3))}
              className="flex shrink-0 items-center gap-1.5 rounded-xl border border-surface-border/80 bg-surface-elevated/60 px-3 py-1.5 text-xs font-semibold text-gray-300 hover:border-primary-500/60 hover:text-white transition-all active:scale-95"
            >
              <Icon className="h-3.5 w-3.5 text-primary-400" />
              <span>{prompt.label}</span>
            </button>
          );
        })}
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
            >
              {!isUser && (
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-primary-500/10 text-primary-400 border border-primary-500/20">
                  <Bot className="h-4 w-4" />
                </div>
              )}

              <div
                className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed ${
                  isUser
                    ? 'bg-gradient-to-r from-primary-600 to-emerald-600 text-white font-medium rounded-tr-sm shadow-md'
                    : 'bg-surface-elevated border border-surface-border text-gray-200 rounded-tl-sm shadow-sm whitespace-pre-wrap'
                }`}
              >
                {msg.content}
                <div
                  className={`mt-1.5 text-[10px] ${
                    isUser ? 'text-primary-100 text-right' : 'text-gray-400'
                  }`}
                >
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>

              {isUser && (
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-surface-elevated text-gray-300 border border-surface-border">
                  <User className="h-4 w-4" />
                </div>
              )}
            </div>
          );
        })}

        {isTyping && (
          <div className="flex gap-3 justify-start items-center">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary-500/10 text-primary-400">
              <Bot className="h-4 w-4" />
            </div>
            <div className="rounded-2xl bg-surface-elevated border border-surface-border px-4 py-2.5 text-xs text-primary-400 flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-primary-400 animate-bounce" />
              <span className="h-2 w-2 rounded-full bg-primary-400 animate-bounce [animation-delay:0.2s]" />
              <span className="h-2 w-2 rounded-full bg-primary-400 animate-bounce [animation-delay:0.4s]" />
              <span className="text-xs text-gray-400 ml-1">Analisando dados fisiológicos...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input Box */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="flex items-center gap-2 border-t border-surface-border bg-surface-subtle p-3"
      >
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Pergunte sobre cargas, pace, fadiga, recuperação..."
          className="flex-1 rounded-xl bg-surface-elevated border border-surface-border px-4 py-2.5 text-xs sm:text-sm text-white placeholder:text-gray-500 outline-none focus:border-primary-500"
        />
        <button
          type="submit"
          disabled={!inputMessage.trim()}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-primary-500 to-emerald-500 text-black font-bold shadow-md shadow-primary-500/20 disabled:opacity-40 hover:brightness-110 active:scale-95 transition-all"
        >
          <Send className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}
