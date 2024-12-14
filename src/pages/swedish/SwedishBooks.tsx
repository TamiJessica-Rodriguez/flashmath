import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchPosts } from '../../controllers/postsController';
import { setPageTitle } from '../../store/themeConfigSlice';

const SwedishBooks = () => {
    const dispatch = useDispatch();

    const [categoryList, setCategoryList] = useState<any[]>([
        { id: 1, title: 'Föreläsningar', tasks: [] },
        { id: 2, title: 'Dokument', tasks: [] },
        { id: 3, title: 'Böcker', tasks: [] },
    ]);

    useEffect(() => {
        dispatch(setPageTitle('Swedish Books'));
        loadPosts();
    }, [dispatch]);

    const loadPosts = async () => {
        try {
            const posts = await fetchPosts();
            const updatedCategories = categoryList.map((category) => ({
                ...category,
                tasks: posts.filter((post: any) => post.projectId === category.id),
            }));
            setCategoryList(updatedCategories);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    return (
        <div className="flex flex-col gap-5">
            <h1 className="text-2xl font-bold mb-5">Svenska Böcker och Material</h1>
            {/* Render categories */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {categoryList.map((category) => (
                    <div key={category.id} className="panel p-4 bg-gray-100 rounded-lg shadow-md">
                        <h4 className="text-xl font-bold mb-4">{category.title}</h4>
                        <div className="space-y-4">
                            {category.tasks.map((task: any) => (
                                <div key={task.id} className="p-3 rounded-lg bg-white shadow-md flex items-center gap-4">
                                    {/* Display image for "Böcker" and "Dokument" */}
                                    {['Böcker', 'Dokument'].includes(category.title) && task.imageId && (
                                        <img src={`http://localhost:3000/api/images/${task.imageId}`} alt={task.title} className="w-24 h-32 object-cover rounded-md" />
                                    )}
                                    <div>
                                        <h5 className="font-semibold text-lg text-gray-700">{task.title}</h5>
                                        <p className="text-sm text-gray-600">{task.description}</p>
                                        <p className="text-xs text-gray-500 mt-2">📅 {task.date}</p>
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
