import { useEffect, useState } from 'react';

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
    const [showErrorPopup, setShowErrorPopup] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(1);
    const [score, setScore] = useState(0);
    const [isSimpleMode, setIsSimpleMode] = useState(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Simulate data fetching
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    const handleAnswer = (answer: number) => {
        if (answer === question.correctAnswer) {
            setScore((prev) => prev + 1);
            if (currentQuestion < totalQuestions) {
                setCurrentQuestion((prev) => prev + 1);
                setQuestion(generateQuestion());
            } else {
                setShowToast(true); // Show toast after completing all questions
            }
        } else {
            setShowErrorPopup(true);
        }
    };

    const closeErrorPopup = () => {
        setShowErrorPopup(false);
    };

    const handleContinue = () => {
        setShowToast(false);
        setQuestion(generateQuestion());
        setCurrentQuestion(1);
        setScore(0);
    };

    const restartQuiz = () => {
        setQuestion(generateQuestion());
        setCurrentQuestion(1);
        setScore(0);
        setShowToast(false);
    };

    const playIntroductionAudio = () => {
        const introText = `Hur man spelar: Det finns totalt ${totalQuestions} frågor. Din uppgift är att välja det rätta svaret på frågan ovan. Klicka på den ruta som du tror har rätt svar. Om du har rätt, kommer en ny fråga att visas automatiskt.`;
        const utterance = new SpeechSynthesisUtterance(introText);
        utterance.lang = 'sv-SE';
        window.speechSynthesis.speak(utterance);
    };

    const playQuestionAudio = () => {
        const questionText = `Vad är ${question.num1} plus ${question.num2}?`;
        const utterance = new SpeechSynthesisUtterance(questionText);
        utterance.lang = 'sv-SE';
        window.speechSynthesis.speak(utterance);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="loader">Laddar...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-red-500">{error}</div>
            </div>
        );
    }

    return (
        <div className={`min-h-screen flex items-center justify-center relative overflow-hidden ${isSimpleMode ? 'bg-white' : 'bg-blue-100'}`} aria-label="Addition Quiz Page">
            {/* Error Popup */}
            {showErrorPopup && (
                <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50" role="alertdialog" aria-labelledby="error-title" aria-describedby="error-description">
                    <div className="bg-white p-6 rounded shadow-lg text-center">
                        <h2 id="error-title" className="text-xl font-bold text-red-500 mb-4">
                            Fel svar
                        </h2>
                        <p id="error-description" className="text-gray-700 mb-4">
                            Var vänlig försök igen!
                        </p>
                        <button onClick={closeErrorPopup} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md text-center font-bold transition" aria-label="Försök igen">
                            Försök igen
                        </button>
                    </div>
                </div>
            )}

            {/* Toast Notification */}
            {showToast && (
                <div className="fixed top-16 left-1/2 transform -translate-x-1/2 bg-white p-6 rounded shadow-lg z-50" role="alert" aria-live="assertive">
                    <h2 className="text-xl font-bold text-blue-500 mb-4">Grattis! 🎉 Du klarade alla frågor!</h2>
                    <p className="text-gray-700 mb-4">Vill du fortsätta?</p>
                    <div className="flex justify-center gap-4">
                        <button onClick={handleContinue} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md text-center font-bold transition" aria-label="Ja, fortsätt">
                            Ja
                        </button>
                        <button onClick={restartQuiz} className="bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded-md text-center font-bold transition" aria-label="Nej, börja om">
                            Nej
                        </button>
                    </div>
                </div>
            )}

            {/* Toggle Background Button */}
            <div className="absolute top-4 right-4">
                <label className="flex items-center space-x-2 cursor-pointer">
                    <span className="text-sm font-semibold text-gray-700">Ingen bakgrundsfärg</span>
                    <button
                        onClick={() => setIsSimpleMode((prev) => !prev)}
                        className={`w-10 h-5 rounded-full ${isSimpleMode ? 'bg-blue-200' : 'bg-gray-300'} relative transition-colors duration-300`}
                        aria-label="Toggle background color"
                    >
                        <span className={`absolute top-0.5 left-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-300 ${isSimpleMode ? 'translate-x-5' : ''}`}></span>
                    </button>
                </label>
            </div>

            {/* Main Content */}
            <div className="transition-transform duration-700 ease-in-out w-full max-w-md mt-10 mb-10">
                {/* Instructions */}
                {currentQuestion <= totalQuestions && (
                    <div className="w-full bg-white p-6 rounded-lg shadow-lg mb-6" role="region" aria-labelledby="instructions-title">
                        <div className="flex justify-between items-center">
                            <h2 id="instructions-title" className="text-xl font-bold text-gray-800">
                                Hur man spelar
                            </h2>
                            <button onClick={playIntroductionAudio} className="text-2xl text-blue-500 hover:text-blue-600 transition" aria-label="Play introduction audio">
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
                        <div className="bg-white p-6 rounded-lg shadow-lg mb-6" role="region" aria-labelledby="question-title">
                            <div className="flex justify-between items-center">
                                <p id="question-title" className="text-center text-2xl font-bold py-6 px-4 rounded-md">
                                    Vad är {question.num1} + {question.num2}?
                                </p>
                                <button onClick={playQuestionAudio} className="text-2xl text-blue-500 hover:text-blue-600 transition" aria-label="Play question audio">
                                    🔊
                                </button>
                            </div>
                            <div className="mt-8 grid grid-cols-2 gap-4">
                                {question.options.map((option, index) => (
                                    <button
                                        key={index}
                                        className={`py-4 rounded-md font-extrabold ${
                                            isSimpleMode ? 'bg-gray-200 text-gray-800 hover:bg-gray-300' : `text-white ${colors[index % colors.length]} hover:bg-blue-600`
                                        } shadow-lg hover:shadow-xl transition transform hover:scale-105`}
                                        onClick={() => handleAnswer(option)}
                                        aria-label={`Answer option ${option}`}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center" role="region" aria-labelledby="congratulations-title">
                        <h2 id="congratulations-title" className="text-xl font-bold mb-4 text-gray-800">
                            Grattis! 🎉 Du klarade det!
                        </h2>
                        <button onClick={restartQuiz} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md text-center font-bold transition" aria-label="Börja om">
                            Börja om
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdditionComponent;
