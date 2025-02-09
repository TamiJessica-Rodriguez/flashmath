import React, { useEffect, useState } from 'react';
import AnimateHeight from 'react-animate-height';
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
    const [showSchedule, setShowSchedule] = useState<boolean>(false);
    const [scheduleHeight, setScheduleHeight] = useState<'auto' | 0>(0);
    const [showModal, setShowModal] = useState<boolean>(false);

    const notesList: Note[] = [
        { id: 3, title: '3A', date: '11/03/2020' },
        { id: 4, title: '3B', date: '11/04/2020' },
        { id: 5, title: '3C', date: '11/05/2020' },
        { id: 6, title: '4A', date: '11/06/2020' },
        { id: 1, title: '4B', date: '11/01/2020' },
        { id: 2, title: '4C', date: '11/02/2020' },
    ];

    const scheduleNotes: ScheduleNote[] = [
        { title: '4B', colorClass: 'bg-[#83b0e1]/50 opacity-50', startTime: '08:00', endTime: '09:30' },
        { title: '4C', colorClass: 'bg-[#83b0e1]/50 opacity-50', startTime: '10:00', endTime: '11:15' },
        { title: '3A', colorClass: 'bg-[#83b0e1]/50 opacity-50', startTime: '13:00', endTime: '14:30' },
        { title: '3C', colorClass: 'bg-[#83b0e1]/50 opacity-50', startTime: '15:00', endTime: '16:30' },
    ];

    useEffect(() => {
        dispatch(setPageTitle('Klasser'));

        const handleResize = () => {
            setIsMobile(window.innerWidth <= 640);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [dispatch]);

    const toggleSchedule = () => {
        setShowSchedule(!showSchedule);
        setScheduleHeight(showSchedule ? 0 : 'auto');
    };

    return (
        <div className="flex flex-col gap-5 sm:h-screen h-screen bg-gray-50 font-['Roboto'] overflow-auto" aria-label="Teacher Startpage">
            {/* Knapp för schema i mobilläge */}
            {isMobile && (
                <button
                    onClick={toggleSchedule}
                    className="w-full text-center bg-gray-700 text-white py-2 rounded-md shadow-md focus:ring-2 focus:ring-gray-500"
                    aria-label="Toggle schedule visibility"
                >
                    {showSchedule ? 'Dölj Schema' : 'Visa Schema'}
                </button>
            )}

            {/* Schema i mobil vy */}
            <AnimateHeight duration={300} height={scheduleHeight}>
                {isMobile && showSchedule && (
                    <div className="w-full bg-white shadow-lg p-4" role="dialog" aria-labelledby="mobile-schedule-title">
                        <div className="mb-4">
                            <h2 className="text-lg font-bold" id="mobile-schedule-title">
                                Idag: Tisdag
                            </h2>
                        </div>
                        <ScheduleColumn notes={scheduleNotes} />
                    </div>
                )}
            </AnimateHeight>

            {/* Huvudinnehåll */}
            <div className="flex flex-grow">
                <div className="panel flex-1 mr-5 overflow-auto">
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
                                    note.title === '3A' ? 'bg-[#83b0e1]/50 cursor-pointer hover:shadow-lg hover:scale-105 transition-transform' : 'bg-[#e1ecf7]/75 cursor-not-allowed'
                                } shadow-md rounded-lg flex items-center justify-center text-center`}
                                onClick={() => {
                                    if (note.title === '3A') {
                                        navigate('/coursematerials');
                                    } else {
                                        setShowModal(true);
                                    }
                                }}
                                role="listitem"
                                aria-label={note.title === '3A' ? `Navigate to ${note.title}` : `${note.title} is not clickable`}
                                aria-disabled={note.title !== '3A'}
                            >
                                <h2 className={`text-xl font-bold ${note.title === '3A' ? 'text-gray-800' : 'text-gray-400'}`}>{note.title}</h2>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Schema i desktop vy */}
                {!isMobile && (
                    <div className="w-64 flex-shrink-0 overflow-auto" aria-label="Daily schedule">
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

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                        <h2 className="text-2xl font-bold mb-4">Under Konstruktion</h2>
                        <p className="mb-4">Arbete pågår men sidan kommer lanseras snart.</p>
                        <button onClick={() => setShowModal(false)} className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition">
                            Stäng
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TeacherStartpage;
