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

    // Data för korten
    const cards = [
        {
            title: 'Addition',
            image: './assets/images/mathFun.webp',
            description: 'Lär dig lägga till siffror på ett roligt sätt.',
            date: '25 Nov 2024',
            author: 'John Doe',
        },
        {
            title: 'Subtraktion',
            image: '/assets/images/mathorange.webp',
            description: 'Utforska subtraktion och bli en mästare på att räkna bakåt.',
            date: '22 Nov 2024',
            author: 'Jane Smith',
        },
        {
            title: 'Multiplikation',
            image: '/assets/images/mathpurple.webp',
            description: 'Öva multiplikationstabeller med spännande utmaningar.',
            date: '20 Nov 2024',
            author: 'Alice Brown',
        },
        {
            title: 'Labyrint',
            image: '/assets/images/labyrinth.jpeg',
            description: 'Navigera genom labyrinter och lös matematikgåtor.',
            date: '18 Nov 2024',
            author: 'Bob Green',
        },
    ];

    return (
        <div className="min-h-screen bg-white flex flex-col items-center">
            {/* Avatar och användarnamn */}
            <div className="fixed top-4 right-4 flex items-center space-x-4 bg-gray-100 p-2 rounded shadow-md">
                {user && (
                    <>
                        {user.avatar && <img src={`/assets/images/${user.avatar}`} alt="Avatar" className="w-10 h-10 rounded-full" />}
                        <span className="font-semibold text-gray-700">{user.username}</span>
                        <button onClick={handleLogout} className="text-sm text-red-500 hover:underline ml-2">
                            Logga ut
                        </button>
                    </>
                )}
            </div>

            {/* Titel och text */}
            <div className="mb-10 mt-4 md:mt-0 text-center">
                <h1 className="text-3xl md:text-4xl font-bold">Välkommen till FlashMath!</h1>
                <p className="text-lg mt-2">Välj en aktivitet nedan och börja öva på matematik.</p>
            </div>

            {/* Grid för kort */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cards.map((card, index) => (
                    <div
                        key={index}
                        onClick={() => navigate(`/${card.title.toLowerCase()}`)}
                        className="cursor-pointer max-w-[22rem] w-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded border border-gray-300 hover:shadow-xl transition-shadow"
                    >
                        <div className="py-7 px-6">
                            <div className="-mt-7 mb-7 -mx-6 rounded-tl rounded-tr h-[260px] overflow-hidden">
                                <img src={card.image} alt={card.title} className="w-full h-full object-cover" />
                            </div>
                            <p className="text-primary text-xs mb-1.5 font-bold">{card.date}</p>
                            <h5 className="text-[#3b3f5c] text-[15px] font-bold mb-4">{card.title}</h5>
                            <p className="text-gray-600">{card.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Main;
