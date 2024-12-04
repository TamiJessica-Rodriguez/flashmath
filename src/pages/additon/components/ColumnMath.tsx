import { useState } from 'react';

const ColumnMath = () => {
    const generateProblem = () => {
        const num1 = Math.floor(Math.random() * 900 + 100); // Tresiffrigt tal
        const num2 = Math.floor(Math.random() * 900 + 100); // Ett annat tresiffrigt tal
        const answer = num1 + num2; // Summan
        return { num1, num2, answer };
    };

    const [problem, setProblem] = useState(generateProblem());
    const [userAnswers, setUserAnswers] = useState<string[]>(Array(3).fill(''));
    const [carryOvers, setCarryOvers] = useState<string[]>(Array(3).fill('')); // Tiotal
    const [feedback, setFeedback] = useState('');
    const [showVideo, setShowVideo] = useState(false); // Instruktionsvideo
    const [showAssistant, setShowAssistant] = useState(false); // Personlig assistent

    const handleInputChange = (index: number, value: string, isCarryOver = false) => {
        if (!isNaN(Number(value)) && value.length <= 2) {
            const updatedArray = isCarryOver ? [...carryOvers] : [...userAnswers];
            updatedArray[index] = value;
            isCarryOver ? setCarryOvers(updatedArray) : setUserAnswers(updatedArray);
        }
    };

    const checkAnswer = () => {
        const correctAnswer = problem.answer.toString().padStart(3, '0');
        if (userAnswers.join('') === correctAnswer) {
            setFeedback('Rätt! 🎉');
            setTimeout(() => {
                setFeedback('');
                setProblem(generateProblem());
                setUserAnswers(Array(3).fill(''));
                setCarryOvers(Array(3).fill(''));
            }, 1500);
        } else {
            setFeedback('Fel svar. Försök igen! ❌');
        }
    };

    const digitsToArray = (number: number) => number.toString().padStart(3, '0').split(''); // Dela upp talet i siffror

    return (
        <div className="min-h-screen bg-gradient-to-b from-orange-100 to-orange-400 text-gray-800 flex flex-col items-center justify-center px-4">
            {/* Instructions Section */}
            <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-xl font-bold text-center mb-4">Hur man spelar</h2>
                <p className="text-center text-gray-600">
                    Din uppgift är att fylla i rätt svar för varje kolumn. Om du behöver hjälp kan du titta på en instruktionsvideo eller använda den personliga assistenten.
                </p>
            </div>

            {/* Help Options */}
            <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-xl font-bold text-center mb-4">Behöver du hjälp?</h2>
                <div className="flex flex-col gap-4">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md text-center" onClick={() => setShowVideo(true)}>
                        🎥 Titta på en instruktionsvideo
                    </button>
                    <button className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-md text-center" onClick={() => setShowAssistant(true)}>
                        🧠 Be om hjälp från assistenten
                    </button>
                </div>
            </div>

            {/* Main Math Problem Section */}
            <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold text-center mb-6">Uppställningsmatematik</h2>
                <div className="flex flex-col items-center gap-2">
                    {/* Huvudinnehåll */}
                    <div className="relative">
                        {/* Plustecknet */}
                        <div className="absolute left-[-24px] top-[66px] text-2xl font-bold text-gray-400">+</div>

                        {/* Tiotal */}
                        <div className="flex justify-center gap-2 mb-2">
                            {carryOvers.map((value, index) => (
                                <input
                                    key={`carry-${index}`}
                                    type="text"
                                    value={value}
                                    onChange={(e) => handleInputChange(index, e.target.value, true)}
                                    className="w-12 h-12 text-center text-black text-lg font-bold bg-gray-50 rounded border-2 border-gray-300 focus:outline-none focus:border-blue-500"
                                    placeholder="0"
                                />
                            ))}
                        </div>

                        {/* Första talet */}
                        <div className="flex justify-center gap-2">
                            {digitsToArray(problem.num1).map((digit, index) => (
                                <div key={`num1-${index}`} className="w-12 h-12 flex items-center justify-center text-2xl font-bold bg-blue-100 rounded">
                                    {digit}
                                </div>
                            ))}
                        </div>

                        {/* Andra talet */}
                        <div className="flex justify-center gap-2 mt-2">
                            {digitsToArray(problem.num2).map((digit, index) => (
                                <div key={`num2-${index}`} className="w-12 h-12 flex items-center justify-center text-2xl font-bold bg-blue-100 rounded">
                                    {digit}
                                </div>
                            ))}
                        </div>

                        {/* Linje */}
                        <div className="border-t-2 border-gray-400 w-full max-w-xs my-4 mx-auto"></div>

                        {/* Svarsrutor */}
                        <div className="flex justify-center gap-2">
                            {userAnswers.map((value, index) => (
                                <input
                                    key={`input-${index}`}
                                    type="text"
                                    value={value}
                                    onChange={(e) => handleInputChange(index, e.target.value)}
                                    className="w-12 h-12 text-center text-black text-lg font-bold bg-gray-50 rounded border-2 border-gray-300 focus:outline-none focus:border-blue-500"
                                    placeholder="?"
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Feedback */}
                {feedback && <div className="text-center text-lg font-bold my-4 bg-blue-100 text-blue-700 py-2 px-4 rounded-md">{feedback}</div>}

                {/* Kontrollknapp */}
                <div className="flex justify-center mt-5">
                    <button onClick={checkAnswer} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
                        Kontrollera
                    </button>
                </div>
            </div>

            {/* Video Component */}
            {showVideo && (
                <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md mt-6">
                    <h2 className="text-xl font-bold mb-4">Instruktionsvideo</h2>
                    <video src="https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4" controls className="w-full rounded-md"></video>
                    <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md" onClick={() => setShowVideo(false)}>
                        ↩ Tillbaka till uppgiften
                    </button>
                </div>
            )}

            {/* Personal Assistant Component */}
            {showAssistant && (
                <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md mt-6">
                    <h2 className="text-xl font-bold mb-4">Personlig Assistent</h2>
                    <p className="text-gray-600 mb-4">Få hjälp med att förstå hur uppställningsmatematik fungerar!</p>
                    <button className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-md" onClick={() => setShowAssistant(false)}>
                        ↩ Tillbaka till uppgiften
                    </button>
                </div>
            )}
        </div>
    );
};

export default ColumnMath;
