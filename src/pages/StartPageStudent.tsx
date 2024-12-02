import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IRootState } from '../store';
import { setPageTitle } from '../store/themeConfigSlice';
import ScheduleColumn from './Components/DailySchedule'; // Importera den nya komponenten

interface Note {
    id: number;
    user: string;
    thumb: string;
    title: string;
    date: string;
    tag: string;
}

const StartPageStudent: React.FC = () => {
    const dispatch = useDispatch();
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass === 'rtl');
    const navigate = useNavigate();

    const [selectedTab, setSelectedTab] = useState<string>('all');

    const notesList: Note[] = [
        { id: 1, user: 'Mohanned', thumb: 'profile-5.jpeg', title: 'Engelska', date: '11/01/2020', tag: 'personal' },
        { id: 2, user: 'Nazim', thumb: 'profile-4.jpeg', title: 'Svenska', date: '11/02/2020', tag: 'work' },
        { id: 3, user: 'Johan', thumb: 'profile-3.jpeg', title: 'Naturkunskap', date: '11/03/2020', tag: 'social' },
        { id: 4, user: 'Kourdonya', thumb: 'profile-2.jpeg', title: 'Musik', date: '11/04/2020', tag: 'important' },
        { id: 5, user: 'Oscar', thumb: 'profile-1.jpeg', title: 'Idrott & Hälsa', date: '11/05/2020', tag: 'work' },
        { id: 6, user: 'Nathalie', thumb: 'profile-6.jpeg', title: 'Matematik', date: '11/06/2020', tag: 'personal' },
    ];

    const filteredNotes = selectedTab === 'all' ? notesList : notesList.filter((note) => note.tag === selectedTab);

    useEffect(() => {
        dispatch(setPageTitle('Ämnen'));
    }, [dispatch]);

    const courseDetails: Record<string, { colorClass: string; emoji: string }> = {
        Engelska: { colorClass: 'bg-blue-200', emoji: '🇬🇧' },
        Svenska: { colorClass: 'bg-green-200', emoji: '📚' },
        Naturkunskap: { colorClass: 'bg-yellow-200', emoji: '🌿' },
        Musik: { colorClass: 'bg-pink-200', emoji: '🎵' },
        'Idrott & Hälsa': { colorClass: 'bg-purple-200', emoji: '🏃‍♂️' },
        Matematik: { colorClass: 'bg-orange-200', emoji: '➗' },
    };

    const scheduleNotes = [
        { title: 'Engelska', colorClass: 'bg-blue-200', startTime: '08:00', endTime: '09:30' },
        { title: 'Svenska', colorClass: 'bg-green-200', startTime: '10:00', endTime: '11:15' },
        { title: 'Musik', colorClass: 'bg-pink-200', startTime: '13:00', endTime: '14:30' },
        { title: 'Matematik', colorClass: 'bg-orange-200', startTime: '15:00', endTime: '16:30' },
    ];

    return (
        <div className="flex flex-col gap-5 relative sm:h-[calc(100vh_-_150px)] h-full">
            {/* Titlar */}
            <div className="px-4">
                <h1 className="text-2xl font-bold">Mina kurser</h1>
                <h2 className="text-lg font-bold text-gray-600 mt-1">Mina uppdateringar (2)</h2>
            </div>

            <div className="flex gap-5 h-full">
                {/* Korten */}
                <div className="panel flex-1 overflow-auto h-full">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {filteredNotes.map((note) => {
                            const details = courseDetails[note.title];

                            return (
                                <div
                                    key={note.id}
                                    className={`panel p-6 h-64 relative cursor-pointer ${details?.colorClass || 'bg-gray-100'} shadow-lg rounded-lg`}
                                    onClick={() => {
                                        if (note.title === 'Engelska') navigate('/english');
                                    }}
                                >
                                    {/* Ämne och kursnamn */}
                                    <div className="text-center mb-4">
                                        <h3 className="font-bold text-2xl">{note.title}</h3>
                                    </div>

                                    {/* Emoji */}
                                    <div className="absolute top-2 right-2 text-6xl">{details?.emoji || '📝'}</div>

                                    {/* Lärarinfo och datum */}
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

                {/* Höger kolumn */}
                <div className="w-64">
                    {/* Rubriker ovanför kolumnen */}
                    <div className="mb-4 flex justify-between items-center">
                        <div>
                            <p className="text-sm font-medium">Idag:</p>
                            <h3 className="text-lg font-bold">Tisdag</h3>
                        </div>
                        <h3 className="text-lg font-bold">V.45</h3>
                    </div>
                    <ScheduleColumn notes={scheduleNotes} />
                </div>
            </div>
        </div>
    );
};

export default StartPageStudent;
