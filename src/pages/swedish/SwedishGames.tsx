import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';

const SwedishGames = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setPageTitle('Spel'));
    }, [dispatch]);

    const [projectList] = useState<any>([
        {
            id: 2,
            title: 'Pricka rätt verb',
            tasks: [
                {
                    id: 4,
                    title: 'Pricka rätt verb',
                    description: 'Ett interaktivt spel för att lära sig oregelbundna verb på ett roligt sätt.',
                    date: '12 Dec, 2023',
                    image: '/assets/images/verb.webp',
                    link: '/game/verb-shoot', // Example link
                },
            ],
        },
    ]);

    return (
        <div className="flex flex-col gap-5">
            {/* Project List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projectList.map((project: any) => (
                    <div key={project.id} className="panel p-4 rounded-lg shadow-md bg-green-200">
                        <h4 className="text-xl font-bold text-gray-800 mb-4">{project.title}</h4>
                        <div className="space-y-4">
                            {project.tasks.map((task: any) => (
                                <a
                                    key={task.id}
                                    href={task.link || '#'}
                                    className={`block p-3 rounded-lg ${['Pricka rätt verb'].includes(project.title) ? 'bg-white shadow-md flex flex-col items-center gap-4' : 'bg-gray-100'}`}
                                >
                                    {/* Show images for "Pricka rätt verb" */}
                                    {project.title === 'Pricka rätt verb' && task.image && <img src={task.image} alt={task.title} className="w-48 h-48 object-cover rounded-md" />}
                                    <div>
                                        <h5 className="font-semibold text-lg text-gray-700">{task.title}</h5>
                                        <p className="text-sm text-gray-600">{task.description}</p>
                                        <p className="text-xs text-gray-500 mt-2">📅 {task.date}</p>
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

export default SwedishGames;

