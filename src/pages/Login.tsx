// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');
//     const navigate = useNavigate();

//     const handleLogin = (e: React.FormEvent) => {
//         e.preventDefault();
//         setError('');

//         // Simple client-side validation
//         if (!username || !password) {
//             setError('Användarnamn och lösenord krävs');
//             return;
//         }

//         // Example of authentication logic
//         if (username === 'test' && password === '1234') {
//             console.log('Logged in!');
//             navigate('/dashboard'); // Redirect to a dashboard or main page
//         } else {
//             setError('Felaktigt användarnamn eller lösenord');
//         }
//     };

//     return (
//         <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
//             <div className="w-full max-w-md bg-white rounded shadow-md p-8">
//                 <h1 className="text-2xl font-bold text-center mb-4">Logga in</h1>

//                 {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">{error}</div>}

//                 <form onSubmit={handleLogin}>
//                     <div className="mb-4">
//                         <label htmlFor="username" className="block text-gray-700 font-medium mb-2">
//                             Användarnamn
//                         </label>
//                         <input
//                             type="text"
//                             id="username"
//                             value={username}
//                             onChange={(e) => setUsername(e.target.value)}
//                             className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             placeholder="Ange ditt användarnamn"
//                         />
//                     </div>

//                     <div className="mb-6">
//                         <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
//                             Lösenord
//                         </label>
//                         <input
//                             type="password"
//                             id="password"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             placeholder="Ange ditt lösenord"
//                         />
//                     </div>

//                     <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
//                         Logga in
//                     </button>
//                 </form>

//                 <div className="flex justify-between items-center mt-4">
//                     <button onClick={() => navigate('/forgot-password')} className="text-sm text-blue-500 hover:underline">
//                         Glömt lösenordet?
//                     </button>

//                     <button onClick={() => navigate('/signup')} className="text-sm text-blue-500 hover:underline">
//                         Bli medlem
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Login;

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../controllers/userController'; // API call for logging in

const Login = () => {
    const [form, setForm] = useState({
        username: '',
        password: '',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            // Call the API for login
            const response = await loginUser(form.username, form.password);
            console.log('Login successful:', response);

            // Redirect to dashboard after successful login
            navigate('/dashboard');
        } catch (error: any) {
            console.error('Error logging in:', error.message);
            setError(error.message || 'Felaktigt användarnamn eller lösenord');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
            <div className="w-full max-w-md mx-auto bg-white rounded shadow-md p-8">
                <h1 className="text-2xl font-bold text-center mb-4">Logga in</h1>

                {/* Error message display */}
                {error && <div className="text-red-600 mb-4">{error}</div>}

                <form onSubmit={handleSubmit}>
                    {/* Username input */}
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-700 font-medium mb-2">
                            Användarnamn
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={form.username}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                            placeholder="Ange ditt användarnamn"
                            required
                        />
                    </div>

                    {/* Password input */}
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                            Lösenord
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                            placeholder="Ange ditt lösenord"
                            required
                        />
                    </div>

                    {/* Submit button */}
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none">
                        Logga in
                    </button>
                </form>

                {/* Forgot password and signup links */}
                <div className="flex justify-between items-center mt-4">
                    <button onClick={() => navigate('/forgot-password')} className="text-sm text-blue-500 hover:underline">
                        Glömt lösenordet?
                    </button>

                    <button onClick={() => navigate('/signup')} className="text-sm text-blue-500 hover:underline">
                        Bli medlem
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
