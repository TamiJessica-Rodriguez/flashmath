import { useState } from 'react';

const ProblemSolvingComponent = () => {
    const [feedback, setFeedback] = useState('');
    const [frogs, setFrogs] = useState(Array(10).fill(false)); // Tracks which frogs are clicked
    const [cars, setCars] = useState(Array(8).fill(false)); // Tracks which cars are clicked
    const [crabs, setCrabs] = useState(Array(6).fill(false)); // Tracks which crabs are clicked

    const handleAnswer = (isCorrect: boolean) => {
        if (isCorrect) {
            setFeedback('Rätt svar! 🎉');
        } else {
            setFeedback('Fel svar, försök igen! ❌');
        }

        setTimeout(() => setFeedback(''), 1500); // Clear feedback after 1.5 seconds
    };

    const toggleFrogOpacity = (index: number) => {
        setFrogs((prev) => prev.map((clicked, i) => (i === index ? !clicked : clicked)));
    };

    const toggleCarOpacity = (index: number) => {
        setCars((prev) => prev.map((clicked, i) => (i === index ? !clicked : clicked)));
    };

    const toggleCrabOpacity = (index: number) => {
        setCrabs((prev) => prev.map((clicked, i) => (i === index ? !clicked : clicked)));
    };

    const playQuestionAudio = (text: string) => {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'sv-SE'; // Set language to Swedish
            window.speechSynthesis.speak(utterance);
        } else {
            alert('Text-to-Speech stöds inte i din webbläsare.');
        }
    };

    return (
        <div className="min-h-screen p-6 flex flex-col items-center" aria-label="Problem Solving Page">
            {/* Introduction */}
            <div className="bg-white w-full mx-auto p-6 rounded-lg shadow-md mb-10 mt-5" role="region" aria-labelledby="introduction-title">
                <div className="flex justify-between items-center mb-4">
                    <p id="introduction-title" className="text-2xl text-center text-black font-extrabold">
                        Här kan du träna på att lösa problem med hjälp av bilder och ledtrådar. Klicka på rätt svar eller lyssna på frågan!
                    </p>
                    <button
                        onClick={() => playQuestionAudio('Här kan du träna på att lösa problem med hjälp av bilder och ledtrådar. Klicka på rätt svar eller lyssna på frågan!')}
                        className="text-blue-500 hover:text-blue-700 text-xl"
                        aria-label="Lyssna på introduktionen"
                    >
                        🔊
                    </button>
                </div>
            </div>

            {/* Feedback */}
            {feedback && (
                <div className="bg-blue-50 text-blue-700 py-2 px-4 rounded-md mb-8 text-center shadow-md" role="alert">
                    {feedback}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-20 max-w-4xl w-full">
                {/* Problem 1 */}
                <div className="bg-white p-6 rounded-lg shadow-lg" role="region" aria-labelledby="problem1-title">
                    <div className="flex justify-between items-center mb-4">
                        <h2 id="problem1-title" className="text-xl font-extrabold">
                            Hur många äpplen finns kvar?
                        </h2>
                        <button
                            onClick={() => playQuestionAudio('Ett träd hade 10 äpplen. En fågel åt upp 3. Hur många äpplen är kvar?')}
                            className="text-blue-500 hover:text-blue-700 text-xl"
                            aria-label="Lyssna på frågan"
                        >
                            🔊
                        </button>
                    </div>
                    <p className="mb-4 font-extrabold">Ett träd hade 10 äpplen. En fågel åt upp 3. Hur många äpplen är kvar?</p>
                    <img src="/assets/images/Tree.webp" alt="Äppelträd" className="w-full h-40 object-cover rounded-lg mb-4" />
                    <div className="grid grid-cols-2 gap-4">
                        <button onClick={() => handleAnswer(true)} className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition" aria-label="Svarsalternativ 7">
                            7
                        </button>
                        <button onClick={() => handleAnswer(false)} className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition" aria-label="Svarsalternativ 6">
                            6
                        </button>
                        <button onClick={() => handleAnswer(false)} className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition" aria-label="Svarsalternativ 8">
                            8
                        </button>
                        <button onClick={() => handleAnswer(false)} className="bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 transition" aria-label="Svarsalternativ 5">
                            5
                        </button>
                    </div>
                </div>

                {/* Problem 2 */}
                <div className="bg-white p-6 rounded-lg shadow-lg" role="region" aria-labelledby="problem2-title">
                    <div className="flex justify-between items-center mb-4">
                        <h2 id="problem2-title" className="text-xl font-extrabold">
                            Hur många grodor är kvar vid dammen?
                        </h2>
                        <button
                            onClick={() => playQuestionAudio('Det fanns 10 grodor vid en damm. Tre hoppade iväg. Hur många är kvar vid dammen?')}
                            className="text-blue-500 hover:text-blue-700 text-xl"
                            aria-label="Lyssna på frågan"
                        >
                            🔊
                        </button>
                    </div>
                    <p className="mb-4 font-extrabold">Det fanns 10 grodor vid en damm. Tre hoppade iväg. Hur många är kvar vid dammen?</p>
                    <div className="grid grid-cols-5 gap-4">
                        {frogs.map((clicked, index) => (
                            <img
                                key={index}
                                src="/assets/images/frogcolor.png"
                                alt={`Groda ${index + 1}`}
                                className={`w-16 h-16 rounded-lg cursor-pointer transition-opacity ${clicked ? 'opacity-25' : 'opacity-100'}`}
                                onClick={() => toggleFrogOpacity(index)}
                                aria-label={`Groda ${index + 1}`}
                            />
                        ))}
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                        <button onClick={() => handleAnswer(true)} className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition" aria-label="Svarsalternativ 7">
                            7
                        </button>
                        <button onClick={() => handleAnswer(false)} className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition" aria-label="Svarsalternativ 6">
                            6
                        </button>
                    </div>
                </div>

                {/* Problem 3 */}
                <div className="bg-white p-6 rounded-lg shadow-lg" role="region" aria-labelledby="problem3-title">
                    <div className="flex justify-between items-center mb-4">
                        <h2 id="problem3-title" className="text-xl font-extrabold">
                            Hur många bilar står kvar?
                        </h2>
                        <button
                            onClick={() => playQuestionAudio('Det stod 8 bilar på en parkering. Två körde iväg. Hur många är kvar?')}
                            className="text-blue-500 hover:text-blue-700 text-xl"
                            aria-label="Lyssna på frågan"
                        >
                            🔊
                        </button>
                    </div>
                    <p className="mb-4 font-extrabold">Det stod 8 bilar på en parkering. Två körde iväg. Hur många är kvar?</p>
                    <div className="grid grid-cols-4 gap-4">
                        {cars.map((clicked, index) => (
                            <img
                                key={index}
                                src="/assets/images/redcar.png"
                                alt={`Bil ${index + 1}`}
                                className={`w-16 h-16 rounded-lg cursor-pointer transition-opacity ${clicked ? 'opacity-25' : 'opacity-100'}`}
                                onClick={() => toggleCarOpacity(index)}
                                aria-label={`Bil ${index + 1}`}
                            />
                        ))}
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                        <button onClick={() => handleAnswer(true)} className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition" aria-label="Svarsalternativ 6">
                            6
                        </button>
                        <button onClick={() => handleAnswer(false)} className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition" aria-label="Svarsalternativ 5">
                            5
                        </button>
                        <button onClick={() => handleAnswer(false)} className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition" aria-label="Svarsalternativ 7">
                            7
                        </button>
                        <button onClick={() => handleAnswer(false)} className="bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 transition" aria-label="Svarsalternativ 4">
                            4
                        </button>
                    </div>
                </div>

                {/* Problem 4 */}
                <div className="bg-white p-6 rounded-lg shadow-lg" role="region" aria-labelledby="problem4-title">
                    <div className="flex justify-between items-center mb-4">
                        <h2 id="problem4-title" className="text-xl font-extrabold">
                            Hur många krabbor är kvar på stranden?
                        </h2>
                        <button
                            onClick={() => playQuestionAudio('Det fanns 6 krabbor på stranden. Två gömde sig. Hur många är kvar?')}
                            className="text-blue-500 hover:text-blue-700 text-xl"
                            aria-label="Lyssna på frågan"
                        >
                            🔊
                        </button>
                    </div>
                    <p className="mb-4 font-extrabold">Det fanns 6 krabbor på stranden. Två gömde sig. Hur många är kvar?</p>
                    <div className="grid grid-cols-3 gap-4">
                        {crabs.map((clicked, index) => (
                            <img
                                key={index}
                                src="/assets/images/crabpirate.png"
                                alt={`Krabba ${index + 1}`}
                                className={`w-16 h-16 rounded-lg cursor-pointer transition-opacity ${clicked ? 'opacity-25' : 'opacity-100'}`}
                                onClick={() => toggleCrabOpacity(index)}
                                aria-label={`Krabba ${index + 1}`}
                            />
                        ))}
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                        <button onClick={() => handleAnswer(true)} className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition" aria-label="Svarsalternativ 4">
                            4
                        </button>
                        <button onClick={() => handleAnswer(false)} className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition" aria-label="Svarsalternativ 5">
                            5
                        </button>
                        <button onClick={() => handleAnswer(false)} className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition" aria-label="Svarsalternativ 3">
                            3
                        </button>
                        <button onClick={() => handleAnswer(false)} className="bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 transition" aria-label="Svarsalternativ 6">
                            6
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProblemSolvingComponent;
