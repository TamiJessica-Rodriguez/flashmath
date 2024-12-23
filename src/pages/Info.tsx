// import React, { useState } from 'react';
// import { Navigation } from 'swiper';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import { Swiper, SwiperSlide } from 'swiper/react';

// const Info = () => {
//     const [searchTerm, setSearchTerm] = useState('');
//     const [activeCategory, setActiveCategory] = useState<string | null>(null);

//     const categories = [
//         {
//             title: 'Bilder',
//             items: [
//                 { id: 1, title: 'Vikingarnas Liv', image: '/assets/images/vikingatiden.jpeg' },
//                 { id: 2, title: 'Djurriket', image: '/assets/images/animals.webp' },
//                 { id: 3, title: 'Guldfiskar', image: '/assets/images/guldfisk.webp' },
//                 { id: 4, title: 'Vikingarnas Mytologi', image: '/assets/images/vikingabok3.webp' },
//                 { id: 5, title: 'Historiska Strider', image: '/assets/images/vikingabook2.jpeg' },
//             ],
//         },
//         {
//             title: 'Videos',
//             items: [
//                 { id: 6, title: 'VR Äventyr', image: '/assets/images/VikingaVR2.webp' },
//                 { id: 7, title: 'svenskaövning', image: '/assets/images/svenska.webp' },
//                 { id: 8, title: 'Fåglar', image: '/assets/images/birds.webp' },
//                 { id: 9, title: 'Find the words', image: '/assets/images/englishGame.webp' },
//                 { id: 10, title: 'Fakta om Vikingar', image: '/assets/images/vikingatiden.jpeg' },
//             ],
//         },
//         {
//             title: 'Läsa',
//             items: [
//                 { id: 11, title: 'Sagan Om Luna', image: '/assets/images/luna.webp' },
//                 { id: 12, title: 'Tomten', image: '/assets/images/Tomten.webp' },
//                 { id: 13, title: 'Sagan om Häxan', image: '/assets/images/skracksaga.webp' },
//                 { id: 14, title: 'Vikingarnas Historia', image: '/assets/images/Vikingaspel.webp' },
//                 { id: 15, title: 'Sjöfarare', image: '/assets/images/vkinga2.jpeg' },
//             ],
//         },
//         {
//             title: 'Spel',
//             items: [
//                 { id: 16, title: 'Verb-spelet', image: '/assets/images/verb.webp' },
//                 { id: 17, title: 'VR Äventyr', image: '/assets/images/VikingaVR2.webp' },
//                 { id: 18, title: 'Interaktiv Mytologi', image: '/assets/images/Vikingaspel1.webp' },
//                 { id: 19, title: 'svenskaövning', image: '/assets/images/svenska.webp' },
//                 { id: 20, title: 'Find the words', image: '/assets/images/englishGame.webp' },
//             ],
//         },
//     ];

//     const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setSearchTerm(e.target.value);
//     };

//     const toggleCategory = (category: string) => {
//         setActiveCategory((prev) => (prev === category ? null : category));
//     };

//     return (
//         <div className="min-h-screen bg-gradient-to-br to-gray-800 flex flex-col gap-10 p-6">
//             {/* Top Image with Black Overlay for Text and Search */}
//             <div className="relative w-full h-[450px] mb-6">
//                 <img
//                     src="/assets/images/topImageInfo.webp" // Din bild här
//                     alt="Top Image"
//                     className="w-full h-full object-cover rounded-lg shadow-lg bg-white"
//                 />
//                 <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-center text-center text-white p-6">
//                     <h1 className="text-4xl font-bold mb-4">Välkommen till InfoHyllan!</h1>
//                     <p className="text-lg mb-6">Utforska material för att lära dig och ha kul samtidigt.</p>

//                     {/* Search Field */}
//                     <input
//                         type="text"
//                         placeholder="Sök efter bilder, videos, böcker eller spel..."
//                         className="w-full max-w-md p-3 rounded-lg border border-gray-500 shadow focus:outline-none focus:ring focus:border-primary bg-gray-100 text-gray-700"
//                         value={searchTerm}
//                         onChange={handleSearch}
//                     />
//                 </div>
//             </div>

