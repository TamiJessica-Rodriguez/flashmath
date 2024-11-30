import React, { useEffect, useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useDispatch, useSelector } from 'react-redux';
import IconMenu from '../components/Icon/IconMenu';
import IconNotes from '../components/Icon/IconNotes';
import IconNotesEdit from '../components/Icon/IconNotesEdit';
import IconSquareRotated from '../components/Icon/IconSquareRotated';
import IconX from '../components/Icon/IconX';
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

const NotesPage: React.FC = () => {
    const dispatch = useDispatch();
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass === 'rtl');

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

    return (
        <div className="flex gap-5 relative sm:h-[calc(100vh_-_150px)] h-full">
            {/* Bakgrund för att stänga menyn */}
            {isShowNoteMenu && <div className="bg-black/60 z-10 w-full h-full absolute sm:hidden" onClick={() => setIsShowNoteMenu(false)}></div>}

            {/* Sidomeny */}
            <div
                className={`panel p-4 flex-none w-[240px] absolute xl:relative z-20 space-y-4 h-full xl:h-auto hidden xl:block ltr:lg:rounded-r-md rtl:lg:rounded-l-md overflow-hidden ${
                    isShowNoteMenu ? '!block h-full ltr:left-0 rtl:right-0' : 'hidden shadow'
                }`}
            >
                <div className="flex flex-col h-full pb-16">
                    {/* Menytitel */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <IconNotes />
                            <h3 className="text-lg font-semibold ltr:ml-3 rtl:mr-3">Ämnen</h3>
                        </div>
                        <button onClick={() => setIsShowNoteMenu(false)} className="text-gray-500 hover:text-gray-800">
                            <IconX />
                        </button>
                    </div>

                    <div className="h-px w-full border-b border-white-light dark:border-[#1b2e4b] my-4"></div>
                    <PerfectScrollbar className="relative ltr:pr-3.5 rtl:pl-3.5 ltr:-mr-3.5 rtl:-ml-3.5 h-full grow">
                        <div className="space-y-1">
                            <button
                                type="button"
                                className={`w-full flex justify-between items-center p-2 hover:bg-white-dark/10 rounded-md dark:hover:text-primary hover:text-primary dark:hover:bg-[#181F32] font-medium h-10 ${
                                    selectedTab === 'all' && 'bg-gray-100 dark:text-primary text-primary dark:bg-[#181F32]'
                                }`}
                                onClick={() => setSelectedTab('all')}
                            >
                                <div className="flex items-center">
                                    <IconNotesEdit className="shrink-0" />
                                    <div className="ltr:ml-3 rtl:mr-3">Alla Ämnen</div>
                                </div>
                            </button>
                            <button
                                type="button"
                                className={`w-full flex justify-between items-center p-2 hover:bg-white-dark/10 rounded-md dark:hover:text-primary hover:text-primary dark:hover:bg-[#181F32] font-medium h-10 ${
                                    selectedTab === 'personal' && 'bg-gray-100 dark:text-primary text-primary dark:bg-[#181F32]'
                                }`}
                                onClick={() => setSelectedTab('personal')}
                            >
                                <div className="flex items-center">
                                    <IconSquareRotated className="shrink-0" />
                                    <div className="ltr:ml-3 rtl:mr-3">Personligt</div>
                                </div>
                            </button>
                            <button
                                type="button"
                                className={`w-full flex justify-between items-center p-2 hover:bg-white-dark/10 rounded-md dark:hover:text-primary hover:text-primary dark:hover:bg-[#181F32] font-medium h-10 ${
                                    selectedTab === 'work' && 'bg-gray-100 dark:text-primary text-primary dark:bg-[#181F32]'
                                }`}
                                onClick={() => setSelectedTab('work')}
                            >
                                <div className="flex items-center">
                                    <IconSquareRotated className="shrink-0" />
                                    <div className="ltr:ml-3 rtl:mr-3">Arbete</div>
                                </div>
                            </button>
                        </div>
                    </PerfectScrollbar>
                </div>
            </div>

            {/* Huvudinnehåll */}
            <div className="panel flex-1 overflow-auto h-full">
                <div className="pb-5">
                    <button type="button" className="xl:hidden hover:text-primary" onClick={() => setIsShowNoteMenu(!isShowNoteMenu)}>
                        <IconMenu />
                    </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {filteredNotes.map((note) => (
                        <div
                            key={note.id}
                            className={`panel p-6 ${
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
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default NotesPage;
