
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import QuizCard from '@/components/QuizCard';
import ResultsModal from '@/components/ResultsModal';
import { 
  getRandomQuestions, 
  getAllQuestions,
  getTotalQuestionsCount,
  Question, 
  PRACTICE_QUIZ_SIZE,
  PASSING_SCORE 
} from '@/data/questionBank';
import { toast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

interface QuizResult {
  questionIndex: number;
  question: Question;
  selectedAnswer: number | null;
  isCorrect: boolean;
}

type QuizMode = 'menu' | 'practice' | 'review' | 'results';

const Index = () => {
  const [quizMode, setQuizMode] = useState<QuizMode>('menu');
  const [currentQuestions, setCurrentQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [quizResults, setQuizResults] = useState<QuizResult[]>([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [totalQuestionsInBank, setTotalQuestionsInBank] = useState(1800);

  // Load total questions count on mount
  useEffect(() => {
    const loadTotalCount = async () => {
      try {
        const count = await getTotalQuestionsCount();
        setTotalQuestionsInBank(count);
      } catch (error) {
        console.error('Error loading total questions count:', error);
      }
    };
    loadTotalCount();
  }, []);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(time => time - 1);
      }, 1000);
    } else if (timeLeft === 0 && isTimerActive) {
      handleFinishQuiz();
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timeLeft]);

  const startPracticeQuiz = async () => {
    setIsLoading(true);
    try {
      const questions = await getRandomQuestions(PRACTICE_QUIZ_SIZE);
      setCurrentQuestions(questions);
      setSelectedAnswers(new Array(questions.length).fill(null));
      setCurrentQuestionIndex(0);
      setQuizMode('practice');
      setTimeLeft(45 * 60); // 45 minutes
      setIsTimerActive(true);
      toast({
        title: "מבחן התחיל!",
        description: `${questions.length} שאלות, 45 דקות`,
      });
    } catch (error) {
      toast({
        title: "שגיאה",
        description: "לא ניתן לטעון את השאלות. נסה שוב.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const startFullReview = async () => {
    setIsLoading(true);
    try {
      const questions = await getAllQuestions();
      setCurrentQuestions(questions);
      setSelectedAnswers(new Array(questions.length).fill(null));
      setCurrentQuestionIndex(0);
      setQuizMode('review');
      setIsTimerActive(false);
      toast({
        title: "מצב סקירה",
        description: `${questions.length} שאלות זמינות לסקירה`,
      });
    } catch (error) {
      toast({
        title: "שגיאה",
        description: "לא ניתן לטעון את השאלות. נסה שוב.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < currentQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleFinishQuiz();
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleFinishQuiz = () => {
    const results: QuizResult[] = currentQuestions.map((question, index) => ({
      questionIndex: index,
      question,
      selectedAnswer: selectedAnswers[index],
      isCorrect: selectedAnswers[index] === question.correctAnswer
    }));
    
    setQuizResults(results);
    setShowResults(true);
    setIsTimerActive(false);
    
    const correctCount = results.filter(r => r.isCorrect).length;
    const passed = correctCount >= PASSING_SCORE;
    
    toast({
      title: passed ? "מבחן הושלם בהצלחה!" : "מבחן הושלם",
      description: `${correctCount}/${results.length} נכונות ${passed ? '- עברת!' : '- לא עברת'}`,
      variant: passed ? "default" : "destructive"
    });
  };

  const handleRetryQuiz = () => {
    setSelectedAnswers(new Array(currentQuestions.length).fill(null));
    setCurrentQuestionIndex(0);
    setShowResults(false);
    setQuizMode('practice');
    setTimeLeft(45 * 60);
    setIsTimerActive(true);
  };

  const handleNewQuiz = async () => {
    setShowResults(false);
    await startPracticeQuiz();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const goBackToMenu = () => {
    setQuizMode('menu');
    setIsTimerActive(false);
    setCurrentQuestions([]);
    setSelectedAnswers([]);
    setCurrentQuestionIndex(0);
  };

  if (quizMode === 'menu') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="w-full max-w-4xl">
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
              מבחן התיאוריה
            </h1>
            <p className="text-xl text-gray-600 mb-2">
              מאגר של {totalQuestionsInBank.toLocaleString()} שאלות רישמיות
            </p>
            <p className="text-lg text-gray-500">
              שאלות תיאוריה של משרד הרישוי
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 animate-fade-in">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-blue-700">מבחן תרגול</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <div className="text-gray-600">
                  <p>• {PRACTICE_QUIZ_SIZE} שאלות רנדומליות</p>
                  <p>• זמן: 45 דקות</p>
                  <p>• ציון עובר: {PASSING_SCORE}/{PRACTICE_QUIZ_SIZE}</p>
                  <p>• סקירת טעויות בסוף</p>
                </div>
                <Button 
                  onClick={startPracticeQuiz}
                  disabled={isLoading}
                  className="w-full text-lg py-6 bg-blue-600 hover:bg-blue-700"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      טוען שאלות...
                    </>
                  ) : (
                    'התחל מבחן תרגול'
                  )}
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 animate-fade-in">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-green-700">סקירת שאלות</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <div className="text-gray-600">
                  <p>• עיון בכל השאלות</p>
                  <p>• ללא מגבלת זמן</p>
                  <p>• תשובות מיידיות</p>
                  <p>• ללא ציונים</p>
                </div>
                <Button 
                  onClick={startFullReview}
                  disabled={isLoading}
                  variant="outline"
                  className="w-full text-lg py-6 border-green-600 text-green-700 hover:bg-green-50"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      טוען שאלות...
                    </>
                  ) : (
                    'סקירת שאלות'
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 text-center">
            <Card className="bg-white/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2">שאלות תיאוריה רשמיות</h3>
                <p className="text-gray-600 text-sm">
                  מערכת מבחנים עם שאלות רשמיות של משרד הרישוי, 
                  הכוללת תמונות, תמרורים ושאלות מעודכנות לפי המאגר הרשמי.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto h-12 w-12 animate-spin text-blue-600 mb-4" />
          <p className="text-lg font-medium text-gray-700">טוען שאלות מהמאגר הרשמי...</p>
        </div>
      </div>
    );
  }

  const currentQuestion = currentQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / currentQuestions.length) * 100;
  const answeredCount = selectedAnswers.filter(answer => answer !== null).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <Button 
              onClick={goBackToMenu}
              variant="outline"
              className="hover:scale-105 transition-transform"
            >
              ← חזרה לתפריט
            </Button>
            
            {quizMode === 'practice' && (
              <div className="flex items-center gap-4">
                <div className={`text-lg font-bold px-4 py-2 rounded-lg ${
                  timeLeft < 300 ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                }`}>
                  ⏰ {formatTime(timeLeft)}
                </div>
                <Button 
                  onClick={handleFinishQuiz}
                  variant="outline"
                  className="bg-orange-100 hover:bg-orange-200 text-orange-700"
                >
                  סיים מבחן
                </Button>
              </div>
            )}
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">
                התקדמות: {currentQuestionIndex + 1}/{currentQuestions.length}
              </span>
              <span className="text-sm text-gray-600">
                נענו: {answeredCount}/{currentQuestions.length}
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>

        {/* Question */}
        <QuizCard
          question={currentQuestion}
          questionNumber={currentQuestionIndex + 1}
          totalQuestions={currentQuestions.length}
          selectedAnswer={selectedAnswers[currentQuestionIndex]}
          onAnswerSelect={handleAnswerSelect}
          showResult={quizMode === 'review'}
          isCorrect={selectedAnswers[currentQuestionIndex] === currentQuestion.correctAnswer}
        />

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8">
          <Button
            onClick={handlePreviousQuestion}
            disabled={currentQuestionIndex === 0}
            variant="outline"
            className="px-6 hover:scale-105 transition-transform"
          >
            ← שאלה קודמת
          </Button>

          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2">
              {quizMode === 'practice' ? 'לחץ "הבא" כדי להמשיך' : 'מצב סקירה - תשובות מיידיות'}
            </p>
          </div>

          <Button
            onClick={handleNextQuestion}
            disabled={quizMode === 'practice' && selectedAnswers[currentQuestionIndex] === null}
            className="px-6 hover:scale-105 transition-transform"
          >
            {currentQuestionIndex === currentQuestions.length - 1 ? 'סיים' : 'שאלה הבאה'} →
          </Button>
        </div>
      </div>

      {/* Results Modal */}
      <ResultsModal
        isOpen={showResults}
        onClose={() => setShowResults(false)}
        results={quizResults}
        onRetry={handleRetryQuiz}
        onNewQuiz={handleNewQuiz}
      />
    </div>
  );
};

export default Index;
