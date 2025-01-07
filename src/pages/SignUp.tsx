import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
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
    const navigate = useNavigate();
    const { loading, error } = useSelector((state: IRootState) => state.user);

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
                navigate('/'); // Redirect to index.tsx
            }
        });
    };

    return (
        <div className="min-h-screen bg-cover bg-center flex items-center justify-center px-4" style={{ backgroundImage: "url('/assets/images/startPage.webp')" }}>
            <div
                className="flex flex-col lg:flex-row bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-4xl"
                style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(8px)',
                }}
            >
                {/* Form Section */}
                <div className="w-full lg:w-1/2 p-6 flex flex-col justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-center mb-4">Bli Medlem</h1>
                        {error && <div className="text-red-600 mb-4">{error}</div>}

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
                        </form>
                    </div>
                    <div className="flex justify-center mt-4">
                        <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none" disabled={loading} onClick={handleSubmit}>
                            {loading ? 'Skapar konto...' : 'Bli medlem'}
                        </button>
                    </div>
                </div>

                {/* Avatar Selection Section */}
                <div className="w-full lg:w-1/2 p-6 bg-gray-100 flex flex-col items-center">
                    <h2 className="text-lg font-bold mb-4">Välj din avatar</h2>
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
            </div>
        </div>
    );
};

export default SignUp;
