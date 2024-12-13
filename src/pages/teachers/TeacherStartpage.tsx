import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setPageTitle } from '../../store/themeConfigSlice';
import ScheduleColumn from '../Components/DailySchedule';

interface Note {
    id: number;
    title: string;
    date: string;
}

interface ScheduleNote {
    title: string;
    colorClass: string;
    startTime: string;
    endTime: string;
}

const TeacherStartpage: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // State för att hantera responsivitet
    const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 640);
    const [isTablet, setIsTablet] = useState<boolean>(window.innerWidth > 640 && window.innerWidth <= 1024);
    const [showSchedule, setShowSchedule] = useState<boolean>(false);

    // Lista över klasser
    const notesList: Note[] = [
        { id: 3, title: '3A', date: '11/03/2020' },
        { id: 4, title: '3B', date: '11/04/2020' },
        { id: 5, title: '3C', date: '11/05/2020' },
        { id: 6, title: '4A', date: '11/06/2020' },
        { id: 1, title: '4B', date: '11/01/2020' },
        { id: 2, title: '4C', date: '11/02/2020' },
    ];

    // Dagligt schema
    const scheduleNotes: ScheduleNote[] = [
        { title: '4B', colorClass: 'bg-gray-200', startTime: '08:00', endTime: '09:30' },
        { title: '4C', colorClass: 'bg-gray-200', startTime: '10:00', endTime: '11:15' },
        { title: '3A', colorClass: 'bg-gray-200', startTime: '13:00', endTime: '14:30' },
        { title: '3C', colorClass: 'bg-gray-200', startTime: '15:00', endTime: '16:30' },
    ];

    useEffect(() => {
        // Sätter sidans titel
        dispatch(setPageTitle('Klasser'));

        // Hanterar responsivitet
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 640);
            setIsTablet(window.innerWidth > 640 && window.innerWidth <= 1024);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [dispatch]);

    return (
        <div className="flex flex-col gap-5 relative sm:h-screen h-screen overflow-hidden bg-gray-50 font-['Roboto']">
            {/* Mobil länk till schemat */}
            {isMobile && (
                <button onClick={() => setShowSchedule(!showSchedule)} className="w-full text-center bg-gray-700 text-white py-2 rounded-md shadow-md">
                    {showSchedule ? 'Dölj Schema' : 'Visa Schema'}
                </button>
            )}

            {/* Rullgardin för schema */}
            {isMobile && showSchedule && (
                <div className="absolute top-0 left-0 w-full bg-white shadow-lg z-10 p-4" onClick={() => setShowSchedule(false)}>
                    <div className="mb-4">
                        <h3 className="text-lg font-bold">Idag: Tisdag</h3>
                    </div>
                    <ScheduleColumn notes={scheduleNotes} />
                </div>
            )}

            {/* Innehåll */}
            <div className="flex flex-grow overflow-hidden">
                {/* Klasskorten */}
                <div className="panel flex-1 h-full mr-5">
                    <div className="px-4">
                        <h1 className="text-2xl font-bold mb-5">Dina klasser</h1>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        {notesList.map((note) => (
                            <div
                                key={note.id}
                                className={`h-48 ${
                                    note.title.includes('3') ? 'bg-[#83b0e1]/50' : 'bg-[#e1ecf7]/75'
                                } shadow-md rounded-lg flex items-center justify-center text-center cursor-pointer hover:shadow-lg hover:scale-105 transition-transform`}
                                onClick={() => {
                                    // Navigera till olika rutter beroende på klassens titel
                                    if (note.title === '3A') {
                                        navigate('/coursematerials');
                                    } else {
                                        navigate(`/${note.title.toLowerCase()}menu`);
                                    }
                                }}
                            >
                                <h3 className="text-xl font-bold text-gray-800">{note.title}</h3>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Dagligt schema för tablet- och desktop-vy */}
                {!isMobile && (
                    <div className="w-64 flex-shrink-0">
                        <div className="mb-4 flex justify-between items-center">
                            <div>
                                <p className="text-sm font-medium">Idag:</p>
                                <h3 className="text-lg font-bold">Tisdag</h3>
                            </div>
                            <h3 className="text-lg font-bold">V.45</h3>
                        </div>
                        <ScheduleColumn notes={scheduleNotes} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default TeacherStartpage;
