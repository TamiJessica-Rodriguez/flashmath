import { useState } from 'react';
import PersonalAssistant from './additon/components/PersonalAssistant'; // Import PersonalAssistant component

const StudyTechniques = () => {
    const [showAssistant, setShowAssistant] = useState(false);

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
                        <button onClick={() => setShowAssistant(true)} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg text-lg">
                            🧠 Be om hjälp från assistenten
                        </button>
                    </div>
                </div>
            </div>

            {/* Personal Assistant Modal */}
            {showAssistant && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-4xl">
                        <h2 className="text-2xl font-bold mb-4">Personlig Assistent</h2>
                        <PersonalAssistant onClose={() => setShowAssistant(false)} />
                        <div className="text-center mt-6">
                            <button onClick={() => setShowAssistant(false)} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg">
                                ↩ Tillbaka till Studieteknik
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StudyTechniques;
