import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    // const handleClick = async () => {
    //     if (!email) {
    //         alert('Please enter a valid email address');
    //         return;
    //     }

    //     try {
    //         // Call the function to save email
    //         await emailController(email);
    //         // Navigate to the next page after successful submission
    //         navigate('/ritningstolken');
    //     } catch (error) {
    //         console.error('Failed to save email:', error);
    //         alert('There was an error saving your email. Please try again.');
    //     }
    // };
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 md:px-0 overflow-y-auto">
            <div className="mb-10 mt-4 md:mt-0">
                <h1 className="text-3xl md:text-4xl font-bold text-center">Ritningstolken</h1>
            </div>

            <div className="flex flex-col items-center justify-center mb-16 space-y-8 md:flex-row md:space-y-0 md:space-x-8">
                <div className="max-w-lg text-center text-base md:text-lg leading-relaxed md:leading-loose">
                    <p>
                        Ritningstolken är ett innovativt verktyg som använder AI för att förenkla och effektivisera arbetet inom byggbranschen. Genom att tolka och analysera ritningar hjälper
                        Ritningstolken yrkesverksamma att snabbt få insikter, minimera fel, och förbättra projektplaneringen. Med detta verktyg kan byggprocessen bli både mer kostnadseffektiv och
                        tidseffektiv, samtidigt som det skapar en smidigare arbetsgång från ritbord till byggarbetsplats.
                    </p>
                </div>
                <div className="flex items-center justify-center w-72 h-48 md:w-[500px] md:h-[320px] bg-gray-300 text-gray-500 rounded-lg shadow-lg">
                    <span>Screencast Placeholder</span>
                </div>
            </div>

            <div className="w-full max-w-sm md:max-w-md mb-6">
                <input type="email" placeholder="Fyll i din email" className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div className="mt-4">
                <button className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Prova Ritningstolken</button>
            </div>
        </div>
    );
};

export default Index;
