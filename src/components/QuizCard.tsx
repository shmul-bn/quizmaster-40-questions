
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Question } from '@/data/questionBank';

interface QuizCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  selectedAnswer: number | null;
  onAnswerSelect: (answerIndex: number) => void;
  showResult?: boolean;
  isCorrect?: boolean;
}

const QuizCard: React.FC<QuizCardProps> = ({
  question,
  questionNumber,
  totalQuestions,
  selectedAnswer,
  onAnswerSelect,
  showResult = false,
  isCorrect = false
}) => {
  return (
    <Card className="w-full max-w-4xl mx-auto animate-fade-in">
      <CardContent className="p-6 sm:p-8">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium text-muted-foreground">
              שאלה {questionNumber} מתוך {totalQuestions}
            </span>
            <div className="w-32 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
              />
            </div>
          </div>
          
          {question.category && (
            <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full mb-4">
              {question.category}
            </span>
          )}
          
          <h2 className="text-xl font-bold text-gray-900 mb-4 text-right leading-relaxed">
            {question.question}
          </h2>
          
          {question.image && (
            <div className="mb-6 flex justify-center">
              <img 
                src={question.image}
                alt="תמונת שאלה"
                className="rounded-lg shadow-md max-h-64 object-contain border border-gray-200"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 gap-3 sm:gap-4">
          {question.options.map((option, index) => {
            let buttonClass = "w-full min-h-[80px] sm:min-h-[70px] p-4 text-right transition-all duration-200 hover:scale-[1.02] border-2";
            
            if (showResult && selectedAnswer !== null) {
              // Show results after answer was selected
              if (index === question.correctAnswer) {
                buttonClass += " bg-green-100 border-green-500 text-green-800 hover:bg-green-100";
              } else if (index === selectedAnswer && !isCorrect) {
                buttonClass += " bg-red-100 border-red-500 text-red-800 hover:bg-red-100";
              } else {
                buttonClass += " bg-gray-100 border-gray-300 text-gray-600";
              }
            } else if (showResult && selectedAnswer === null) {
              // Review mode - don't show correct answer until clicked
              buttonClass += " bg-white border-gray-200 hover:bg-gray-50";
            } else {
              // Normal quiz mode
              if (index === selectedAnswer) {
                buttonClass += " bg-blue-100 border-blue-500 text-blue-800";
              } else {
                buttonClass += " bg-white border-gray-200 hover:bg-gray-50";
              }
            }
            
            return (
              <Button
                key={index}
                variant="outline"
                className={buttonClass}
                onClick={() => onAnswerSelect(index)}
                disabled={false}
              >
                <div className="flex items-start justify-between w-full gap-3">
                  <span className="font-bold text-lg flex-shrink-0 mt-1">
                    {String.fromCharCode(65 + index)}.
                  </span>
                  <span className="flex-1 text-right text-base leading-relaxed break-words hyphens-auto">
                    {option}
                  </span>
                </div>
              </Button>
            );
          })}
        </div>
        
        {showResult && selectedAnswer !== null && (
          <div className="mt-6">
            <div className={`p-4 rounded-lg ${isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
              <p className={`font-medium text-right ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                {isCorrect ? '✅ תשובה נכונה!' : '❌ תשובה שגויה'}
              </p>
              {!isCorrect && (
                <p className="text-sm text-gray-600 mt-2 text-right leading-relaxed">
                  התשובה הנכונה היא: <strong>{String.fromCharCode(65 + question.correctAnswer)}. {question.options[question.correctAnswer]}</strong>
                </p>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default QuizCard;
