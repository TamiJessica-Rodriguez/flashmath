import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../store/themeConfigSlice';

const NaturalScience = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setPageTitle('Natural Science: Space Exploration'));
    }, [dispatch]);

    const [projectList] = useState<any>([
        {
            id: 1,
            title: 'Lectures',
            tasks: [
                {
                    id: 1,
                    day: 'Monday',
                    title: 'Introduction to Space Exploration',
                    description: 'An overview of the history and significance of space exploration.',
                    date: '08 Aug, 2024',
                    image: '/assets/images/space-icon.png',
                },
                {
                    id: 2,
                    day: 'Tuesday',
                    title: 'The Solar System',
                    description: 'Exploring the planets, moons, and other celestial bodies in our solar system.',
                    date: '09 Aug, 2024',
                    image: '/assets/images/solar-system.png',
                },
                {
                    id: 3,
                    day: 'Wednesday',
                    title: 'Astronomy and Telescopes',
                    description: 'Understanding how telescopes help us study the universe.',
                    date: '10 Aug, 2024',
                    image: '/assets/images/telescope.png',
                },
            ],
        },
        {
            id: 2,
            title: 'Documents',
            tasks: [
                {
                    id: 4,
                    title: 'Space Missions: Past and Present',
                    description: 'A detailed look at significant space missions like Apollo and Mars rovers.',
                    date: '08 Dec, 2024',
                    image: '/assets/images/space-mission.png',
                },
                {
                    id: 5,
                    title: 'Space Exploration Technologies',
                    description: 'How technology enables us to explore space further.',
                    date: '10 Dec, 2024',
                    image: '/assets/images/space-tech.png',
                },
            ],
        },
        {
            id: 3,
            title: 'Books',
            tasks: [
                {
                    id: 6,
                    title: 'Cosmos',
                    description: 'An in-depth exploration of the universe by Carl Sagan.',
                    date: '12 Aug, 2024',
                    image: '/assets/images/cosmos-book.jpg',
                },
                {
                    id: 7,
                    title: 'Astrophysics for People in a Hurry',
                    description: 'Neil deGrasse Tyson makes astrophysics accessible to everyone.',
                    date: '12 Aug, 2024',
                    image: '/assets/images/astrophysics-book.jpg',
                },
                {
                    id: 8,
                    title: 'The Universe in a Nutshell',
                    description: 'Stephen Hawking explains the universe in simple terms.',
                    date: '12 Aug, 2024',
                    image: '/assets/images/universe-book.jpg',
                },
            ],
        },
    ]);

    return (
        <div className="flex flex-col gap-5">
            {/* Project List */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {projectList.map((project: any) => (
                    <div
                        key={project.id}
                        className="panel p-4 rounded-lg shadow-md"
                        style={{
                            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Yellow with 50% transparency
                        }}
                    >
                        <h4 className="text-xl font-bold text-gray-800 mb-4">{project.title}</h4>
                        <div className="space-y-4">
                            {project.tasks.map((task: any) => (
                                <div key={task.id} className={`p-3 rounded-lg ${['Books', 'Documents'].includes(project.title) ? 'bg-white shadow-md flex items-center gap-4' : 'bg-gray-100'}`}>
                                    {/* Display images for "Books" and "Documents" */}
                                    {['Books', 'Documents'].includes(project.title) && task.image && <img src={task.image} alt={task.title} className="w-24 h-32 object-cover rounded-md" />}
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

            {/* File Upload Section */}
            {/* <div className="mt-8" style={{ backgroundColor: 'rgba(255, 223, 0, 0.5)' }}>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Upload Your Submissions</h3>
                <FileUploadPreview />
            </div> */}
        </div>
    );
};

export default NaturalScience;
