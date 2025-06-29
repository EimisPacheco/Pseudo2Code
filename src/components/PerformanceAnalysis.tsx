import React from 'react';
import { Zap, TrendingUp, Clock, Target } from 'lucide-react';
import { PerformanceAnalysis as PerformanceAnalysisType } from '../services/geminiService';

interface PerformanceAnalysisProps {
  pseudocode: string;
  analysis: PerformanceAnalysisType;
}

const PerformanceAnalysis: React.FC<PerformanceAnalysisProps> = ({ pseudocode, analysis }) => {
  const getColorClass = (color: string) => {
    switch (color.toLowerCase()) {
      case 'green': return 'bg-green-400';
      case 'blue': return 'bg-blue-400';
      case 'purple': return 'bg-purple-400';
      case 'orange': return 'bg-orange-400';
      case 'red': return 'bg-red-400';
      default: return 'bg-cyan-400';
    }
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 5) return 'text-green-400';
    if (rating >= 4) return 'text-blue-400';
    if (rating >= 3) return 'text-yellow-400';
    if (rating >= 2) return 'text-orange-400';
    return 'text-red-400';
  };

  return (
    <section className="mb-12">
      <div className="max-w-6xl mx-auto">
        <div className="relative">
          {/* Glowing border effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 rounded-2xl blur opacity-30"></div>
          
          <div className="relative bg-gray-800/90 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">
                  Performance Analysis
                </h2>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Current Analysis */}
                <div className="space-y-6">
                  <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-700/50">
                    <div className="flex items-center gap-2 mb-3">
                      <Clock className="w-5 h-5 text-orange-400" />
                      <h3 className="text-lg font-semibold text-gray-200">Current Algorithm</h3>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Time Complexity:</span>
                        <span className="text-orange-400 font-mono font-bold">{analysis.timeComplexity}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Space Complexity:</span>
                        <span className="text-orange-400 font-mono font-bold">{analysis.spaceComplexity}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Performance Rating:</span>
                        <div className="flex items-center gap-1">
                          <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <div
                                key={star}
                                className={`w-3 h-3 rounded-full ${
                                  star <= analysis.rating ? getRatingColor(analysis.rating).replace('text-', 'bg-') : 'bg-gray-600'
                                }`}
                              />
                            ))}
                          </div>
                          <span className={`${getRatingColor(analysis.rating)} font-medium ml-2`}>
                            {analysis.ratingText}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-700/50">
                    <h4 className="text-md font-semibold text-gray-200 mb-3">Original Pseudocode:</h4>
                    <pre className="text-sm text-gray-300 font-mono bg-gray-800/50 rounded-lg p-3 overflow-x-auto">
                      {pseudocode}
                    </pre>
                  </div>
                </div>
                
                {/* Optimization Suggestions */}
                <div className="space-y-6">
                  <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-700/50">
                    <div className="flex items-center gap-2 mb-3">
                      <Target className="w-5 h-5 text-green-400" />
                      <h3 className="text-lg font-semibold text-gray-200">Optimization Analysis</h3>
                    </div>
                    
                    <div className="space-y-4 text-sm">
                      {analysis.optimizations.map((optimization, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className={`w-2 h-2 ${getColorClass(optimization.color)} rounded-full mt-2 flex-shrink-0`}></div>
                          <div>
                            <p className="text-gray-200 font-medium">{optimization.type}</p>
                            <p className="text-gray-400 text-xs mt-1">
                              {optimization.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {analysis.alternativeCode && (
                    <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-700/50">
                      <h4 className="text-md font-semibold text-gray-200 mb-3">Alternative Approach:</h4>
                      <pre className="text-sm text-gray-300 font-mono bg-gray-800/50 rounded-lg p-3 overflow-x-auto">
                        {analysis.alternativeCode}
                      </pre>
                      {analysis.alternativeDescription && (
                        <p className="text-gray-400 text-xs mt-2">
                          {analysis.alternativeDescription}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
              
              {/* TL;DR Summary */}
              <div className="mt-8">
                <div className="relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-xl blur opacity-40"></div>
                  
                  <div className="relative bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl p-4 border border-cyan-400/30">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-lg flex items-center justify-center">
                        <Zap className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                          ⚡️ TL;DR Performance Summary
                        </h3>
                        <p className="text-gray-300 text-sm mt-1">
                          {analysis.tldrSummary}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PerformanceAnalysis;