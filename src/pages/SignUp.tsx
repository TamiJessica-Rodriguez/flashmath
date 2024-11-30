import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Importera useNavigate
import { AppDispatch, IRootState } from '../store/store';
import { registerUser } from '../store/userSlice';

const avatars = [
    { name: 'Crab Pirate', value: 'crabpirate.png', image: '/assets/images/crabpirate.png' },
    { name: 'Bee Pirate', value: 'beepirate.png', image: '/assets/images/beepirate.png' },
    { name: 'Puppy Standing', value: 'puppystanding.png', image: '/assets/images/puppystanding.png' },
    { name: 'Pirate Fox', value: 'piratefox.png', image: '/assets/images/piratefox.png' },
    { name: 'Frog', value: 'frog.png', image: '/assets/images/frog.png' },
    { name: 'Parrot Pirate', value: 'parrotpirate.png', image: '/assets/images/parrotpirate.png' },
];

const SignUp = () => {
    const [form, setForm] = useState({
        firstname: '',
        lastname: '',
        username: '',
        password: '',
        avatar: '',
    });

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate(); // Skapa en navigate-funktion
    const { loading, error, user } = useSelector((state: IRootState) => state.user);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleAvatarClick = (avatarValue: string) => {
        setForm((prevForm) => ({
            ...prevForm,
            avatar: avatarValue,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(registerUser(form)).then((action: any) => {
            if (action.meta.requestStatus === 'fulfilled') {
                // Omdirigera användaren till login-sidan vid framgång
                navigate('/login');
            }
        });
    };

    return (
        <div className="min-h-screen bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: "url('/assets/images/ocean.webp')" }}>
            <div
                className="w-full max-w-md mx-auto bg-white rounded shadow-md p-8"
                style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.5)', // Semi-transparent white
                    backdropFilter: 'blur(8px)', // Optional blur for a stylish look
                }}
            >
                <h1 className="text-2xl font-bold text-center mb-4">Bli Medlem</h1>
                {error && <div className="text-red-600 mb-4">{error}</div>}
                {user && <div className="text-green-600 mb-4">Välkommen, {user.firstname}!</div>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="firstname" className="block text-gray-700 font-medium mb-2">
                            Förnamn
                        </label>
                        <input
                            type="text"
                            id="firstname"
                            name="firstname"
                            value={form.firstname}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                            placeholder="Ange ditt förnamn"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="lastname" className="block text-gray-700 font-medium mb-2">
                            Efternamn
                        </label>
                        <input
                            type="text"
                            id="lastname"
                            name="lastname"
                            value={form.lastname}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                            placeholder="Ange ditt efternamn"
                            required
                        />
                    </div>

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
                            placeholder="Ange ett starkt lösenord"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 font-medium mb-2">Välj en avatar (valfritt)</label>
                        <div className="grid grid-cols-3 gap-4">
                            {avatars.map((avatar) => (
                                <div
                                    key={avatar.value}
                                    className={`p-2 border rounded cursor-pointer ${form.avatar === avatar.value ? 'border-blue-500' : 'border-gray-300'}`}
                                    onClick={() => handleAvatarClick(avatar.value)}
                                >
                                    <img src={avatar.image} alt={avatar.name} className="w-full h-auto object-cover rounded" />
                                </div>
                            ))}
                        </div>
                    </div>

                    <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none" disabled={loading}>
                        {loading ? 'Skapar konto...' : 'Bli medlem'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
