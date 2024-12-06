import { useEffect, useState } from 'react';

const ColumnMath = () => {
    const totalQuestions = 20;

    const generateProblem = () => {
        const num1 = Math.floor(Math.random() * 900 + 100); // Tresiffrigt tal
        const num2 = Math.floor(Math.random() * 900 + 100); // Ett annat tresiffrigt tal
        const answer = num1 + num2; // Summan
        return { num1, num2, answer };
    };

    const [problems, setProblems] = useState(Array.from({ length: totalQuestions }, generateProblem));
    const [userAnswers, setUserAnswers] = useState<string[][]>(Array.from({ length: totalQuestions }, () => Array(3).fill('')));
    const [carryOvers, setCarryOvers] = useState<string[][]>(Array.from({ length: totalQuestions }, () => Array(3).fill('')));
    const [showVideo, setShowVideo] = useState(false); // Instruktionsvideo
    const [showAssistant, setShowAssistant] = useState(false); // Personlig assistent
    const [isSimpleMode, setIsSimpleMode] = useState(false); // Enkel bakgrund
    const [currentQuestion, setCurrentQuestion] = useState<number>(() => {
        const savedProgress = localStorage.getItem('columnMathProgress');
        return savedProgress ? parseInt(savedProgress, 10) : 1;
    });
    const [showAllQuestions, setShowAllQuestions] = useState(false);
    const [questionStatus, setQuestionStatus] = useState<string[]>(Array(totalQuestions).fill('default')); // Status för varje fråga
    const [showResults, setShowResults] = useState(false); // Visa resultat
    const [correctAnswers, setCorrectAnswers] = useState(0); // Antal rätt svar

    useEffect(() => {
        localStorage.setItem('columnMathProgress', currentQuestion.toString());
    }, [currentQuestion]);

    const handleInputChange = (qIndex: number, index: number, value: string, isCarryOver = false) => {
        if (!isNaN(Number(value)) && value.length <= 2) {
            if (isCarryOver) {
                const updatedCarryOvers = [...carryOvers];
                updatedCarryOvers[qIndex][index] = value;
                setCarryOvers(updatedCarryOvers);
            } else {
                const updatedAnswers = [...userAnswers];
                updatedAnswers[qIndex][index] = value;
                setUserAnswers(updatedAnswers);
            }
        }
    };

    const checkAnswers = () => {
        let correctCount = 0;
        const updatedStatus = problems.map((problem, qIndex) => {
            const correctAnswer = problem.answer.toString().padStart(3, '0');
            if (userAnswers[qIndex].join('') === correctAnswer) {
                correctCount++;
                return 'correct';
            }
            return 'incorrect';
        });
        setCorrectAnswers(correctCount);
        setQuestionStatus(updatedStatus);
        setShowResults(true);
    };

    const restart = () => {
        setProblems(Array.from({ length: totalQuestions }, generateProblem));
        setUserAnswers(Array.from({ length: totalQuestions }, () => Array(3).fill('')));
        setCarryOvers(Array.from({ length: totalQuestions }, () => Array(3).fill('')));
        setQuestionStatus(Array(totalQuestions).fill('default'));
        setShowResults(false);
        setCurrentQuestion(1);
    };

    const digitsToArray = (number: number) => number.toString().padStart(3, '0').split('');

    const progressPercentage = Math.min((currentQuestion / totalQuestions) * 100, 100);

    return (
        <div className={`min-h-screen ${isSimpleMode ? 'bg-white' : 'bg-gradient-to-b from-orange-100 to-orange-400'} text-gray-800 flex flex-col items-center justify-center px-4`}>
            {/* Toggle Background Button */}
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

            {/* Progress Bar */}
            <div className="absolute top-0 left-0 w-full h-6 bg-gray-300">
                <div className="h-full bg-blue-500 transition-all" style={{ width: `${progressPercentage}%` }}></div>
            </div>

            {!showResults ? (
                <>
                    {/* Instructions */}
                    <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md mb-10">
                        <h2 className="text-xl font-bold text-center mb-4">Hur man spelar</h2>
                        <p className="text-center text-gray-600">Uppställ de två talen och fyll i rätt svar för varje kolumn. När du är klar klickar du på "Rätta".</p>
                        <p className="text-center text-gray-600 mt-2">Det finns totalt {totalQuestions} frågor att lösa.</p>
                        <button onClick={() => setShowAllQuestions((prev) => !prev)} className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md text-center">
                            {showAllQuestions ? 'Visa en fråga i taget' : 'Se alla frågor'}
                        </button>
                    </div>

                    {/* Main Content */}
                    {showAllQuestions ? (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl">
                                {problems.map((problem, qIndex) => (
                                    <div
                                        key={`problem-${qIndex}`}
                                        className={`bg-white p-6 rounded-lg shadow-md ${
                                            questionStatus[qIndex] === 'correct' ? 'border-4 border-green-500' : questionStatus[qIndex] === 'incorrect' ? 'border-4 border-red-500' : ''
                                        }`}
                                    >
                                        <h3 className="text-lg font-bold mb-2">Fråga {qIndex + 1}</h3>
                                        <div className="relative">
                                            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-xl font-bold text-gray-600">+</div>
                                            <div className="ml-10">
                                                <div className="flex justify-center gap-2 mb-2">
                                                    {carryOvers[qIndex].map((value, index) => (
                                                        <input
                                                            key={`carry-${qIndex}-${index}`}
                                                            type="text"
                                                            value={value}
                                                            onChange={(e) => handleInputChange(qIndex, index, e.target.value, true)}
                                                            className="w-14 h-14 text-center text-black text-lg font-bold bg-gray-50 rounded border-2 border-gray-300 focus:outline-none focus:border-blue-500"
                                                            placeholder="0"
                                                        />
                                                    ))}
                                                </div>
                                                <div className="flex justify-center gap-2">
                                                    {digitsToArray(problem.num1).map((digit, index) => (
                                                        <div key={`num1-${qIndex}-${index}`} className="w-14 h-14 flex items-center justify-center text-lg font-bold bg-blue-100 rounded">
                                                            {digit}
                                                        </div>
                                                    ))}
                                                </div>
                                                <div className="flex justify-center gap-2 mt-2">
                                                    {digitsToArray(problem.num2).map((digit, index) => (
                                                        <div key={`num2-${qIndex}-${index}`} className="w-14 h-14 flex items-center justify-center text-lg font-bold bg-blue-100 rounded">
                                                            {digit}
                                                        </div>
                                                    ))}
                                                </div>
                                                <div className="border-t-2 border-gray-400 w-full max-w-xs my-4 mx-auto"></div>
                                                <div className="flex justify-center gap-2">
                                                    {userAnswers[qIndex].map((value, index) => (
                                                        <input
                                                            key={`input-all-${qIndex}-${index}`}
                                                            type="text"
                                                            value={value}
                                                            onChange={(e) => handleInputChange(qIndex, index, e.target.value)}
                                                            className="w-14 h-14 text-center text-black text-lg font-bold bg-gray-50 rounded border-2 border-gray-300 focus:outline-none focus:border-blue-500"
                                                            placeholder="?"
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-center mt-10">
                                <button onClick={checkAnswers} className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 transition">
                                    Rätta alla
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
                            <h2 className="text-xl font-bold text-center mb-6">Fråga {currentQuestion}</h2>
                            <div className="relative">
                                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-xl font-bold text-gray-600">+</div>
                                <div className="ml-10">
                                    <div className="flex justify-center gap-2 mb-2">
                                        {carryOvers[currentQuestion - 1].map((value, index) => (
                                            <input
                                                key={`carry-${index}`}
                                                type="text"
                                                value={value}
                                                onChange={(e) => handleInputChange(currentQuestion - 1, index, e.target.value, true)}
                                                className="w-14 h-14 text-center text-black text-lg font-bold bg-gray-50 rounded border-2 border-gray-300 focus:outline-none focus:border-blue-500"
                                                placeholder="0"
                                            />
                                        ))}
                                    </div>
                                    <div className="flex justify-center gap-2">
                                        {digitsToArray(problems[currentQuestion - 1].num1).map((digit, index) => (
                                            <div key={`num1-${index}`} className="w-14 h-14 flex items-center justify-center text-lg font-bold bg-blue-100 rounded">
                                                {digit}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex justify-center gap-2 mt-2">
                                        {digitsToArray(problems[currentQuestion - 1].num2).map((digit, index) => (
                                            <div key={`num2-${index}`} className="w-14 h-14 flex items-center justify-center text-lg font-bold bg-blue-100 rounded">
                                                {digit}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="border-t-2 border-gray-400 w-full max-w-xs my-4 mx-auto"></div>
                                    <div className="flex justify-center gap-2">
                                        {userAnswers[currentQuestion - 1].map((value, index) => (
                                            <input
                                                key={`input-${index}`}
                                                type="text"
                                                value={value}
                                                onChange={(e) => handleInputChange(currentQuestion - 1, index, e.target.value)}
                                                className="w-14 h-14 text-center text-black text-lg font-bold bg-gray-50 rounded border-2 border-gray-300 focus:outline-none focus:border-blue-500"
                                                placeholder="?"
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between mt-5">
                                <button
                                    disabled={currentQuestion === 1}
                                    onClick={() => setCurrentQuestion(currentQuestion - 1)}
                                    className={`bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition ${currentQuestion === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    ← Föregående
                                </button>
                                {currentQuestion === totalQuestions ? (
                                    <button onClick={checkAnswers} className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition">
                                        Rätta
                                    </button>
                                ) : (
                                    <button onClick={() => setCurrentQuestion(currentQuestion + 1)} className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition">
                                        Nästa →
                                    </button>
                                )}
                            </div>
                        </div>
                    )}
                </>
            ) : (
                <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold text-center mb-6">Resultat</h2>
                    <p className="text-lg text-center mb-4">
                        Du fick <span className="text-green-500 font-bold">{correctAnswers}</span> av {totalQuestions} frågor rätt.
                    </p>
                    <button onClick={restart} className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition mx-auto block">
                        Börja om
                    </button>
                </div>
            )}

            {/* Video Section */}
            {showVideo && (
                <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md mt-6">
                    <h2 className="text-xl font-bold mb-4">Instruktionsvideo</h2>
                    <video src="https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4" controls className="w-full rounded-md"></video>
                    <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md" onClick={() => setShowVideo(false)}>
                        ↩ Tillbaka till uppgiften
                    </button>
                </div>
            )}

            {/* Personal Assistant Section */}
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

