import { Tab } from '@headlessui/react';
import React, { Fragment, useState } from 'react';
import { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import IconHeart from '../components/Icon/IconHeart';

interface Item {
    id: number;
    title: string;
    image: string;
}

const Info = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const [favorites, setFavorites] = useState<Item[]>([]);

    const categories = [
        {
            title: 'Läsa',
            items: [
                { id: 1, title: 'Sagan om Luna', image: '/assets/images/luna.webp' },
                { id: 2, title: 'Tomten', image: '/assets/images/Tomten.webp' },
                { id: 3, title: 'Vikingarnas Historia', image: '/assets/images/Vikingaspel.webp' },
            ],
        },
        {
            title: 'Lyssna',
            items: [
                { id: 4, title: 'Ljudbok - Sagan om Luna', image: '/assets/images/luna_audio.webp' },
                { id: 5, title: 'Lyssna på Fåglar', image: '/assets/images/birds_audio.webp' },
            ],
        },
        {
            title: 'Video',
            items: [
                { id: 6, title: 'VR Äventyr', image: '/assets/images/VikingaVR2.webp' },
                { id: 7, title: 'Fakta om Vikingar', image: '/assets/images/vikingatiden.jpeg' },
            ],
        },
        {
            title: 'Spela',
            items: [
                { id: 8, title: 'Verb-spelet', image: '/assets/images/verb.webp' },
                { id: 9, title: 'Interaktiv Mytologi', image: '/assets/images/Vikingaspel1.webp' },
            ],
        },
        {
            title: 'Upplev',
            items: [
                { id: 10, title: 'Vikinga Äventyr', image: '/assets/images/VikingaAdventure.webp' },
                { id: 11, title: 'Historiska Strider', image: '/assets/images/historical_battle.webp' },
            ],
        },
    ];

    const tabImages = [
        { image: 'assets/images/boyreading.png', text: 'Läsa', style: 'w-20 h-20' },
        { image: 'assets/images/boylistening.png', text: 'Lyssna', style: 'w-20 h-20' },
        { image: 'assets/images/flattv.png', text: 'Video', style: 'w-25 h-20' },
        { image: 'assets/images/controlgame.png', text: 'Spela', style: 'w-20 h-20' },
        { image: 'assets/images/girlVR.png', text: 'Upplev', style: 'w-20 h-20' },
    ];

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const toggleCategory = (category: string) => {
        setActiveCategory((prev) => (prev === category ? null : category));
    };

    const toggleFavorite = (item: Item) => {
        setFavorites((prevFavorites) => {
            if (prevFavorites.some((fav) => fav.id === item.id)) {
                return prevFavorites.filter((fav) => fav.id !== item.id);
            } else {
                return [...prevFavorites, item];
            }
        });
    };

    const isFavorite = (item: Item) => {
        return favorites.some((fav) => fav.id === item.id);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-800 flex flex-col gap-10 p-6">
            <div className="relative w-full h-[550px] mb-6">
                <img src="/assets/images/topImageInfo.webp" alt="Top Image" className="w-full h-full object-cover rounded-lg shadow-lg bg-white" />
                <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-center text-center text-white p-6">
                    <h1 className="text-4xl font-bold mb-4">Välkommen till InfoHyllan!</h1>
                    <p className="text-lg mb-6">Utforska material för att lära dig och ha kul samtidigt.</p>

                    {/* Sökfält med etikett */}
                    <label htmlFor="search" className="sr-only">
                        Sök efter material
                    </label>
                    <input
                        id="search"
                        type="text"
                        placeholder="Sök efter bilder, videos, böcker eller spel..."
                        className="w-full max-w-md p-3 rounded-lg border border-gray-500 shadow focus:outline-none focus:ring focus:border-primary bg-gray-100 text-gray-700"
                        value={searchTerm}
                        onChange={handleSearch}
                        aria-label="Sök efter material" // För extra tillgänglighet
                    />
                </div>
            </div>

            {/* Tab Navigation for Categories */}
            <Tab.Group>
                <Tab.List className="mt-4 flex w-full justify-between border-b border-gray-200 dark:border-gray-700">
                    {tabImages.map((tab, idx) => (
                        <Tab as={Fragment} key={idx}>
                            {({ selected }) => (
                                <button
                                    className={`w-full flex flex-col items-center py-4 border-b-2 transition-all duration-200 ${
                                        selected ? 'text-primary border-primary' : 'text-gray-600 border-transparent'
                                    } hover:text-blue-500 hover:scale-110`}
                                    onClick={() => toggleCategory(tab.text)}
                                    aria-label={`Välj kategori: ${tab.text}`}
                                >
                                    <img src={tab.image} alt={tab.text} className={`${tab.style} mb-2`} />
                                    <span className="mt-2 text-base font-bold">{tab.text}</span>
                                </button>
                            )}
                        </Tab>
                    ))}
                </Tab.List>

                <div className="mt-6">
                    {categories.map(
                        (category, idx) =>
                            (activeCategory === null || activeCategory === category.title) && (
                                <div key={idx} className="space-y-6">
                                    <h2 className="text-2xl font-bold">{category.title}</h2>
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
                                                    <div className="relative flex flex-col items-center bg-white rounded-lg shadow">
                                                        <img src={item.image} alt={item.title} className="w-full h-60 object-cover rounded-t-lg mb-3" />
                                                        <h3 className="text-lg font-semibold text-gray-700">{item.title}</h3>

                                                        {/* Hjärtikon nere till höger */}
                                                        <button
                                                            onClick={() => toggleFavorite(item)}
                                                            className="absolute bottom-3 right-3 p-2 bg-white rounded-full shadow"
                                                            aria-label={isFavorite(item) ? `Ta bort ${item.title} från favoriter` : `Lägg till ${item.title} till favoriter`}
                                                        >
                                                            <IconHeart
                                                                className={`w-6 h-6 ${isFavorite(item) ? 'text-red-500' : 'text-gray-400'}`}
                                                                fill={isFavorite(item)} // Fyll hjärtat om det är favorit
                                                            />
                                                        </button>
                                                    </div>
                                                </SwiperSlide>
                                            ))}
                                    </Swiper>
                                </div>
                            )
                    )}
                </div>
            </Tab.Group>
        </div>
    );
};

export default Info;
