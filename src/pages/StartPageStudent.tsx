import React, { useEffect, useState } from 'react';
import AnimateHeight from 'react-animate-height';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setPageTitle } from '../store/themeConfigSlice';
import ScheduleColumn from './Components/DailySchedule';

interface Note {
    id: number;
    user: string;
    thumb: string;
    title: string;
    date: string;
    tag: string;
    isRemote?: boolean;
}

interface ScheduleNote {
    title: string;
    colorClass: string;
    startTime: string;
    endTime: string;
}

const StartPageStudent: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 640);
    const [showSchedule, setShowSchedule] = useState<boolean>(false);

    const notesList: Note[] = [
        { id: 1, user: 'Mohanned', thumb: 'profile-5.jpeg', title: 'Engelska', date: '11/01/2020', tag: 'personal', isRemote: true },
        { id: 2, user: 'Nazim', thumb: 'profile-4.jpeg', title: 'Svenska', date: '11/02/2020', tag: 'work' },
        { id: 3, user: 'Johan', thumb: 'profile-3.jpeg', title: 'Naturkunskap', date: '11/03/2020', tag: 'social' },
        { id: 4, user: 'Kourdonya', thumb: 'profile-2.jpeg', title: 'Musik', date: '11/04/2020', tag: 'important' },
        { id: 5, user: 'Oscar', thumb: 'profile-1.jpeg', title: 'Idrott & Hälsa', date: '11/05/2020', tag: 'work', isRemote: true },
        { id: 6, user: 'Nathalie', thumb: 'profile-6.jpeg', title: 'Matematik', date: '11/06/2020', tag: 'personal' },
    ];

    const courseDetails: Record<string, { colorClass: string; emoji: string }> = {
        Engelska: { colorClass: 'bg-blue-200', emoji: '🇬🇧' },
        Svenska: { colorClass: 'bg-blue-100', emoji: '📚' },
        Naturkunskap: { colorClass: 'bg-blue-50', emoji: '🌿' },
        Musik: { colorClass: 'bg-blue-300', emoji: '🎵' },
        'Idrott & Hälsa': { colorClass: 'bg-blue-400', emoji: '🏃‍♂️' },
        Matematik: { colorClass: 'bg-blue-500', emoji: '➗' },
    };

    const scheduleNotes: ScheduleNote[] = [
        { title: 'Engelska', colorClass: 'bg-blue-100', startTime: '08:00', endTime: '09:30' },
        { title: 'Svenska', colorClass: 'bg-blue-200', startTime: '10:00', endTime: '11:15' },
        { title: 'Musik', colorClass: 'bg-blue-300', startTime: '13:00', endTime: '14:30' },
        { title: 'Matematik', colorClass: 'bg-blue-400', startTime: '15:00', endTime: '16:30' },
    ];

    useEffect(() => {
        dispatch(setPageTitle('Ämnen'));

        const handleResize = () => {
            setIsMobile(window.innerWidth <= 640);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [dispatch]);

    return (
        <div className="flex flex-col gap-5 relative bg-white overflow-auto min-h-screen">
            {/* Mobil knapp för schema */}
            {isMobile && (
                <button onClick={() => setShowSchedule((prev) => !prev)} className="w-full text-center bg-blue-500 text-white py-2 rounded-md shadow-md">
                    {showSchedule ? 'Dölj Schema' : 'Visa Schema'}
                </button>
            )}

            {/* Mobilvy - schema */}
            {isMobile && (
                <AnimateHeight duration={300} height={showSchedule ? 'auto' : 0}>
                    <div className="w-full bg-white shadow-lg p-4">
                        <div className="mb-4">
                            <h3 className="text-lg font-bold">Idag: Tisdag</h3>
                        </div>
                        <ScheduleColumn notes={scheduleNotes} />
                    </div>
                </AnimateHeight>
            )}

            {/* Huvudinnehåll */}
            <div className="flex flex-grow">
                <div className="panel flex-1 h-auto">
                    <div className="px-4">
                        <h1 className="text-2xl font-bold mb-5">Dina klasser</h1>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {notesList.map((note) => {
                            const details = courseDetails[note.title];
                            return (
                                <div
                                    key={note.id}
                                    className={`relative p-6 h-64 cursor-pointer rounded-lg shadow-lg ${
                                        details?.colorClass || 'bg-gray-100'
                                    } transition-transform duration-300 ease-in-out group hover:scale-105`}
                                    onClick={() => {
                                        if (note.title === 'Svenska') {
                                            navigate('/swedishmenu');
                                        } else if (note.title === 'Matematik') {
                                            navigate('/mathematicsmenu');
                                        }
                                    }}
                                >
                                    <div className="absolute top-2 left-2">{note.isRemote && <span className="text-black font-semibold">Distans</span>}</div>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="text-6xl lg:text-8xl font-bold">{details?.emoji || '📝'}</span>
                                    </div>
                                    <div className="relative z-10 text-center">
                                        <h3 className="font-bold text-lg sm:text-xl">{note.title}</h3>
                                    </div>
                                    <div className="absolute bottom-2 left-2 flex items-center">
                                        <img className="w-12 h-12 rounded-full object-cover mr-3" src={`/assets/images/${note.thumb}`} alt={note.user} />
                                        <div>
                                            <h5 className="font-semibold text-lg">Lärare: {note.user}</h5>
                                            <p className="text-sm text-black">Uppdaterad senast: {note.date}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Schema för större skärmar */}
                {!isMobile && (
                    <div className="w-64 flex-shrink-0 bg-gray-100 p-4 shadow-md">
                        <div className="mb-4">
                            <p className="text-sm font-medium">Idag:</p>
                            <h3 className="text-lg font-bold">Tisdag</h3>
                        </div>
                        <ScheduleColumn notes={scheduleNotes} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default StartPageStudent;
