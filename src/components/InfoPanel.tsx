import React from 'react';
import { ExternalLink, Calendar, Building2, Code, DollarSign } from 'lucide-react';

interface InfoPanelProps {
  info: {
    title: string;
    yearCreated: string;
    useCases: string;
    companies: string;
    libraries: string;
    salary: string;
    docs: string;
  };
  isLoading: boolean;
}

const InfoPanel: React.FC<InfoPanelProps> = ({ info, isLoading }) => {
  return (
    <div className="relative group h-80">
      {/* Wireframe polygon header */}
      <div className="relative mb-4">
        <div className="polygon-header bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30 p-3">
          <h3 className="text-lg font-semibold text-purple-300 text-center">
            {info.title}
          </h3>
        </div>
      </div>
      
      {/* Content Panel */}
      <div className="relative">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl blur opacity-30"></div>
        
        <div className="relative bg-gray-800/90 backdrop-blur-sm rounded-xl border border-gray-700/50 p-4 h-64 overflow-y-auto">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="w-6 h-6 border-2 border-gray-600 border-t-purple-400 rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="space-y-4 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-purple-400" />
                <span className="text-gray-400">Year Created:</span>
                <span className="text-gray-200 font-medium">{info.yearCreated}</span>
              </div>
              
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Code className="w-4 h-4 text-purple-400" />
                  <span className="text-gray-400">Common Use Cases:</span>
                </div>
                <p className="text-gray-200 text-xs leading-relaxed ml-6">
                  {info.useCases}
                </p>
              </div>
              
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Building2 className="w-4 h-4 text-purple-400" />
                  <span className="text-gray-400">Famous Companies:</span>
                </div>
                <p className="text-gray-200 text-xs leading-relaxed ml-6">
                  {info.companies}
                </p>
              </div>
              
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Code className="w-4 h-4 text-purple-400" />
                  <span className="text-gray-400">Popular Libraries:</span>
                </div>
                <p className="text-gray-200 text-xs leading-relaxed ml-6">
                  {info.libraries}
                </p>
              </div>
              
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-purple-400" />
                <span className="text-gray-400">Avg U.S. Salary:</span>
                <span className="text-green-400 font-medium">{info.salary}</span>
              </div>
              
              <div className="pt-2 border-t border-gray-700/50">
                <a
                  href={info.docs}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span className="text-sm">Official Documentation</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InfoPanel;