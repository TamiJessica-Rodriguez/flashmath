// import { useState } from 'react';

// const Addition = () => {
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
//     const [showVideo, setShowVideo] = useState(false); // Hantera om videon visas

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
//             {/* Innehåll */}
//             <div className={`transition-transform duration-700 ease-in-out ${showVideo ? '-translate-x-full' : 'translate-x-0'} flex-shrink-0 w-full max-w-md`}>
//                 {/* Instruktionstext */}
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

//                 {/* Instruktionsalternativ */}
//                 <div className="w-full bg-gray-800 p-6 rounded-lg shadow-md mb-6">
//                     <h2 className="text-xl font-bold text-center mb-4">Behöver du hjälp?</h2>
//                     <div className="flex flex-col gap-4">
//                         <button
//                             className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md text-center"
//                             onClick={() => setShowVideo(true)} // Visa videon
//                         >
//                             🎥 Titta på en instruktionsvideo
//                         </button>
//                         <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md text-center" onClick={() => alert('Podden spelas upp här!')}>
//                             🎧 Lyssna på en podd
//                         </button>
//                         <button className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-md text-center" onClick={() => alert('Woogle-sökning öppnas här!')}>
//                             🔎 Sök i Woogle
//                         </button>
//                     </div>
//                 </div>

//                 {/* Frågebox */}
//                 <div className="bg-gray-800 p-6 rounded-lg shadow-md">
//                     <div className="bg-blue-300 text-gray-900 text-center text-2xl font-bold py-6 px-4 rounded-md shadow">
//                         <p>
//                             Vad är {question.num1} + {question.num2}?
//                         </p>
//                     </div>

//                     {/* Svarsalternativ */}
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

//                     {/* Feedback */}
//                     {feedback && <div className="mt-6 text-center text-lg font-bold bg-gray-800 p-4 rounded-lg shadow">{feedback}</div>}
//                 </div>
//             </div>

//             {/* Instruktionsvideo */}
//             {showVideo && (
//                 <div className="flex-shrink-0 w-full max-w-md transition-transform duration-700 ease-in-out translate-x-0">
//                     <div className="bg-gray-800 p-6 rounded-lg shadow-md">
//                         <h2 className="text-xl font-bold mb-4">Instruktionsvideo</h2>
//                         <video src="https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4" controls className="w-full rounded-md"></video>
//                         <button
//                             className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
//                             onClick={() => setShowVideo(false)} // Dölj videon
//                         >
//                             ↩ Tillbaka till uppgiften
//                         </button>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Addition;

import { useState } from 'react';

const Addition = () => {
    // Generera två slumpmässiga tal för addition
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
    const [showVideo, setShowVideo] = useState(false); // Hantera om videon visas
    const [showPodcast, setShowPodcast] = useState(false); // Hantera om podden visas

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
            {/* Innehåll */}
            <div className={`transition-transform duration-700 ease-in-out ${showVideo || showPodcast ? '-translate-x-full' : 'translate-x-0'} flex-shrink-0 w-full max-w-md`}>
                {/* Instruktionstext */}
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

                {/* Instruktionsalternativ */}
                <div className="w-full bg-gray-800 p-6 rounded-lg shadow-md mb-6">
                    <h2 className="text-xl font-bold text-center mb-4">Behöver du hjälp?</h2>
                    <div className="flex flex-col gap-4">
                        <button
                            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md text-center"
                            onClick={() => setShowVideo(true)} // Visa videon
                        >
                            🎥 Titta på en instruktionsvideo
                        </button>
                        <button
                            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md text-center"
                            onClick={() => setShowPodcast(true)} // Visa podden
                        >
                            🎧 Lyssna på en podd
                        </button>
                        <button className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-md text-center" onClick={() => alert('Woogle-sökning öppnas här!')}>
                            🔎 Sök i Woogle
                        </button>
                    </div>
                </div>

                {/* Frågebox */}
                <div className="bg-gray-800 p-6 rounded-lg shadow-md">
                    <div className="relative bg-blue-300 text-gray-900 text-center text-2xl font-bold py-6 px-4 rounded-md shadow">
                        <p>
                            Vad är {question.num1} + {question.num2}?
                        </p>
                        {/* Mikrofonikon */}
                        <button onClick={playQuestionAudio} className="absolute top-2 right-2 text-gray-900 bg-white rounded-full p-2 shadow-md hover:bg-gray-200" aria-label="Lyssna på frågan">
                            🎙️
                        </button>
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

            {/* Instruktionsvideo */}
            {showVideo && (
                <div className="flex-shrink-0 w-full max-w-md transition-transform duration-700 ease-in-out translate-x-0">
                    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-bold mb-4">Instruktionsvideo</h2>
                        <video src="https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4" controls className="w-full rounded-md"></video>
                        <button
                            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
                            onClick={() => setShowVideo(false)} // Dölj videon
                        >
                            ↩ Tillbaka till uppgiften
                        </button>
                    </div>
                </div>
            )}

            {/* Podd */}
            {showPodcast && (
                <div className="flex-shrink-0 w-full max-w-md transition-transform duration-700 ease-in-out translate-x-0">
                    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-bold mb-4">Lyssna på en podd</h2>
                        <audio controls className="w-full" src="https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3">
                            Your browser does not support the audio element.
                        </audio>
                        <button
                            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
                            onClick={() => setShowPodcast(false)} // Dölj podden
                        >
                            ↩ Tillbaka till uppgiften
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Addition;
