// import { Tab } from '@headlessui/react';
// import { Fragment, useState } from 'react';
// import Swal from 'sweetalert2';
// import { uploadSubmission } from '../../controllers/userController';
// import SwedishBooks from './SwedishBooks';
// import SwedishGames from './SwedishGames';
// import SwedishListen from './SwedishListen';
// import SwedishVideo from './SwedishVideos';
// import SwedishVR from './SwedishVR';

// const SwedishMenu = () => {
//     const [activeTab, setActiveTab] = useState<string>('books');
//     const [isUploading, setIsUploading] = useState(false);
//     const [fileTitle, setFileTitle] = useState<string>('');
//     const [selectedFile, setSelectedFile] = useState<File | null>(null); // State för vald fil

//     const showMessage = (msg: string, type: 'success' | 'error' | 'warning' | 'info' | 'question' = 'success') => {
//         Swal.fire({
//             title: msg,
//             icon: type,
//             timer: 3000,
//             toast: true,
//             position: 'top-right',
//             showConfirmButton: false,
//         });
//     };

//     const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const file = e.target.files?.[0];
//         if (!file) return;

//         if (file.type !== 'application/pdf') {
//             showMessage('Endast PDF-filer är tillåtna.', 'error');
//             setSelectedFile(null); // Nollställ vald fil
//             return;
//         }

//         setSelectedFile(file);
//         showMessage('Filen valdes framgångsrikt.', 'success');
//     };

//     const handleUpload = async () => {
//         if (!selectedFile || !fileTitle) {
//             showMessage('Ange en titel och välj en fil innan du laddar upp.', 'error');
//             return;
//         }

//         try {
//             setIsUploading(true);
//             await uploadSubmission(selectedFile, fileTitle);
//             setIsUploading(false);
//             setFileTitle('');
//             setSelectedFile(null);
//             showMessage('Filen laddades upp framgångsrikt!', 'success');
//         } catch (error) {
//             setIsUploading(false);
//             showMessage('Något gick fel vid uppladdningen.', 'error');
//         }
//     };

//     return (
//         <div>
//             <Tab.Group
//                 defaultIndex={0}
//                 onChange={(index) => {
//                     const tabNames = ['books', 'listen', 'video', 'games', 'vr'];
//                     setActiveTab(tabNames[index]);
//                 }}
//             >
//                 <Tab.List className="mt-4 flex flex-wrap border-b border-gray-200 dark:border-gray-700">
//                     {['📖 Böcker', '🎧 Lyssna', '📹 Video', '🎮 Spel', '🥽 VR'].map((label, idx) => (
//                         <Tab as={Fragment} key={idx}>
//                             {({ selected }) => (
//                                 <button
//                                     className={`px-5 py-3 border-b-2 border-transparent hover:border-primary flex items-center text-lg font-bold ${
//                                         selected ? 'text-primary border-primary' : 'text-gray-600'
//                                     }`}
//                                 >
//                                     {label}
//                                 </button>
//                             )}
//                         </Tab>
//                     ))}
//                 </Tab.List>

//                 <Tab.Panels className="mt-6">
//                     <Tab.Panel className="space-y-6">
//                         <SwedishBooks />
//                     </Tab.Panel>
//                     <Tab.Panel className="space-y-6">
//                         <SwedishListen />
//                     </Tab.Panel>
//                     <Tab.Panel className="space-y-6">
//                         <SwedishVideo />
//                     </Tab.Panel>
//                     <Tab.Panel className="space-y-6">
//                         <SwedishGames />
//                     </Tab.Panel>
//                     <Tab.Panel className="space-y-6">
//                         <SwedishVR />
//                     </Tab.Panel>
//                 </Tab.Panels>
//             </Tab.Group>

//             {/* File Upload Section */}
//             <div className="mt-8 p-4 bg-white shadow rounded-lg">
//                 <h3 className="text-xl font-bold mb-4">Ladda upp en PDF-fil</h3>
//                 <form className="space-y-4">
//                     <div>
//                         <label htmlFor="fileTitle" className="block text-sm font-medium text-gray-700">
//                             Titel på filen
//                         </label>
//                         <input
//                             type="text"
//                             id="fileTitle"
//                             className="w-full mt-1 p-2 border rounded-md"
//                             placeholder="Ange en titel för filen"
//                             value={fileTitle}
//                             onChange={(e) => setFileTitle(e.target.value)}
//                         />
//                     </div>
//                     <div>
//                         <label htmlFor="pdfFile" className="block text-sm font-medium text-gray-700">
//                             Välj en PDF-fil
//                         </label>
//                         <input
//                             type="file"
//                             id="pdfFile"
//                             accept="application/pdf"
//                             className="mt-1 block w-full text-sm text-gray-500 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
//                             onChange={handleFileChange}
//                         />
//                     </div>
//                     <button type="button" className={`btn ${isUploading ? 'btn-disabled' : 'btn-primary'}`} disabled={isUploading} onClick={handleUpload}>
//                         {isUploading ? 'Laddar upp...' : 'Ladda upp'}
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default SwedishMenu;

