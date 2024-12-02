import React, { useState } from 'react';

interface Note {
    title: string;
    colorClass: string;
    startTime: string;
    endTime: string;
}

interface WeeklyScheduleProps {
    weeklyNotes: Record<string, Note[]>;
}

const WeeklySchedule: React.FC<WeeklyScheduleProps> = ({ weeklyNotes }) => {
    const [currentWeek, setCurrentWeek] = useState(45); // Startveckan

    const handlePreviousWeek = () => setCurrentWeek((prev) => prev - 1);
    const handleNextWeek = () => setCurrentWeek((prev) => prev + 1);

    const days = ['Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag'];

    return (
        <div className="flex flex-col gap-4">
            {/* Veckor och navigation */}
            <div className="flex justify-between items-center">
                <button onClick={handlePreviousWeek} className="text-lg font-bold text-gray-700 hover:text-blue-500">
                    &larr; Föregående vecka
                </button>
                <h2 className="text-2xl font-bold">Vecka {currentWeek}</h2>
                <button onClick={handleNextWeek} className="text-lg font-bold text-gray-700 hover:text-blue-500">
                    Nästa vecka &rarr;
                </button>
            </div>

            {/* Schema */}
            <div className="grid grid-cols-5 gap-4">
                {days.map((day, index) => (
                    <div key={index} className="flex flex-col w-full">
                        {/* Rubrik för veckodagen */}
                        <h3 className="text-xl font-bold text-center mb-2">{day}</h3>
                        {/* Lektioner för dagen */}
                        {weeklyNotes[day]?.map((note, idx) => (
                            <React.Fragment key={idx}>
                                <div className={`${note.colorClass} h-32 w-full rounded-lg shadow-lg relative flex flex-col justify-center items-center text-center`}>
                                    {/* Kursnamn och distans */}
                                    <h3 className="font-bold text-lg">{note.title}</h3>
                                    <p className="text-sm text-gray-600">Distans</p>
                                    {/* Tider */}
                                    <div className="absolute top-2 left-2 text-xs font-medium text-gray-700">{note.startTime}</div>
                                    <div className="absolute bottom-2 right-2 text-xs font-medium text-gray-700">{note.endTime}</div>
                                    {/* Emoji */}
                                    <div className="absolute top-2 right-2 text-lg">📹</div>
                                </div>

                                {/* Raster */}
                                {idx < weeklyNotes[day].length - 1 && (
                                    <div className="h-6 w-full bg-gray-200 rounded-lg shadow-inner flex items-center justify-start pl-2 mt-1">
                                        <p className="text-xs font-bold text-black">
                                            {note.endTime} - {weeklyNotes[day][idx + 1].startTime}
                                        </p>
                                        <p className="text-sm font-medium text-gray-600 ml-2">Raster</p>
                                    </div>
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WeeklySchedule;
