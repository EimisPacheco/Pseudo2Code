import React, { useState } from 'react';
import { Send, Sparkles } from 'lucide-react';

interface PseudocodeInputProps {
  onTranslate: (code: string) => void;
  isLoading: boolean;
}

const PseudocodeInput: React.FC<PseudocodeInputProps> = ({ onTranslate, isLoading }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onTranslate(input);
    }
  };

  const placeholder = `Enter your pseudocode logic here. Example:

IF number MOD 2 == 0 THEN
    PRINT 'Even'
ELSE
    PRINT 'Odd'
END IF`;

  return (
    <section className="mb-12">
      <div className="max-w-4xl mx-auto">
        <div className="relative">
          {/* Glowing border effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 rounded-2xl blur opacity-30 animate-pulse"></div>
          
          <div className="relative bg-gray-800/90 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden">
            <form onSubmit={handleSubmit}>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Sparkles className="w-5 h-5 text-cyan-400" />
                  <h2 className="text-lg font-semibold text-gray-200">
                    Pseudocode Input
                  </h2>
                </div>
                
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={placeholder}
                  className="w-full h-40 bg-gray-900/50 border border-gray-600/50 rounded-xl p-4 text-gray-200 placeholder-gray-500 font-mono text-sm leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 transition-all"
                  disabled={isLoading}
                />
              </div>
              
              <div className="px-6 py-4 bg-gray-900/30 border-t border-gray-700/50 flex justify-end">
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium rounded-lg hover:from-cyan-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 shadow-lg shadow-cyan-500/25"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Translating...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Translate Code
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PseudocodeInput;