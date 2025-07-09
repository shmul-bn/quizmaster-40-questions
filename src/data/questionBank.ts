
export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  image?: string;
  category?: string;
}

// Response from data.gov.il API - המבנה האמיתי
interface ApiQuestion {
  _id: number;
  title2: string; // השאלה נמצאת בשדה title2
  description4: string; // התשובות והתמונה נמצאים ב-HTML ב-description4
  category: string;
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

// Function to parse HTML and extract answers and correct answer
const parseQuestionData = (description4: string): { options: string[], correctAnswer: number, image?: string } => {
  console.log('Parsing description4:', description4);
  
  const parser = new DOMParser();
  const doc = parser.parseFromString(description4, 'text/html');
  
  // Extract options from li elements
  const liElements = doc.querySelectorAll('li span');
  const options: string[] = [];
  let correctAnswer = 0;
  
  liElements.forEach((span, index) => {
    const text = span.textContent?.trim() || '';
    if (text) {
      options.push(text);
      // Check if this is the correct answer (has id attribute starting with 'correctAnswer')
      if (span.id && span.id.startsWith('correctAnswer')) {
        correctAnswer = index;
      }
    }
  });
  
  // Extract image if exists
  const imgElement = doc.querySelector('img');
  const image = imgElement?.src || undefined;
  
  console.log('Parsed options:', options, 'Correct answer:', correctAnswer, 'Image:', image);
  
  return { options, correctAnswer, image };
};

// Function to fetch questions from data.gov.il API
export const fetchQuestions = async (limit: number = 100, offset: number = 0): Promise<Question[]> => {
  try {
    console.log('Fetching questions with limit:', limit, 'offset:', offset);
    
    const response = await fetch(`https://data.gov.il/api/3/action/datastore_search?resource_id=8c0f314f-583d-48b6-9f5f-4483d95f6848&limit=${limit}&offset=${offset}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch questions');
    }
    
    const data: ApiResponse = await response.json();
    console.log('API Response:', data);
    
    totalQuestionsCount = data.result.total;
    
    const questions: Question[] = data.result.records.map(record => {
      console.log('Processing record:', record);
      
      const { options, correctAnswer, image } = parseQuestionData(record.description4);
      
      return {
        id: record._id,
        question: record.title2,
        options,
        correctAnswer,
        image,
        category: record.category
      };
    }).filter(q => q.options.length > 0); // Filter out questions without valid options
    
    console.log('Processed questions:', questions);
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
  console.log('All questions loaded:', allQuestions.length);
  
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
