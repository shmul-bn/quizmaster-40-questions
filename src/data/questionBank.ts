
export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  image?: string;
  category?: string;
}

// Response from data.gov.il API
interface ApiQuestion {
  _id: number;
  שאלה: string;
  תשובה_1: string;
  תשובה_2: string;
  תשובה_3: string;
  תשובה_4?: string;
  תשובה_נכונה: number;
  תמונה?: string;
  קטגוריה?: string;
}

interface ApiResponse {
  result: {
    records: ApiQuestion[];
    total: number;
  };
}

// Cache for storing fetched questions
let questionCache: Question[] = [];
let totalQuestionsCount = 0;

// Function to fetch questions from data.gov.il API
export const fetchQuestions = async (limit: number = 100, offset: number = 0): Promise<Question[]> => {
  try {
    const response = await fetch(`https://data.gov.il/api/3/action/datastore_search?resource_id=8c0f314f-583d-48b6-9f5f-4483d95f6848&limit=${limit}&offset=${offset}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch questions');
    }
    
    const data: ApiResponse = await response.json();
    totalQuestionsCount = data.result.total;
    
    const questions: Question[] = data.result.records.map(record => {
      const options = [
        record.תשובה_1,
        record.תשובה_2,
        record.תשובה_3,
        record.תשובה_4
      ].filter(Boolean); // Remove undefined options
      
      return {
        id: record._id,
        question: record.שאלה,
        options,
        correctAnswer: record.תשובה_נכונה - 1, // Convert from 1-based to 0-based
        image: record.תמונה,
        category: record.קטגוריה
      };
    });
    
    return questions;
  } catch (error) {
    console.error('Error fetching questions:', error);
    throw error;
  }
};

// Function to get all available questions
export const getAllQuestions = async (): Promise<Question[]> => {
  if (questionCache.length === 0) {
    // Fetch a large batch of questions initially
    questionCache = await fetchQuestions(500);
  }
  return questionCache;
};

// Function to get random questions for a quiz
export const getRandomQuestions = async (count: number): Promise<Question[]> => {
  const allQuestions = await getAllQuestions();
  const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, allQuestions.length));
};

// Get total questions count from API
export const getTotalQuestionsCount = async (): Promise<number> => {
  if (totalQuestionsCount === 0) {
    await fetchQuestions(1); // Fetch one question just to get the total count
  }
  return totalQuestionsCount;
};

// Configuration constants
export const PRACTICE_QUIZ_SIZE = 30;
export const PASSING_SCORE = 26;

// For display purposes - will be updated from API
export let TOTAL_QUESTIONS_IN_BANK = 1800;
