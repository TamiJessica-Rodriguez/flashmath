import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
    const navigate = useNavigate();

    // Skapa en state för att lagra temat (sommar/vinter/höst/vår)
    const [theme, setTheme] = useState('summer'); // Default theme is summer

    // Funktion för att växla temat
    const toggleTheme = (selectedTheme: string) => {
        setTheme(selectedTheme);
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
        <div>
            {/* Bakgrundsbilden som separerad div */}
            <div
                className={`h-screen bg-cover bg-center`}
                style={{
                    backgroundImage: `url('./assets/images/${theme === 'summer' ? 'startPage.webp' : theme === 'winter' ? 'winter.webp' : theme === 'autumn' ? 'autumn.webp' : 'spring.webp'}')`,
                }}
            >
                {/* Växla tema-knapp */}
                <div className="absolute top-4 right-4 text-white text-3xl flex items-center space-x-2">
                    <button onClick={() => toggleTheme('summer')} title="Sommar">
                        🌞
                    </button>
                    <button onClick={() => toggleTheme('winter')} title="Vinter">
                        ❄️
                    </button>
                    <button onClick={() => toggleTheme('autumn')} title="Höst">
                        🍂
                    </button>
                    <button onClick={() => toggleTheme('spring')} title="Vår">
                        🌸
                    </button>
                </div>

                {/* Logga in-symbol med emoji och text */}
                <button
                    onClick={() => navigate('/login')}
                    className="fixed top-4 left-4 flex items-center justify-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300"
                >
                    <span role="img" aria-label="login" className="text-2xl">
                        🔑
                    </span>
                    <span>Logga in</span>
                </button>
            </div>

            {/* Föräldradiv som ligger under bakgrunden */}
            <div className="flex flex-col items-start justify-start min-h-screen px-4 md:px-0 mt-20">
                {/* Välkomsttext */}
                <div className="mb-10">
                    <h1 className="text-3xl md:text-4xl font-bold text-left text-white">Välkommen till FlashMath!</h1>
                    <p className="text-left text-lg text-white mt-2">Välj en aktivitet nedan och börja öva på matematik.</p>
                </div>

                {/* Föräldradiv med kort */}
                <div className="bg-white bg-opacity-50 p-6 rounded-lg shadow-md w-full max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-around">
                        {cards.map((card, index) => (
                            <div
                                key={index}
                                onClick={() => navigate(`/${card.title.toLowerCase()}`)}
                                className="cursor-pointer max-w-[16rem] w-full rounded border border-gray-300 hover:shadow-xl transition-shadow"
                            >
                                <div className="py-7 px-6">
                                    {/* Bild */}
                                    <div className="-mt-7 mb-7 -mx-6 rounded-tl rounded-tr h-[200px] overflow-hidden">
                                        <img src={card.image} alt={card.title} className="w-full h-full object-cover" />
                                    </div>

                                    {/* Datum och titel */}
                                    <p className="text-primary text-xs mb-1.5 font-bold">{card.date}</p>
                                    <h5 className="text-[#3b3f5c] text-[15px] font-bold mb-4">{card.title}</h5>

                                    {/* Beskrivning */}
                                    <p className="text-black">{card.description}</p>

                                    {/* Footer */}
                                    <div className="relative flex justify-between mt-6 pt-4 border-t border-gray-200">
                                        {/* Författare */}
                                        <div className="flex items-center font-semibold">
                                            <div className="w-9 h-9 rounded-full overflow-hidden inline-block mr-2">
                                                <span className="flex w-full h-full items-center justify-center bg-[#515365] text-white">AG</span>
                                            </div>
                                            <div className="text-[#515365]">{card.author}</div>
                                        </div>

                                        {/* Interaktioner */}
                                        <div className="flex font-semibold">
                                            <div className="text-primary flex items-center mr-3">
                                                <svg className="w-4 h-4 mr-1 fill-current text-primary">
                                                    <circle cx="12" cy="12" r="10" />
                                                </svg>
                                                51
                                            </div>
                                            <div className="text-primary flex items-center">
                                                <svg className="w-4 h-4 mr-1 fill-current text-primary">
                                                    <circle cx="12" cy="12" r="10" />
                                                </svg>
                                                250
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Index;
