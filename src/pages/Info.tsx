import { Tab } from '@headlessui/react';
import React, { Fragment, useEffect, useState } from 'react';
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
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

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
        { image: 'assets/images/boyreading.png', text: 'Läsa', alt: 'Pojke som läser' },
        { image: 'assets/images/boylistening.png', text: 'Lyssna', alt: 'Pojke som lyssnar' },
        { image: 'assets/images/flattv.png', text: 'Video', alt: 'Platt TV' },
        { image: 'assets/images/controlgame.png', text: 'Spela', alt: 'Spelkontroll' },
        { image: 'assets/images/girlVR.png', text: 'Upplev', alt: 'Flicka med VR-headset' },
    ];

    useEffect(() => {
        // Simulate data fetching
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

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

    const isFavorite = (item: Item) => favorites.some((fav) => fav.id === item.id);

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
        <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-800 flex flex-col gap-10 p-6">
            <div className="flex items-center justify-center">
                <input type="text" placeholder="Sök efter material..." className="w-full max-w-md p-3 rounded-lg border border-gray-500 bg-gray-100" value={searchTerm} onChange={handleSearch} />
            </div>

            <Tab.Group>
                <Tab.List className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:flex md:justify-between border-b border-gray-200">
                    {tabImages.map((tab, idx) => (
                        <Tab as={Fragment} key={idx}>
                            {({ selected }) => (
                                <button
                                    className={`flex flex-col items-center py-2 border-b-2 transition-all ${selected ? 'text-primary border-primary' : 'text-gray-600 border-transparent'}`}
                                    onClick={() => toggleCategory(tab.text)}
                                >
                                    <img src={tab.image} alt={tab.alt} className="w-12 h-12 sm:w-16 sm:h-16 mb-1" />
                                    <span className="text-sm sm:text-lg font-bold text-black">{tab.text}</span>
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
                                        navigation
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
                                                        <img src={item.image} alt={`Bild av ${item.title}`} className="w-full h-60 object-cover rounded-t-lg mb-3" />
                                                        <h3 className="text-lg font-semibold text-gray-700">{item.title}</h3>
                                                        <button onClick={() => toggleFavorite(item)} className="absolute bottom-3 right-3 p-2 bg-white rounded-full shadow">
                                                            <IconHeart className={`w-6 h-6 ${isFavorite(item) ? 'text-red-500' : 'text-gray-400'}`} fill={isFavorite(item)} />
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