//             {/* Navigation Links */}
//             <div className="flex justify-around mb-6">
//                 {['Bilder', 'Videos', 'Läsa', 'Spel'].map((category) => (
//                     <button
//                         key={category}
//                         onClick={() => toggleCategory(category)}
//                         className={`text-lg font-bold px-4 py-2 rounded ${activeCategory === category ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
//                     >
//                         {category}
//                     </button>
//                 ))}
//             </div>

//             {/* Display Categories */}
//             {categories
//                 .filter((category) => !activeCategory || category.title === activeCategory)
//                 .map((category, index) => (
//                     <div key={category.title} className="relative space-y-4">
//                         <h2 className="text-2xl font-bold text-gray-200">{category.title}</h2>
//                         <Swiper
//                             modules={[Navigation]}
//                             navigation={{
//                                 nextEl: `.swiper-button-next-${index}`,
//                                 prevEl: `.swiper-button-prev-${index}`,
//                             }}
//                             spaceBetween={30}
//                             slidesPerView={3}
//                             breakpoints={{
//                                 1024: { slidesPerView: 3 },
//                                 768: { slidesPerView: 2 },
//                                 480: { slidesPerView: 1 },
//                             }}
//                         >
//                             {category.items
//                                 .filter((item) => item.title.toLowerCase().includes(searchTerm.toLowerCase()))
//                                 .map((item) => (
//                                     <SwiperSlide key={item.id}>
//                                         <div className="p-3 bg-white shadow-md rounded-lg flex flex-col items-center">
//                                             <img src={item.image} alt={item.title} className="w-full h-40 object-cover rounded-md mb-3" />
//                                             <h3 className="text-lg font-semibold text-gray-700">{item.title}</h3>
//                                         </div>
//                                     </SwiperSlide>
//                                 ))}
//                         </Swiper>
//                         {/* Navigation buttons */}
//                         <button className={`swiper-button-prev-${index} absolute top-1/2 left-0 transform -translate-y-1/2 z-10 p-2 bg-primary text-white rounded-full shadow`}>
//                             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
//                             </svg>
//                         </button>
//                         <button className={`swiper-button-next-${index} absolute top-1/2 right-0 transform -translate-y-1/2 z-10 p-2 bg-primary text-white rounded-full shadow`}>
//                             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
//                             </svg>
//                         </button>
//                     </div>
//                 ))}
//         </div>
//     );
// };

// export default Info;

