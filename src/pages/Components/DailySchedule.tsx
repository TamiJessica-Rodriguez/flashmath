import React from 'react';

interface Note {
    title: string;
    colorClass: string;
    startTime: string;
    endTime: string;
}

interface ScheduleColumnProps {
    notes: Note[];
}

const DailySchedule: React.FC<ScheduleColumnProps> = ({ notes }) => {
    const calculateBreakHeight = (startTime: string, endTime: string) => {
        const [startHour, startMinute] = startTime.split(':').map(Number);
        const [endHour, endMinute] = endTime.split(':').map(Number);

        const startInMinutes = startHour * 60 + startMinute;
        const endInMinutes = endHour * 60 + endMinute;

        const duration = endInMinutes - startInMinutes;

        // Bestäm höjd baserat på tid
        if (duration >= 90) return 'h-10'; // Längre raster
        return 'h-6'; // Standardhöjd för korta raster
    };

    return (
        <div className="flex flex-col gap-1 w-64">
            {notes.map((note, index) => {
                const nextNote = notes[index + 1]; // Nästa lektion för att beräkna raster
                return (
                    <React.Fragment key={index}>
                        {/* Lektion */}
                        <div className={`${note.colorClass} h-32 w-full rounded-lg shadow-lg relative flex flex-col justify-center items-center text-center`}>
                            {/* Kursnamn och distans */}
                            <h3 className="font-bold text-lg">{note.title}</h3>
                            <p className="text-sm text-black">Distans</p>
                            {/* Tider */}
                            <div className="absolute top-2 left-2 text-xs font-medium text-black">{note.startTime}</div>
                            <div className="absolute bottom-2 right-2 text-xs font-medium text-black">{note.endTime}</div>
                            {/* Emoji */}
                            <div className="absolute top-2 right-2 text-lg">📹</div>
                        </div>

                        {/* Raster */}
                        {nextNote && (
                            <div className={`${calculateBreakHeight(note.endTime, nextNote.startTime)} w-full bg-gray-200 rounded-lg shadow-inner flex items-center justify-start pl-2 mt-0.5`}>
                                {/* Rastertider */}
                                <p className="text-xs font-bold text-black">
                                    {note.endTime} - {nextNote.startTime}
                                </p>
                                <p className="text-sm font-medium text-gray-600 ml-2">Raster</p>
                            </div>
                        )}
                    </React.Fragment>
                );
            })}
        </div>
    );
};

export default DailySchedule;
