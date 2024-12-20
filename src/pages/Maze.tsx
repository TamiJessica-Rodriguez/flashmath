import React, { useEffect, useState } from 'react';
import beepirate from '/assets/images/beepirate.png';

const mazeLayout = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

const Maze: React.FC = () => {
    const [showInstructions, setShowInstructions] = useState(true);
    const [characterPosition, setCharacterPosition] = useState({ row: 1, col: 1 });
    const [correctAnswerPosition, setCorrectAnswerPosition] = useState({ row: 0, col: 0 });
    const [distractorPositions, setDistractorPositions] = useState<{ row: number; col: number; value: string }[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);

    const [questions, setQuestions] = useState<string[]>([]);
    const [answers, setAnswers] = useState<string[]>([]);

    useEffect(() => {
        const generatedQuestions: string[] = [];
        const generatedAnswers: string[] = [];
        for (let i = 0; i < 5; i++) {
            const num1 = Math.floor(Math.random() * 30) + 1;
            const num2 = Math.floor(Math.random() * 30) + 1;
            generatedQuestions.push(`${num1} + ${num2}`);
            generatedAnswers.push((num1 + num2).toString());
        }
        setQuestions(generatedQuestions);
        setAnswers(generatedAnswers);
        placeAnswers(0);
    }, []);

    const placeAnswers = (questionIndex: number) => {
        const distractorValues = Array(5)
            .fill(0)
            .map(() => Math.floor(Math.random() * 50).toString());
        const distractorPos = placeRandomPosition(5).map((pos, index) => ({
            ...pos,
            value: distractorValues[index],
        }));
        let correctAnswerPos: { row: number; col: number };
        do {
            correctAnswerPos = placeRandomPosition(1)[0];
        } while (distractorPos.some((pos) => pos.row === correctAnswerPos.row && pos.col === correctAnswerPos.col));

        setCorrectAnswerPosition(correctAnswerPos);
        setDistractorPositions(distractorPos);
    };

    const placeRandomPosition = (count: number) => {
        const positions: { row: number; col: number }[] = [];
        while (positions.length < count) {
            const row = Math.floor(Math.random() * mazeLayout.length);
            const col = Math.floor(Math.random() * mazeLayout[0].length);
            if (mazeLayout[row][col] === 0 && !positions.some((pos) => pos.row === row && pos.col === col)) {
                positions.push({ row, col });
            }
        }
        return positions;
    };

    const handleKeyDown = (e: KeyboardEvent) => {
        e.preventDefault();
        setCharacterPosition((prev) => {
            let newRow = prev.row;
            let newCol = prev.col;

            if (e.key === 'ArrowUp' && mazeLayout[newRow - 1]?.[newCol] !== 1) newRow--;
            if (e.key === 'ArrowDown' && mazeLayout[newRow + 1]?.[newCol] !== 1) newRow++;
            if (e.key === 'ArrowLeft' && mazeLayout[newRow]?.[newCol - 1] !== 1) newCol--;
            if (e.key === 'ArrowRight' && mazeLayout[newRow]?.[newCol + 1] !== 1) newCol++;

            if (newRow === correctAnswerPosition.row && newCol === correctAnswerPosition.col) {
                setScore((prev) => prev + 1);
                if (currentQuestionIndex < questions.length - 1) {
                    const nextIndex = currentQuestionIndex + 1;
                    setCurrentQuestionIndex(nextIndex);
                    placeAnswers(nextIndex);
                } else {
                    alert('Grattis! Du har klarat alla frågor!');
                }
            }

            return { row: newRow, col: newCol };
        });
    };

    const handleStart = () => {
        setShowInstructions(false);
        window.addEventListener('keydown', handleKeyDown);
    };

    useEffect(() => {
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <div className="relative min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/assets/images/startPage.webp')" }}>
            {showInstructions ? (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#72c2e180] p-8 rounded-lg shadow-lg text-center">
                    <h1 className="text-3xl font-extrabold text-gray-800 mb-4">Välkommen till labyrintspelet!</h1>
                    <p className="text-lg text-black font-semibold mb-6">Använd piltangenterna för att navigera genom labyrinten och hitta det rätta svaret.</p>
                    <button onClick={handleStart} className="bg-[#ec4892] hover:bg-pink-700 text-white py-3 px-6 text-2xl rounded-lg font-bold">
                        Börja Spela
                    </button>
                </div>
            ) : (
                <>
                    {/* Left Section */}
                    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1/4 text-center bg-blue-400/50 ml-8 rounded-lg">
                        <p className="text-black text-1xl font-bold pt-5 ">FRÅGA</p>
                        <p className="text-black text-6xl font-extrabold pb-5 ">{questions[currentQuestionIndex]}</p>
                    </div>

                    {/* Maze */}
                    <div className="flex flex-col items-center pt-20">
                        <div className="grid grid-rows-[repeat(21,_1fr)] gap-0">
                            {mazeLayout.map((row, rowIndex) => (
                                <div key={rowIndex} className="flex">
                                    {row.map((cell, cellIndex) => (
                                        <div key={cellIndex} className={`w-8 h-8 ${cell === 1 ? 'bg-black' : 'bg-transparent'} relative`}>
                                            {characterPosition.row === rowIndex && characterPosition.col === cellIndex && (
                                                <img src={beepirate} alt="Character" className="absolute top-0 left-0 w-full h-full" />
                                            )}
                                            {correctAnswerPosition.row === rowIndex && correctAnswerPosition.col === cellIndex && (
                                                <div className="absolute top-0 left-0 w-full h-full text-center text-black font-bold flex items-center justify-center">
                                                    {answers[currentQuestionIndex]}
                                                </div>
                                            )}
                                            {distractorPositions.some((pos) => pos.row === rowIndex && pos.col === cellIndex) && (
                                                <div className="absolute top-0 left-0 w-full h-full text-center text-black font-extrabold flex items-center justify-center">
                                                    {distractorPositions.find((pos) => pos.row === rowIndex && pos.col === cellIndex)?.value}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Section */}
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1/4 text-center bg-blue-400/50 mr-8 rounded-lg">
                        <p className="text-black text-1xl font-bold pt-5">POÄNG</p>
                        <p className="text-black text-6xl font-extrabold pb-5">{score}</p>
                    </div>
                </>
            )}
        </div>
    );
};

export default Maze;