import { Tab } from '@headlessui/react';
import React, { Fragment, useState } from 'react';
import { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';

const Info = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState<string | null>(null);

    const categories = [
        {
            title: 'Bilder',
            items: [
                { id: 1, title: 'Vikingarnas Liv', image: '/assets/images/vikingatiden.jpeg' },
                { id: 2, title: 'Djurriket', image: '/assets/images/animals.webp' },
                { id: 3, title: 'Guldfiskar', image: '/assets/images/guldfisk.webp' },
                { id: 4, title: 'Vikingarnas Mytologi', image: '/assets/images/vikingabok3.webp' },
                { id: 5, title: 'Historiska Strider', image: '/assets/images/vikingabook2.jpeg' },
            ],
        },
        {
            title: 'Lyssna',
            items: [
                { id: 6, title: 'Ljudbok - Sagan om Luna', image: '/assets/images/luna_audio.webp' },
                { id: 7, title: 'Lyssna på Fåglar', image: '/assets/images/birds_audio.webp' },
            ],
        },
        {
            title: 'Titta',
            items: [
                { id: 8, title: 'VR Äventyr', image: '/assets/images/VikingaVR2.webp' },
                { id: 9, title: 'Fakta om Vikingar', image: '/assets/images/vikingatiden.jpeg' },
            ],
        },
        {
            title: 'Spela',
            items: [
                { id: 10, title: 'Verb-spelet', image: '/assets/images/verb.webp' },
                { id: 11, title: 'Interaktiv Mytologi', image: '/assets/images/Vikingaspel1.webp' },
            ],
        },
        {
            title: 'Upplev',
            items: [
                { id: 12, title: 'Vikinga Äventyr', image: '/assets/images/VikingaAdventure.webp' },
                { id: 13, title: 'Historiska Strider', image: '/assets/images/historical_battle.webp' },
            ],
        },
        {
            title: 'Läsa',
            items: [
                { id: 14, title: 'Sagan Om Luna', image: '/assets/images/luna.webp' },
                { id: 15, title: 'Tomten', image: '/assets/images/Tomten.webp' },
                { id: 16, title: 'Sagan om Häxan', image: '/assets/images/skracksaga.webp' },
                { id: 17, title: 'Vikingarnas Historia', image: '/assets/images/Vikingaspel.webp' },
            ],
        },
    ];

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const toggleCategory = (category: string) => {
        setActiveCategory((prev) => (prev === category ? null : category));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br to-gray-800 flex flex-col gap-10 p-6">
            {/* Top Image with Black Overlay for Text and Search */}
            <div className="relative w-full h-[450px] mb-6">
                <img
                    src="/assets/images/topImageInfo.webp" // Din bild här
                    alt="Top Image"
                    className="w-full h-full object-cover rounded-lg shadow-lg bg-white"
                />
                <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-center text-center text-white p-6">
                    <h1 className="text-4xl font-bold mb-4">Välkommen till InfoHyllan!</h1>
                    <p className="text-lg mb-6">Utforska material för att lära dig och ha kul samtidigt.</p>

                    {/* Search Field */}
                    <input
                        type="text"
                        placeholder="Sök efter bilder, videos, böcker eller spel..."
                        className="w-full max-w-md p-3 rounded-lg border border-gray-500 shadow focus:outline-none focus:ring focus:border-primary bg-gray-100 text-gray-700"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </div>
            </div>

            {/* Tab Navigation for Categories */}
            <Tab.Group defaultIndex={0} onChange={(index) => setActiveCategory(categories[index].title)}>
                <Tab.List className="mt-4 flex w-full justify-between border-b border-gray-200 dark:border-gray-700">
                    {categories.map((category, idx) => (
                        <Tab as={Fragment} key={idx}>
                            {({ selected }) => (
                                <button
                                    className={`w-full flex flex-col items-center py-4 border-b-2 transition-all duration-200 ${
                                        selected ? 'text-primary border-primary' : 'text-gray-600 border-transparent'
                                    } hover:text-blue-500 hover:scale-110`}
                                >
                                    <img src={`/assets/images/${category.title.toLowerCase()}_icon.png`} alt={category.title} className="w-20 h-20 mb-2" />
                                    <span className="mt-2 text-base font-bold">{category.title}</span>
                                </button>
                            )}
                        </Tab>
                    ))}
                </Tab.List>

                <Tab.Panels className="mt-6">
                    {categories.map((category, idx) => (
                        <Tab.Panel key={idx} className="space-y-6">
                            <Swiper
                                modules={[Navigation]}
                                navigation={{
                                    nextEl: `.swiper-button-next-${idx}`,
                                    prevEl: `.swiper-button-prev-${idx}`,
                                }}
                                spaceBetween={30}
                                slidesPerView={3}
                                breakpoints={{
                                    1024: { slidesPerView: 3 },
                                    768: { slidesPerView: 2 },
                                    480: { slidesPerView: 1 },
                                }}
                            >
                                {category.items
                                    .filter((item) => item.title.toLowerCase().includes(searchTerm.toLowerCase()))
                                    .map((item) => (
                                        <SwiperSlide key={item.id}>
                                            {/* Removed the surrounding box */}
                                            <div className="flex flex-col items-center">
                                                <img src={item.image} alt={item.title} className="w-full h-60 object-cover rounded-md mb-3" />
                                                <h3 className="text-lg font-semibold text-gray-700">{item.title}</h3>
                                            </div>
                                        </SwiperSlide>
                                    ))}
                            </Swiper>
                            {/* Navigation buttons */}
                            <button className={`swiper-button-prev-${idx} absolute top-1/2 left-0 transform -translate-y-1/2 z-10 p-2 bg-primary text-white rounded-full shadow`}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <button className={`swiper-button-next-${idx} absolute top-1/2 right-0 transform -translate-y-1/2 z-10 p-2 bg-primary text-white rounded-full shadow`}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </Tab.Panel>
                    ))}
                </Tab.Panels>
            </Tab.Group>
        </div>
    );
};

export default Info;
