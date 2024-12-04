import { useState } from 'react';

const ProblemSolvingComponent = () => {
    const [feedback, setFeedback] = useState('');

    const handleAnswer = (isCorrect: boolean) => {
        if (isCorrect) {
            setFeedback('Rätt svar! 🎉');
        } else {
            setFeedback('Fel svar, försök igen! ❌');
        }

        setTimeout(() => setFeedback(''), 1500); // Töm feedback efter 1,5 sekunder
    };

    const playQuestionAudio = (text: string) => {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'sv-SE'; // Ställ in språket till svenska
            window.speechSynthesis.speak(utterance);
        } else {
            alert('Text-to-Speech stöds inte i din webbläsare.');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-orange-100 to-orange-400 p-6 flex flex-col items-center">
            <p className="text-lg text-center mb-8 text-gray-600">Här kan du träna på att lösa problem med hjälp av bilder och ledtrådar. Klicka på rätt svar eller lyssna på frågan!</p>

            {/* Feedback */}
            {feedback && <div className="bg-blue-50 text-blue-700 py-2 px-4 rounded-md mb-4 text-center shadow-md">{feedback}</div>}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">
                {/* Box 1 */}
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold">Hur många äpplen finns kvar?</h2>
                        <button
                            onClick={() => playQuestionAudio('Ett träd hade 10 äpplen. En fågel åt upp 3. Hur många äpplen är kvar?')}
                            className="text-blue-500 hover:text-blue-700 text-xl"
                            aria-label="Lyssna på frågan"
                        >
                            🔊
                        </button>
                    </div>
                    <p className="mb-4">Ett träd hade 10 äpplen. En fågel åt upp 3. Hur många äpplen är kvar?</p>
                    <img src="/assets/images/Tree.webp" alt="Äppelträd" className="w-full h-40 object-cover rounded-lg mb-4" />
                    <div className="grid grid-cols-2 gap-4">
                        <button onClick={() => handleAnswer(true)} className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition">
                            7
                        </button>
                        <button onClick={() => handleAnswer(false)} className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition">
                            6
                        </button>
                        <button onClick={() => handleAnswer(false)} className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition">
                            8
                        </button>
                        <button onClick={() => handleAnswer(false)} className="bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 transition">
                            5
                        </button>
                    </div>
                </div>

                {/* Box 2 */}
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold">Hur många bilar står kvar?</h2>
                        <button
                            onClick={() => playQuestionAudio('På parkeringen stod 12 bilar. 4 körde iväg. Hur många bilar är kvar?')}
                            className="text-blue-500 hover:text-blue-700 text-xl"
                            aria-label="Lyssna på frågan"
                        >
                            🔊
                        </button>
                    </div>
                    <p className="mb-4">På parkeringen stod 12 bilar. 4 körde iväg. Hur många bilar är kvar?</p>
                    <img src="/assets/images/cars.webp" alt="Parkering med bilar" className="w-full h-40 object-cover rounded-lg mb-4" />
                    <div className="grid grid-cols-2 gap-4">
                        <button onClick={() => handleAnswer(true)} className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition">
                            8
                        </button>
                        <button onClick={() => handleAnswer(false)} className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition">
                            9
                        </button>
                        <button onClick={() => handleAnswer(false)} className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition">
                            10
                        </button>
                        <button onClick={() => handleAnswer(false)} className="bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 transition">
                            6
                        </button>
                    </div>
                </div>

                {/* Box 3 */}
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold">Hur många bollar finns kvar?</h2>
                        <button
                            onClick={() => playQuestionAudio('Det fanns 15 bollar i en korg. Någon tog 7 bollar. Hur många är kvar?')}
                            className="text-blue-500 hover:text-blue-700 text-xl"
                            aria-label="Lyssna på frågan"
                        >
                            🔊
                        </button>
                    </div>
                    <p className="mb-4">Det fanns 15 bollar i en korg. Någon tog 7 bollar. Hur många är kvar?</p>
                    <img src="/assets/images/korg.webp" alt="Korg med bollar" className="w-full h-40 object-cover rounded-lg mb-4" />
                    <div className="grid grid-cols-2 gap-4">
                        <button onClick={() => handleAnswer(false)} className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition">
                            9
                        </button>
                        <button onClick={() => handleAnswer(true)} className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition">
                            8
                        </button>
                        <button onClick={() => handleAnswer(false)} className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition">
                            10
                        </button>
                        <button onClick={() => handleAnswer(false)} className="bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 transition">
                            7
                        </button>
                    </div>
                </div>

                {/* Box 4 */}
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold">Hur många barn är kvar på lekplatsen?</h2>
                        <button
                            onClick={() => playQuestionAudio('Det fanns 10 barn på lekplatsen. 6 gick hem. Hur många är kvar?')}
                            className="text-blue-500 hover:text-blue-700 text-xl"
                            aria-label="Lyssna på frågan"
                        >
                            🔊
                        </button>
                    </div>
                    <p className="mb-4">Det fanns 10 barn på lekplatsen. 6 gick hem. Hur många är kvar?</p>
                    <img src="/assets/images/lekplats.webp" alt="Lekplats med barn" className="w-full h-40 object-cover rounded-lg mb-4" />
                    <div className="grid grid-cols-2 gap-4">
                        <button onClick={() => handleAnswer(false)} className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition">
                            5
                        </button>
                        <button onClick={() => handleAnswer(false)} className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition">
                            6
                        </button>
                        <button onClick={() => handleAnswer(false)} className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition">
                            3
                        </button>
                        <button onClick={() => handleAnswer(true)} className="bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 transition">
                            4
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProblemSolvingComponent;
