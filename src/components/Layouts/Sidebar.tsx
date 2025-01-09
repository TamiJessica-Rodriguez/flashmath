import React, { useEffect, useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { IRootState } from '../../store';
import { toggleSidebar } from '../../store/themeConfigSlice';
import IconArrowBackward from '../Icon/IconArrowBackward'; // Import the IconArrowBackward component

const Sidebar: React.FC = () => {
    const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 640);
    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const dispatch = useDispatch();

    const [userRole, setUserRole] = useState<string>(''); // User role (teacher or student)

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 640);
        };

        window.addEventListener('resize', handleResize);

        // Fetch user role from localStorage
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUserRole(parsedUser.isAdmin ? 'teacher' : 'student');
        }

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const isSidebarVisible = themeConfig.sidebar;

    const teacherLinks = (
        <>
            <li>
                <NavLink to="/info" className="block px-4 py-2 hover:bg-blue-100 rounded">
                    InfoHyllan
                </NavLink>
            </li>
            <li>
                <NavLink to="/apps/calendar" className="block px-4 py-2 hover:bg-blue-100 rounded">
                    Kalender
                </NavLink>
            </li>
            <li>
                <NavLink to="/coursematerials" className="block px-4 py-2 hover:bg-blue-100 rounded">
                    Kursmaterial
                </NavLink>
            </li>
            <li>
                <NavLink to="/assignments" className="block px-4 py-2 hover:bg-blue-100 rounded">
                    Uppgifter
                </NavLink>
            </li>
        </>
    );

    const studentLinks = (
        <>
            <li>
                <NavLink to="/info" className="block px-4 py-2 hover:bg-blue-100 rounded">
                    InfoHyllan
                </NavLink>
            </li>
            <li>
                <NavLink to="/weeklyschedule" className="block px-4 py-2 hover:bg-blue-100 rounded">
                    Schema
                </NavLink>
            </li>
            <li>
                <NavLink to="/studytechniques" className="block px-4 py-2 hover:bg-blue-100 rounded">
                    Personlig Assistent
                </NavLink>
            </li>
        </>
    );

    return (
        <div>
            <nav
                className={`sidebar fixed min-h-screen h-full top-0 bottom-0 w-[260px] bg-blue-100 shadow-md z-50 transition-all duration-300 ${
                    isSidebarVisible ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <div className="h-full flex flex-col">
                    {/* Arrow placed above the navigation bar */}
                    <div className="flex justify-end px-4 py-3 border-b border-gray-200">
                        <button type="button" className="text-gray-700 hover:text-gray-900" onClick={() => dispatch(toggleSidebar())} aria-label="Close Sidebar">
                            <IconArrowBackward />
                        </button>
                    </div>

                    {/* Navigation menu */}
                    <PerfectScrollbar className="flex-1">
                        <ul className="font-semibold space-y-1 px-4 mt-4">{userRole === 'teacher' ? teacherLinks : studentLinks}</ul>
                    </PerfectScrollbar>
                </div>
            </nav>
        </div>
    );
};

export default Sidebar;
