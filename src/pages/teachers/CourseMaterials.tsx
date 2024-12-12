import { Dialog, Transition } from '@headlessui/react';
import axios from 'axios';
import { Fragment, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ReactSortable } from 'react-sortablejs';
import IconPlusCircle from '../../components/Icon/IconPlusCircle';
import { setPageTitle } from '../../store/themeConfigSlice';

interface Project {
    id: number;
    title: string;
    tasks: Task[];
}

interface Task {
    projectId: number;
    id: number;
    title: string;
    description?: string;
    fileUrl?: string;
    imageUrl?: string;
    date: string;
}

const CourseMaterial = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setPageTitle('Kursmaterial'));
    });

    const [projectList, setProjectList] = useState<Project[]>([
        { id: 1, title: 'Föreläsningar', tasks: [] },
        { id: 2, title: 'Dokument', tasks: [] },
        { id: 3, title: 'Böcker', tasks: [] },
    ]);

    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [currentTask, setCurrentTask] = useState<Task | null>(null);
    const [currentProjectId, setCurrentProjectId] = useState<number | null>(null);

    const handleAddTaskClick = (projectId: number) => {
        setCurrentProjectId(projectId);
        setCurrentTask({
            projectId,
            id: 0,
            title: '',
            description: '',
            fileUrl: undefined,
            imageUrl: undefined,
            date: '',
        });
        setIsTaskModalOpen(true);
    };

    const handleSaveTask = async () => {
        if (!currentTask || !currentTask.title || currentProjectId === null) {
            alert('Vänligen fyll i alla fält.');
            return;
        }

        try {
            // Skapa posten i backend
            const postData = {
                title: currentTask.title,
                content: currentTask.description || '',
                author: 'admin-id-here', // Ändra detta till rätt admin-ID
                brand: 'Material',
                imageId: currentTask.imageUrl,
                condition: 'new',
                color: 'N/A',
                size: 'N/A',
                publishDate: new Date().toISOString(),
            };

            const response = await axios.post('http://localhost:3000/api/posts', postData);

            console.log('Post skapad:', response.data);

            // Uppdatera projektet lokalt
            const updatedProjects = projectList.map((project) => {
                if (project.id === currentProjectId) {
                    const tasks = [...project.tasks];
                    if (currentTask.id === 0) {
                        const newTaskId = Math.max(...tasks.map((task) => task.id), 0) + 1;
                        tasks.push({ ...currentTask, id: newTaskId, date: new Date().toLocaleDateString() });
                    }
                    return { ...project, tasks };
                }
                return project;
            });

            setProjectList(updatedProjects);
            setIsTaskModalOpen(false);
        } catch (error) {
            console.error('Ett fel inträffade:', error);
            alert('Kunde inte skapa posten.');
        }
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const fileUrl = URL.createObjectURL(file);
            setCurrentTask((prev) => (prev ? { ...prev, fileUrl } : prev));
        }
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setCurrentTask((prev) => (prev ? { ...prev, imageUrl } : prev));
        }
    };

    return (
        <div>
            {/* Scrumboard */}
            <div className="relative pt-5">
                <div className="perfect-scrollbar h-full -mx-2">
                    <div className="overflow-x-auto flex items-start flex-nowrap gap-5 pb-2 px-2">
                        {projectList.map((project) => (
                            <div key={project.id} className="panel w-80 flex-none">
                                <div className="flex justify-between mb-5">
                                    <h4 className="text-base font-semibold">{project.title}</h4>
                                    <button onClick={() => handleAddTaskClick(project.id)} className="btn btn-outline-primary">
                                        <IconPlusCircle />
                                    </button>
                                </div>
                                <ReactSortable
                                    list={project.tasks}
                                    setList={(newState) => {
                                        const updatedProjects = projectList.map((p) => (p.id === project.id ? { ...p, tasks: newState } : p));
                                        setProjectList(updatedProjects);
                                    }}
                                    animation={200}
                                    group={{ name: 'shared', pull: true, put: true }}
                                    className="connect-sorting-content min-h-[150px]"
                                >
                                    {project.tasks.map((task) => (
                                        <div key={task.id} className="sortable-list p-4 shadow bg-white rounded-md mb-2">
                                            {task.imageUrl && <img src={task.imageUrl} alt="Task" className="w-full h-32 object-cover rounded-md mb-2" />}
                                            <h5 className="font-semibold">{task.title}</h5>
                                            <p className="text-sm">{task.description}</p>
                                            {task.fileUrl && (
                                                <a href={task.fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 text-sm">
                                                    Visa Fil
                                                </a>
                                            )}
                                            <span className="text-xs text-gray-500">{task.date}</span>
                                        </div>
                                    ))}
                                </ReactSortable>
                                <button onClick={() => handleAddTaskClick(project.id)} className="btn btn-primary mt-3 w-full">
                                    Lägg till uppgift
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Add/Edit Task Modal */}
            <Transition appear show={isTaskModalOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => setIsTaskModalOpen(false)}>
                    <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100">
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>
                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex items-center justify-center min-h-screen px-4">
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
                                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                                    {currentTask?.id === 0 ? 'Lägg till uppgift' : 'Redigera uppgift'}
                                </Dialog.Title>
                                <div className="mt-4">
                                    <label className="block text-sm font-medium text-gray-700">Titel</label>
                                    <input
                                        type="text"
                                        value={currentTask?.title || ''}
                                        onChange={(e) => setCurrentTask((prev) => (prev ? { ...prev, title: e.target.value } : prev))}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                                <div className="mt-4">
                                    <label className="block text-sm font-medium text-gray-700">Beskrivning</label>
                                    <textarea
                                        value={currentTask?.description || ''}
                                        onChange={(e) => setCurrentTask((prev) => (prev ? { ...prev, description: e.target.value } : prev))}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    ></textarea>
                                </div>
                                <div className="mt-4">
                                    <label className="block text-sm font-medium text-gray-700">Ladda upp bild</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                    />
                                </div>
                                <div className="mt-4">
                                    <label className="block text-sm font-medium text-gray-700">Ladda upp fil</label>
                                    <input
                                        type="file"
                                        accept="application/pdf"
                                        onChange={handleFileUpload}
                                        className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                    />
                                </div>
                                <div className="mt-6 flex justify-end space-x-3">
                                    <button type="button" onClick={() => setIsTaskModalOpen(false)} className="btn btn-outline-danger">
                                        Avbryt
                                    </button>
                                    <button onClick={handleSaveTask} className="btn btn-primary">
                                        Spara
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
};

export default CourseMaterial;

