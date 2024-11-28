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
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center px-4">
            <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-md">
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
                                    className="w-12 h-12 text-center text-black text-lg font-bold bg-gray-100 rounded border-2 border-gray-300 focus:outline-none focus:border-blue-500"
                                    placeholder="0"
                                />
                            ))}
                        </div>

                        {/* Första talet */}
                        <div className="flex justify-center gap-2">
                            {digitsToArray(problem.num1).map((digit, index) => (
                                <div key={`num1-${index}`} className="w-12 h-12 flex items-center justify-center text-2xl font-bold bg-gray-700 rounded">
                                    {digit}
                                </div>
                            ))}
                        </div>

                        {/* Andra talet */}
                        <div className="flex justify-center gap-2 mt-2">
                            {digitsToArray(problem.num2).map((digit, index) => (
                                <div key={`num2-${index}`} className="w-12 h-12 flex items-center justify-center text-2xl font-bold bg-gray-700 rounded">
                                    {digit}
                                </div>
                            ))}
                        </div>

                        {/* Linje */}
                        <div className="border-t-2 border-white w-full max-w-xs my-4 mx-auto"></div>

                        {/* Svarsrutor */}
                        <div className="flex justify-center gap-2">
                            {userAnswers.map((value, index) => (
                                <input
                                    key={`input-${index}`}
                                    type="text"
                                    value={value}
                                    onChange={(e) => handleInputChange(index, e.target.value)}
                                    className="w-12 h-12 text-center text-black text-lg font-bold bg-gray-100 rounded border-2 border-gray-300 focus:outline-none focus:border-blue-500"
                                    placeholder="?"
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Feedback */}
                {feedback && <div className="text-center text-lg font-bold my-4">{feedback}</div>}

                {/* Kontrollknapp */}
                <div className="flex justify-center">
                    <button onClick={checkAnswer} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
                        Kontrollera
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ColumnMath;
