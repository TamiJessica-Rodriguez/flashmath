import { useEffect, useState } from 'react';
import PersonalAssistant from './PersonalAssistant'; // Import PersonalAssistant component

const AdditionComponent = () => {
    const totalQuestions = 30;

    const generateQuestion = () => {
        const num1 = Math.floor(Math.random() * 10) + 1;
        const num2 = Math.floor(Math.random() * 10) + 1;
        const correctAnswer = num1 + num2;

        // Generate unique incorrect answers and ensure there are 4 options total
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

    const colors = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500'];

    const [question, setQuestion] = useState(generateQuestion());
    const [feedback, setFeedback] = useState('');
    const [showVideo, setShowVideo] = useState(false);
    const [showAssistant, setShowAssistant] = useState(false);
    const [isSimpleMode, setIsSimpleMode] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState<number>(() => {
        // Ladda aktuellt framsteg från localStorage om det finns
        const savedProgress = localStorage.getItem('currentQuestion');
        return savedProgress ? parseInt(savedProgress, 10) : 1;
    });

    useEffect(() => {
        // Spara framsteg i localStorage
        localStorage.setItem('currentQuestion', currentQuestion.toString());
    }, [currentQuestion]);

    const handleAnswer = (answer: number) => {
        if (answer === question.correctAnswer) {
            setFeedback('Rätt! 🎉');
            setTimeout(() => {
                setFeedback('');
                if (currentQuestion < totalQuestions) {
                    setQuestion(generateQuestion());
                    setCurrentQuestion((prev) => prev + 1);
                } else {
                    setFeedback('Grattis! Du har klarat alla frågor! 🎉');
                }
            }, 1500);
        } else {
            setFeedback('Fel svar. Försök igen! ❌');
        }
    };

    const playQuestionAudio = () => {
        const utterance = new SpeechSynthesisUtterance(`Vad är ${question.num1} plus ${question.num2}?`);
        utterance.lang = 'sv-SE';
        window.speechSynthesis.speak(utterance);
    };

    const progressPercentage = Math.min((currentQuestion / totalQuestions) * 100, 100);

    return (
        <div className={`min-h-screen ${isSimpleMode ? 'bg-white' : 'bg-gradient-to-b from-orange-100 to-orange-300'} flex items-center justify-center relative overflow-hidden`}>
            {/* Toggle Button */}
            <div className="absolute top-4 right-4 mt-4">
                <label className="flex items-center space-x-2 cursor-pointer">
                    <span className="text-sm font-semibold text-gray-700">Ingen bakgrundsfärg</span>
                    <button
                        onClick={() => setIsSimpleMode((prev) => !prev)}
                        className={`w-10 h-5 rounded-full ${isSimpleMode ? 'bg-blue-500' : 'bg-gray-300'} relative transition-colors duration-300`}
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
            <div className={`transition-transform duration-700 ease-in-out ${showVideo || showAssistant ? '-translate-x-full' : 'translate-x-0'} flex-shrink-0 w-full max-w-md`}>
                {/* Instructions */}
                <div className="w-full bg-white p-6 rounded-lg shadow-md mb-6">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-bold text-gray-800">Hur man spelar</h2>
                        <button onClick={playQuestionAudio} className="text-2xl" aria-label="Lyssna på frågan">
                            🔊
                        </button>
                    </div>
                    <p className="text-center text-gray-600 mt-2">
                        Det finns totalt {totalQuestions} frågor. Din uppgift är att välja det rätta svaret på frågan ovan. Klicka på den ruta som du tror har rätt svar. Om du har rätt, kommer en ny
                        fråga att visas automatiskt!
                    </p>
                </div>

                {/* Help Options */}
                <div className="w-full bg-white p-6 rounded-lg shadow-md mb-6">
                    <h2 className="text-xl font-bold text-center mb-4 text-gray-800">Behöver du hjälp?</h2>
                    <div className="flex flex-col gap-4">
                        <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md text-center" onClick={() => setShowVideo(true)}>
                            🎥 Titta på en instruktionsvideo
                        </button>
                        <button className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-md text-center" onClick={() => setShowAssistant(true)}>
                            🧠 Be om hjälp från assistenten
                        </button>
                    </div>
                </div>

                {/* Quiz Question */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className={`${isSimpleMode ? 'bg-gray-100 text-gray-700' : 'bg-blue-300 text-gray-900'} text-center text-2xl font-bold py-6 px-4 rounded-md shadow`}>
                        <p>
                            Vad är {question.num1} + {question.num2}?
                        </p>
                    </div>
                    <div className="mt-8 grid grid-cols-2 gap-4">
                        {question.options.map((option, index) => (
                            <button
                                key={index}
                                className={`py-4 rounded-md font-semibold text-white shadow-lg hover:shadow-xl transition transform hover:scale-105 ${colors[index % colors.length]}`}
                                onClick={() => handleAnswer(option)}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                    {feedback && (
                        <div className={`mt-6 text-center text-lg font-bold p-4 rounded-lg shadow-md ${isSimpleMode ? 'bg-gray-100 text-gray-700' : 'bg-blue-100 text-blue-700'}`}>{feedback}</div>
                    )}
                </div>
            </div>

            {/* Video Component */}
            {showVideo && (
                <div className="flex-shrink-0 w-full max-w-md transition-transform duration-700 ease-in-out translate-x-0">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-bold mb-4 text-gray-800">Instruktionsvideo</h2>
                        <video src="https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4" controls className="w-full rounded-md"></video>
                        <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md" onClick={() => setShowVideo(false)}>
                            ↩ Tillbaka till uppgiften
                        </button>
                    </div>
                </div>
            )}

            {/* Personal Assistant Component */}
            {showAssistant && (
                <div className="flex-shrink-0 w-full max-w-md transition-transform duration-700 ease-in-out translate-x-0">
                    <PersonalAssistant onClose={() => setShowAssistant(false)} />
                </div>
            )}
        </div>
    );
};

export default AdditionComponent;
