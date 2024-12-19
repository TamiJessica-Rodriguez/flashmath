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

    const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 640);
    const [isTablet, setIsTablet] = useState<boolean>(window.innerWidth > 640 && window.innerWidth <= 1024);
    const [showSchedule, setShowSchedule] = useState<boolean>(false);

    const notesList: Note[] = [
        { id: 3, title: '3A', date: '11/03/2020' },
        { id: 4, title: '3B', date: '11/04/2020' },
        { id: 5, title: '3C', date: '11/05/2020' },
        { id: 6, title: '4A', date: '11/06/2020' },
        { id: 1, title: '4B', date: '11/01/2020' },
        { id: 2, title: '4C', date: '11/02/2020' },
    ];

    const scheduleNotes: ScheduleNote[] = [
        { title: '4B', colorClass: 'bg-gray-200', startTime: '08:00', endTime: '09:30' },
        { title: '4C', colorClass: 'bg-gray-200', startTime: '10:00', endTime: '11:15' },
        { title: '3A', colorClass: 'bg-gray-200', startTime: '13:00', endTime: '14:30' },
        { title: '3C', colorClass: 'bg-gray-200', startTime: '15:00', endTime: '16:30' },
    ];

    useEffect(() => {
        dispatch(setPageTitle('Klasser'));

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
        <div className="flex flex-col gap-5 relative sm:h-screen h-screen overflow-hidden bg-gray-50 font-['Roboto']" aria-label="Teacher Startpage">
            {isMobile && (
                <button
                    onClick={() => setShowSchedule(!showSchedule)}
                    className="w-full text-center bg-gray-700 text-white py-2 rounded-md shadow-md focus:ring-2 focus:ring-gray-500"
                    aria-label="Toggle schedule visibility"
                >
                    {showSchedule ? 'Dölj Schema' : 'Visa Schema'}
                </button>
            )}

            {isMobile && showSchedule && (
                <div className="absolute top-0 left-0 w-full bg-white shadow-lg z-10 p-4" role="dialog" aria-label="Mobile schedule view">
                    <div className="mb-4">
                        <h2 className="text-lg font-bold" id="today-title">
                            Idag: Tisdag
                        </h2>
                    </div>
                    <ScheduleColumn notes={scheduleNotes} />
                </div>
            )}

            <div className="flex flex-grow overflow-hidden">
                <div className="panel flex-1 h-full mr-5">
                    <div className="px-4">
                        <h1 className="text-2xl font-bold mb-5" id="class-title">
                            Dina klasser
                        </h1>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6" role="list">
                        {notesList.map((note) => (
                            <div
                                key={note.id}
                                className={`h-48 ${
                                    note.title.includes('3') ? 'bg-[#83b0e1]/50' : 'bg-[#e1ecf7]/75'
                                } shadow-md rounded-lg flex items-center justify-center text-center cursor-pointer hover:shadow-lg hover:scale-105 transition-transform`}
                                onClick={() => {
                                    if (note.title === '3A') {
                                        navigate('/coursematerials');
                                    } else {
                                        navigate(`/${note.title.toLowerCase()}menu`);
                                    }
                                }}
                                role="listitem"
                                aria-label={`Navigate to ${note.title}`}
                            >
                                <h2 className="text-xl font-bold text-gray-800">{note.title}</h2>
                            </div>
                        ))}
                    </div>
                </div>

                {!isMobile && (
                    <div className="w-64 flex-shrink-0" aria-label="Daily schedule">
                        <div className="mb-4 flex justify-between items-center">
                            <div>
                                <p className="text-sm font-medium">Idag:</p>
                                <h2 className="text-lg font-bold" id="today-schedule">
                                    Tisdag
                                </h2>
                            </div>
                            <p className="text-lg font-bold">V.45</p>
                        </div>
                        <ScheduleColumn notes={scheduleNotes} />
                    </div>
                )}
            </div>

            {/* Contrast adjusted element */}
            <p className="text-gray-700 text-xs" style={{ opacity: 1, color: 'rgb(68, 68, 68)', backgroundColor: 'rgb(255, 255, 255)' }} aria-label="Overall presentation note">
                Overall light or dark presentation.
            </p>
        </div>
    );
};

export default TeacherStartpage;
