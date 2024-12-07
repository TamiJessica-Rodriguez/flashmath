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
    // Generate three random addition questions with numbers between 1-30
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

interface Position {
    row: number;
    col: number;
}

interface AnswerPosition extends Position {
    value: number;
}

const placeAnswersInMaze = (answers: number[]): AnswerPosition[] => {
    const positions: AnswerPosition[] = [];
    const rows = mazeLayout.length;
    const cols = mazeLayout[0].length;

    answers.forEach((answer) => {
        let placed = false;
        while (!placed) {
            const row = Math.floor(Math.random() * rows);
            const col = Math.floor(Math.random() * cols);
            if (mazeLayout[row][col] === 0 && !positions.some((pos) => pos.row === row && pos.col === col)) {
                positions.push({ row, col, value: answer });
                placed = true;
            }
        }
    });
    return positions;
};

const Maze: React.FC = () => {
    const [characterPosition, setCharacterPosition] = useState({ row: 1, col: 1 });
    const [purpleMonsterPosition, setPurpleMonsterPosition] = useState({ row: 10, col: 10 });
    const [greenMonsterPosition, setGreenMonsterPosition] = useState({ row: 15, col: 15 });
    const [purpleMonsterDirection, setPurpleMonsterDirection] = useState({ row: 0, col: 1 });
    const [greenMonsterDirection, setGreenMonsterDirection] = useState({ row: 0, col: -1 });
    const [score, setScore] = useState(0);
    const { questions, answers } = generateQuestions();
    const [answerPositions, setAnswerPositions] = useState(placeAnswersInMaze(answers));

    const handleKeyDown = (e: KeyboardEvent) => {
        setCharacterPosition((prev) => {
            let newRow = prev.row;
            let newCol = prev.col;

            if (e.key === 'ArrowUp' && mazeLayout[newRow - 1][newCol] !== 1) newRow--;
            if (e.key === 'ArrowDown' && mazeLayout[newRow + 1][newCol] !== 1) newRow++;
            if (e.key === 'ArrowLeft' && mazeLayout[newRow][newCol - 1] !== 1) newCol--;
            if (e.key === 'ArrowRight' && mazeLayout[newRow][newCol + 1] !== 1) newCol++;

            const collectedAnswer = answerPositions.find((pos) => pos.row === newRow && pos.col === newCol);
            if (collectedAnswer) {
                setScore(score + 1);
                setAnswerPositions(answerPositions.filter((pos) => pos !== collectedAnswer));
            }

            return { row: newRow, col: newCol };
        });
    };

    interface Direction {
        row: number;
        col: number;
    }

    interface MonsterPosition {
        row: number;
        col: number;
    }

    const moveMonster = (
        position: MonsterPosition,
        direction: Direction,
        setPosition: React.Dispatch<React.SetStateAction<MonsterPosition>>,
        setDirection: React.Dispatch<React.SetStateAction<Direction>>
    ) => {
        setPosition((prev) => {
            const nextRow = prev.row + direction.row;
            const nextCol = prev.col + direction.col;

            if (mazeLayout[nextRow] && mazeLayout[nextRow][nextCol] === 0) {
                return { row: nextRow, col: nextCol };
            }

            // Choose a new direction if blocked
            const directions: Direction[] = [
                { row: -1, col: 0 }, // Up
                { row: 1, col: 0 }, // Down
                { row: 0, col: -1 }, // Left
                { row: 0, col: 1 }, // Right
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
    }, [answerPositions]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/assets/images/startPage.webp')" }}>
            <div className="text-white text-xl mb-4">
                <p>Score: {score}</p>
                {questions.map((question, index) => (
                    <p key={index}>{question}</p>
                ))}
            </div>
            <div className="relative">
                <div className="grid grid-rows-[repeat(21,_auto)]">
                    {mazeLayout.map((row, rowIndex) => (
                        <div key={rowIndex} className="flex">
                            {row.map((cell, cellIndex) => (
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
                                    {answerPositions.find((pos) => pos.row === rowIndex && pos.col === cellIndex) && (
                                        <div className="absolute top-0 left-0 w-full h-full text-center text-white text-lg flex items-center justify-center">
                                            {answerPositions.find((pos) => pos.row === rowIndex && pos.col === cellIndex)?.value}
                                        </div>
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
