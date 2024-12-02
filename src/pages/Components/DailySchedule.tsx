// import React from 'react';

// interface Note {
//     title: string;
//     colorClass: string;
// }

// interface ScheduleColumnProps {
//     notes: Note[];
// }

// const DailySchedule: React.FC<ScheduleColumnProps> = ({ notes }) => {
//     return (
//         <div className="flex flex-col gap-4 w-64">
//             {notes.map((note, index) => (
//                 <div key={index} className={`${note.colorClass} h-32 w-full rounded-lg shadow-lg relative flex flex-col justify-center items-center text-center`}>
//                     {/* Kursnamn och distans */}
//                     <h3 className="font-bold text-lg">{note.title}</h3>
//                     <p className="text-sm text-gray-600">Distans</p>
//                     {/* Tider */}
//                     <div className="absolute top-2 left-2 text-xs font-medium text-gray-700">08.00</div>
//                     <div className="absolute bottom-2 right-2 text-xs font-medium text-gray-700">09.30</div>
//                     {/* Emoji */}
//                     <div className="absolute top-2 right-2 text-lg">📹</div>
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default DailySchedule;

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
    return (
        <div className="flex flex-col gap-4 w-64">
            {notes.map((note, index) => (
                <div key={index} className={`${note.colorClass} h-32 w-full rounded-lg shadow-lg relative flex flex-col justify-center items-center text-center`}>
                    {/* Kursnamn och distans */}
                    <h3 className="font-bold text-lg">{note.title}</h3>
                    <p className="text-sm text-gray-600">Distans</p>
                    {/* Tider */}
                    <div className="absolute top-2 left-2 text-xs font-medium text-gray-700">{note.startTime}</div>
                    <div className="absolute bottom-2 right-2 text-xs font-medium text-gray-700">{note.endTime}</div>
                    {/* Emoji */}
                    <div className="absolute top-2 right-2 text-lg">📹</div>
                </div>
            ))}
        </div>
    );
};

export default DailySchedule;
