import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';

const SwedishListen = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setPageTitle('Lyssna'));
    }, [dispatch]);

    const [projectList] = useState<any>([
        {
            id: 1,
            title: 'Föreläsningar',
            tasks: [
                {
                    id: 1,
                    day: 'Måndag',
                    title: 'Introduktion till Vikingatiden',
                    description: 'En översikt av Vikingarnas historia, deras kultur och samhällsstruktur.',
                    date: '08 Aug, 2020',
                    image: '/assets/images/pdf-icon.png',
                },
                {
                    id: 2,
                    day: 'Tisdag',
                    title: 'Vikingarnas Resor och Handelsvägar',
                    description: 'Utforska Vikingarnas omfattande resor till Nordamerika, Ryssland och andra delar av Europa.',
                    date: '09 Aug, 2020',
                    image: '/assets/images/pdf-icon.png',
                },
                {
                    id: 3,
                    day: 'Onsdag',
                    title: 'Vikingarnas Religion och Mytologi',
                    description: 'En djupdykning i den nordiska mytologin och de gudar som dyrkades av Vikingarna.',
                    date: '10 Aug, 2020',
                    image: '/assets/images/pdf-icon.png',
                },
            ],
        },
        {
            id: 2,
            title: 'Podcasts',
            tasks: [
                {
                    id: 4,
                    title: 'Vikingatiden: Handelsmän och Krigare',
                    description: 'En översikt av Vikingarnas roll som handelsmän och krigare under deras storhetstid.',
                    date: '08 Dec, 2023',
                    image: '/assets/images/vikingatiden.jpeg',
                    link: '/podcast1', // Example link
                },
                {
                    id: 5,
                    title: 'Vikingarnas Resor och Upptäckter',
                    description: 'Utforska Vikingarnas resor till Nordamerika, Ryssland och andra delar av världen.',
                    date: '10 Dec, 2023',
                    image: '/assets/images/vkinga2.jpeg',
                    link: '/podcast2', // Example link
                },
            ],
        },
        {
            id: 3,
            title: 'Ljudböcker',
            tasks: [
                {
                    id: 6,
                    title: 'Vikingar',
                    description: 'En djupgående analys av Vikingarnas liv och kultur.',
                    date: '12 Aug, 2020',
                    image: '/assets/images/vikingabok.webp',
                    link: '/audiobook1', // Example link
                },
                {
                    id: 7,
                    title: 'Allt om Vikingar',
                    description: 'En omfattande guide till Vikingarnas historia.',
                    date: '12 Aug, 2020',
                    image: '/assets/images/vikingabok3.webp',
                    link: '/audiobook2', // Example link
                },
                {
                    id: 8,
                    title: 'Vikingarnas värld',
                    description: 'Utforska Vikingarnas värld genom historiska berättelser.',
                    date: '12 Aug, 2020',
                    image: '/assets/images/vikingabook2.jpeg',
                    link: '/audiobook3', // Example link
                },
            ],
        },
    ]);

    return (
        <div className="flex flex-col gap-5">
            {/* Project List */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {projectList.map((project: any) => (
                    <div key={project.id} className="panel p-4 rounded-lg shadow-md bg-green-200">
                        <h4 className="text-xl font-bold text-gray-800 mb-4">{project.title}</h4>
                        <div className="space-y-4">
                            {project.tasks.map((task: any) => (
                                <a
                                    key={task.id}
                                    href={task.link || '#'}
                                    className={`block p-3 rounded-lg ${['Ljudböcker', 'Podcasts'].includes(project.title) ? 'bg-white shadow-md flex items-center gap-4' : 'bg-gray-100'}`}
                                >
                                    {/* Show images for "Ljudböcker" and "Podcasts" */}
                                    {['Ljudböcker', 'Podcasts'].includes(project.title) && task.image && <img src={task.image} alt={task.title} className="w-24 h-32 object-cover rounded-md" />}
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

export default SwedishListen;
