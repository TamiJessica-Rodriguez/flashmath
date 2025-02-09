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

    const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 768);
    const [showSchedule, setShowSchedule] = useState<boolean>(false);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

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
        Svenska: { colorClass: 'bg-blue-600', emoji: '📚' },
        Naturkunskap: { colorClass: 'bg-blue-50', emoji: '🌿' },
        Musik: { colorClass: 'bg-blue-300', emoji: '🎵' },
        'Idrott & Hälsa': { colorClass: 'bg-blue-400', emoji: '🏃‍♂️' },
        Matematik: { colorClass: 'bg-blue-500', emoji: '➗' },
    };

    const scheduleNotes: ScheduleNote[] = [
        { title: 'Engelska', colorClass: 'bg-blue-100', startTime: '08:00', endTime: '09:30' },
        { title: 'Svenska', colorClass: 'bg-blue-600', startTime: '10:00', endTime: '11:15' },
        { title: 'Musik', colorClass: 'bg-blue-300', startTime: '13:00', endTime: '14:30' },
        { title: 'Matematik', colorClass: 'bg-blue-400', startTime: '15:00', endTime: '16:30' },
    ];

    useEffect(() => {
        dispatch(setPageTitle('Ämnen'));

        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [dispatch]);

    useEffect(() => {
        // Simulate data fetching
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    const handleCardClick = (title: string) => {
        if (title === 'Svenska') {
            navigate('/swedishmenu');
        } else if (title === 'Matematik') {
            navigate('/mathematicsmenu');
        } else {
            setShowModal(true);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="loader">Laddar...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-red-500">{error}</div>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-5 relative bg-white overflow-auto min-h-screen">
            <button onClick={() => setShowSchedule((prev) => !prev)} className="w-full text-center bg-blue-500 text-white py-2 rounded-md shadow-md">
                {showSchedule ? 'Dölj Schema' : 'Visa Schema'}
            </button>

            {showSchedule && (
                <div className="fixed inset-0 flex items-start justify-center z-50 pt-16 bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-1/2 max-h-[80vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold">Idag: Tisdag</h3>
                            <button onClick={() => setShowSchedule(false)} className="text-gray-500 hover:text-gray-700">
                                Stäng
                            </button>
                        </div>
                        <ScheduleColumn notes={scheduleNotes} />
                    </div>
                </div>
            )}

            <div className="flex flex-grow">
                <div className="panel flex-1 h-auto">
                    <div className="px-4">
                        <h1 className="text-xl sm:text-3xl font-bold mb-5">Kunskapsplatsen</h1>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {notesList.map((note) => {
                            const details = courseDetails[note.title];
                            return (
                                <div
                                    key={note.id}
                                    className={`relative p-6 h-64 cursor-pointer rounded-lg shadow-lg ${details?.colorClass || 'bg-gray-100'} transition-transform duration-300 ease-in-out ${
                                        ['Svenska', 'Matematik'].includes(note.title) ? 'group hover:scale-105' : 'opacity-50'
                                    }`}
                                    onClick={() => handleCardClick(note.title)}
                                >
                                    <div className="absolute top-2 left-2">{note.isRemote && <span className="text-black font-semibold">Distans</span>}</div>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="text-6xl lg:text-8xl font-bold">{details?.emoji || '📝'}</span>
                                    </div>
                                    <div className="relative z-10 text-center">
                                        <h3 className="font-bold text-lg sm:text-xl">{note.title}</h3>
                                    </div>
                                    <div className="absolute bottom-2 left-2 flex items-center">
                                        <img
                                            className="w-12 h-12 rounded-full object-cover mr-3"
                                            src={`/assets/images/${note.thumb}`}
                                            alt={`Profilbild av ${note.user} - undervisar i ${note.title}`}
                                        />
                                        <div className="hidden md:block">
                                            <h5 className="font-semibold text-lg">Lärare: {note.user}</h5>
                                            <p className="text-sm text-black">Uppdaterad senast: {note.date}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                        <h2 className="text-2xl font-bold mb-4">Under Konstruktion</h2>
                        <p className="mb-4">Sidan är under konstruktion och kommer att lanseras inom kort.</p>
                        <button onClick={() => setShowModal(false)} className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition">
                            Stäng
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StartPageStudent;
