// import { useRef, useState } from 'react';
// import PersonalAssistant from './additon/components/PersonalAssistant'; // Import PersonalAssistant component

// const StudyTechniques = () => {
//     const [showAssistant, setShowAssistant] = useState(false);
//     const assistantRef = useRef<HTMLDivElement>(null);

//     const handleShowAssistant = () => {
//         setShowAssistant(true);
//         setTimeout(() => {
//             assistantRef.current?.scrollIntoView({ behavior: 'smooth' });
//         }, 100); // Ensure it scrolls smoothly to the assistant section
//     };

//     return (
//         <div className="min-h-screen bg-gray-100 text-gray-800 p-6">
//             <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
//                 {/* Header */}
//                 <h1 className="text-3xl font-bold mb-6 text-center">Hjälp med Studieteknik</h1>
//                 <p className="text-lg text-center mb-6">Lär dig att studera smartare, inte hårdare. Utforska tips och verktyg för att förbättra din studieteknik.</p>

//                 {/* Tips Section */}
//                 <div className="space-y-6">
//                     <div className="bg-blue-100 p-4 rounded-lg shadow-md">
//                         <h2 className="text-xl font-bold mb-2">📚 Effektiv Lärning</h2>
//                         <p>Ta pauser regelbundet, använd tekniken Pomodoro för att dela upp din studietid i hanterbara delar och repetera ofta för att stärka ditt minne.</p>
//                     </div>
//                     <div className="bg-green-100 p-4 rounded-lg shadow-md">
//                         <h2 className="text-xl font-bold mb-2">✍️ Anteckningsteknik</h2>
//                         <p>Prova olika metoder som Cornell-metoden, mindmaps eller att skriva om information med egna ord för att bättre förstå materialet.</p>
//                     </div>
//                     <div className="bg-yellow-100 p-4 rounded-lg shadow-md">
//                         <h2 className="text-xl font-bold mb-2">🕒 Planera Din Tid</h2>
//                         <p>Använd en kalender eller en app för att schemalägga dina studier. Sätt upp tydliga mål för varje studietillfälle.</p>
//                     </div>
//                 </div>

//                 {/* Personal Assistant Section */}
//                 <div className="mt-10">
//                     <h2 className="text-2xl font-bold text-center mb-4">Behöver du hjälp?</h2>
//                     <p className="text-center mb-6">Om du har frågor eller vill ha skräddarsydd hjälp med studieteknik, använd den personliga assistenten.</p>
//                     <div className="flex justify-center">
//                         <button onClick={handleShowAssistant} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg text-lg">
//                             Be om hjälp från assistenten
//                         </button>
//                     </div>
//                 </div>
//             </div>

//             {/* Personal Assistant Section */}
//             {showAssistant && (
//                 <div ref={assistantRef} className="mt-10 max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
//                     <h2 className="text-2xl font-bold mb-4 text-center">Personlig Assistent</h2>
//                     <PersonalAssistant onClose={() => setShowAssistant(false)} />
//                     <div className="text-center mt-6">
//                         <button onClick={() => setShowAssistant(false)} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg">
//                             ↩ Tillbaka till Studieteknik
//                         </button>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default StudyTechniques;

import { useRef, useState } from 'react';
import PersonalAssistant from './additon/components/PersonalAssistant'; // Import PersonalAssistant component

const StudyTechniques = () => {
    const [showAssistant, setShowAssistant] = useState(false);
    const assistantRef = useRef<HTMLDivElement>(null);

    const handleShowAssistant = () => {
        setShowAssistant(true);
        setTimeout(() => {
            assistantRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100); // Ensure it scrolls smoothly to the assistant section
    };

    return (
        <div className="min-h-screen bg-gray-100 text-gray-800 p-6">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
                {/* Header */}
                <h1 className="text-3xl font-bold mb-6 text-center">Hjälp med Studieteknik</h1>
                <p className="text-lg text-center mb-6">Lär dig att studera smartare, inte hårdare. Utforska tips och verktyg för att förbättra din studieteknik.</p>

                {/* Tips Section */}
                <div className="space-y-6">
                    <div className="bg-blue-100 p-4 rounded-lg shadow-md">
                        <h2 className="text-xl font-bold mb-2">📚 Effektiv Lärning</h2>
                        <p>Ta pauser regelbundet, använd tekniken Pomodoro för att dela upp din studietid i hanterbara delar och repetera ofta för att stärka ditt minne.</p>
                    </div>
                    <div className="bg-green-100 p-4 rounded-lg shadow-md">
                        <h2 className="text-xl font-bold mb-2">✍️ Anteckningsteknik</h2>
                        <p>Prova olika metoder som Cornell-metoden, mindmaps eller att skriva om information med egna ord för att bättre förstå materialet.</p>
                    </div>
                    <div className="bg-yellow-100 p-4 rounded-lg shadow-md">
                        <h2 className="text-xl font-bold mb-2">🕒 Planera Din Tid</h2>
                        <p>Använd en kalender eller en app för att schemalägga dina studier. Sätt upp tydliga mål för varje studietillfälle.</p>
                    </div>
                </div>

                {/* Personal Assistant Section */}
                <div className="mt-10">
                    <h2 className="text-2xl font-bold text-center mb-4">Behöver du hjälp?</h2>
                    <p className="text-center mb-6">Om du har frågor eller vill ha skräddarsydd hjälp med studieteknik, använd den personliga assistenten.</p>
                    <div className="flex justify-center">
                        <button
                            onClick={handleShowAssistant}
                            className="bg-blue-700 hover:bg-blue-800 text-white py-3 px-8 rounded-lg text-lg font-semibold shadow-lg transition duration-200"
                            style={{
                                color: '#FFFFFF', // Vit textfärg
                                backgroundColor: '#1D4ED8', // Mörkblå bakgrund
                            }}
                        >
                            🧠 Be om hjälp från assistenten
                        </button>
                    </div>
                </div>
            </div>

            {/* Personal Assistant Section */}
            {showAssistant && (
                <div ref={assistantRef} className="mt-10 max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
                    <h2 className="text-2xl font-bold mb-4 text-center">Personlig Assistent</h2>
                    <PersonalAssistant onClose={() => setShowAssistant(false)} />
                    <div className="text-center mt-6">
                        <button
                            onClick={() => setShowAssistant(false)}
                            className="bg-blue-700 hover:bg-blue-800 text-white py-3 px-8 rounded-lg font-semibold shadow-lg transition duration-200"
                            style={{
                                color: '#FFFFFF',
                                backgroundColor: '#1D4ED8',
                            }}
                        >
                            ↩ Tillbaka till Studieteknik
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StudyTechniques;
