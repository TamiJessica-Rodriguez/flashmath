// import { useState } from 'react';

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
//     const [showAudioPlayer, setShowAudioPlayer] = useState(false);

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
//         <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center relative overflow-hidden">
//             <div className={`transition-transform duration-700 ease-in-out ${showVideo || showAudioPlayer ? '-translate-x-full' : 'translate-x-0'} flex-shrink-0 w-full max-w-md`}>
//                 <div className="w-full bg-gray-800 p-6 rounded-lg shadow-md mb-6">
//                     <div className="flex justify-between items-center">
//                         <h2 className="text-xl font-bold">Hur man spelar</h2>
//                         <button onClick={playQuestionAudio} className="text-2xl" aria-label="Lyssna på frågan">
//                             🔊
//                         </button>
//                     </div>
//                     <p className="text-center text-gray-300 mt-2">
//                         Din uppgift är att välja det rätta svaret på frågan ovan. Klicka på den ruta som du tror har rätt svar. Om du har rätt, kommer en ny fråga att visas automatiskt!
//                     </p>
//                 </div>
//                 <div className="w-full bg-gray-800 p-6 rounded-lg shadow-md mb-6">
//                     <h2 className="text-xl font-bold text-center mb-4">Behöver du hjälp?</h2>
//                     <div className="flex flex-col gap-4">
//                         <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md text-center" onClick={() => setShowVideo(true)}>
//                             🎥 Titta på en instruktionsvideo
//                         </button>
//                         <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md text-center" onClick={() => setShowAudioPlayer(true)}>
//                             🎧 Lyssna på en podd
//                         </button>
//                         <button className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-md text-center" onClick={() => alert('Woogle-sökning öppnas här!')}>
//                             🔎 Sök i Woogle
//                         </button>
//                     </div>
//                 </div>
//                 <div className="bg-gray-800 p-6 rounded-lg shadow-md">
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
//                                     option === question.correctAnswer ? 'bg-blue-300 text-gray-900' : colors[index % colors.length]
//                                 }`}
//                                 onClick={() => handleAnswer(option)}
//                             >
//                                 {option}
//                             </button>
//                         ))}
//                     </div>
//                     {feedback && <div className="mt-6 text-center text-lg font-bold bg-gray-800 p-4 rounded-lg shadow">{feedback}</div>}
//                 </div>
//             </div>
//             {showVideo && (
//                 <div className="flex-shrink-0 w-full max-w-md transition-transform duration-700 ease-in-out translate-x-0">
//                     <div className="bg-gray-800 p-6 rounded-lg shadow-md">
//                         <h2 className="text-xl font-bold mb-4">Instruktionsvideo</h2>
//                         <video src="https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4" controls className="w-full rounded-md"></video>
//                         <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md" onClick={() => setShowVideo(false)}>
//                             ↩ Tillbaka till uppgiften
//                         </button>
//                     </div>
//                 </div>
//             )}
//             {showAudioPlayer && (
//                 <div className="flex-shrink-0 w-full max-w-md transition-transform duration-700 ease-in-out translate-x-0">
//                     <div className="bg-gray-800 p-6 rounded-lg shadow-md">
//                         <h2 className="text-xl font-bold mb-4">Lyssna på podd</h2>
//                         <audio controls className="w-full">
//                             <source src="https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3" type="audio/mp3" />
//                             Din webbläsare stöder inte ljuduppspelning.
//                         </audio>
//                         <button className="mt-4 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md" onClick={() => setShowAudioPlayer(false)}>
//                             ↩ Tillbaka till uppgiften
//                         </button>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default AdditionComponent;

import { useState } from 'react';
import WoogleComponent from './WoogleComponent'; // Import your Woogle component

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
    const [showAudioPlayer, setShowAudioPlayer] = useState(false);
    const [showWoogle, setShowWoogle] = useState(false); // Add state for Woogle

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
            {/* Main Content */}
            <div className={`transition-transform duration-700 ease-in-out ${showVideo || showAudioPlayer || showWoogle ? '-translate-x-full' : 'translate-x-0'} flex-shrink-0 w-full max-w-md`}>
                {/* Instructions */}
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

                {/* Help Options */}
                <div className="w-full bg-gray-800 p-6 rounded-lg shadow-md mb-6">
                    <h2 className="text-xl font-bold text-center mb-4">Behöver du hjälp?</h2>
                    <div className="flex flex-col gap-4">
                        <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md text-center" onClick={() => setShowVideo(true)}>
                            🎥 Titta på en instruktionsvideo
                        </button>
                        <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md text-center" onClick={() => setShowAudioPlayer(true)}>
                            🎧 Lyssna på en podd
                        </button>
                        <button className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-md text-center" onClick={() => setShowWoogle(true)}>
                            🔎 Sök i Woogle
                        </button>
                    </div>
                </div>

                {/* Quiz Question */}
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

            {/* Video Component */}
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

            {/* Podcast Component */}
            {showAudioPlayer && (
                <div className="flex-shrink-0 w-full max-w-md transition-transform duration-700 ease-in-out translate-x-0">
                    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-bold mb-4">Lyssna på podd</h2>
                        <audio controls className="w-full">
                            <source src="https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3" type="audio/mp3" />
                            Din webbläsare stöder inte ljuduppspelning.
                        </audio>
                        <button className="mt-4 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md" onClick={() => setShowAudioPlayer(false)}>
                            ↩ Tillbaka till uppgiften
                        </button>
                    </div>
                </div>
            )}

            {/* Woogle Component */}
            {showWoogle && (
                <div className="flex-shrink-0 w-full max-w-4xl transition-transform duration-700 ease-in-out translate-x-0">
                    <WoogleComponent onClose={() => setShowWoogle(false)} />
                </div>
            )}
        </div>
    );
};

export default AdditionComponent;
