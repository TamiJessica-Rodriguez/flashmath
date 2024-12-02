import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../store';
import { setPageTitle } from '../store/themeConfigSlice';

interface Note {
    id: number;
    user: string;
    thumb: string;
    title: string;
    date: string;
    tag: string;
}

import { useNavigate } from 'react-router-dom';

const NotesPage: React.FC = () => {
    const dispatch = useDispatch();
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass === 'rtl');
    const navigate = useNavigate(); // Navigering

    const [selectedTab, setSelectedTab] = useState<string>('all');
    const [isShowNoteMenu, setIsShowNoteMenu] = useState<boolean>(false);

    const notesList: Note[] = [
        { id: 1, user: 'Kourdonya', thumb: 'profile-1.jpeg', title: 'Engelska', date: '11/01/2020', tag: 'personal' },
        { id: 2, user: 'Anna', thumb: 'profile-2.jpeg', title: 'Svenska', date: '11/02/2020', tag: 'work' },
        { id: 3, user: 'Nazim', thumb: 'profile-3.jpeg', title: 'Naturkunskap', date: '11/03/2020', tag: 'social' },
        { id: 4, user: 'Johan', thumb: 'profile-4.jpeg', title: 'Musik', date: '11/04/2020', tag: 'important' },
        { id: 5, user: 'Oscar', thumb: 'profile-5.jpeg', title: 'Idrott & Hälsa', date: '11/05/2020', tag: 'work' },
        { id: 6, user: 'Mohanned', thumb: 'profile-6.jpeg', title: 'Matematik', date: '11/06/2020', tag: 'personal' },
    ];

    const filteredNotes = selectedTab === 'all' ? notesList : notesList.filter((note) => note.tag === selectedTab);

    useEffect(() => {
        dispatch(setPageTitle('Ämnen'));
    }, [dispatch]);

    // Mappning av ämnen till emojis och vägar
    const subjectToDetails: Record<string, { emoji: string; path: string }> = {
        Engelska: { emoji: '🇬🇧', path: '/english' },
        Svenska: { emoji: '📚', path: '/swedish' },
        Naturkunskap: { emoji: '🌿', path: '/science' },
        Musik: { emoji: '🎵', path: '/music' },
        'Idrott & Hälsa': { emoji: '🏃‍♂️', path: '/sports' },
        Matematik: { emoji: '➗', path: '/math' },
    };

    return (
        <div className="flex flex-col gap-5 relative sm:h-[calc(100vh_-_150px)] h-full">
            {/* Titlar */}
            <div className="flex justify-between items-center px-4">
                <h1 className="text-2xl font-bold">Mina kurser</h1>
                <h2 className="text-lg font-bold text-gray-600">Mina uppdateringar (2)</h2>
            </div>

            <div className="flex gap-5 h-full">
                <div className="panel flex-1 overflow-auto h-full">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {filteredNotes.map((note) => {
                            const details = subjectToDetails[note.title] || { emoji: '📝', path: '#' };
                            return (
                                <div
                                    key={note.id}
                                    className={`panel p-6 relative cursor-pointer ${
                                        note.tag === 'personal'
                                            ? 'bg-primary-light'
                                            : note.tag === 'work'
                                            ? 'bg-warning-light'
                                            : note.tag === 'social'
                                            ? 'bg-info-light'
                                            : note.tag === 'important'
                                            ? 'bg-danger-light'
                                            : 'bg-white'
                                    } shadow-lg rounded-lg`}
                                    onClick={() => navigate(details.path)} // Navigera vid klick
                                >
                                    <div className="flex items-center">
                                        <img className="w-16 h-16 rounded-full object-cover mr-4" src={`/assets/images/${note.thumb}`} alt="user" />
                                        <div>
                                            <h5 className="font-semibold text-lg">{note.user}</h5>
                                            <p className="text-sm text-gray-500">{note.date}</p>
                                        </div>
                                    </div>
                                    <div className="mt-6">
                                        <h3 className="font-bold text-xl text-center">{note.title}</h3>
                                    </div>
                                    {/* Emoji */}
                                    <div className="absolute bottom-2 right-2 text-6xl">{details.emoji}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotesPage;

