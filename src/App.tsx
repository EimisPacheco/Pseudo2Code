import React, { useState } from 'react';
import Header from './components/Header';
import PseudocodeInput from './components/PseudocodeInput';
import CodeOutput from './components/CodeOutput';
import PerformanceAnalysis from './components/PerformanceAnalysis';
import FloatingShapes from './components/FloatingShapes';
import { geminiService, TranslationResult, PerformanceAnalysis as PerformanceAnalysisType } from './services/geminiService';

function App() {
  const [pseudocode, setPseudocode] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const [translations, setTranslations] = useState<TranslationResult | null>(null);
  const [performanceAnalysis, setPerformanceAnalysis] = useState<PerformanceAnalysisType | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleTranslate = async (code: string) => {
    if (!code.trim()) return;
    
    setIsTranslating(true);
    setPseudocode(code);
    setError(null);
    setTranslations(null);
    setPerformanceAnalysis(null);
    
    try {
      // Run both translation and performance analysis in parallel
      const [translationResult, analysisResult] = await Promise.all([
        geminiService.translatePseudocode(code),
        geminiService.analyzePerformance(code)
      ]);
      
      setTranslations(translationResult);
      setPerformanceAnalysis(analysisResult);
    } catch (err) {
      console.error('Translation error:', err);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsTranslating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800 relative overflow-hidden">
      <FloatingShapes />
      
      <div className="relative z-10">
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          <PseudocodeInput onTranslate={handleTranslate} isLoading={isTranslating} />
          
          {error && (
            <div className="max-w-4xl mx-auto mb-8">
              <div className="bg-red-900/50 border border-red-500/50 rounded-xl p-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                  <span className="text-red-300 font-medium">Translation Error</span>
                </div>
                <p className="text-red-200 text-sm mt-2">{error}</p>
              </div>
            </div>
          )}
          
          {(translations || isTranslating) && (
            <CodeOutput 
              translations={translations} 
              isLoading={isTranslating}
            />
          )}
          
          {performanceAnalysis && !isTranslating && (
            <PerformanceAnalysis 
              pseudocode={pseudocode} 
              analysis={performanceAnalysis}
            />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;