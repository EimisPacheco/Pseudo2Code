import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || 'AIzaSyB9jxCpFclGwigqmjBZkam0OfRipy8x5sw';

if (!API_KEY) {
  throw new Error('VITE_GEMINI_API_KEY is not set in environment variables');
}

const genAI = new GoogleGenerativeAI(API_KEY);

export interface TranslationResult {
  python: string;
  javascript: string;
  java: string;
  csharp: string;
  cpp: string;
}

export interface PerformanceAnalysis {
  timeComplexity: string;
  spaceComplexity: string;
  rating: number;
  ratingText: string;
  optimizations: Array<{
    type: string;
    description: string;
    color: string;
  }>;
  alternativeCode: string;
  alternativeDescription: string;
  tldrSummary: string;
}

export class GeminiService {
  private model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

  async translatePseudocode(pseudocode: string): Promise<TranslationResult> {
    const prompt = `
You are a pseudocode-to-code translator. Convert the following pseudocode into equivalent code in 5 programming languages.

PSEUDOCODE:
${pseudocode}

Please provide clean, well-commented code translations for:
1. Python
2. JavaScript  
3. Java
4. C#
5. C++

Format your response as a JSON object with keys: python, javascript, java, csharp, cpp
Each value should be the complete, runnable code with comments explaining the logic.
Make sure the code is beginner-friendly and follows best practices for each language.

Return ONLY the JSON object, no additional text or formatting.
`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      // Clean the response to extract JSON
      let cleanedText = text.trim();
      
      // Remove markdown code blocks if present
      if (cleanedText.startsWith('```json')) {
        cleanedText = cleanedText.replace(/^```json\s*/, '').replace(/\s*```$/, '');
      } else if (cleanedText.startsWith('```')) {
        cleanedText = cleanedText.replace(/^```\s*/, '').replace(/\s*```$/, '');
      }
      
      // Find JSON object
      const jsonMatch = cleanedText.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        console.error('No JSON found in response:', text);
        throw new Error('Invalid response format from Gemini');
      }
      
      const translations = JSON.parse(jsonMatch[0]);
      
      // Validate that all required languages are present
      const requiredLanguages = ['python', 'javascript', 'java', 'csharp', 'cpp'];
      for (const lang of requiredLanguages) {
        if (!translations[lang]) {
          throw new Error(`Missing translation for ${lang}`);
        }
      }
      
      return translations;
    } catch (error) {
      console.error('Error translating pseudocode:', error);
      if (error instanceof SyntaxError) {
        throw new Error('Failed to parse AI response. Please try again.');
      }
      throw new Error('Failed to translate pseudocode. Please check your internet connection and try again.');
    }
  }

  async analyzePerformance(pseudocode: string): Promise<PerformanceAnalysis> {
    const prompt = `
You are a performance analysis expert. Analyze the following pseudocode for algorithmic complexity and optimization opportunities.

PSEUDOCODE:
${pseudocode}

Provide a detailed performance analysis including:
1. Time complexity (Big O notation)
2. Space complexity (Big O notation)  
3. Performance rating (1-5 stars)
4. Rating description (Poor, Fair, Good, Very Good, Excellent)
5. 3 optimization insights with types (Algorithm Efficiency, Memory Usage, Scalability) and descriptions
6. Alternative optimized pseudocode if applicable
7. Brief explanation of the alternative approach
8. TL;DR summary (2-3 sentences)

Format your response as a JSON object with this structure:
{
  "timeComplexity": "O(n)",
  "spaceComplexity": "O(1)",
  "rating": 4,
  "ratingText": "Very Good",
  "optimizations": [
    {
      "type": "Algorithm Efficiency",
      "description": "Your description here",
      "color": "green"
    },
    {
      "type": "Memory Usage", 
      "description": "Your description here",
      "color": "blue"
    },
    {
      "type": "Scalability",
      "description": "Your description here", 
      "color": "purple"
    }
  ],
  "alternativeCode": "OPTIMIZED PSEUDOCODE HERE",
  "alternativeDescription": "Brief explanation of optimization",
  "tldrSummary": "Concise 2-3 sentence summary"
}

Return ONLY the JSON object, no additional text or formatting.
`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      // Clean the response to extract JSON
      let cleanedText = text.trim();
      
      // Remove markdown code blocks if present
      if (cleanedText.startsWith('```json')) {
        cleanedText = cleanedText.replace(/^```json\s*/, '').replace(/\s*```$/, '');
      } else if (cleanedText.startsWith('```')) {
        cleanedText = cleanedText.replace(/^```\s*/, '').replace(/\s*```$/, '');
      }
      
      // Find JSON object
      const jsonMatch = cleanedText.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        console.error('No JSON found in response:', text);
        throw new Error('Invalid response format from Gemini');
      }
      
      const analysis = JSON.parse(jsonMatch[0]);
      
      // Validate required fields
      const requiredFields = ['timeComplexity', 'spaceComplexity', 'rating', 'ratingText', 'optimizations', 'tldrSummary'];
      for (const field of requiredFields) {
        if (!analysis[field]) {
          throw new Error(`Missing required field: ${field}`);
        }
      }
      
      return analysis;
    } catch (error) {
      console.error('Error analyzing performance:', error);
      if (error instanceof SyntaxError) {
        throw new Error('Failed to parse AI response. Please try again.');
      }
      throw new Error('Failed to analyze performance. Please check your internet connection and try again.');
    }
  }
}

export const geminiService = new GeminiService();