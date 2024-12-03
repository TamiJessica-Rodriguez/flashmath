import { Tab } from '@headlessui/react';
import { Fragment, useState } from 'react';
import Swal from 'sweetalert2';
import SwedishBooks from './SwedishBooks';
import SwedishGames from './SwedishGames'; // Import the SwedishGames component
import SwedishListen from './SwedishListen';
import SwedishVideo from './SwedishVideos'; // Import the SwedishVideo component
import SwedishVR from './SwedishVR'; // Import the SwedishVR component

const SwedishMenu = () => {
    const [activeTab, setActiveTab] = useState<string>('books');

    const showMessage = (msg: string, type: 'success' | 'error' | 'warning' | 'info' | 'question' = 'success') => {
        Swal.fire({
            title: msg,
            icon: type,
            timer: 3000,
            toast: true,
            position: 'top-right',
            showConfirmButton: false,
        });
    };

    return (
        <Tab.Group
            defaultIndex={0}
            onChange={(index) => {
                const tabNames = ['books', 'listen', 'video', 'games', 'vr'];
                setActiveTab(tabNames[index]);
            }}
        >
            <Tab.List className="mt-4 flex flex-wrap border-b border-gray-200 dark:border-gray-700">
                {['📖 Böcker', '🎧 Lyssna', '📹 Video', '🎮 Spel', '🥽 VR'].map((label, idx) => (
                    <Tab as={Fragment} key={idx}>
                        {({ selected }) => (
                            <button
                                className={`px-5 py-3 border-b-2 border-transparent hover:border-primary flex items-center text-lg font-bold ${
                                    selected ? 'text-primary border-primary' : 'text-gray-600'
                                }`}
                            >
                                {label}
                            </button>
                        )}
                    </Tab>
                ))}
            </Tab.List>

            <Tab.Panels className="mt-6">
                <Tab.Panel className="space-y-6">
                    {/* Render SwedishBooks Component for "Böcker" */}
                    <SwedishBooks />
                </Tab.Panel>
                <Tab.Panel className="space-y-6">
                    {/* Render SwedishListen Component for "Lyssna" */}
                    <SwedishListen />
                </Tab.Panel>
                <Tab.Panel className="space-y-6">
                    {/* Render SwedishVideo Component for "Video" */}
                    <SwedishVideo />
                </Tab.Panel>
                <Tab.Panel className="space-y-6">
                    {/* Render SwedishGames Component for "Spel" */}
                    <SwedishGames />
                </Tab.Panel>
                <Tab.Panel className="space-y-6">
                    {/* Render SwedishVR Component for "VR" */}
                    <SwedishVR />
                </Tab.Panel>
            </Tab.Panels>
        </Tab.Group>
    );
};

export default SwedishMenu;
