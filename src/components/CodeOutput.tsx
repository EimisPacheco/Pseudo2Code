import React from 'react';
import LanguageCard from './LanguageCard';
import InfoPanel from './InfoPanel';
import { TranslationResult } from '../services/geminiService';

interface CodeOutputProps {
  translations: TranslationResult | null;
  isLoading: boolean;
}

const CodeOutput: React.FC<CodeOutputProps> = ({ translations, isLoading }) => {
  const languages = [
    {
      name: 'Python',
      key: 'python' as keyof TranslationResult,
      icon: '🐍',
      gradient: 'from-blue-500 to-purple-600',
      code: translations?.python || ''
    },
    {
      name: 'JavaScript',
      key: 'javascript' as keyof TranslationResult,
      icon: 'JS',
      gradient: 'from-yellow-400 to-green-500',
      code: translations?.javascript || ''
    },
    {
      name: 'Java',
      key: 'java' as keyof TranslationResult,
      icon: '☕',
      gradient: 'from-orange-500 to-red-600',
      code: translations?.java || ''
    },
    {
      name: 'C#',
      key: 'csharp' as keyof TranslationResult,
      icon: '#',
      gradient: 'from-violet-500 to-indigo-600',
      code: translations?.csharp || ''
    },
    {
      name: 'C++',
      key: 'cpp' as keyof TranslationResult,
      icon: '++',
      gradient: 'from-teal-500 to-blue-600',
      code: translations?.cpp || ''
    }
  ];

  const languageInfo = {
    python: {
      title: 'Python Facts',
      yearCreated: '1991',
      useCases: 'Web Development, Data Science, AI/ML, Automation',
      companies: 'Google, Netflix, Instagram, Spotify',
      libraries: 'Django, Flask, NumPy, Pandas, TensorFlow',
      salary: '$95,000 - $150,000',
      docs: 'https://docs.python.org'
    },
    javascript: {
      title: 'JavaScript Insights',
      yearCreated: '1995',
      useCases: 'Web Development, Mobile Apps, Desktop Apps, Backend',
      companies: 'Facebook, Netflix, Uber, Airbnb',
      libraries: 'React, Vue.js, Node.js, Express, Angular',
      salary: '$90,000 - $140,000',
      docs: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript'
    },
    java: {
      title: 'Java Details',
      yearCreated: '1995',
      useCases: 'Enterprise Applications, Android Development, Web Backend',
      companies: 'Oracle, Amazon, LinkedIn, eBay',
      libraries: 'Spring, Hibernate, Apache Maven, JUnit',
      salary: '$85,000 - $135,000',
      docs: 'https://docs.oracle.com/en/java/'
    },
    csharp: {
      title: 'C# Information',
      yearCreated: '2000',
      useCases: 'Desktop Applications, Web Development, Game Development',
      companies: 'Microsoft, Stack Overflow, GoDaddy, Alibaba',
      libraries: 'ASP.NET, Entity Framework, Xamarin, Unity',
      salary: '$80,000 - $130,000',
      docs: 'https://docs.microsoft.com/en-us/dotnet/csharp/'
    },
    cpp: {
      title: 'C++ Stats',
      yearCreated: '1985',
      useCases: 'System Programming, Game Development, Embedded Systems',
      companies: 'Adobe, Amazon, Facebook, Google',
      libraries: 'STL, Boost, Qt, OpenCV',
      salary: '$90,000 - $145,000',
      docs: 'https://en.cppreference.com/'
    }
  };

  return (
    <section className="mb-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Language Cards */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-6">
              Code Translations
            </h2>
            {languages.map((language) => (
              <LanguageCard
                key={language.key}
                language={language}
                isLoading={isLoading}
              />
            ))}
          </div>
          
          {/* Right Column - Info Panels */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-6">
              Did You Know?
            </h2>
            {languages.map((language) => (
              <InfoPanel
                key={`${language.key}-info`}
                info={languageInfo[language.key as keyof typeof languageInfo]}
                isLoading={isLoading}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CodeOutput;