import React from 'react';
import { useNavigate } from 'react-router-dom';

interface Note {
    title: string;
    colorClass: string;
    startTime: string;
    endTime: string;
}

const WeeklySchedule: React.FC = () => {
    const navigate = useNavigate();

    const calculateBreakHeight = (startTime: string, endTime: string) => {
        const [startHour, startMinute] = startTime.split(':').map(Number);
        const [endHour, endMinute] = endTime.split(':').map(Number);

        const startInMinutes = startHour * 60 + startMinute;
        const endInMinutes = endHour * 60 + endMinute;

        const duration = endInMinutes - startInMinutes;

        // Dynamiskt beräknad höjd för raster baserat på tid
        if (duration >= 90) return 'h-10'; // Längre raster
        if (duration >= 60) return 'h-8'; // Medelraster
        return 'h-6'; // Kort raster
    };

    const weeklyNotes: Record<string, Note[]> = {
        Måndag: [
            { title: 'Svenska', colorClass: 'bg-green-200', startTime: '08:00', endTime: '09:30' },
            { title: 'Engelska', colorClass: 'bg-blue-200', startTime: '10:00', endTime: '11:30' },
            { title: 'Matematik', colorClass: 'bg-orange-200', startTime: '13:00', endTime: '14:30' },
        ],
        Tisdag: [
            { title: 'Naturkunskap', colorClass: 'bg-yellow-200', startTime: '08:30', endTime: '10:00' },
            { title: 'Idrott & Hälsa', colorClass: 'bg-purple-200', startTime: '10:30', endTime: '12:00' },
            { title: 'Musik', colorClass: 'bg-pink-200', startTime: '13:00', endTime: '14:30' },
            { title: 'Svenska', colorClass: 'bg-green-200', startTime: '15:00', endTime: '16:30' },
        ],
        Onsdag: [
            { title: 'Engelska', colorClass: 'bg-blue-200', startTime: '09:00', endTime: '10:30' },
            { title: 'Matematik', colorClass: 'bg-orange-200', startTime: '11:00', endTime: '12:30' },
        ],
        Torsdag: [
            { title: 'Idrott & Hälsa', colorClass: 'bg-purple-200', startTime: '08:00', endTime: '09:30' },
            { title: 'Naturkunskap', colorClass: 'bg-yellow-200', startTime: '10:00', endTime: '11:30' },
            { title: 'Musik', colorClass: 'bg-pink-200', startTime: '12:30', endTime: '14:00' },
        ],
        Fredag: [
            { title: 'Svenska', colorClass: 'bg-green-200', startTime: '09:00', endTime: '10:30' },
            { title: 'Engelska', colorClass: 'bg-blue-200', startTime: '11:00', endTime: '12:30' },
            { title: 'Matematik', colorClass: 'bg-orange-200', startTime: '13:00', endTime: '14:30' },
        ],
    };

    const days = ['Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag'];

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Veckoschema</h1>
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
                {days.map((day) => (
                    <div key={day} className="flex flex-col w-full">
                        {/* Veckodag */}
                        <h3 className="text-lg font-bold text-center mb-2">{day}</h3>
                        {/* Lektioner */}
                        {(weeklyNotes[day] || []).map((note, idx, dayNotes) => (
                            <React.Fragment key={idx}>
                                {/* Lektion */}
                                <div
                                    className={`${note.colorClass} h-24 sm:h-32 w-full rounded-lg shadow-lg relative flex flex-col justify-center items-center text-center mb-2 cursor-pointer`}
                                    onClick={() => {
                                        if (note.title === 'Svenska') {
                                            navigate('/swedishmenu');
                                        } else if (note.title === 'Matematik') {
                                            navigate('/mathematicsmenu');
                                        } else if (note.title === 'Engelska') {
                                            navigate('/english');
                                        }
                                    }}
                                >
                                    <h3 className="font-bold text-sm sm:text-lg">{note.title}</h3>
                                    <p className="text-xs sm:text-sm text-gray-600">Distans</p>
                                    <div className="absolute top-2 left-2 text-xs sm:text-sm font-medium text-gray-700">{note.startTime}</div>
                                    <div className="absolute bottom-2 right-2 text-xs sm:text-sm font-medium text-gray-700">{note.endTime}</div>
                                    <div className="absolute top-2 right-2 text-base sm:text-lg">📹</div>
                                </div>

                                {/* Raster */}
                                {idx < dayNotes.length - 1 && (
                                    <div
                                        className={`${calculateBreakHeight(
                                            note.endTime,
                                            dayNotes[idx + 1].startTime
                                        )} w-full bg-gray-200 rounded-lg shadow-inner flex items-center justify-start pl-2 my-2`}
                                    >
                                        <p className="text-xs sm:text-sm font-bold text-black">
                                            {note.endTime} - {dayNotes[idx + 1].startTime}
                                        </p>
                                        <p className="text-xs sm:text-sm font-medium text-gray-600 ml-2">Raster</p>
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

// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// interface Note {
//     title: string;
//     colorClass: string;
//     startTime: string;
//     endTime: string;
// }

// const WeeklySchedule: React.FC = () => {
//     const navigate = useNavigate();

//     const calculateBreakHeight = (startTime: string, endTime: string) => {
//         const [startHour, startMinute] = startTime.split(':').map(Number);
//         const [endHour, endMinute] = endTime.split(':').map(Number);

//         const startInMinutes = startHour * 60 + startMinute;
//         const endInMinutes = endHour * 60 + endMinute;

//         const duration = endInMinutes - startInMinutes;

//         if (duration >= 90) return 'h-10'; // Longer breaks
//         if (duration >= 60) return 'h-8'; // Medium breaks
//         return 'h-6'; // Short breaks
//     };

//     const weeklyNotes: Record<string, Note[]> = {
//         Måndag: [
//             { title: 'Svenska', colorClass: 'bg-green-200', startTime: '08:00', endTime: '09:30' },
//             { title: 'Engelska', colorClass: 'bg-blue-200', startTime: '10:00', endTime: '11:30' },
//             { title: 'Matematik', colorClass: 'bg-orange-200', startTime: '13:00', endTime: '14:30' },
//         ],
//         Tisdag: [
//             { title: 'Naturkunskap', colorClass: 'bg-yellow-200', startTime: '08:30', endTime: '10:00' },
//             { title: 'Idrott & Hälsa', colorClass: 'bg-purple-200', startTime: '10:30', endTime: '12:00' },
//             { title: 'Musik', colorClass: 'bg-pink-200', startTime: '13:00', endTime: '14:30' },
//             { title: 'Svenska', colorClass: 'bg-green-200', startTime: '15:00', endTime: '16:30' },
//         ],
//         Onsdag: [
//             { title: 'Engelska', colorClass: 'bg-blue-200', startTime: '09:00', endTime: '10:30' },
//             { title: 'Matematik', colorClass: 'bg-orange-200', startTime: '11:00', endTime: '12:30' },
//         ],
//         Torsdag: [
//             { title: 'Idrott & Hälsa', colorClass: 'bg-purple-200', startTime: '08:00', endTime: '09:30' },
//             { title: 'Naturkunskap', colorClass: 'bg-yellow-200', startTime: '10:00', endTime: '11:30' },
//             { title: 'Musik', colorClass: 'bg-pink-200', startTime: '12:30', endTime: '14:00' },
//         ],
//         Fredag: [
//             { title: 'Svenska', colorClass: 'bg-green-200', startTime: '09:00', endTime: '10:30' },
//             { title: 'Engelska', colorClass: 'bg-blue-200', startTime: '11:00', endTime: '12:30' },
//             { title: 'Matematik', colorClass: 'bg-orange-200', startTime: '13:00', endTime: '14:30' },
//         ],
//     };

//     const days = ['Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag'];

//     return (
//         <div
//             className="p-4 min-h-screen"
//             style={{
//                 background: 'linear-gradient(45deg, #2196f3 30%, #9c27b0 90%)',
//                 color: 'white',
//             }}
//         >
//             <h1 className="text-3xl font-bold mb-6">Veckoschema</h1>
//             <div className="grid grid-cols-1 sm:grid-cols-5 gap-6">
//                 {days.map((day) => (
//                     <div key={day} className="flex flex-col">
//                         {/* Day Header */}
//                         <h3 className="text-xl font-bold text-center mb-4">{day}</h3>
//                         {/* Lessons */}
//                         {(weeklyNotes[day] || []).map((note, idx, dayNotes) => (
//                             <React.Fragment key={idx}>
//                                 <div
//                                     className={`${note.colorClass} h-24 sm:h-32 w-full rounded-lg shadow-lg relative flex flex-col justify-center items-center text-center mb-2 cursor-pointer`}
//                                     onClick={() => {
//                                         if (note.title === 'Svenska') {
//                                             navigate('/swedishmenu');
//                                         } else if (note.title === 'Matematik') {
//                                             navigate('/mathematicsmenu');
//                                         } else if (note.title === 'Engelska') {
//                                             navigate('/english');
//                                         }
//                                     }}
//                                 >
//                                     {/* Lesson Title - Updated */}
//                                     <h3 className="text-black font-extrabold text-sm sm:text-lg">{note.title}</h3>
//                                     <p className="text-xs sm:text-sm text-gray-700">Distans</p>
//                                     <div className="absolute top-2 left-2 text-xs sm:text-sm font-medium">{note.startTime}</div>
//                                     <div className="absolute bottom-2 right-2 text-xs sm:text-sm font-medium">{note.endTime}</div>
//                                     <div className="absolute top-2 right-2 text-base sm:text-lg">📹</div>
//                                 </div>

//                                 {/* Break */}
//                                 {idx < dayNotes.length - 1 && (
//                                     <div
//                                         className={`${calculateBreakHeight(
//                                             note.endTime,
//                                             dayNotes[idx + 1].startTime
//                                         )} w-full bg-gray-100 rounded-lg shadow-inner flex items-center justify-start pl-2 my-2`}
//                                     >
//                                         <p className="text-xs sm:text-sm font-bold text-black">
//                                             {note.endTime} - {dayNotes[idx + 1].startTime}
//                                         </p>
//                                         <p className="text-xs sm:text-sm font-medium text-gray-600 ml-2">Raster</p>
//                                     </div>
//                                 )}
//                             </React.Fragment>
//                         ))}
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default WeeklySchedule;
