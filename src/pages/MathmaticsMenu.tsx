import { Tab } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { ReactSortable } from 'react-sortablejs';
import Swal from 'sweetalert2';

const MathematicsMenu = () => {
    const [projectList, setProjectList] = useState<any>({
        books: [{ id: 1, title: 'Läs kapitel 1 i boken', description: 'Fokusera på grundläggande begrepp.', date: '08 Aug, 2020' }],
        listen: [{ id: 2, title: 'Lyssna på föreläsning 2', description: 'Introduktion till lingvistik.', date: '10 Aug, 2020' }],
        video: [{ id: 3, title: 'Titta på videon om grammatik', description: 'Förstå regler för syntax.', date: '12 Aug, 2020' }],
        games: [{ id: 4, title: 'Spela ordbyggarspel', description: 'Träna ordförråd.', date: '14 Aug, 2020' }],
        vr: [{ id: 5, title: 'Utforska VR-miljö om biologi', description: 'Interaktiv lärmiljö.', date: '16 Aug, 2020' }],
    });

    const [activeTab, setActiveTab] = useState<string>('books');

    const showMessage = (msg: string, type: 'success' | 'error' | 'warning' | 'info' | 'question' = 'success') => {
        Swal.fire({
            title: msg,
            icon: type,
            timer: 3000,
            toast: true,
            position: 'top-right',
            showConfirmButton: false,
        });
    };

    const deleteTask = (category: string, taskId: number) => {
        const updatedList = { ...projectList };
        updatedList[category] = updatedList[category].filter((task: any) => task.id !== taskId);
        setProjectList(updatedList);
        showMessage('Uppgiften har tagits bort.', 'error');
    };

    return (
        <Tab.Group
            defaultIndex={0}
            onChange={(index) => {
                const tabNames = ['books', 'listen', 'video', 'games', 'vr'];
                setActiveTab(tabNames[index]);
            }}
        >
            <Tab.List className="mt-3 flex flex-wrap border-b border-gray-200 dark:border-gray-700">
                {['📖 Böcker', '🎧 Lyssna', '📹 Video', '🎮 Spel', '🥽 VR'].map((label, idx) => (
                    <Tab as={Fragment} key={idx}>
                        {({ selected }) => (
                            <button
                                className={`p-4 border-b-2 border-transparent hover:border-primary flex items-center text-lg font-bold ${selected ? 'text-primary border-primary' : 'text-gray-600'}`}
                            >
                                {label}
                            </button>
                        )}
                    </Tab>
                ))}
            </Tab.List>

            <Tab.Panels>
                {Object.keys(projectList).map((category, index) => (
                    <Tab.Panel key={index} className="relative pt-5">
                        {activeTab === category && category === 'books' ? (
                            <iframe src="/englishbooks" className="w-full h-[500px] border-0 rounded-md shadow-md" title={`${category} Content`}></iframe>
                        ) : (
                            <ReactSortable
                                list={projectList[category]}
                                setList={(newState) => setProjectList({ ...projectList, [category]: newState })}
                                animation={200}
                                group={{ name: 'shared', pull: true, put: true }}
                                className="connect-sorting-content min-h-[150px] space-y-4"
                            >
                                {projectList[category].map((task: any) => (
                                    <div key={task.id} className="sortable-list shadow-md bg-white dark:bg-gray-800 p-4 rounded-lg mb-4 space-y-2">
                                        <div className="text-lg font-semibold text-gray-800">{task.title}</div>
                                        <p className="text-sm text-gray-600">{task.description}</p>
                                        <div className="flex justify-between items-center text-sm">
                                            <div className="font-medium text-gray-500 flex items-center">
                                                <span className="mr-2">📅</span>
                                                <span>{task.date}</span>
                                            </div>
                                            <button onClick={() => deleteTask(category, task.id)} className="hover:text-primary text-gray-500">
                                                ❌
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </ReactSortable>
                        )}
                    </Tab.Panel>
                ))}
            </Tab.Panels>
        </Tab.Group>
    );
};

export default MathematicsMenu;