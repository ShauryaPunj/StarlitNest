import { useState, useRef, useEffect } from 'react';
import { Send, Copy, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatSection = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m your AI real estate assistant. I can help you with property valuations, market trends, investment advice, and more. What would you like to know?',
      isUser: false,
      timestamp: new Date()
    }
  ]);
  
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const quickPrompts = [
    "What factors affect property prices?",
    "Best time to buy real estate?",
    "ROI for rental properties",
    "Market trends in Mumbai",
    "Property investment tips"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const typeWriterEffect = (text: string, callback: (text: string) => void) => {
    let i = 0;
    const timer = setInterval(() => {
      callback(text.slice(0, i + 1));
      i++;
      if (i >= text.length) {
        clearInterval(timer);
        setIsTyping(false);
      }
    }, 20);
  };

  const generateAIResponse = (userMessage: string): string => {
    const responses = {
      'factors': 'Property prices are influenced by location, neighborhood development, transport connectivity, amenities, property age, square footage, and market demand. Economic factors like interest rates and government policies also play crucial roles.',
      'time': 'The best time to buy depends on market cycles, your financial readiness, and personal goals. Generally, buying during market corrections or when interest rates are favorable can be advantageous.',
      'roi': 'Rental ROI typically ranges from 2-4% annually in metro cities. Consider factors like rental yield, capital appreciation, maintenance costs, and tax implications when calculating returns.',
      'mumbai': 'Mumbai real estate shows steady growth with premium locations like Bandra, Worli seeing 8-12% annual appreciation. New infrastructure projects are boosting suburban markets.',
      'tips': 'Key tips: Research thoroughly, verify legal documents, check builder reputation, consider future development plans, negotiate wisely, and ensure proper financing.'
    };

    const lowercaseMessage = userMessage.toLowerCase();
    for (const [key, response] of Object.entries(responses)) {
      if (lowercaseMessage.includes(key)) {
        return response;
      }
    }

    return 'That\'s an interesting question about real estate! Based on current market analysis and trends, I\'d recommend considering multiple factors including location dynamics, pricing trends, and your investment timeline. Would you like me to elaborate on any specific aspect?';
  };

  const handleSendMessage = async (messageText?: string) => {
    const text = messageText || inputValue.trim();
    if (!text) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const aiResponse = generateAIResponse(text);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: '',
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);

      // Typewriter effect
      typeWriterEffect(aiResponse, (partialText) => {
        setMessages(prev => prev.map(msg => 
          msg.id === aiMessage.id ? { ...msg, text: partialText } : msg
        ));
      });
    }, 1000);
  };

  const handleCopyMessage = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Message copied to clipboard.",
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <section id="chat" className="py-20 bg-gradient-to-b from-slate-900/50 to-background">
      <div className="container-x">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl font-bold text-white mb-4">
            AI Chat Playground
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Get instant answers about real estate markets, property values, and investment strategies.
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid lg:grid-cols-3 gap-8">
          {/* Chat Messages */}
          <div className="lg:col-span-2">
            <div className="card h-[600px] flex flex-col">
              {/* Messages Container */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className="group max-w-[80%]">
                      <div
                        className={`rounded-2xl px-4 py-3 ${
                          message.isUser
                            ? 'bg-blue-600 text-white'
                            : 'bg-white/10 text-white border border-white/10'
                        }`}
                      >
                        <p className="text-sm leading-relaxed">{message.text}</p>
                        
                        {!message.isUser && message.text && (
                          <button
                            onClick={() => handleCopyMessage(message.text)}
                            className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity text-xs text-white/60 hover:text-white flex items-center gap-1"
                          >
                            <Copy className="w-3 h-3" />
                            Copy
                          </button>
                        )}
                      </div>
                      
                      <div className={`text-xs text-white/40 mt-1 ${message.isUser ? 'text-right' : 'text-left'}`}>
                        {message.timestamp.toLocaleTimeString([], { hour: 'numeric', minute: 'numeric' })}
                      </div>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white/10 rounded-2xl px-4 py-3 border border-white/10">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                        <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="border-t border-white/10 p-4">
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask anything about properties or pricing..."
                    className="input flex-1"
                    disabled={isTyping}
                  />
                  <button
                    onClick={() => handleSendMessage()}
                    disabled={!inputValue.trim() || isTyping}
                    className="btn-grad px-4 py-2 shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Prompts */}
          <div className="space-y-6">
            <div className="card p-6">
              <h3 className="font-heading text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-violet-400" />
                Quick Prompts
              </h3>
              
              <div className="space-y-3">
                {quickPrompts.map((prompt, index) => (
                  <button
                    key={index}
                    onClick={() => handleSendMessage(prompt)}
                    disabled={isTyping}
                    className="w-full text-left p-3 rounded-lg bg-white/5 border border-white/10 text-white/80 hover:bg-white/10 hover:border-white/20 transition-all text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>

            {/* Usage Stats */}
            <div className="card p-6">
              <h3 className="font-heading text-lg font-semibold text-white mb-4">
                Chat Stats
              </h3>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Messages Today</span>
                  <span className="text-white font-mono">42</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Response Time</span>
                  <span className="text-white font-mono">&lt; 2s</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Accuracy</span>
                  <span className="text-white font-mono">94.2%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatSection;