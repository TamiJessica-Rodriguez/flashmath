import React, { useState } from 'react';
import { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';

const Info = () => {
    const [searchTerm, setSearchTerm] = useState('');

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
            title: 'Videos',
            items: [
                { id: 6, title: 'VR Äventyr', image: '/assets/images/VikingaVR2.webp' },
                { id: 7, title: 'svenskaövning', image: '/assets/images/svenska.webp' },
                { id: 8, title: 'Fåglar', image: '/assets/images/birds.webp' },
                { id: 9, title: 'Find the words', image: '/assets/images/englishGame.webp' },
                { id: 10, title: 'Fakta om Vikingar', image: '/assets/images/vikingatiden.jpeg' },
            ],
        },
        {
            title: 'Läsa',
            items: [
                { id: 11, title: 'Sagan Om Luna', image: '/assets/images/luna.webp' },
                { id: 12, title: 'Tomten', image: '/assets/images/Tomten.webp' },
                { id: 13, title: 'Sagan om Häxan', image: '/assets/images/skracksaga.webp' },
                { id: 14, title: 'Vikingarnas Historia', image: '/assets/images/Vikingaspel.webp' },
                { id: 15, title: 'Sjöfarare', image: '/assets/images/vkinga2.jpeg' },
            ],
        },
        {
            title: 'Spel',
            items: [
                { id: 16, title: 'Verb-spelet', image: '/assets/images/verb.webp' },
                { id: 17, title: 'VR Äventyr', image: '/assets/images/VikingaVR2.webp' },
                { id: 18, title: 'Interaktiv Mytologi', image: '/assets/images/Vikingaspel1.webp' },
                { id: 19, title: 'svenskaövning', image: '/assets/images/svenska.webp' },
                { id: 20, title: 'Find the words', image: '/assets/images/englishGame.webp' },
            ],
        },
    ];

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-400 to-gray-800 flex flex-col gap-10 p-6">
            {/* Welcome Text */}
            <div className="mb-6 text-center">
                <h1 className="text-3xl font-bold text-gray-100">Välkommen till InfoHyllan!</h1>
                <p className="text-lg text-gray-200">Utforska material för att lära dig och ha kul samtidigt.</p>
            </div>

            {/* Search Field */}
            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Sök efter bilder, videos, böcker eller spel..."
                    className="w-full p-3 rounded-lg border border-gray-500 shadow focus:outline-none focus:ring focus:border-primary bg-gray-100 text-gray-700"
                    value={searchTerm}
                    onChange={handleSearch}
                />
            </div>

            {/* Categories */}
            {categories.map((category, index) => (
                <div key={category.title} className="relative space-y-4">
                    <h2 className="text-2xl font-bold text-gray-200">{category.title}</h2>
                    <Swiper
                        modules={[Navigation]}
                        navigation={{
                            nextEl: `.swiper-button-next-${index}`,
                            prevEl: `.swiper-button-prev-${index}`,
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
                                    <div className="p-3 bg-white shadow-md rounded-lg flex flex-col items-center">
                                        <img src={item.image} alt={item.title} className="w-full h-40 object-cover rounded-md mb-3" />
                                        <h3 className="text-lg font-semibold text-gray-700">{item.title}</h3>
                                    </div>
                                </SwiperSlide>
                            ))}
                    </Swiper>
                    {/* Navigation buttons */}
                    <button className={`swiper-button-prev-${index} absolute top-1/2 left-0 transform -translate-y-1/2 z-10 p-2 bg-primary text-white rounded-full shadow`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button className={`swiper-button-next-${index} absolute top-1/2 right-0 transform -translate-y-1/2 z-10 p-2 bg-primary text-white rounded-full shadow`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            ))}
        </div>
    );
};

export default Info;
