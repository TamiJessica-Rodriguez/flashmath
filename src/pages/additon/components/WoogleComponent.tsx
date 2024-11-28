import axios from 'axios';
import React, { useState } from 'react';

interface WoogleProps {
    onClose: () => void; // Define onClose as a function
}

const WoogleComponent: React.FC<WoogleProps> = ({ onClose }) => {
    const [query, setQuery] = useState(''); // Fråga som användaren skriver
    const [response, setResponse] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState<File | null>(null); // För att hantera uppladdade filer
    const [fileContent, setFileContent] = useState<string | null>(null); // För att lagra filens innehåll

    // Hantera textfrågan (sökfråga)
    const handleSearch = async () => {
        if (!query.trim() && !fileContent) {
            return;
        }

        setLoading(true);
        setResponse(null);

        // Kontrollera om användaren har laddat upp en fil eller om det är en textfråga
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
                        { role: 'system', content: 'Du är en hjälpsam assistent.' },
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

            setResponse(res.data.choices[0].message.content); // Sätt svaret från OpenAI
        } catch (error) {
            console.error('Error fetching data from OpenAI:', error);
            setResponse('Kunde inte få svar från Woogle just nu.');
        } finally {
            setLoading(false);
        }
    };

    // Hantera filuppladdning
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);

            // Läs filens innehåll som text
            const reader = new FileReader();
            reader.onload = () => {
                const text = reader.result as string;
                setFileContent(text); // Uppdatera fileContent med filens innehåll
            };
            reader.readAsText(selectedFile); // Läs filen som text
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center px-6">
            <div className="w-full max-w-4xl bg-gray-800 p-6 rounded-lg shadow-lg">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Woogle - Din hjälpsamma assistent</h2>
                    <button
                        className="text-red-500 hover:text-red-700 font-bold text-lg"
                        onClick={onClose} // Handle onClose when clicking close
                    >
                        Stäng
                    </button>
                </div>

                {/* Textfråga */}
                <div className="flex items-center gap-4 mb-6">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Skriv din fråga här..."
                        className="w-full p-4 rounded-lg text-black focus:outline-none border-2 border-gray-300"
                    />
                    <button onClick={handleSearch} className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg">
                        Sök
                    </button>
                </div>

                {/* Filuppladdning */}
                <div className="flex flex-col mb-6">
                    <label htmlFor="file-upload" className="text-white mb-2">
                        Välj en fil att analysera (frivilligt):
                    </label>
                    <input type="file" id="file-upload" onChange={handleFileChange} className="text-black p-2 rounded-lg" />
                </div>

                {/* Svar från OpenAI */}
                <div className="bg-gray-700 p-6 rounded-lg min-h-[200px]">
                    {loading ? (
                        <p className="text-center">Söker efter svar...</p>
                    ) : response ? (
                        <p>{response}</p>
                    ) : (
                        <p className="text-gray-400 text-center">Inget svar ännu. Gör en sökning ovan eller ladda upp en fil för att ställa en fråga om den.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default WoogleComponent;

// sk - proj - yhuZm_9y_IYRoy - INwWg0E7dVUf6FnDozDRXI_KSlTRUUwL_wzBlt4UqhL - IA7g - Qm3iS7_wbDT3BlbkFJ - kM9yJTnaJXoavwWt9pFQ5Z7TFVn436jmaf1C7MlysyPEtkOV9YmH2mb9resUhWy4uMY6V5xwA;
