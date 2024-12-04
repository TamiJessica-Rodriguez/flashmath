import axios from 'axios';
import React, { useState } from 'react';

interface WoogleProps {
    onClose: () => void; // Define onClose as a function
}

const PersonalAssistant: React.FC<WoogleProps> = ({ onClose }) => {
    const [query, setQuery] = useState(''); // Fråga som användaren skriver
    const [response, setResponse] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState<File | null>(null); // För att hantera uppladdade filer
    const [fileContent, setFileContent] = useState<string | null>(null); // För att lagra filens innehåll

    const safetyFilter = (content: string): boolean => {
        const forbiddenWords = ['skada', 'göra illa', 'döda', 'självmord', 'slåss'];
        return forbiddenWords.some((word) => content.toLowerCase().includes(word));
    };

    // Hantera textfrågan (sökfråga)
    const handleSearch = async () => {
        if (!query.trim() && !fileContent) {
            setResponse('Skriv en fråga först.');
            return;
        }

        if (safetyFilter(query)) {
            setResponse('Jag kan tyvärr inte hjälpa dig med den frågan. Prata med en vuxen om du känner dig ledsen eller har frågor som är svåra.');
            return;
        }

        setLoading(true);
        setResponse(null);

        let contentToAnalyze = query;
        if (fileContent) {
            contentToAnalyze = `Här är texten från din fil: ${fileContent}. Fråga: ${query}`;
        }

        try {
            const res = await axios.post(
                'https://api.openai.com/v1/chat/completions',
                {
                    model: 'gpt-3.5-turbo',
                    messages: [
                        {
                            role: 'system',
                            content:
                                'Du är en faktabaserad assistent som hjälper barn i 8-årsåldern med skolarbete. Svara med enkla ord och tydliga förklaringar som passar en 8-åring. Du får endast svara på faktabaserade frågor och skolrelaterade ämnen. Avstå från att svara på personliga frågor, kompisrelaterade frågor eller frågor som rör att skada sig själv eller andra. Gör det tydligt att du är ett hjälpverktyg och inte en kompis.',
                        },
                        { role: 'user', content: contentToAnalyze },
                    ],
                },
                {
                    headers: {
                        Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`, // Hämta API-nyckeln från miljövariabler
                        'Content-Type': 'application/json',
                    },
                }
            );

            setResponse(res.data.choices[0].message.content);
        } catch (error) {
            console.error('Error fetching data from OpenAI:', error);
            setResponse('Kunde inte få svar från assistenten just nu.');
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);

            const reader = new FileReader();
            reader.onload = () => {
                const text = reader.result as string;
                setFileContent(text);
            };
            reader.readAsText(selectedFile);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-200 to-gray-400 text-gray-800 flex flex-col items-center justify-center px-6">
            <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-center">Personlig Assistent</h2>

                {/* Textfråga */}
                <div className="flex items-center gap-4 mb-4">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Skriv din fråga här..."
                        className="w-full p-3 rounded-lg text-gray-800 focus:outline-none border border-gray-400"
                    />
                    <button onClick={handleSearch} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">
                        Sök
                    </button>
                </div>

                {/* Filuppladdning */}
                <div className="flex flex-col gap-2 mb-4">
                    <label htmlFor="file-upload" className="text-sm text-gray-700">
                        Ladda upp en fil att analysera (frivilligt):
                    </label>
                    <input type="file" id="file-upload" onChange={handleFileChange} className="text-gray-700 p-2 rounded-lg" />
                </div>

                {/* Svar */}
                <div className="bg-gray-100 p-4 rounded-lg shadow-md min-h-[150px]">
                    {loading ? (
                        <p className="text-center animate-pulse">Söker efter svar...</p>
                    ) : response ? (
                        <p className="text-gray-800">{response}</p>
                    ) : (
                        <p className="text-gray-500 text-center">Inget svar ännu. Gör en sökning ovan eller ladda upp en fil för att ställa en fråga om den.</p>
                    )}
                </div>

                {/* Tillbaka till uppgiften */}
                <button onClick={onClose} className="bg-yellow-500 hover:bg-yellow-600 text-white w-full py-2 rounded-lg text-center font-bold mt-6">
                    ↩ Tillbaka till uppgiften
                </button>
            </div>
        </div>
    );
};

export default PersonalAssistant;
