import React, { useEffect, useState } from 'react';
import beepirate from '/assets/images/beepirate.png';
import bluemonster from '/assets/images/bluemonster.png';
import purplemonster from '/assets/images/purplemonster.png';

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

const generateQuestions = () => {
    const questions = [];
    const answers = [];
    for (let i = 0; i < 3; i++) {
        const num1 = Math.floor(Math.random() * 30) + 1;
        const num2 = Math.floor(Math.random() * 30) + 1;
        questions.push(`${num1} + ${num2}`);
        answers.push(num1 + num2);
    }
    return { questions, answers };
};

const Maze: React.FC = () => {
    const [characterPosition, setCharacterPosition] = useState({ row: 1, col: 1 });
    const [purpleMonsterPosition, setPurpleMonsterPosition] = useState({ row: 10, col: 10 });
    const [greenMonsterPosition, setGreenMonsterPosition] = useState({ row: 15, col: 15 });
    const [purpleMonsterDirection, setPurpleMonsterDirection] = useState({ row: 0, col: 1 });
    const [greenMonsterDirection, setGreenMonsterDirection] = useState({ row: 0, col: -1 });
    const [score, setScore] = useState(0);

    const { questions, answers } = generateQuestions();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [currentAnswerPosition, setCurrentAnswerPosition] = useState({ row: 0, col: 0 });

    useEffect(() => {
        // Place the current answer in a random position
        const placeAnswer = () => {
            const rows = mazeLayout.length;
            const cols = mazeLayout[0].length;

            let placed = false;
            while (!placed) {
                const row = Math.floor(Math.random() * rows);
                const col = Math.floor(Math.random() * cols);

                if (mazeLayout[row][col] === 0) {
                    setCurrentAnswerPosition({ row, col });
                    placed = true;
                }
            }
        };
        placeAnswer();
    }, [currentQuestionIndex]);

    const handleKeyDown = (e: KeyboardEvent) => {
        setCharacterPosition((prev) => {
            let newRow = prev.row;
            let newCol = prev.col;

            if (e.key === 'ArrowUp' && mazeLayout[newRow - 1][newCol] !== 1) newRow--;
            if (e.key === 'ArrowDown' && mazeLayout[newRow + 1][newCol] !== 1) newRow++;
            if (e.key === 'ArrowLeft' && mazeLayout[newRow][newCol - 1] !== 1) newCol--;
            if (e.key === 'ArrowRight' && mazeLayout[newRow][newCol + 1] !== 1) newCol++;

            if (newRow === currentAnswerPosition.row && newCol === currentAnswerPosition.col) {
                setScore(score + 1);
                if (currentQuestionIndex < questions.length - 1) {
                    setCurrentQuestionIndex(currentQuestionIndex + 1);
                } else {
                    alert("Congratulations! You've completed all questions!");
                }
            }

            return { row: newRow, col: newCol };
        });
    };

    const moveMonster = (
        position: { row: number; col: number },
        direction: { row: number; col: number },
        setPosition: React.Dispatch<React.SetStateAction<{ row: number; col: number }>>,
        setDirection: React.Dispatch<React.SetStateAction<{ row: number; col: number }>>
    ) => {
        setPosition((prev) => {
            const nextRow = prev.row + direction.row;
            const nextCol = prev.col + direction.col;

            if (mazeLayout[nextRow] && mazeLayout[nextRow][nextCol] === 0) {
                return { row: nextRow, col: nextCol };
            }

            const directions = [
                { row: -1, col: 0 },
                { row: 1, col: 0 },
                { row: 0, col: -1 },
                { row: 0, col: 1 },
            ];

            const validMoves = directions.filter(({ row, col }) => {
                const newRow = prev.row + row;
                const newCol = prev.col + col;
                return mazeLayout[newRow] && mazeLayout[newRow][newCol] === 0;
            });

            if (validMoves.length > 0) {
                const newDirection = validMoves[Math.floor(Math.random() * validMoves.length)];
                setDirection(newDirection);
                return {
                    row: prev.row + newDirection.row,
                    col: prev.col + newDirection.col,
                };
            }

            return prev;
        });
    };

    useEffect(() => {
        const purpleInterval = setInterval(() => {
            moveMonster(purpleMonsterPosition, purpleMonsterDirection, setPurpleMonsterPosition, setPurpleMonsterDirection);
        }, 300);

        const greenInterval = setInterval(() => {
            moveMonster(greenMonsterPosition, greenMonsterDirection, setGreenMonsterPosition, setGreenMonsterDirection);
        }, 300);

        return () => {
            clearInterval(purpleInterval);
            clearInterval(greenInterval);
        };
    }, [purpleMonsterDirection, greenMonsterDirection]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [currentAnswerPosition]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/assets/images/startPage.webp')" }}>
            <div className="text-white text-xl mb-4">
                <p>Score: {score}</p>
                <p>{questions[currentQuestionIndex]}</p>
            </div>
            <div className="relative">
                <div className="grid grid-rows-[repeat(21,_auto)]">
                    {mazeLayout.map((row, rowIndex) => (
                        <div key={rowIndex} className="flex">
                            {row.map((cell: number, cellIndex: number) => (
                                <div key={cellIndex} className={`w-8 h-8 ${cell === 1 ? 'bg-black' : 'bg-transparent'} relative`}>
                                    {characterPosition.row === rowIndex && characterPosition.col === cellIndex && (
                                        <img src={beepirate} alt="Character" className="absolute top-0 left-0 w-full h-full" />
                                    )}
                                    {purpleMonsterPosition.row === rowIndex && purpleMonsterPosition.col === cellIndex && (
                                        <img src={purplemonster} alt="Purple Monster" className="absolute top-0 left-0 w-full h-full transition-all ease-linear duration-300" />
                                    )}
                                    {greenMonsterPosition.row === rowIndex && greenMonsterPosition.col === cellIndex && (
                                        <img src={bluemonster} alt="Green Monster" className="absolute top-0 left-0 w-full h-full transition-all ease-linear duration-300" />
                                    )}
                                    {currentAnswerPosition.row === rowIndex && currentAnswerPosition.col === cellIndex && (
                                        <div className="absolute top-0 left-0 w-full h-full text-center text-white text-lg flex items-center justify-center">{answers[currentQuestionIndex]}</div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Maze;
