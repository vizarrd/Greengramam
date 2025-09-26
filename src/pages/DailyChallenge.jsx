import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Card from '../components/Card';
import Button from '../components/Button';
import ProgressBar from '../components/ProgressBar';
import quizData from '../quizData.json';

const DailyChallenge = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showExplanation, setShowExplanation] = useState(false);
  const [results, setResults] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [alreadyTakenToday, setAlreadyTakenToday] = useState(false);

  // Check if quiz was already taken today and select 5 random questions
  useEffect(() => {
    const today = new Date().toDateString();
    const lastQuizDate = localStorage.getItem('lastQuizDate');
    
    if (lastQuizDate === today) {
      setAlreadyTakenToday(true);
    } else {
      const shuffled = [...quizData].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 5);
      setQuestions(selected);
    }
  }, []);

  const handleAnswerSelect = (answer) => {
    if (showExplanation) return; // Prevent changing answer after explanation is shown
    setSelectedAnswer(answer);
  };

  const handleSubmitAnswer = () => {
    if (!selectedAnswer) return;

    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    
    const result = {
      questionIndex: currentQuestionIndex,
      selectedAnswer,
      isCorrect,
      explanation: currentQuestion.explanation
    };

    setResults([...results, result]);
    
    if (isCorrect) {
      setScore(score + 1);
    }

    setShowExplanation(true);
  };

  const saveAuraPoints = (earnedPoints) => {
    // Get current Aura points from localStorage
    const currentAuraPoints = parseInt(localStorage.getItem('auraPoints') || '0');
    const newAuraPoints = currentAuraPoints + earnedPoints;
    
    // Save updated Aura points
    localStorage.setItem('auraPoints', newAuraPoints.toString());
    
    // Save today's date to prevent multiple attempts per day
    const today = new Date().toDateString();
    localStorage.setItem('lastQuizDate', today);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer('');
      setShowExplanation(false);
    } else {
      // Quiz completed - save Aura points equal to correct answers
      saveAuraPoints(score + (selectedAnswer === questions[currentQuestionIndex].correctAnswer ? 1 : 0));
      setIsCompleted(true);
    }
  };

  const handleRestartQuiz = () => {
    const shuffled = [...quizData].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 5);
    setQuestions(selected);
    setCurrentQuestionIndex(0);
    setSelectedAnswer('');
    setShowExplanation(false);
    setResults([]);
    setIsCompleted(false);
    setScore(0);
  };

  const getScoreColor = () => {
    if (score >= 4) return 'text-green-600';
    if (score >= 3) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreMessage = () => {
    if (score === 5) return t('perfectScore');
    if (score >= 4) return t('excellentWork');
    if (score >= 3) return t('goodJob');
    return t('keepLearning');
  };

  if (alreadyTakenToday) {
    const currentAuraPoints = parseInt(localStorage.getItem('auraPoints') || '0');
    return (
      <div className="min-h-screen bg-background py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="text-center">
            <div className="mb-8">
              <div className="text-6xl mb-4">🌟</div>
              <h1 className="font-display font-bold text-3xl mb-4">
                {t('dailyChallengeComplete')}
              </h1>
              <p className="text-muted text-lg mb-6">
                {t('comeBackTomorrow')}
              </p>
              <div className="bg-primary/10 rounded-lg p-6 mb-6">
                <h2 className="font-semibold text-lg mb-2">✨ {t('yourAuraPoints')}</h2>
                <div className="text-3xl font-bold text-primary">{currentAuraPoints}</div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => navigate('/profile')}
                variant="primary"
              >
                📊 {t('viewProfile')}
              </Button>
              <Button 
                onClick={() => navigate('/home')}
                variant="secondary"
              >
                🏠 {t('backToHome')}
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin text-4xl mb-4">🌱</div>
          <p className="text-muted">{t('loadingQuiz')}...</p>
        </div>
      </div>
    );
  }

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-background py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="text-center">
            <div className="mb-8">
              <div className="text-6xl mb-4">🎉</div>
              <h1 className="text-3xl font-display font-bold text-text mb-4">
                {t('challengeComplete')}
              </h1>
              <p className="text-lg text-muted mb-6">{getScoreMessage()}</p>
              
              {/* Score Display */}
              <div className="bg-gradient-to-r from-primary to-secondary rounded-lg p-6 mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">{t('yourScore')}</h2>
                <div className={`text-5xl font-bold mb-2 ${getScoreColor()}`}>
                  {score}/5
                </div>
                <div className="text-white">
                  {Math.round((score/5) * 100)}% {t('correct')}
                </div>
              </div>

              {/* Aura Points Earned */}
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-6 mb-8">
                <h2 className="text-xl font-bold text-white mb-2">✨ Aura Points Earned</h2>
                <div className="text-4xl font-bold text-white mb-2">
                  +{score}
                </div>
                <div className="text-purple-100">
                  {score === 1 ? '1 correct answer = 1 Aura Point' : `${score} correct answers = ${score} Aura Points`}
                </div>
                <div className="text-sm text-purple-100 mt-2">
                  Total Aura Points: {parseInt(localStorage.getItem('auraPoints') || '0')}
                </div>
              </div>
            </div>

            {/* Results Breakdown */}
            <div className="text-left mb-8">
              <h3 className="text-xl font-semibold mb-6">{t('detailedResults')}</h3>
              <div className="space-y-6">
                {results.map((result, index) => (
                  <Card key={index} className={`border-l-4 ${result.isCorrect ? 'border-green-500' : 'border-red-500'}`}>
                    <div className="flex items-start space-x-4">
                      <div className={`text-3xl ${result.isCorrect ? 'text-green-500' : 'text-red-500'} flex-shrink-0`}>
                        {result.isCorrect ? '✅' : '❌'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold mb-3 text-base md:text-lg leading-relaxed">
                          {t('question')} {index + 1}: {questions[result.questionIndex].question}
                        </h4>
                        <div className="space-y-3 text-sm md:text-base">
                          <div className="p-3 bg-gray-50 rounded-lg">
                            <span className="font-medium text-gray-700">{t('yourAnswer')}:</span>
                            <p className={`mt-1 ${result.isCorrect ? 'text-green-600' : 'text-red-600'} font-medium`}>
                              {result.selectedAnswer}
                            </p>
                          </div>
                          {!result.isCorrect && (
                            <div className="p-3 bg-green-50 rounded-lg">
                              <span className="font-medium text-gray-700">{t('correctAnswer')}:</span>
                              <p className="text-green-600 font-medium mt-1">
                                {questions[result.questionIndex].correctAnswer}
                              </p>
                            </div>
                          )}
                          <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                            <span className="font-medium text-blue-800 flex items-center mb-2">
                              💡 {t('explanation')}:
                            </span>
                            <p className="text-blue-700 leading-relaxed">
                              {result.explanation}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
              <Button
                variant="primary"
                size="lg"
                onClick={handleRestartQuiz}
                className="w-full sm:w-auto"
              >
                🔄 {t('retakeChallenge')}
              </Button>
              <Button
                variant="secondary"
                size="lg"
                onClick={() => navigate('/')}
                className="w-full sm:w-auto"
              >
                🏠 {t('backToHome')}
              </Button>
              <Button
                variant="accent"
                size="lg"
                onClick={() => navigate('/profile')}
                className="w-full sm:w-auto"
              >
                📊 {t('viewProfile')}
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-display font-bold text-text mb-2">
            🌱 {t('dailyChallenge')}
          </h1>
          <p className="text-muted">{t('testYourKnowledge')}</p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-text">
              {t('question')} {currentQuestionIndex + 1} {t('of')} {questions.length}
            </span>
            <span className="text-sm font-medium text-text">
              {Math.round(progress)}% {t('complete')}
            </span>
          </div>
          <ProgressBar
            progress={currentQuestionIndex + 1}
            max={questions.length}
            color="primary"
            label=""
          />
        </div>

        {/* Question Card */}
        <Card className="mb-6">
          <div className="mb-6">
            <h2 className="text-lg md:text-xl font-semibold text-text mb-6 leading-relaxed">
              {currentQuestion.question}
            </h2>
            
            {/* Options */}
            <div className="space-y-4">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(option)}
                  disabled={showExplanation}
                  className={`w-full p-4 text-left border-2 rounded-lg transition-all duration-200 ${
                    selectedAnswer === option
                      ? showExplanation
                        ? option === currentQuestion.correctAnswer
                          ? 'border-green-500 bg-green-50 text-green-700'
                          : 'border-red-500 bg-red-50 text-red-700'
                        : 'border-primary bg-primary/10'
                      : showExplanation && option === currentQuestion.correctAnswer
                        ? 'border-green-500 bg-green-50 text-green-700'
                        : 'border-gray-200 hover:border-primary/50 bg-white'
                  } ${showExplanation ? 'cursor-not-allowed' : 'cursor-pointer hover:shadow-sm'}`}
                >
                  <div className="flex items-start">
                    <span className="w-8 h-8 rounded-full border-2 border-current mr-4 flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span className="text-sm md:text-base leading-relaxed">{option}</span>
                    <div className="ml-auto flex-shrink-0">
                      {showExplanation && option === currentQuestion.correctAnswer && (
                        <span className="text-green-600 text-xl">✓</span>
                      )}
                      {showExplanation && selectedAnswer === option && option !== currentQuestion.correctAnswer && (
                        <span className="text-red-600 text-xl">✗</span>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Explanation */}
          {showExplanation && (
            <div className="border-t pt-6">
              <div className="bg-blue-50 border-l-4 border-blue-400 p-5 rounded-r-lg">
                <h3 className="font-semibold text-blue-800 mb-3 flex items-center">
                  💡 {t('explanation')}
                </h3>
                <p className="text-blue-700 text-sm md:text-base leading-relaxed">
                  {currentQuestion.explanation}
                </p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-between items-center mt-6 pt-6 border-t">
            <Button
              variant="secondary"
              onClick={() => navigate('/')}
            >
              ← {t('backToHome')}
            </Button>
            
            <div className="space-x-3">
              {!showExplanation ? (
                <Button
                  variant="primary"
                  onClick={handleSubmitAnswer}
                  disabled={!selectedAnswer}
                  className={!selectedAnswer ? 'opacity-50 cursor-not-allowed' : ''}
                >
                  {t('submitAnswer')} →
                </Button>
              ) : (
                <Button
                  variant="primary"
                  onClick={handleNextQuestion}
                >
                  {currentQuestionIndex < questions.length - 1 ? (
                    <>{t('nextQuestion')} →</>
                  ) : (
                    <>{t('viewResults')} 🏆</>
                  )}
                </Button>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DailyChallenge;