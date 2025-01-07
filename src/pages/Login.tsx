import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginAdmin, loginUser } from '../controllers/userController';

const Login = () => {
    const [form, setForm] = useState({
        username: '',
        password: '',
        isAdmin: false, // Lägg till en flagga för admin
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleAdminToggle = () => {
        setForm((prevForm) => ({
            ...prevForm,
            isAdmin: !prevForm.isAdmin,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            let response;
            if (form.isAdmin) {
                response = await loginAdmin(form.username, form.password);
            } else {
                response = await loginUser(form.username, form.password);
            }

            console.log('Login successful:', response);

            // Spara användardata i localStorage eller global state
            localStorage.setItem('user', JSON.stringify(response.user));

            // Dynamisk navigering
            if (response.user.isAdmin) {
                navigate('/teacherstartpage'); // För admin
            } else {
                navigate('/startpagestudent'); // För vanliga användare
            }
        } catch (error: any) {
            console.error('Error logging in:', error);
            if (error.response) {
                setError(error.response.data.message || 'Felaktigt användarnamn eller lösenord');
            } else if (error.request) {
                setError('Ingen respons från servern. Kontrollera din anslutning.');
            } else {
                setError('Ett oväntat fel inträffade. Försök igen senare.');
            }
        }
    };

    return (
        <div className="min-h-screen bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: "url('/assets/images/startpage.webp')" }}>
            <div
                className="w-full max-w-md mx-auto rounded shadow-md p-8"
                style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.5)', // Semi-transparent background
                    backdropFilter: 'blur(8px)', // Optional blur effect
                }}
            >
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

                    {/* Admin toggle */}
                    <div className="mb-4 flex items-center">
                        <input type="checkbox" id="isAdmin" name="isAdmin" checked={form.isAdmin} onChange={handleAdminToggle} className="mr-2" />
                        <label htmlFor="isAdmin" className="text-gray-700 font-medium">
                            Logga in som admin
                        </label>
                    </div>

                    {/* Submit button */}
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none">
                        Logga in
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
