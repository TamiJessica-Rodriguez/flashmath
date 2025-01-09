import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toggleSidebar } from '../../store/themeConfigSlice';
import IconMenu from '../Icon/IconMenu';

interface User {
    username: string;
    avatar: string;
    isAdmin: boolean; // Field to determine if the user is an admin
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
            navigate('/'); // Fallback for users who are not logged in
        }
    };

    return (
        <header className="bg-blue-100 shadow-md flex justify-between items-center py-3 px-6">
            {/* Larger hamburger menu */}
            <button onClick={() => dispatch(toggleSidebar())} className="p-3 rounded-md font-bold text-black" aria-label="Toggle Sidebar">
                <IconMenu className="w-8 h-8 text-black hover:text-blue-600 transition duration-200" />
            </button>

            {/* Title with click handler and updated font */}
            <span className="text-black tracking-wider text-lg sm:text-2xl cursor-pointer font-bold font-[Roboto]" onClick={handleTitleClick}>
                KUNSKAPSPLATSEN
            </span>

            {/* Profile menu */}
            <div className="flex items-center space-x-3 relative">
                <span className="text-base font-medium cursor-pointer hover:underline" onClick={() => setShowMenu((prev) => !prev)} aria-label="Toggle user menu">
                    {user?.username || 'Användare'}
                </span>

                {/* Show profile picture only if user is not an admin */}
                {!user?.isAdmin && (
                    <img
                        src={user?.avatar ? `/assets/images/${user.avatar}` : '/assets/images/default-avatar.png'}
                        alt={user?.username || 'Standard Avatar'}
                        className="w-10 h-10 cursor-pointer  transition duration-200 object-cover"
                        onClick={() => setShowMenu((prev) => !prev)}
                    />
                )}

                {showMenu && (
                    <div className="absolute right-0 mt-3 w-48 bg-white shadow-md rounded-md z-10 text-blue-900" role="menu">
                        <button onClick={handleProfileClick} className="block w-full text-left px-4 py-3 text-lg font-medium hover:bg-blue-100" role="menuitem">
                            Profil
                        </button>
                        <button onClick={handleLogout} className="block w-full text-left px-4 py-3 text-lg font-medium text-red-600 hover:bg-blue-100" role="menuitem">
                            Logga ut
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
