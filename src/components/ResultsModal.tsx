
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Question } from '@/data/questionBank';
import { PASSING_SCORE } from '@/data/questionBank';

interface QuizResult {
  questionIndex: number;
  question: Question;
  selectedAnswer: number | null;
  isCorrect: boolean;
}

interface ResultsModalProps {
  isOpen: boolean;
  onClose: () => void;
  results: QuizResult[];
  onRetry: () => void;
  onNewQuiz: () => void;
}

const ResultsModal: React.FC<ResultsModalProps> = ({
  isOpen,
  onClose,
  results,
  onRetry,
  onNewQuiz
}) => {
  const correctAnswers = results.filter(result => result.isCorrect).length;
  const totalQuestions = results.length;
  const percentage = Math.round((correctAnswers / totalQuestions) * 100);
  const passed = correctAnswers >= PASSING_SCORE;
  
  const incorrectAnswers = results.filter(result => !result.isCorrect);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            תוצאות המבחן
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Score Summary */}
          <Card className={`${passed ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
            <CardContent className="p-6 text-center">
              <div className={`text-6xl font-bold mb-4 ${passed ? 'text-green-600' : 'text-red-600'}`}>
                {percentage}%
              </div>
              <div className="text-xl font-semibold mb-2">
                {correctAnswers} נכונות מתוך {totalQuestions} שאלות
              </div>
              <div className={`text-lg font-medium ${passed ? 'text-green-700' : 'text-red-700'}`}>
                {passed ? '🎉 עברת את המבחן!' : '😞 לא עברת את המבחן'}
              </div>
              <div className="text-sm text-gray-600 mt-2">
                נדרשות לפחות {PASSING_SCORE} תשובות נכונות למעבר
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center">
            <Button onClick={onRetry} variant="outline" className="px-6">
              נסה שוב עם אותן שאלות
            </Button>
            <Button onClick={onNewQuiz} className="px-6">
              מבחן חדש
            </Button>
            <Button onClick={onClose} variant="secondary" className="px-6">
              סגור
            </Button>
          </div>

          {/* Incorrect Answers Review */}
          {incorrectAnswers.length > 0 && (
            <div>
              <h3 className="text-xl font-bold mb-4 text-right text-red-700">
                שאלות שטעית בהן ({incorrectAnswers.length})
              </h3>
              <div className="space-y-4">
                {incorrectAnswers.map((result, index) => (
                  <Card key={index} className="border-red-200">
                    <CardContent className="p-4">
                      <div className="text-right">
                        <h4 className="font-semibold mb-2 text-gray-900">
                          שאלה {result.questionIndex + 1}: {result.question.question}
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                          <div className="bg-red-50 p-2 rounded border border-red-200">
                            <span className="font-medium text-red-700">התשובה שלך:</span>
                            <br />
                            {result.selectedAnswer !== null ? 
                              `${String.fromCharCode(65 + result.selectedAnswer)}. ${result.question.options[result.selectedAnswer]}` 
                              : 'לא נענה'
                            }
                          </div>
                          <div className="bg-green-50 p-2 rounded border border-green-200">
                            <span className="font-medium text-green-700">התשובה הנכונה:</span>
                            <br />
                            {String.fromCharCode(65 + result.question.correctAnswer)}. {result.question.options[result.question.correctAnswer]}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* All Correct Message */}
          {incorrectAnswers.length === 0 && (
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-green-700 mb-2">
                  🏆 מושלם!
                </div>
                <div className="text-green-700">
                  ענית נכון על כל השאלות!
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ResultsModal;
