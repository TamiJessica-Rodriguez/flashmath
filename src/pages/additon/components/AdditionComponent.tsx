// import { useState } from 'react';
// import PersonalAssistant from './PersonalAssistant'; // Import PersonalAssistant component

// const AdditionComponent = () => {
//     const generateQuestion = () => {
//         const num1 = Math.floor(Math.random() * 10) + 1;
//         const num2 = Math.floor(Math.random() * 10) + 1;
//         const correctAnswer = num1 + num2;
//         const incorrectAnswers = Array(3)
//             .fill(0)
//             .map(() => correctAnswer + (Math.floor(Math.random() * 7) - 3));
//         const options = [...new Set([correctAnswer, ...incorrectAnswers])].slice(0, 4);
//         return {
//             num1,
//             num2,
//             correctAnswer,
//             options: options.sort(() => Math.random() - 0.5),
//         };
//     };

//     const [question, setQuestion] = useState(generateQuestion());
//     const [feedback, setFeedback] = useState('');
//     const [showVideo, setShowVideo] = useState(false);
//     const [showAssistant, setShowAssistant] = useState(false); // Add state for Assistant

//     const handleAnswer = (answer: number) => {
//         if (answer === question.correctAnswer) {
//             setFeedback('Rätt! 🎉');
//             setTimeout(() => {
//                 setFeedback('');
//                 setQuestion(generateQuestion());
//             }, 1500);
//         } else {
//             setFeedback('Fel svar. Försök igen! ❌');
//         }
//     };

//     const colors = ['bg-red-300', 'bg-green-300', 'bg-blue-300', 'bg-yellow-300'];

//     const playQuestionAudio = () => {
//         const utterance = new SpeechSynthesisUtterance(`Vad är ${question.num1} plus ${question.num2}?`);
//         utterance.lang = 'sv-SE';
//         window.speechSynthesis.speak(utterance);
//     };

//     return (
//         <div className="min-h-screen bg-gradient-to-b from-orange-100 to-orange-300 flex items-center justify-center relative overflow-hidden">
//             {/* Main Content */}
//             <div className={`transition-transform duration-700 ease-in-out ${showVideo || showAssistant ? '-translate-x-full' : 'translate-x-0'} flex-shrink-0 w-full max-w-md`}>
//                 {/* Instructions */}
//                 <div className="w-full bg-white p-6 rounded-lg shadow-md mb-6">
//                     <div className="flex justify-between items-center">
//                         <h2 className="text-xl font-bold text-gray-800">Hur man spelar</h2>
//                         <button onClick={playQuestionAudio} className="text-2xl" aria-label="Lyssna på frågan">
//                             🔊
//                         </button>
//                     </div>
//                     <p className="text-center text-gray-600 mt-2">
//                         Din uppgift är att välja det rätta svaret på frågan ovan. Klicka på den ruta som du tror har rätt svar. Om du har rätt, kommer en ny fråga att visas automatiskt!
//                     </p>
//                 </div>

//                 {/* Help Options */}
//                 <div className="w-full bg-white p-6 rounded-lg shadow-md mb-6">
//                     <h2 className="text-xl font-bold text-center mb-4 text-gray-800">Behöver du hjälp?</h2>
//                     <div className="flex flex-col gap-4">
//                         <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md text-center" onClick={() => setShowVideo(true)}>
//                             🎥 Titta på en instruktionsvideo
//                         </button>
//                         <button className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-md text-center" onClick={() => setShowAssistant(true)}>
//                             🧠 Be om hjälp från assistenten
//                         </button>
//                     </div>
//                 </div>

//                 {/* Quiz Question */}
//                 <div className="bg-white p-6 rounded-lg shadow-md">
//                     <div className="bg-blue-300 text-gray-900 text-center text-2xl font-bold py-6 px-4 rounded-md shadow">
//                         <p>
//                             Vad är {question.num1} + {question.num2}?
//                         </p>
//                     </div>
//                     <div className="mt-8 grid grid-cols-2 gap-4">
//                         {question.options.map((option, index) => (
//                             <button
//                                 key={index}
//                                 className={`py-4 rounded-md text-white font-semibold shadow-lg hover:shadow-xl transition transform hover:scale-105 ${
//                                     option === question.correctAnswer ? 'bg-blue-500 hover:bg-blue-600' : colors[index % colors.length]
//                                 }`}
//                                 onClick={() => handleAnswer(option)}
//                             >
//                                 {option}
//                             </button>
//                         ))}
//                     </div>
//                     {feedback && <div className="mt-6 text-center text-lg font-bold bg-blue-100 text-blue-700 p-4 rounded-lg shadow-md">{feedback}</div>}
//                 </div>
//             </div>

//             {/* Video Component */}
//             {showVideo && (
//                 <div className="flex-shrink-0 w-full max-w-md transition-transform duration-700 ease-in-out translate-x-0">
//                     <div className="bg-white p-6 rounded-lg shadow-md">
//                         <h2 className="text-xl font-bold mb-4 text-gray-800">Instruktionsvideo</h2>
//                         <video src="https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4" controls className="w-full rounded-md"></video>
//                         <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md" onClick={() => setShowVideo(false)}>
//                             ↩ Tillbaka till uppgiften
//                         </button>
//                     </div>
//                 </div>
//             )}

//             {/* Personal Assistant Component */}
//             {showAssistant && (
//                 <div className="flex-shrink-0 w-full max-w-md transition-transform duration-700 ease-in-out translate-x-0">
//                     <PersonalAssistant onClose={() => setShowAssistant(false)} /> {/* Render the PersonalAssistant component */}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default AdditionComponent;

import { useState } from 'react';
import PersonalAssistant from './PersonalAssistant'; // Import PersonalAssistant component

const AdditionComponent = () => {
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
    const [showAssistant, setShowAssistant] = useState(false); // Add state for Assistant
    const [isSimpleMode, setIsSimpleMode] = useState(false); // Toggle state for background and buttons

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

    const playQuestionAudio = () => {
        const utterance = new SpeechSynthesisUtterance(`Vad är ${question.num1} plus ${question.num2}?`);
        utterance.lang = 'sv-SE';
        window.speechSynthesis.speak(utterance);
    };

    return (
        <div className={`min-h-screen ${isSimpleMode ? 'bg-white' : 'bg-gradient-to-b from-orange-100 to-orange-300'} flex items-center justify-center relative overflow-hidden`}>
            {/* Toggle Button */}
            <div className="absolute top-4 right-4">
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
                        Din uppgift är att välja det rätta svaret på frågan ovan. Klicka på den ruta som du tror har rätt svar. Om du har rätt, kommer en ny fråga att visas automatiskt!
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
                                className={`py-4 rounded-md font-semibold shadow-lg hover:shadow-xl transition transform hover:scale-105 ${
                                    isSimpleMode ? 'bg-white text-gray-700 border-2 border-gray-300 hover:bg-gray-200' : 'text-white'
                                } ${option === question.correctAnswer ? (isSimpleMode ? 'border-blue-500' : 'bg-blue-500 hover:bg-blue-600') : ''}`}
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
                    <PersonalAssistant onClose={() => setShowAssistant(false)} /> {/* Render the PersonalAssistant component */}
                </div>
            )}
        </div>
    );
};

export default AdditionComponent;
