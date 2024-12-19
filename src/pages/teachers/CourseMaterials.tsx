import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ReactSortable } from 'react-sortablejs';
import IconEdit from '../../components/Icon/IconEdit';
import IconPlusCircle from '../../components/Icon/IconPlusCircle';
import IconTrash from '../../components/Icon/IconTrash';
import { createPost, deletePost, fetchPosts, updatePost, uploadImage } from '../../controllers/postsController';
import { setPageTitle } from '../../store/themeConfigSlice';
import DeleteConfirmationModal from '../Components/DeleteConfirmationModal';

interface Category {
    id: number;
    title: string;
    tasks: Task[];
}

interface Task {
    projectId: number;
    id: string;
    title: string;
    description?: string;
    imageId?: string;
    date: string;
}

const CourseMaterial = () => {
    const dispatch = useDispatch();

    const [categoryList, setCategoryList] = useState<Category[]>([
        { id: 1, title: 'Föreläsningar', tasks: [] },
        { id: 2, title: 'Dokument', tasks: [] },
        { id: 3, title: 'Böcker', tasks: [] },
        { id: 4, title: 'Podcasts', tasks: [] },
        { id: 5, title: 'Ljudböcker', tasks: [] },
        { id: 6, title: 'Dokumentärer', tasks: [] },
        { id: 7, title: 'Filmer', tasks: [] },
        { id: 8, title: 'Spel', tasks: [] },
        { id: 9, title: 'Virtuell Intelligens', tasks: [] },
    ]);

    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
    const [currentTask, setCurrentTask] = useState<Task | null>(null);
    const [currentCategoryId, setCurrentCategoryId] = useState<number | null>(null);

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState<string | null>(null);

    useEffect(() => {
        dispatch(setPageTitle('Kursmaterial'));
        loadPosts();
    }, [dispatch]);

    const loadPosts = async () => {
        try {
            const posts = await fetchPosts();
            const updatedCategories = categoryList.map((category) => ({
                ...category,
                tasks: [] as Task[],
            }));

            posts.forEach((post: any) => {
                const categoryIndex = updatedCategories.findIndex((category) => category.id === post.projectId);
                if (categoryIndex !== -1) {
                    updatedCategories[categoryIndex].tasks.push({
                        id: post._id,
                        title: post.title,
                        description: post.description,
                        imageId: post.imageId,
                        date: new Date(post.publishDate).toLocaleDateString(),
                        projectId: post.projectId,
                    });
                }
            });

            setCategoryList(updatedCategories);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    const handleAddTaskClick = (categoryId: number) => {
        setCurrentCategoryId(categoryId);
        setCurrentTask({
            projectId: categoryId,
            id: '',
            title: '',
            description: '',
            imageId: undefined,
            date: '',
        });
        setIsTaskModalOpen(true);
    };

    const handleEditTask = (task: Task) => {
        setCurrentTask(task);
        setCurrentCategoryId(task.projectId);
        setIsTaskModalOpen(true);
    };

    const handleSaveTask = async () => {
        if (!currentTask || !currentTask.title || !currentTask.description) {
            alert('Vänligen fyll i alla fält.');
            return;
        }

        try {
            if (currentTask.id) {
                await updatePost(currentTask.id, {
                    title: currentTask.title,
                    description: currentTask.description,
                    imageId: currentTask.imageId,
                    projectId: currentTask.projectId,
                });
            } else {
                await createPost({
                    title: currentTask.title,
                    description: currentTask.description,
                    imageId: currentTask.imageId,
                    projectId: currentCategoryId || 0,
                });
            }

            await loadPosts();
            setIsTaskModalOpen(false);
        } catch (error) {
            console.error('Error saving task:', error);
            alert('Kunde inte spara uppgiften.');
        }
    };

    const handleDeleteTaskClick = (taskId: string) => {
        setTaskToDelete(taskId);
        setIsDeleteModalOpen(true);
    };

    const handleDeleteTask = async () => {
        if (taskToDelete) {
            try {
                await deletePost(taskToDelete);
                await loadPosts();
                setTaskToDelete(null);
            } catch (error) {
                console.error('Error deleting task:', error);
                alert('Kunde inte radera uppgiften.');
            }
        }
        setIsDeleteModalOpen(false);
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            try {
                const imageId = await uploadImage(file);
                setCurrentTask((prev) => (prev ? { ...prev, imageId } : prev));
            } catch (error) {
                console.error('Image upload failed:', error);
                alert('Kunde inte ladda upp bilden.');
            }
        }
    };

    return (
        <div>
            <h1 className="text-2xl font-bold">Kursmaterial</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {categoryList.map((category) => (
                    <div key={category.id} className="panel p-4 bg-gray-100 shadow-md rounded-lg" aria-labelledby={`category-title-${category.id}`}>
                        <div className="flex justify-between mb-4">
                            <h2 id={`category-title-${category.id}`} className="text-lg font-semibold">
                                {category.title}
                            </h2>
                            <button
                                onClick={() => handleAddTaskClick(category.id)}
                                className="btn btn-outline-primary flex items-center"
                                aria-label={`Lägg till en ny uppgift i kategorin ${category.title}`}
                            >
                                <IconPlusCircle className="text-blue-700" />
                                <span className="ml-1">Lägg till</span>
                            </button>
                        </div>
                        <div className="overflow-y-auto max-h-[300px]">
                            <ReactSortable
                                list={category.tasks}
                                setList={(newState) => {
                                    const updatedCategories = categoryList.map((c) => (c.id === category.id ? { ...c, tasks: newState } : c));
                                    setCategoryList(updatedCategories);
                                }}
                                animation={200}
                                group={{ name: 'shared', pull: true, put: true }}
                                className="space-y-2"
                            >
                                {category.tasks.map((task) => (
                                    <div key={`${category.id}-${task.id}`} className="bg-white shadow rounded-md p-4 relative flex" role="listitem" aria-label={`Uppgift: ${task.title}`}>
                                        {task.imageId && (
                                            <img src={`http://localhost:3000/api/images/${task.imageId}`} alt={`Bild för uppgift: ${task.title}`} className="w-24 h-24 object-cover rounded-md mr-4" />
                                        )}
                                        <div className="flex flex-col justify-between">
                                            <div>
                                                <h3 className="font-semibold break-words text-base">{task.title}</h3>
                                                <p className="text-sm text-gray-700">{task.description}</p>
                                            </div>
                                            <span className="text-xs text-gray-500">{task.date}</span>
                                        </div>
                                        <div className="absolute bottom-2 right-2 flex space-x-2">
                                            <button onClick={() => handleEditTask(task)} className="text-blue-700" aria-label={`Redigera uppgift: ${task.title}`}>
                                                <IconEdit />
                                            </button>
                                            <button onClick={() => handleDeleteTaskClick(task.id)} className="text-red-700" aria-label={`Radera uppgift: ${task.title}`}>
                                                <IconTrash />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </ReactSortable>
                        </div>
                    </div>
                ))}
            </div>

            {/* Delete Confirmation Modal */}
            <DeleteConfirmationModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} onConfirm={handleDeleteTask} />

            {/* Task Modal */}
            {isTaskModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center z-10" role="dialog" aria-modal="true" aria-labelledby="task-modal-title">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                        <h2 id="task-modal-title" className="text-lg font-bold mb-4">
                            {currentTask?.id ? 'Redigera Uppgift' : 'Lägg till Uppgift'}
                        </h2>
                        <div className="mb-4">
                            <label htmlFor="task-title" className="block text-sm font-medium mb-2">
                                Titel
                            </label>
                            <input
                                id="task-title"
                                type="text"
                                className="w-full border rounded p-2"
                                value={currentTask?.title || ''}
                                onChange={(e) => setCurrentTask((prev) => prev && { ...prev, title: e.target.value })}
                                aria-required="true"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="task-description" className="block text-sm font-medium mb-2">
                                Beskrivning
                            </label>
                            <textarea
                                id="task-description"
                                className="w-full border rounded p-2"
                                value={currentTask?.description || ''}
                                onChange={(e) => setCurrentTask((prev) => prev && { ...prev, description: e.target.value })}
                                aria-required="true"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="task-image" className="block text-sm font-medium mb-2">
                                Ladda upp bild
                            </label>
                            <input
                                id="task-image"
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                aria-describedby="image-upload-instructions"
                            />
                            <small id="image-upload-instructions" className="text-gray-600 text-xs">
                                Välj en bild att ladda upp för uppgiften.
                            </small>
                        </div>
                        <div className="flex justify-end space-x-3">
                            <button className="btn btn-outline-danger" onClick={() => setIsTaskModalOpen(false)} aria-label="Avbryt och stäng dialogrutan">
                                Avbryt
                            </button>
                            <button className="btn btn-primary" onClick={handleSaveTask} aria-label="Spara uppgiften">
                                Spara
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CourseMaterial;
