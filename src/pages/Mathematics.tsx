import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Main = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState<{ username: string; avatar: string } | null>(null);

    // Fetch user data on mount
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    // Log out user
    const handleLogout = () => {
        localStorage.removeItem('user'); // Clear user data
        navigate('/login'); // Redirect to login page
    };

    // Data for the cards
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
            link: '/maze', // Add specific link for Labyrint
        },
    ];

    return (
        <div className="min-h-screen bg-white flex flex-col items-center">
            {/* Title and Text */}
            <div className="mb-10 mt-8 md:mt-12 text-center">
                {' '}
                {/* Increased margin above the title */}
                <h1 className="text-3xl md:text-4xl font-bold">Matematik</h1>
                <p className="text-lg mt-2">Välj en aktivitet nedan och börja öva på matematik.</p>
            </div>

            {/* Grid for Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cards.map((card, index) => (
                    <div
                        key={index}
                        onClick={() => navigate(card.title === 'Labyrint' ? '/maze' : `/${card.title.toLowerCase()}`)}
                        className="cursor-pointer bg-white shadow-md rounded overflow-hidden transition-transform duration-500 ease-in-out group hover:shadow-lg hover:scale-105"
                    >
                        <div className="relative h-64 overflow-hidden">
                            <img src={card.image} alt={card.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110" />
                        </div>
                        <div className="p-4">
                            <p className="text-primary text-xs font-bold mb-1">{card.date}</p>
                            <h5 className="text-gray-800 text-lg font-bold mb-2">{card.title}</h5>
                            <p className="text-gray-600">{card.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Main;
