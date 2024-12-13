import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ReactSortable } from 'react-sortablejs';
import IconPlusCircle from '../../components/Icon/IconPlusCircle';
import { createPost, fetchPosts, uploadImage } from '../../controllers/postsController'; // Import intermediary functions
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
    imageId?: string;
    date: string;
}

const CourseMaterial = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setPageTitle('Kursmaterial'));
        loadPosts(); // Fetch posts on component mount
    }, [dispatch]);

    const [projectList, setProjectList] = useState<Project[]>([
        { id: 1, title: 'Föreläsningar', tasks: [] },
        { id: 2, title: 'Dokument', tasks: [] },
        { id: 4, title: 'Böcker', tasks: [] },
        { id: 5, title: 'Podcasts', tasks: [] },
        { id: 6, title: 'Ljudböcker', tasks: [] },
        { id: 7, title: 'Dokumentärer', tasks: [] },
        { id: 8, title: 'Filmer', tasks: [] },
        { id: 9, title: 'Spel', tasks: [] },
        { id: 10, title: 'Virtuell Intelligens', tasks: [] },
    ]);

    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
    const [currentTask, setCurrentTask] = useState<Task | null>(null);
    const [currentProjectId, setCurrentProjectId] = useState<number | null>(null);

    // Load posts from the backend and populate the project list
    const loadPosts = async () => {
        try {
            const posts = await fetchPosts(); // Fetch posts via postsController
            const updatedProjects = [...projectList];

            // Distribute posts into respective projects (example logic)
            posts.forEach((post: any) => {
                const projectIndex = updatedProjects.findIndex((project) => project.id === 1); // Example: Place all posts in 'Föreläsningar'
                if (projectIndex !== -1) {
                    updatedProjects[projectIndex].tasks.push({
                        id: post._id,
                        title: post.title,
                        description: post.description,
                        imageId: post.imageId,
                        date: new Date(post.publishDate).toLocaleDateString(),
                        projectId: updatedProjects[projectIndex].id,
                    });
                }
            });

            setProjectList(updatedProjects);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    const handleAddTaskClick = (projectId: number) => {
        setCurrentProjectId(projectId);
        setCurrentTask({
            projectId,
            id: 0,
            title: '',
            description: '',
            imageId: undefined,
            date: '',
        });
        setIsTaskModalOpen(true);
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            try {
                const imageId = await uploadImage(file); // Use postsController for image upload
                setCurrentTask((prev) => (prev ? { ...prev, imageId } : prev));
            } catch (error) {
                console.error('Image upload failed:', error);
                alert('Failed to upload image');
            }
        }
    };

    const handleSaveTask = async () => {
        if (!currentTask || !currentTask.title || !currentTask.description) {
            alert('Vänligen fyll i alla fält.');
            return;
        }

        try {
            // Use postsController to create the post
            const response = await createPost({
                title: currentTask.title,
                description: currentTask.description,
                imageId: currentTask.imageId,
                projectId: 0,
            });

            console.log('Post skapad:', response);

            // Update UI locally
            const updatedProjects = projectList.map((project) => {
                if (project.id === currentProjectId) {
                    const tasks = [...project.tasks];
                    tasks.push({
                        projectId: currentProjectId,
                        id: response._id,
                        title: response.title,
                        description: response.description,
                        imageId: response.imageId,
                        date: new Date(response.publishDate).toLocaleDateString(),
                    });
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

    return (
        <div>
            <div className="flex justify-between items-center mb-5">
                <h1 className="text-2xl font-bold">Kursmaterial</h1>
            </div>

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
                                            {task.imageId && <img src={`http://localhost:3000/api/images/${task.imageId}`} alt="Task" className="w-full h-32 object-cover rounded-md mb-2" />}
                                            <h5 className="font-semibold">{task.title}</h5>
                                            <p className="text-sm">{task.description}</p>
                                            <span className="text-xs text-gray-500">{task.date}</span>
                                        </div>
                                    ))}
                                </ReactSortable>
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
