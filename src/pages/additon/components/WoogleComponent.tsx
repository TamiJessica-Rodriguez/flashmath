import axios from 'axios';
import React, { useState } from 'react';

interface WoogleProps {
    onClose: () => void; // Define onClose as a function
}

const WoogleComponent: React.FC<WoogleProps> = ({ onClose }) => {
    const [query, setQuery] = useState('');
    const [response, setResponse] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        if (!query.trim()) {
            return;
        }

        setLoading(true);
        setResponse(null);

        try {
            const res = await axios.post(
                'https://api.openai.com/v1/chat/completions',
                {
                    model: 'gpt-3.5-turbo',
                    messages: [
                        {
                            role: 'system',
                            content: 'You are a helpful assistant providing educational information for children aged 7-9.',
                        },
                        {
                            role: 'user',
                            content: `Answer this question in a simple and kid-friendly way: ${query}`,
                        },
                    ],
                },
                {
                    headers: {
                        Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            setResponse(res.data.choices[0].message.content);
        } catch (error) {
            console.error('Error fetching data from OpenAI:', error);
            setResponse('Kunde inte få svar från Woogle just nu.');
        } finally {
            setLoading(false);
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

                <div className="bg-gray-700 p-6 rounded-lg min-h-[200px]">
                    {loading ? <p className="text-center">Söker efter svar...</p> : response ? <p>{response}</p> : <p className="text-gray-400 text-center">Inget svar ännu. Gör en sökning ovan.</p>}
                </div>
            </div>
        </div>
    );
};

export default WoogleComponent;
