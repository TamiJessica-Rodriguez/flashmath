import { Tab } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { ReactSortable } from 'react-sortablejs';
import Swal from 'sweetalert2';

const Scrumboard = () => {
    const [projectList, setProjectList] = useState<any>({
        books: [{ id: 1, title: 'Läs kapitel 1 i boken', description: 'Fokusera på grundläggande begrepp.', date: '08 Aug, 2020' }],
        listen: [{ id: 2, title: 'Lyssna på föreläsning 2', description: 'Introduktion till lingvistik.', date: '10 Aug, 2020' }],
        video: [{ id: 3, title: 'Titta på videon om grammatik', description: 'Förstå regler för syntax.', date: '12 Aug, 2020' }],
        games: [{ id: 4, title: 'Spela ordbyggarspel', description: 'Träna ordförråd.', date: '14 Aug, 2020' }],
        vr: [{ id: 5, title: 'Utforska VR-miljö om biologi', description: 'Interaktiv lärmiljö.', date: '16 Aug, 2020' }],
    });

    const [activeTab, setActiveTab] = useState<string>('books'); // Tracks the currently active tab

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
        showMessage('Task has been deleted successfully.', 'error');
    };

    return (
        <Tab.Group
            defaultIndex={0} // Default to the first tab ("Böcker")
            onChange={(index) => {
                const tabNames = ['books', 'listen', 'video', 'games', 'vr'];
                setActiveTab(tabNames[index]);
            }}
        >
            <Tab.List className="mt-3 flex flex-wrap border-b border-gray-200 dark:border-gray-700">
                <Tab as={Fragment}>
                    {({ selected }) => (
                        <button className={`${selected ? '!border-b-danger text-danger' : ''} p-3 border-b-2 border-transparent hover:border-danger flex items-center`}>📖 Böcker</button>
                    )}
                </Tab>
                <Tab as={Fragment}>
                    {({ selected }) => (
                        <button className={`${selected ? '!border-b-danger text-danger' : ''} p-3 border-b-2 border-transparent hover:border-danger flex items-center`}>🎧 Lyssna</button>
                    )}
                </Tab>
                <Tab as={Fragment}>
                    {({ selected }) => (
                        <button className={`${selected ? '!border-b-danger text-danger' : ''} p-3 border-b-2 border-transparent hover:border-danger flex items-center`}>📹 Video</button>
                    )}
                </Tab>
                <Tab as={Fragment}>
                    {({ selected }) => <button className={`${selected ? '!border-b-danger text-danger' : ''} p-3 border-b-2 border-transparent hover:border-danger flex items-center`}>🎮 Spel</button>}
                </Tab>
                <Tab as={Fragment}>
                    {({ selected }) => <button className={`${selected ? '!border-b-danger text-danger' : ''} p-3 border-b-2 border-transparent hover:border-danger flex items-center`}>🥽 VR</button>}
                </Tab>
            </Tab.List>

            <Tab.Panels>
                <Tab.Panel>
                    {activeTab === 'books' ? (
                        <iframe src="/englishbooks" className="w-full h-[500px] border-0" title="Books Content"></iframe>
                    ) : (
                        <div className="relative pt-5">
                            <ReactSortable
                                list={projectList.books}
                                setList={(newState) => setProjectList({ ...projectList, books: newState })}
                                animation={200}
                                group={{ name: 'shared', pull: true, put: true }}
                                className="connect-sorting-content min-h-[150px]"
                            >
                                {projectList.books.map((task: any) => (
                                    <div key={task.id} className="sortable-list shadow bg-[#f4f4f4] dark:bg-white-dark/20 p-3 rounded-md mb-5 space-y-3">
                                        <div className="text-base font-medium">{task.title}</div>
                                        <p>{task.description}</p>
                                        <div className="flex justify-between items-center">
                                            <div className="font-medium flex items-center">
                                                <span className="mr-2">📅</span>
                                                <span>{task.date}</span>
                                            </div>
                                            <button onClick={() => deleteTask('books', task.id)} className="hover:text-danger">
                                                ❌
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </ReactSortable>
                        </div>
                    )}
                </Tab.Panel>

                {['listen', 'video', 'games', 'vr'].map((category, index) => (
                    <Tab.Panel key={index}>
                        <div className="relative pt-5">
                            <ReactSortable
                                list={projectList[category]}
                                setList={(newState) => setProjectList({ ...projectList, [category]: newState })}
                                animation={200}
                                group={{ name: 'shared', pull: true, put: true }}
                                className="connect-sorting-content min-h-[150px]"
                            >
                                {projectList[category].map((task: any) => (
                                    <div key={task.id} className="sortable-list shadow bg-[#f4f4f4] dark:bg-white-dark/20 p-3 rounded-md mb-5 space-y-3">
                                        <div className="text-base font-medium">{task.title}</div>
                                        <p>{task.description}</p>
                                        <div className="flex justify-between items-center">
                                            <div className="font-medium flex items-center">
                                                <span className="mr-2">📅</span>
                                                <span>{task.date}</span>
                                            </div>
                                            <button onClick={() => deleteTask(category, task.id)} className="hover:text-danger">
                                                ❌
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </ReactSortable>
                        </div>
                    </Tab.Panel>
                ))}
            </Tab.Panels>
        </Tab.Group>
    );
};

export default Scrumboard;
