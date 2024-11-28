import { useState } from 'react';

const Addition = () => {
    // Generera två slumpmässiga tal för addition
    const generateQuestion = () => {
        const num1 = Math.floor(Math.random() * 10) + 1;
        const num2 = Math.floor(Math.random() * 10) + 1;
        const correctAnswer = num1 + num2;
        const incorrectAnswers = Array(3)
            .fill(0)
            .map(() => correctAnswer + (Math.floor(Math.random() * 7) - 3)); // Slumpmässiga felaktiga svar

        // Säkra unika svar
        const options = [...new Set([correctAnswer, ...incorrectAnswers])].slice(0, 4);

        // Blanda svaren
        return {
            num1,
            num2,
            correctAnswer,
            options: options.sort(() => Math.random() - 0.5),
        };
    };

    const [question, setQuestion] = useState(generateQuestion());
    const [feedback, setFeedback] = useState('');

    // Hantera svar
    const handleAnswer = (answer: number) => {
        if (answer === question.correctAnswer) {
            setFeedback('Rätt! 🎉');
            setTimeout(() => {
                setFeedback('');
                setQuestion(generateQuestion());
            }, 1500); // Ny fråga efter 1,5 sekunder
        } else {
            setFeedback('Fel svar. Försök igen! ❌');
        }
    };

    // Färger för svarsalternativen
    const colors = ['bg-red-300', 'bg-green-300', 'bg-blue-300', 'bg-yellow-300'];

    // Läs upp frågan med ljud
    const playQuestionAudio = () => {
        const utterance = new SpeechSynthesisUtterance(`Vad är ${question.num1} plus ${question.num2}?`);
        utterance.lang = 'sv-SE'; // Svensk talsyntes
        window.speechSynthesis.speak(utterance);
    };

    return (
        <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center px-4 text-white">
            {/* Instruktionstext */}
            <div className="w-full max-w-md mb-6 bg-gray-800 p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold">Hur man spelar</h2>
                    {/* Ljudemoji */}
                    <button onClick={playQuestionAudio} className="text-2xl" aria-label="Lyssna på frågan">
                        🔊
                    </button>
                </div>
                <p className="text-center text-gray-300 mt-2">
                    Din uppgift är att välja det rätta svaret på frågan ovan. Klicka på den ruta som du tror har rätt svar. Om du har rätt, kommer en ny fråga att visas automatiskt!
                </p>
            </div>

            {/* Instruktionsalternativ */}
            <div className="w-full max-w-md mb-6 bg-gray-800 p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold text-center mb-4">Behöver du hjälp?</h2>
                <div className="flex flex-col gap-4">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md text-center" onClick={() => alert('Instruktionsvideo öppnas här!')}>
                        🎥 Titta på en instruktionsvideo
                    </button>
                    <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md text-center" onClick={() => alert('Podden spelas upp här!')}>
                        🎧 Lyssna på en podd
                    </button>
                    <button className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-md text-center" onClick={() => alert('Woogle-sökning öppnas här!')}>
                        🔎 Sök i Woogle
                    </button>
                </div>
            </div>

            {/* Frågebox */}
            <div className="w-full max-w-md p-6 bg-gray-800 rounded-lg shadow-md">
                <div className="bg-blue-300 text-gray-900 text-center text-2xl font-bold py-6 px-4 rounded-md shadow">
                    <p>
                        Vad är {question.num1} + {question.num2}?
                    </p>
                </div>

                {/* Svarsalternativ */}
                <div className="mt-8 grid grid-cols-2 gap-4">
                    {question.options.map((option, index) => (
                        <button
                            key={index}
                            className={`py-4 rounded-md text-white font-semibold shadow-lg hover:shadow-xl transition transform hover:scale-105 ${
                                option === question.correctAnswer ? 'bg-blue-300 text-gray-900' : colors[index % colors.length]
                            }`}
                            onClick={() => handleAnswer(option)}
                        >
                            {option}
                        </button>
                    ))}
                </div>

                {/* Feedback */}
                {feedback && <div className="mt-6 text-center text-lg font-bold bg-gray-800 p-4 rounded-lg shadow">{feedback}</div>}
            </div>
        </div>
    );
};

export default Addition;
