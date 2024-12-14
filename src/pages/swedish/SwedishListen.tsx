import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';
import { fetchPosts } from '../../controllers/postsController';

interface Task {
    id: string;
    title: string;
    description?: string;
    imageId?: string;
    date: string;
    link?: string;
}

interface Category {
    id: number;
    title: string;
    tasks: Task[];
}

const SwedishListen = () => {
    const dispatch = useDispatch();

    const [projectList, setProjectList] = useState<Category[]>([]);

    useEffect(() => {
        dispatch(setPageTitle('Lyssna'));
        loadPosts();
    }, [dispatch]);

    const loadPosts = async () => {
        try {
            const posts = await fetchPosts();
            const categories = [
                { id: 1, title: 'Föreläsningar', tasks: [] as Task[] },
                { id: 4, title: 'Podcasts', tasks: [] as Task[] },
                { id: 5, title: 'Ljudböcker', tasks: [] as Task[] },
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
                        link: post.link, // Assuming link is part of the API response
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
                    <div key={project.id} className="panel p-4 rounded-lg shadow-md bg-green-200">
                        <h4 className="text-xl font-bold text-gray-800 mb-4">{project.title}</h4>
                        <div className="space-y-4">
                            {project.tasks.map((task: Task) => (
                                <a
                                    key={task.id}
                                    href={task.link || '#'}
                                    className={`block p-3 rounded-lg ${
                                        ['Ljudböcker', 'Podcasts', 'Föreläsningar'].includes(project.title) ? 'bg-white shadow-md flex items-center gap-4' : 'bg-gray-100'
                                    }`}
                                >
                                    {/* Visa bilder för "Ljudböcker", "Podcasts", och "Föreläsningar" */}
                                    {['Ljudböcker', 'Podcasts', 'Föreläsningar'].includes(project.title) && task.imageId && (
                                        <img src={`http://localhost:3000/api/images/${task.imageId}`} alt={task.title} className="w-24 h-32 object-cover rounded-md" />
                                    )}
                                    <div>
                                        <h5 className="font-semibold text-lg text-gray-700">{task.title}</h5>
                                        <p className="text-sm text-gray-600">{task.description}</p>
                                        <p className="text-xs text-gray-500 mt-2">{task.date}</p> {/* Datum utan emoji */}
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SwedishListen;
