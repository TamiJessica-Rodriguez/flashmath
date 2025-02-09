import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toggleSidebar } from '../../store/themeConfigSlice';
import IconMenu from '../Icon/IconMenu';

interface User {
    username: string;
    avatar: string;
    isAdmin: boolean;
}

const Header: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [user, setUser] = useState<User | null>(null);
    const [showMenu, setShowMenu] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/');
    };

    const handleProfileClick = () => {
        navigate('/profile');
    };

    const handleTitleClick = () => {
        if (user) {
            navigate(user.isAdmin ? '/teacherstartpage' : '/startpagestudent');
        } else {
            navigate('/');
        }
    };

    return (
        <header className="bg-blue-100 shadow-md flex justify-between items-center p-2 sm:p-4">
            <button onClick={() => dispatch(toggleSidebar())} className="p-2 rounded-md font-bold text-black" aria-label="Toggle Sidebar">
                <IconMenu className="w-6 h-6 sm:w-8 sm:h-8 text-black hover:text-blue-600 transition duration-200" aria-hidden="true" />
            </button>

            <span className="text-black tracking-wider text-base sm:text-lg md:text-2xl cursor-pointer font-bold font-[Roboto]" onClick={handleTitleClick} role="heading" aria-level={1}>
                KUNSKAPSPLATSEN
            </span>

            {/* Profile menu */}
            <div className="flex items-center space-x-2 sm:space-x-3 relative">
                <button
                    className="text-sm sm:text-base font-medium cursor-pointer hover:text-white hover:bg-blue-500 px-2 py-1 rounded"
                    onClick={() => setShowMenu((prev) => !prev)}
                    aria-label="Toggle user menu"
                >
                    {user?.username || 'Användare'}
                </button>

                {!user?.isAdmin && (
                    <img
                        src={user?.avatar ? `/assets/images/${user.avatar}` : '/assets/images/default-avatar.png'}
                        alt={`Profilbild av ${user?.username || 'Standard användare'}`}
                        className="w-8 h-8 sm:w-10 sm:h-10 cursor-pointer transition duration-200 object-cover rounded-full"
                        onClick={() => setShowMenu((prev) => !prev)}
                    />
                )}

                {showMenu && (
                    <div className="absolute right-0 mt-3 w-40 sm:w-48 bg-white shadow-md rounded-md z-10 text-blue-900" role="menu" aria-label="User menu">
                        <button onClick={handleProfileClick} className="block w-full text-left px-4 py-2 sm:py-3 text-sm sm:text-lg font-medium opacity-50 pointer-events-none" role="menuitem">
                            Profil
                        </button>
                        <button onClick={handleLogout} className="block w-full text-left px-4 py-2 sm:py-3 text-sm sm:text-lg font-medium text-red-600 hover:bg-blue-100" role="menuitem">
                            Logga ut
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
