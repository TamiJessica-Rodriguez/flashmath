import { Tab } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // För navigation
import Swal from 'sweetalert2';

const MathematicsMenu = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<string>('overview'); // Standard flik

    useEffect(() => {
        // Vid laddning, omdirigera till "/mathematics" om inte redan där
        if (window.location.pathname !== '/mathematics') {
            navigate('/mathematics');
        }
    }, [navigate]);

    const tabNames = ['overview', 'video', 'games', 'vr']; // Flikarnas identiteter

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
            onChange={(index) => setActiveTab(tabNames[index])} // Hantera aktiv flik
        >
            <Tab.List className="mt-4 flex flex-wrap border-b border-gray-200 dark:border-gray-700">
                {['📚 Matematik', '📹 Video', '🎮 Spel', '🥽 VR'].map((label, idx) => (
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
                    {/* Innehåll för "Matematik" */}
                    <div className="p-6 bg-white rounded-lg shadow-md">
                        <h2 className="text-xl font-bold">Översikt</h2>
                        <p>Här hittar du en överblick över matematikens resurser.</p>
                    </div>
                </Tab.Panel>
                <Tab.Panel className="space-y-6">
                    {/* Innehåll för "Video" */}
                    <div className="p-6 bg-white rounded-lg shadow-md">
                        <h2 className="text-xl font-bold">Videor</h2>
                        <p>Utforska matematikvideor för djupare lärande.</p>
                    </div>
                </Tab.Panel>
                <Tab.Panel className="space-y-6">
                    {/* Innehåll för "Spel" */}
                    <div className="p-6 bg-white rounded-lg shadow-md">
                        <h2 className="text-xl font-bold">Spel</h2>
                        <p>Engagera dig i interaktiva spel för att förbättra dina färdigheter i matematik.</p>
                    </div>
                </Tab.Panel>
                <Tab.Panel className="space-y-6">
                    {/* Innehåll för "VR" */}
                    <div className="p-6 bg-white rounded-lg shadow-md">
                        <h2 className="text-xl font-bold">VR</h2>
                        <p>Upplev matematik i en virtuell verklighet.</p>
                    </div>
                </Tab.Panel>
            </Tab.Panels>
        </Tab.Group>
    );
};

export default MathematicsMenu;
