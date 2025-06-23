
export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  image?: string;
  category?: string;
}

// Sample questions - in a real app, this would be loaded from a database
export const questionBank: Question[] = [
  {
    id: 1,
    question: "מה הוא הכוכב הקרוב ביותר לכדור הארץ?",
    options: ["מאדים", "השמש", "צדק", "נוגה"],
    correctAnswer: 1,
    category: "מדע"
  },
  {
    id: 2,
    question: "איזה צבע נוצר כשמערבבים כחול ואדום?",
    options: ["ירוק", "סגול", "כתום", "צהוב"],
    correctAnswer: 1,
    category: "אמנות"
  },
  {
    id: 3,
    question: "כמה רגליים יש לעכביש?",
    options: ["6", "8", "10", "12"],
    correctAnswer: 1,
    category: "טבע"
  },
  {
    id: 4,
    question: "מה הוא הנהר הארוך ביותר בעולם?",
    options: ["אמזונס", "נילוס", "מיסיסיפי", "ינגצה"],
    correctAnswer: 1,
    category: "גיאוגרפיה"
  },
  {
    id: 5,
    question: "איזה כוכב לכת הוא הגדול ביותר במערכת השמש?",
    options: ["צדק", "שבתאי", "נפטון", "אורנוס"],
    correctAnswer: 0,
    category: "מדע"
  },
  {
    id: 6,
    question: "מה הוא הקרח הנוזלי של המים?",
    options: ["0 מעלות צלזיוס", "32 מעלות צלזיוס", "100 מעלות צלזיוס", "-10 מעלות צלזיוס"],
    correctAnswer: 0,
    category: "מדע"
  },
  {
    id: 7,
    question: "איזו מדינה זכתה בכאס העולם בכדורגל 2018?",
    options: ["ברזיל", "גרמניה", "צרפת", "ארגנטינה"],
    correctAnswer: 2,
    category: "ספורט"
  },
  {
    id: 8,
    question: "מה הוא הרכיב העיקרי באוויר?",
    options: ["חמצן", "חנקן", "פחמן דו-חמצני", "ארגון"],
    correctAnswer: 1,
    category: "מדע"
  },
  {
    id: 9,
    question: "איזה בעל חיים הוא הגבוה ביותר בעולם?",
    options: ["פיל", "ג'ירפה", "קרנף", "הרוס"],
    correctAnswer: 1,
    category: "טבע"
  },
  {
    id: 10,
    question: "כמה יבשות יש בעולם?",
    options: ["5", "6", "7", "8"],
    correctAnswer: 2,
    category: "גיאוגרפיה"
  },
  // Adding more questions to simulate a larger bank
  {
    id: 11,
    question: "מה הוא הימת העמוק ביותר בעולם?",
    options: ["ים המלח", "ים התיכון", "האוקיינוס השקט", "מרינה טרנץ'"],
    correctAnswer: 3,
    category: "גיאוגרפיה"
  },
  {
    id: 12,
    question: "איזה ויטמין מיוצר על ידי עור האדם כשהוא נחשף לשמש?",
    options: ["ויטמין A", "ויטמין B", "ויטמין C", "ויטמין D"],
    correctAnswer: 3,
    category: "בריאות"
  },
  {
    id: 13,
    question: "מה הוא המתכת הקלה ביותר?",
    options: ["אלומיניום", "ליתיום", "מגנזיום", "טיטניום"],
    correctAnswer: 1,
    category: "מדע"
  },
  {
    id: 14,
    question: "איזה מוזיקאי חיבר את 'להט הירח'?",
    options: ["מוצרט", "בטהובן", "בך", "שופן"],
    correctAnswer: 1,
    category: "מוזיקה"
  },
  {
    id: 15,
    question: "מה הוא הבניין הגבוה ביותר בעולם?",
    options: ["בורג' ח'ליפה", "מגדל אייפל", "אמפייר סטייט", "סי אן טאוור"],
    correctAnswer: 0,
    category: "אדריכלות"
  },
  {
    id: 16,
    question: "איזו שפה מדברים בברזיל?",
    options: ["ספרדית", "פורטוגזית", "איטלקית", "צרפתית"],
    correctAnswer: 1,
    category: "שפות"
  },
  {
    id: 17,
    question: "מה הוא הסמל הכימי של זהב?",
    options: ["Go", "Au", "Ag", "Zn"],
    correctAnswer: 1,
    category: "כימיה"
  },
  {
    id: 18,
    question: "כמה עצמות יש בגוף האדם הבוגר?",
    options: ["196", "206", "216", "226"],
    correctAnswer: 1,
    category: "אנטומיה"
  },
  {
    id: 19,
    question: "איזו עיר היא בירת אוסטרליה?",
    options: ["סידני", "מלבורן", "קנברה", "פרת'"],
    correctAnswer: 2,
    category: "גיאוגרפיה"
  },
  {
    id: 20,
    question: "מה הוא החלק הקטן ביותר של יסוד כימי?",
    options: ["מולקולה", "אטום", "אלקטרון", "פרוטון"],
    correctAnswer: 1,
    category: "כימיה"
  },
  // Continue with more questions to reach our sample bank
  {
    id: 21,
    question: "איזה אוקיינוס הוא הגדול ביותר?",
    options: ["האוקיינוס האטלנטי", "האוקיינוס ההודי", "האוקיינוס השקט", "האוקיינוס הקטבי"],
    correctAnswer: 2,
    category: "גיאוגרפיה"
  },
  {
    id: 22,
    question: "מה הוא המספר הראשוני הקטן ביותר?",
    options: ["0", "1", "2", "3"],
    correctAnswer: 2,
    category: "מתמטיקה"
  },
  {
    id: 23,
    question: "איזה גז הופך את הדם לאדום?",
    options: ["חמצן", "חנקן", "פחמן דו-חמצני", "הליום"],
    correctAnswer: 0,
    category: "ביולוגיה"
  },
  {
    id: 24,
    question: "מה הוא הציפור הגדולה ביותר בעולם?",
    options: ["נשר", "יען", "ברבור", "פלמינגו"],
    correctAnswer: 1,
    category: "טבע"
  },
  {
    id: 25,
    question: "איזה כוכב לכת הוא הקרוב ביותר לשמש?",
    options: ["נוגה", "כוכב חמה", "כדור הארץ", "מאדים"],
    correctAnswer: 1,
    category: "אסטרונומיה"
  },
  {
    id: 26,
    question: "מה הוא הרכיב העיקרי בזכוכית?",
    options: ["פלסטיק", "חול", "מתכת", "קרמיקה"],
    correctAnswer: 1,
    category: "חומרים"
  },
  {
    id: 27,
    question: "איזו מדינה המציאה את הנייר?",
    options: ["יפן", "הודו", "סין", "מצרים"],
    correctAnswer: 2,
    category: "היסטוריה"
  },
  {
    id: 28,
    question: "מה הוא הצבע של דם העכבר?",
    options: ["כחול", "ירוק", "אדום", "סגול"],
    correctAnswer: 2,
    category: "ביולוגיה"
  },
  {
    id: 29,
    question: "איזה מכשיר משמש למדידת טמפרטורה?",
    options: ["ברומטר", "תרמומטר", "הידרומטר", "אמטר"],
    correctAnswer: 1,
    category: "פיזיקה"
  },
  {
    id: 30,
    question: "מה הוא הממס האוניברסלי?",
    options: ["אלכוהול", "מים", "חומצה", "שמן"],
    correctAnswer: 1,
    category: "כימיה"
  },
  {
    id: 31,
    question: "איזה בעל חיים יכול לשנות את צבעו?",
    options: ["כלב", "חתול", "זיקית", "עכבר"],
    correctAnswer: 2,
    category: "טבע"
  },
  {
    id: 32,
    question: "מה הוא הסמל הכימי של ברזל?",
    options: ["Br", "Fe", "Ir", "In"],
    correctAnswer: 1,
    category: "כימיה"
  },
  {
    id: 33,
    question: "איזו עיר נקראת 'העיר הנצחית'?",
    options: ["פריז", "לונדון", "רומא", "אתונה"],
    correctAnswer: 2,
    category: "תרבות"
  },
  {
    id: 34,
    question: "מה הוא הקול הכי מהיר - אור או קול?",
    options: ["אור", "קול", "שווים", "תלוי בתנאים"],
    correctAnswer: 0,
    category: "פיזיקה"
  },
  {
    id: 35,
    question: "איזה ויטמין נמצא בעיקר בפירות הדר?",
    options: ["ויטמין A", "ויטמין B", "ויטמין C", "ויטמין D"],
    correctAnswer: 2,
    category: "תזונה"
  },
  {
    id: 36,
    question: "מה הוא החלק הקשה ביותר בגוף האדם?",
    options: ["עצם", "שן", "ציפורן", "שיער"],
    correctAnswer: 1,
    category: "אנטומיה"
  },
  {
    id: 37,
    question: "איזה פרח הוא סמל של הולנד?",
    options: ["חמנית", "ורד", "טוליפ", "סחלב"],
    correctAnswer: 2,
    category: "בוטניקה"
  },
  {
    id: 38,
    question: "מה הוא הבעל החיים הכי מהיר ביבשה?",
    options: ["אריה", "גפרד", "נמר", "זאב"],
    correctAnswer: 1,
    category: "טבע"
  },
  {
    id: 39,
    question: "איזו מדינה נתנה לארה״ב את פסל החירות?",
    options: ["אנגליה", "צרפת", "איטליה", "גרמניה"],
    correctAnswer: 1,
    category: "היסטוריה"
  },
  {
    id: 40,
    question: "מה הוא הכוכב הכי בהיר בשמי הלילה?",
    options: ["הקוטב הצפוני", "סיריוס", "קנופוס", "ארקטורוס"],
    correctAnswer: 1,
    category: "אסטרונומיה"
  }
];

// Function to get random questions for a quiz
export const getRandomQuestions = (count: number): Question[] => {
  const shuffled = [...questionBank].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, questionBank.length));
};

// In a real application, you would have 1800 questions here
// For demonstration, we're using 40 questions and will simulate the larger bank
export const TOTAL_QUESTIONS_IN_BANK = 1800; // Simulated total
export const PRACTICE_QUIZ_SIZE = 30;
export const PASSING_SCORE = 26;
