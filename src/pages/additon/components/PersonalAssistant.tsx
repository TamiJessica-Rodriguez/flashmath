import axios from 'axios';
import React, { useState } from 'react';

interface WoogleProps {
    onClose: () => void;
}

const PersonalAssistant: React.FC<WoogleProps> = ({ onClose }) => {
    const [query, setQuery] = useState('');
    const [response, setResponse] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [fileContent, setFileContent] = useState<string | null>(null);

    const safetyFilter = (content: string): boolean => {
        const forbiddenWords = ['skada', 'göra illa', 'döda', 'självmord', 'slåss'];
        return forbiddenWords.some((word) => content.toLowerCase().includes(word));
    };

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
                        Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
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

    const presetQuestions = [
        'Hjälp mig att skapa en frågeställning kring denna uppgift.',
        'Hur kan jag dela upp uppgiften i mindre delar?',
        'Ge mig tips på hur jag kan planera mitt arbete.',
        'Vad är ett bra sätt att börja denna uppgift?',
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-200 to-gray-400 text-gray-800 flex flex-col items-center justify-center px-6">
            <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-center">Personlig Assistent</h2>

                <div className="mb-6">
                    <h3 className="text-lg font-bold mb-4 text-gray-800">Vanliga frågor:</h3>
                    <div className="flex flex-wrap gap-4">
                        {presetQuestions.map((question, index) => (
                            <button
                                key={index}
                                onClick={() => setQuery(question)}
                                className="bg-blue-700 hover:bg-blue-800 text-white py-2 px-4 rounded-lg shadow-md"
                                style={{ color: '#FFFFFF', backgroundColor: '#1D4ED8' }}
                            >
                                {question}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col gap-4 mb-4">
                    <label htmlFor="query-input" className="text-lg font-medium text-gray-700">
                        Ställ en fråga till assistenten:
                    </label>
                    <input
                        id="query-input"
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Skriv din fråga här..."
                        className="w-full p-3 rounded-lg text-gray-800 focus:outline-none border border-gray-400"
                        style={{ backgroundColor: '#F9FAFB', color: '#1F2937' }}
                    />
                    <button onClick={handleSearch} className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg" style={{ color: '#FFFFFF', backgroundColor: '#1D4ED8' }}>
                        Sök
                    </button>
                </div>

                <div className="flex flex-col gap-2 mb-4">
                    <label htmlFor="file-upload" className="text-sm text-gray-700">
                        Ladda upp en fil att analysera (frivilligt):
                    </label>
                    <input type="file" id="file-upload" onChange={handleFileChange} className="text-gray-700 p-2 rounded-lg" />
                </div>

                <div className="bg-gray-100 p-4 rounded-lg shadow-md min-h-[150px]">
                    {loading ? (
                        <p className="text-center animate-pulse" style={{ color: '#1F2937' }}>
                            Söker efter svar...
                        </p>
                    ) : response ? (
                        <p
                            className="text-center"
                            style={{
                                color: '#1F2937',
                                backgroundColor: '#F3F4F6',
                            }}
                        >
                            {response}
                        </p>
                    ) : (
                        <p
                            className="text-center"
                            style={{
                                color: '#1F2937',
                                backgroundColor: '#F3F4F6',
                            }}
                        >
                            Inget svar ännu. Gör en sökning ovan eller ladda upp en fil för att ställa en fråga om den.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PersonalAssistant;
