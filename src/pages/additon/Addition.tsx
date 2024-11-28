import { Tab } from '@headlessui/react';
import { Fragment, useState } from 'react';
import ColumnMath from '../Components/ColumnMath'; // Importera Uppställning-komponenten

// Addition Component
const Addition = () => {
    const generateQuestion = () => {
        const num1 = Math.floor(Math.random() * 10) + 1;
        const num2 = Math.floor(Math.random() * 10) + 1;
        const correctAnswer = num1 + num2;
        const incorrectAnswers = Array(3)
            .fill(0)
            .map(() => correctAnswer + (Math.floor(Math.random() * 7) - 3));
        const options = [...new Set([correctAnswer, ...incorrectAnswers])].slice(0, 4);
        return {
            num1,
            num2,
            correctAnswer,
            options: options.sort(() => Math.random() - 0.5),
        };
    };

    const [question, setQuestion] = useState(generateQuestion());
    const [feedback, setFeedback] = useState('');
    const [showVideo, setShowVideo] = useState(false);

    const handleAnswer = (answer: number) => {
        if (answer === question.correctAnswer) {
            setFeedback('Rätt! 🎉');
            setTimeout(() => {
                setFeedback('');
                setQuestion(generateQuestion());
            }, 1500);
        } else {
            setFeedback('Fel svar. Försök igen! ❌');
        }
    };

    const colors = ['bg-red-300', 'bg-green-300', 'bg-blue-300', 'bg-yellow-300'];

    const playQuestionAudio = () => {
        const utterance = new SpeechSynthesisUtterance(`Vad är ${question.num1} plus ${question.num2}?`);
        utterance.lang = 'sv-SE';
        window.speechSynthesis.speak(utterance);
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center relative overflow-hidden">
            <div className={`transition-transform duration-700 ease-in-out ${showVideo ? '-translate-x-full' : 'translate-x-0'} flex-shrink-0 w-full max-w-md`}>
                <div className="w-full bg-gray-800 p-6 rounded-lg shadow-md mb-6">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-bold">Hur man spelar</h2>
                        <button onClick={playQuestionAudio} className="text-2xl" aria-label="Lyssna på frågan">
                            🔊
                        </button>
                    </div>
                    <p className="text-center text-gray-300 mt-2">
                        Din uppgift är att välja det rätta svaret på frågan ovan. Klicka på den ruta som du tror har rätt svar. Om du har rätt, kommer en ny fråga att visas automatiskt!
                    </p>
                </div>
                <div className="w-full bg-gray-800 p-6 rounded-lg shadow-md mb-6">
                    <h2 className="text-xl font-bold text-center mb-4">Behöver du hjälp?</h2>
                    <div className="flex flex-col gap-4">
                        <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md text-center" onClick={() => setShowVideo(true)}>
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
                <div className="bg-gray-800 p-6 rounded-lg shadow-md">
                    <div className="bg-blue-300 text-gray-900 text-center text-2xl font-bold py-6 px-4 rounded-md shadow">
                        <p>
                            Vad är {question.num1} + {question.num2}?
                        </p>
                    </div>
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
                    {feedback && <div className="mt-6 text-center text-lg font-bold bg-gray-800 p-4 rounded-lg shadow">{feedback}</div>}
                </div>
            </div>
            {showVideo && (
                <div className="flex-shrink-0 w-full max-w-md transition-transform duration-700 ease-in-out translate-x-0">
                    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-bold mb-4">Instruktionsvideo</h2>
                        <video src="https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4" controls className="w-full rounded-md"></video>
                        <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md" onClick={() => setShowVideo(false)}>
                            ↩ Tillbaka till uppgiften
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

// Tabs Component
const Tabs = () => {
    return (
        <Tab.Group>
            <Tab.List className="mt-3 flex flex-wrap gap-2">
                <Tab as={Fragment}>
                    {({ selected }) => (
                        <button
                            className={`${selected ? 'bg-warning text-white !outline-none' : ''} before:inline-block -mb-[1px] flex items-center rounded p-3.5 py-2 hover:bg-warning hover:text-white`}
                        >
                            Addition
                        </button>
                    )}
                </Tab>
                <Tab as={Fragment}>
                    {({ selected }) => (
                        <button
                            className={`${selected ? 'bg-warning text-white !outline-none' : ''} before:inline-block -mb-[1px] flex items-center rounded p-3.5 py-2 hover:bg-warning hover:text-white`}
                        >
                            Uppställning
                        </button>
                    )}
                </Tab>
            </Tab.List>
            <Tab.Panels>
                <Tab.Panel>
                    <Addition />
                </Tab.Panel>
                <Tab.Panel>
                    <ColumnMath />
                </Tab.Panel>
            </Tab.Panels>
        </Tab.Group>
    );
};

export default Tabs;
