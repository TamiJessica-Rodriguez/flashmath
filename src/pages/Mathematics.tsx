import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Main = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState<{ username: string; avatar: string } | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch user data on mount
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    // Log out user
    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    const cards = [
        {
            title: 'Addition',
            image: './assets/images/addition3.webp',
            description: 'Lär dig lägga till siffror på ett roligt sätt.',
            date: '25 Nov 2024',
            author: 'John Doe',
        },
        {
            title: 'Subtraktion',
            image: '/assets/images/minus.webp',
            description: 'Utforska subtraktion och bli en mästare på att räkna bakåt.',
            date: '22 Nov 2024',
            author: 'Jane Smith',
        },
        {
            title: 'Multiplikation',
            image: '/assets/images/times.webp',
            description: 'Öva multiplikationstabeller med spännande utmaningar.',
            date: '20 Nov 2024',
            author: 'Alice Brown',
        },
        {
            title: 'Labyrint',
            image: '/assets/images/startPage.webp',
            description: 'Navigera genom labyrinter och lös matematikgåtor.',
            date: '18 Nov 2024',
            author: 'Bob Green',
        },
    ];

    const handleCardClick = (title: string) => {
        if (title === 'Addition') {
            navigate(`/${title.toLowerCase()}`);
        } else {
            setShowModal(true);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="loader">Laddar...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-red-500">{error}</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white flex flex-col items-center" aria-label="Mathematics Page">
            {/* Title and Text */}
            <div className="mb-10 mt-8 md:mt-12 text-center">
                <h1 className="text-3xl md:text-4xl font-bold">Matematik</h1>
                <p className="text-lg mt-2">Välj en aktivitet nedan och börja öva på matematik.</p>
            </div>

            {/* Grid for Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" role="list">
                {cards.map((card, index) => (
                    <div
                        key={index}
                        onClick={() => handleCardClick(card.title)}
                        className={`cursor-pointer bg-white shadow-md rounded overflow-hidden transition-transform duration-500 ease-in-out group ${
                            ['Addition'].includes(card.title) ? 'hover:shadow-lg hover:scale-105' : 'opacity-50'
                        }`}
                        role="listitem"
                        aria-label={`Card for ${card.title}`}
                        tabIndex={0}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                handleCardClick(card.title);
                            }
                        }}
                    >
                        <div className="relative h-64 overflow-hidden">
                            <img
                                src={card.image}
                                alt={`Image for ${card.title} activity`}
                                className={`absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-in-out ${
                                    ['Addition'].includes(card.title) ? 'group-hover:scale-110' : ''
                                }`}
                            />
                        </div>
                        <div className="p-4">
                            <p className="text-primary text-xs font-bold mb-1">{card.date}</p>
                            <h5 className="text-gray-800 text-lg font-bold mb-2">{card.title}</h5>
                            <p className="text-gray-600">{card.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                        <h2 className="text-2xl font-bold mb-4">Under Konstruktion</h2>
                        <p className="mb-4">Sidan är under konstruktion och kommer att lanseras inom kort.</p>
                        <button onClick={() => setShowModal(false)} className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition">
                            Stäng
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Main;
