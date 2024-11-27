// import { useNavigate } from 'react-router-dom';

// const Index = () => {
//     const navigate = useNavigate();

//     // Data för korten
//     const cards = [
//         {
//             title: 'Addition',
//             image: './assets/images/mathFun.webp',
//             description: 'Lär dig lägga till siffror på ett roligt sätt.',
//             date: '25 Nov 2024',
//             author: 'John Doe',
//         },
//         {
//             title: 'Subtraktion',
//             image: '/assets/images/mathorange.webp',
//             description: 'Utforska subtraktion och bli en mästare på att räkna bakåt.',
//             date: '22 Nov 2024',
//             author: 'Jane Smith',
//         },
//         {
//             title: 'Multiplikation',
//             image: '/assets/images/mathpurple.webp',
//             description: 'Öva multiplikationstabeller med spännande utmaningar.',
//             date: '20 Nov 2024',
//             author: 'Alice Brown',
//         },
//         {
//             title: 'Labyrint',
//             image: '/assets/images/labyrinth.jpeg',
//             description: 'Navigera genom labyrinter och lös matematikgåtor.',
//             date: '18 Nov 2024',
//             author: 'Bob Green',
//         },
//     ];

//     return (
//         <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 md:px-0">
//             <div className="mb-10 mt-4 md:mt-0">
//                 <h1 className="text-3xl md:text-4xl font-bold text-center">Välkommen till FlashMath!</h1>
//                 <p className="text-center text-lg mt-2">Välj en aktivitet nedan och börja öva på matematik.</p>
//             </div>

//             {/* Grid för kort */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {cards.map((card, index) => (
//                     <div
//                         key={index}
//                         onClick={() => navigate(`/${card.title.toLowerCase()}`)}
//                         className="cursor-pointer max-w-[22rem] w-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded border border-gray-300 hover:shadow-xl transition-shadow"
//                     >
//                         <div className="py-7 px-6">
//                             {/* Bild */}
//                             <div className="-mt-7 mb-7 -mx-6 rounded-tl rounded-tr h-[260px] overflow-hidden">
//                                 <img src={card.image} alt={card.title} className="w-full h-full object-cover" />
//                             </div>

//                             {/* Datum och titel */}
//                             <p className="text-primary text-xs mb-1.5 font-bold">{card.date}</p>
//                             <h5 className="text-[#3b3f5c] text-[15px] font-bold mb-4">{card.title}</h5>

//                             {/* Beskrivning */}
//                             <p className="text-gray-600">{card.description}</p>

//                             {/* Footer */}
//                             <div className="relative flex justify-between mt-6 pt-4 border-t border-gray-200">
//                                 {/* Författare */}
//                                 <div className="flex items-center font-semibold">
//                                     <div className="w-9 h-9 rounded-full overflow-hidden inline-block mr-2">
//                                         <span className="flex w-full h-full items-center justify-center bg-[#515365] text-white">AG</span>
//                                     </div>
//                                     <div className="text-[#515365]">{card.author}</div>
//                                 </div>

//                                 {/* Interaktioner */}
//                                 <div className="flex font-semibold">
//                                     <div className="text-primary flex items-center mr-3">
//                                         <svg className="w-4 h-4 mr-1 fill-current text-primary">
//                                             <circle cx="12" cy="12" r="10" />
//                                         </svg>
//                                         51
//                                     </div>
//                                     <div className="text-primary flex items-center">
//                                         <svg className="w-4 h-4 mr-1 fill-current text-primary">
//                                             <circle cx="12" cy="12" r="10" />
//                                         </svg>
//                                         250
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default Index;

import { useNavigate } from 'react-router-dom';

const Index = () => {
    const navigate = useNavigate();

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
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 md:px-0">
            {/* Logga in-symbol */}
            <button
                onClick={() => navigate('/login')}
                className="fixed top-4 left-4 w-10 h-10 rounded-full bg-blue-500 hover:bg-blue-600 flex items-center justify-center text-white shadow-lg transition duration-300"
            >
                {/* Heroicons Login Symbol */}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-7.5A2.25 2.25 0 003.75 5.25v13.5A2.25 2.25 0 006 21h7.5a2.25 2.25 0 002.25-2.25V15m0-3h-10.5m10.5 0L19.5 12m-3.75 0 3.75 3"
                    />
                </svg>
            </button>

            {/* Titel och text */}
            <div className="mb-10 mt-4 md:mt-0">
                <h1 className="text-3xl md:text-4xl font-bold text-center">Välkommen till FlashMath!</h1>
                <p className="text-center text-lg mt-2">Välj en aktivitet nedan och börja öva på matematik.</p>
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
                            {/* Bild */}
                            <div className="-mt-7 mb-7 -mx-6 rounded-tl rounded-tr h-[260px] overflow-hidden">
                                <img src={card.image} alt={card.title} className="w-full h-full object-cover" />
                            </div>

                            {/* Datum och titel */}
                            <p className="text-primary text-xs mb-1.5 font-bold">{card.date}</p>
                            <h5 className="text-[#3b3f5c] text-[15px] font-bold mb-4">{card.title}</h5>

                            {/* Beskrivning */}
                            <p className="text-gray-600">{card.description}</p>

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
    );
};

export default Index;
