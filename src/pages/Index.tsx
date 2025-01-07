import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginAdmin, loginUser } from '../controllers/userController';

const Login = () => {
    const [form, setForm] = useState({
        username: '',
        password: '',
        isAdmin: false,
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
            localStorage.setItem('user', JSON.stringify(response.user));

            if (response.user.isAdmin) {
                navigate('/teacherstartpage');
            } else {
                navigate('/startpagestudent');
            }
        } catch (error: any) {
            console.error('Error logging in:', error);
            setError(error.message || 'Felaktigt användarnamn eller lösenord');
        }
    };

    return (
        <div className="min-h-screen bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: "url('/assets/images/startPage.webp')" }} aria-label="Login Page">
            <div
                className="w-full max-w-md rounded shadow-md p-8"
                style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(8px)',
                    transform: 'translateY(-100px)', // Flytta upp rutan
                }}
                aria-labelledby="login-title"
            >
                <h1 id="login-title" className="text-2xl font-bold text-center mb-4">

                </h1>

                {error && (
                    <div className="text-red-600 mb-4" role="alert">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} aria-describedby="login-description">
                    <p id="login-description" className="sr-only">
                        Fyll i ditt användarnamn och lösenord för att logga in.
                    </p>

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
                            aria-required="true"
                        />
                    </div>

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
                            aria-required="true"
                        />
                    </div>

                    <div className="mb-4 flex items-center">
                        <input type="checkbox" id="isAdmin" name="isAdmin" checked={form.isAdmin} onChange={handleAdminToggle} className="mr-2" aria-checked={form.isAdmin} />
                        <label htmlFor="isAdmin" className="text-gray-700 font-medium">
                            Logga in som admin
                        </label>
                    </div>

                    <button type="submit" className="w-full bg-blue-700 text-white py-2 px-4 rounded hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-700" aria-label="Logga in">
                        Logga in
                    </button>
                </form>

                <div className="flex justify-between items-center mt-4">
                    <button onClick={() => navigate('/forgot-password')} className="text-sm text-blue-700 hover:underline" aria-label="Navigate to Forgot Password Page">
                        Glömt lösenordet?
                    </button>

                    <button onClick={() => navigate('/signup')} className="text-sm text-blue-700 hover:underline" aria-label="Navigate to Signup Page">
                        Bli medlem
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
