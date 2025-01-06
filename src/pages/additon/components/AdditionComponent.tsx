import { useState } from 'react';

const AdditionComponent = () => {
    const totalQuestions = 3;

    const generateQuestion = () => {
        const num1 = Math.floor(Math.random() * 10) + 1;
        const num2 = Math.floor(Math.random() * 10) + 1;
        const correctAnswer = num1 + num2;

        const incorrectAnswers = Array.from(
            new Set(
                Array(10)
                    .fill(0)
                    .map(() => correctAnswer + (Math.floor(Math.random() * 7) - 3))
            )
        ).filter((answer) => answer !== correctAnswer);

        const options = [...incorrectAnswers.slice(0, 3), correctAnswer].sort(() => Math.random() - 0.5);

        return {
            num1,
            num2,
            correctAnswer,
            options,
        };
    };

    const colors = ['bg-blue-200', 'bg-blue-300', 'bg-blue-400', 'bg-blue-500'];

    const [question, setQuestion] = useState(generateQuestion());
    const [feedback, setFeedback] = useState('');
    const [showVideo, setShowVideo] = useState(false);
    const [showAssistant, setShowAssistant] = useState(false);
    const [isSimpleMode, setIsSimpleMode] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(1);
    const [score, setScore] = useState(0);

    const handleAnswer = (answer: number) => {
        if (answer === question.correctAnswer) {
            setFeedback('');
            setScore((prev) => prev + 1);
            if (currentQuestion < totalQuestions) {
                setQuestion(generateQuestion());
                setCurrentQuestion((prev) => prev + 1);
            }
        } else {
            setFeedback('Fel svar. Försök igen! ❌');
        }
    };

    const restartQuiz = () => {
        setQuestion(generateQuestion());
        setCurrentQuestion(1);
        setFeedback('');
        setScore(0);
    };

    const playIntroductionAudio = () => {
        const introText = `Hur man spelar: Det finns totalt ${totalQuestions} frågor. Din uppgift är att välja det rätta svaret på frågan ovan. Klicka på den ruta som du tror har rätt svar. Om du har rätt, kommer en ny fråga att visas automatiskt.`;
        const utterance = new SpeechSynthesisUtterance(introText);
        utterance.lang = 'sv-SE';
        window.speechSynthesis.speak(utterance);
    };

    const progressPercentage = Math.min((currentQuestion / totalQuestions) * 100, 100);

    return (
        <div className={`min-h-screen flex items-center justify-center relative overflow-hidden ${isSimpleMode ? 'bg-white' : 'bg-blue-100'}`}>
            {/* Toggle Button */}
            <div className="absolute top-4 right-4 mt-4">
                <label className="flex items-center space-x-2 cursor-pointer">
                    <span className="text-sm font-semibold text-gray-700">Ingen bakgrundsfärg</span>
                    <button
                        onClick={() => setIsSimpleMode((prev) => !prev)}
                        className={`w-10 h-5 rounded-full ${isSimpleMode ? 'bg-blue-200' : 'bg-gray-300'} relative transition-colors duration-300`}
                    >
                        <span className={`absolute top-0.5 left-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-300 ${isSimpleMode ? 'translate-x-5' : ''}`}></span>
                    </button>
                </label>
            </div>

            {/* Progress Bar */}
            <div className="absolute top-0 left-0 w-full h-4 bg-gray-300">
                <div className="h-full bg-blue-500 transition-all" style={{ width: `${progressPercentage}%` }}></div>
            </div>

            {/* Main Content */}
            <div className="transition-transform duration-700 ease-in-out w-full max-w-md mt-10 mb-10">
                {/* Instructions */}
                {currentQuestion <= totalQuestions && (
                    <div className="w-full bg-white p-6 rounded-lg shadow-lg mb-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-bold text-gray-800">Hur man spelar</h2>
                            <button onClick={playIntroductionAudio} className="text-2xl text-blue-500 hover:text-blue-600 transition">
                                🔊
                            </button>
                        </div>
                        <p className="text-center text-gray-600 mt-2">
                            Det finns totalt {totalQuestions} frågor. Din uppgift är att välja det rätta svaret på frågan ovan. Klicka på den ruta som du tror har rätt svar. Om du har rätt, kommer en
                            ny fråga att visas automatiskt!
                        </p>
                    </div>
                )}

                {currentQuestion <= totalQuestions ? (
                    <>
                        {/* Quiz Question */}
                        <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
                            <div className="text-center text-2xl font-bold py-6 px-4 rounded-md">
                                <p>
                                    Vad är {question.num1} + {question.num2}?
                                </p>
                            </div>
                            <div className="mt-8 grid grid-cols-2 gap-4">
                                {question.options.map((option, index) => (
                                    <button
                                        key={index}
                                        className={`py-4 rounded-md font-extrabold ${
                                            isSimpleMode ? 'bg-gray-200 text-gray-800 hover:bg-gray-300' : `text-white ${colors[index % colors.length]} hover:bg-blue-600`
                                        } shadow-lg hover:shadow-xl transition transform hover:scale-105`}
                                        onClick={() => handleAnswer(option)}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                        <h2 className="text-xl font-bold mb-4 text-gray-800">
                            Grattis! 🎉 Du fick {score} av {totalQuestions} rätt!
                        </h2>
                        <button onClick={restartQuiz} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md text-center font-bold transition">
                            Börja om
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdditionComponent;
