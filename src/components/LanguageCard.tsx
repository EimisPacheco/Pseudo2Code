import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface LanguageCardProps {
  language: {
    name: string;
    key: string;
    icon: string;
    gradient: string;
    code: string;
  };
  isLoading: boolean;
}

const LanguageCard: React.FC<LanguageCardProps> = ({ language, isLoading }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (language.code) {
      await navigator.clipboard.writeText(language.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="relative group">
      {/* Glowing border effect */}
      <div className={`absolute -inset-0.5 bg-gradient-to-r ${language.gradient} rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity`}></div>
      
      <div className="relative bg-gray-800/90 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden h-80">
        {/* Header with Hexagon Icon */}
        <div className="p-4 border-b border-gray-700/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`relative w-12 h-12 hexagon bg-gradient-to-r ${language.gradient} flex items-center justify-center shadow-lg`}>
              <span className="text-white font-bold text-sm z-10">
                {language.icon}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-gray-200">
              {language.name}
            </h3>
          </div>
          
          {language.code && !isLoading && (
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-3 py-1.5 bg-gray-700/50 hover:bg-gray-600/50 rounded-lg text-sm text-gray-300 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copy
                </>
              )}
            </button>
          )}
        </div>
        
        {/* Code Content */}
        <div className="p-4 h-64 overflow-y-auto">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="flex flex-col items-center gap-3">
                <div className="w-8 h-8 border-2 border-gray-600 border-t-cyan-400 rounded-full animate-spin"></div>
                <span className="text-gray-400 text-sm">Translating...</span>
              </div>
            </div>
          ) : language.code ? (
            <pre className="text-sm text-gray-300 font-mono leading-relaxed whitespace-pre-wrap">
              <code>{language.code}</code>
            </pre>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500 text-sm">
              No translation available
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LanguageCard;