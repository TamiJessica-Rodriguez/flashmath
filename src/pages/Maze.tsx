import React, { useEffect, useState } from 'react';
import beepirate from '/assets/images/beepirate.png'; // Import your character image
import purplemonster from '/assets/images/purplemonster.png'; // Import the monster image

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
    const [characterPosition, setCharacterPosition] = useState({ row: 1, col: 1 });
    const [monsterPosition, setMonsterPosition] = useState({ row: 10, col: 10 }); // Initial monster position

    const handleKeyDown = (e: KeyboardEvent) => {
        setCharacterPosition((prev) => {
            let newRow = prev.row;
            let newCol = prev.col;

            if (e.key === 'ArrowUp' && mazeLayout[newRow - 1][newCol] !== 1) newRow--;
            if (e.key === 'ArrowDown' && mazeLayout[newRow + 1][newCol] !== 1) newRow++;
            if (e.key === 'ArrowLeft' && mazeLayout[newRow][newCol - 1] !== 1) newCol--;
            if (e.key === 'ArrowRight' && mazeLayout[newRow][newCol + 1] !== 1) newCol++;

            return { row: newRow, col: newCol };
        });
    };

    useEffect(() => {
        const moveMonster = () => {
            setMonsterPosition((prev) => {
                const directions = [
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
                    const randomMove = validMoves[Math.floor(Math.random() * validMoves.length)];
                    return {
                        row: prev.row + randomMove.row,
                        col: prev.col + randomMove.col,
                    };
                }

                return prev; // No valid move, stay in place
            });
        };

        const interval = setInterval(moveMonster, 300); // Smooth monster moves every 300ms
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <div className="flex items-center justify-center min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/assets/images/startPage.webp')" }}>
            <div className="relative">
                <div className="grid grid-rows-[repeat(21,_auto)]">
                    {mazeLayout.map((row, rowIndex) => (
                        <div key={rowIndex} className="flex">
                            {row.map((cell, cellIndex) => (
                                <div key={cellIndex} className={`w-8 h-8 ${cell === 1 ? 'bg-black' : 'bg-transparent'} relative`}>
                                    {characterPosition.row === rowIndex && characterPosition.col === cellIndex && (
                                        <img src={beepirate} alt="Character" className="absolute top-0 left-0 w-full h-full" />
                                    )}
                                    {monsterPosition.row === rowIndex && monsterPosition.col === cellIndex && (
                                        <img src={purplemonster} alt="Monster" className="absolute top-0 left-0 w-full h-full transition-all ease-linear duration-300" />
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