import { Tab } from '@headlessui/react';
import { Fragment, useState } from 'react';
import Swal from 'sweetalert2';
import { uploadSubmission } from '../../controllers/userController';
import SwedishBooks from './SwedishBooks';
import SwedishGames from './SwedishGames';
import SwedishListen from './SwedishListen';
import SwedishVideo from './SwedishVideos';
import SwedishVR from './SwedishVR';

const SwedishMenu = () => {
    const [activeTab, setActiveTab] = useState<string>('books');
    const [isUploading, setIsUploading] = useState(false);
    const [fileTitle, setFileTitle] = useState<string>('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

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

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.type !== 'application/pdf') {
            showMessage('Endast PDF-filer är tillåtna.', 'error');
            setSelectedFile(null);
            return;
        }

        setSelectedFile(file);
        showMessage('Filen valdes framgångsrikt.', 'success');
    };

    const handleUpload = async () => {
        if (!selectedFile || !fileTitle) {
            showMessage('Ange en titel och välj en fil innan du laddar upp.', 'error');
            return;
        }

        try {
            setIsUploading(true);
            await uploadSubmission(selectedFile, fileTitle);
            setIsUploading(false);
            setFileTitle('');
            setSelectedFile(null);
            showMessage('Filen laddades upp framgångsrikt!', 'success');
        } catch (error) {
            setIsUploading(false);
            showMessage('Något gick fel vid uppladdningen.', 'error');
        }
    };

    return (
        <div>
            <Tab.Group
                defaultIndex={0}
                onChange={(index) => {
                    const tabNames = ['books', 'listen', 'video', 'games', 'vr'];
                    setActiveTab(tabNames[index]);
                }}
            >
                <Tab.List className="mt-4 flex w-full justify-between border-b border-gray-200 dark:border-gray-700">
                    {[
                        { emoji: '📖', text: 'Läsa' },
                        { emoji: '🎧', text: 'Lyssna' },
                        { emoji: '📹', text: 'Video' },
                        { emoji: '🎮', text: 'Spela' },
                        { emoji: '🥽', text: 'Upplev' },
                    ].map((tab, idx) => (
                        <Tab as={Fragment} key={idx}>
                            {({ selected }) => (
                                <button
                                    className={`w-full flex flex-col items-center py-4 border-b-2 transition-all duration-200 ${
                                        selected ? 'text-primary border-primary' : 'text-gray-600 border-transparent'
                                    } hover:text-blue-500 hover:scale-110`}
                                >
                                    <span className="text-5xl" style={{ filter: 'brightness(1.2) saturate(1.5)' }}>
                                        {tab.emoji}
                                    </span>
                                    <span className="mt-2 text-base font-bold">{tab.text}</span>
                                </button>
                            )}
                        </Tab>
                    ))}
                </Tab.List>

                <Tab.Panels className="mt-6">
                    <Tab.Panel className="space-y-6">
                        <SwedishBooks />
                    </Tab.Panel>
                    <Tab.Panel className="space-y-6">
                        <SwedishListen />
                    </Tab.Panel>
                    <Tab.Panel className="space-y-6">
                        <SwedishVideo />
                    </Tab.Panel>
                    <Tab.Panel className="space-y-6">
                        <SwedishGames />
                    </Tab.Panel>
                    <Tab.Panel className="space-y-6">
                        <SwedishVR />
                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group>

            {/* File Upload Section */}
            <div className="mt-8 p-4 bg-white shadow rounded-lg">
                <h3 className="text-xl font-bold mb-4">Ladda upp en PDF-fil</h3>
                <form className="space-y-4">
                    <div>
                        <label htmlFor="fileTitle" className="block text-sm font-medium text-gray-700">
                            Titel på filen
                        </label>
                        <input
                            type="text"
                            id="fileTitle"
                            className="w-full mt-1 p-2 border rounded-md"
                            placeholder="Ange en titel för filen"
                            value={fileTitle}
                            onChange={(e) => setFileTitle(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="pdfFile" className="block text-sm font-medium text-gray-700">
                            Välj en PDF-fil
                        </label>
                        <input
                            type="file"
                            id="pdfFile"
                            accept="application/pdf"
                            className="mt-1 block w-full text-sm text-gray-500 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                            onChange={handleFileChange}
                        />
                    </div>
                    <button type="button" className={`btn ${isUploading ? 'btn-disabled' : 'btn-primary'}`} disabled={isUploading} onClick={handleUpload}>
                        {isUploading ? 'Laddar upp...' : 'Ladda upp'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SwedishMenu;
