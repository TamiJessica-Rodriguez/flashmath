import React, { useEffect, useState } from 'react';
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
    const [isTablet, setIsTablet] = useState<boolean>(window.innerWidth > 640 && window.innerWidth <= 1024);
    const [showSchedule, setShowSchedule] = useState<boolean>(false);

    const notesList: Note[] = [
        { id: 1, user: 'Mohanned', thumb: 'profile-5.jpeg', title: 'Engelska', date: '11/01/2020', tag: 'personal' },
        { id: 2, user: 'Nazim', thumb: 'profile-4.jpeg', title: 'Svenska', date: '11/02/2020', tag: 'work' },
        { id: 3, user: 'Johan', thumb: 'profile-3.jpeg', title: 'Naturkunskap', date: '11/03/2020', tag: 'social' },
        { id: 4, user: 'Kourdonya', thumb: 'profile-2.jpeg', title: 'Musik', date: '11/04/2020', tag: 'important' },
        { id: 5, user: 'Oscar', thumb: 'profile-1.jpeg', title: 'Idrott & Hälsa', date: '11/05/2020', tag: 'work' },
        { id: 6, user: 'Nathalie', thumb: 'profile-6.jpeg', title: 'Matematik', date: '11/06/2020', tag: 'personal' },
    ];

    const courseDetails: Record<string, { colorClass: string; emoji: string }> = {
        Engelska: { colorClass: 'bg-blue-200', emoji: '🇬🇧' },
        Svenska: { colorClass: 'bg-green-200', emoji: '📚' },
        Naturkunskap: { colorClass: 'bg-yellow-200', emoji: '🌿' },
        Musik: { colorClass: 'bg-pink-200', emoji: '🎵' },
        'Idrott & Hälsa': { colorClass: 'bg-purple-200', emoji: '🏃‍♂️' },
        Matematik: { colorClass: 'bg-[#3587a4]', emoji: '➗' },
    };

    const scheduleNotes: ScheduleNote[] = [
        { title: 'Engelska', colorClass: 'bg-blue-200', startTime: '08:00', endTime: '09:30' },
        { title: 'Svenska', colorClass: 'bg-green-200', startTime: '10:00', endTime: '11:15' },
        { title: 'Musik', colorClass: 'bg-pink-200', startTime: '13:00', endTime: '14:30' },
        { title: 'Matematik', colorClass: 'bg-[#3587a4]', startTime: '15:00', endTime: '16:30' },
    ];

    useEffect(() => {
        dispatch(setPageTitle('Ämnen'));

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
        <div className="flex flex-col gap-5 relative sm:h-screen h-screen overflow-hidden bg-white">
            {/* Mobil länk till schemat */}
            {isMobile && (
                <button onClick={() => setShowSchedule(!showSchedule)} className="w-full text-center bg-blue-500 text-white py-2 rounded-md shadow-md">
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

            {/* Titlar */}
            <div className="px-4">
                <h1 className="text-2xl font-bold">Mina kurser</h1>
                <h2 className="text-lg font-bold text-gray-600 mt-1">Mina uppdateringar (2)</h2>
            </div>

            {/* Korten */}
            <div className="flex gap-5 flex-grow overflow-auto">
                <div className="panel flex-1 h-full">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {notesList.map((note) => {
                            const details = courseDetails[note.title];
                            return (
                                <div
                                    key={note.id}
                                    className={`panel p-6 h-64 relative cursor-pointer ${
                                        details?.colorClass || 'bg-gray-100'
                                    } shadow-lg rounded-lg transition-transform duration-500 ease-in-out group hover:scale-105`}
                                    onClick={() => {
                                        if (note.title === 'Svenska') {
                                            navigate('/swedishmenu');
                                        } else if (note.title === 'Matematik') {
                                            navigate('/mathematicsmenu');
                                        }
                                    }}
                                >
                                    {['Musik', 'Svenska'].includes(note.title) && <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow">1</div>}
                                    <div className="text-center mb-2">
                                        <h3 className="font-bold text-2xl sm:text-4xl">{note.title}</h3>
                                    </div>
                                    <div
                                        className={`absolute ${isMobile || isTablet ? 'flex justify-center items-center top-0 bottom-0 left-0 right-0' : 'top-2 right-2'} ${
                                            isMobile ? 'text-8xl' : isTablet ? 'text-8xl' : 'text-9xl'
                                        }`}
                                    >
                                        {details?.emoji || '📝'}
                                    </div>
                                    <div className="absolute bottom-2 left-2 flex items-center">
                                        <img className="w-12 h-12 rounded-full object-cover mr-3" src={`/assets/images/${note.thumb}`} alt={note.user} />
                                        <div>
                                            <h5 className="font-semibold text-lg">Lärare: {note.user}</h5>
                                            <p className="text-sm text-gray-500">Uppdaterad senast: {note.date}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
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

export default StartPageStudent;
