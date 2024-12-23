import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchPosts } from '../../controllers/postsController';
import { setPageTitle } from '../../store/themeConfigSlice';

interface Task {
    id: string;
    title: string;
    description?: string;
    imageId?: string;
    date: string;
}

interface Category {
    id: number;
    title: string;
    tasks: Task[];
}

const SwedishBooks = () => {
    const dispatch = useDispatch();

    const [projectList, setProjectList] = useState<Category[]>([]);

    useEffect(() => {
        dispatch(setPageTitle('Kursmaterial'));
        loadPosts();
    }, [dispatch]);

    const loadPosts = async () => {
        try {
            const posts = await fetchPosts();
            const categories = [
                { id: 1, title: 'Föreläsningar', tasks: [] as Task[] },
                { id: 2, title: 'Dokument', tasks: [] as Task[] },
                { id: 3, title: 'Böcker', tasks: [] as Task[] },
            ];

            posts.forEach((post: any) => {
                const category = categories.find((cat) => cat.id === post.projectId);
                if (category) {
                    category.tasks.push({
                        id: post._id,
                        title: post.title,
                        description: post.description,
                        imageId: post.imageId,
                        date: new Date(post.publishDate).toLocaleDateString(),
                    });
                }
            });

            setProjectList(categories);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    return (
        <div className="flex flex-col gap-5">
            {/* Project List */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {projectList.map((project: Category) => (
                    <div key={project.id} className="panel p-4 rounded-lg bg-blue-100/50 shadow-lg">
                        <h4 className="text-xl font-bold text-gray-800 mb-4">{project.title}</h4>
                        <div className="space-y-4">
                            {project.tasks.map((task: Task) => (
                                <div key={task.id} className="p-3 rounded-lg bg-white shadow-md flex items-center gap-4">
                                    {/* Visa bilder för "Böcker", "Dokument", och "Föreläsningar" */}
                                    {['Böcker', 'Dokument', 'Föreläsningar'].includes(project.title) && task.imageId && (
                                        <img src={`http://localhost:3000/api/images/${task.imageId}`} alt={task.title} className="w-24 h-32 object-cover rounded-md" />
                                    )}
                                    <div>
                                        <h5 className="font-semibold text-lg text-gray-700">{task.title}</h5>
                                        <p className="text-sm text-gray-600">{task.description}</p>
                                        <p className="text-xs text-gray-500 mt-2">{task.date}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SwedishBooks;
