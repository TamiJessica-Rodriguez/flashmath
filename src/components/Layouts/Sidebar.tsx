import React, { useEffect, useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { IRootState } from '../../store';
import { toggleSidebar } from '../../store/themeConfigSlice';
import IconArrowBackward from '../Icon/IconArrowBackward';
import IconBook from '../Icon/IconBook';
import IconCalendar from '../Icon/IconCalendar';
import IconGallery from '../Icon/IconGallery';
import IconListCheck from '../Icon/IconListCheck';

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
                <NavLink to="/teacherstartpage" className="px-4 py-2 hover:text-white hover:bg-blue-500 rounded flex items-center">
                    <IconListCheck className="mr-2" aria-hidden="true" />
                    <span>Startsidan</span>
                </NavLink>
            </li>
            <li>
                <NavLink to="/info" className="px-4 py-2 hover:text-white hover:bg-blue-500 rounded flex items-center">
                    <IconGallery className="mr-2" aria-hidden="true" />
                    <span>InfoHyllan</span>
                </NavLink>
            </li>
            <li>
                <NavLink to="/apps/calendar" className="px-4 py-2 opacity-50 pointer-events-none rounded flex items-center">
                    <IconCalendar className="mr-2" aria-hidden="true" />
                    <span>Kalender</span>
                </NavLink>
            </li>
            <li>
                <NavLink to="/coursematerials" className="px-4 py-2 hover:text-white hover:bg-blue-500 rounded flex items-center">
                    <IconBook className="mr-2" aria-hidden="true" />
                    <span>Kursmaterial</span>
                </NavLink>
            </li>
            <li>
                <NavLink to="/assignments" className="px-4 py-2 opacity-50 pointer-events-none rounded flex items-center">
                    <IconBook className="mr-2" aria-hidden="true" />
                    <span>Uppgifter</span>
                </NavLink>
            </li>
        </>
    );

    const studentLinks = (
        <>
            <li>
                <NavLink to="/startpagestudent" className="px-4 py-2 hover:text-white hover:bg-blue-500 rounded flex items-center">
                    <IconListCheck className="mr-2" aria-hidden="true" />
                    <span>Startsidan</span>
                </NavLink>
            </li>
            <li>
                <NavLink to="/info" className="px-4 py-2 hover:text-white hover:bg-blue-500 rounded flex items-center">
                    <IconGallery className="mr-2" aria-hidden="true" />
                    <span>InfoHyllan</span>
                </NavLink>
            </li>
            <li>
                <NavLink to="/weeklyschedule" className="px-4 py-2 hover:text-white hover:bg-blue-500 rounded flex items-center">
                    <IconCalendar className="mr-2" aria-hidden="true" />
                    <span>Schema</span>
                </NavLink>
            </li>
            <li>
                <NavLink to="/studytechniques" className="px-4 py-2 hover:text-white hover:bg-blue-500 rounded flex items-center">
                    <IconBook className="mr-2" aria-hidden="true" />
                    <span>Personlig Assistent</span>
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
                        <button type="button" className="text-gray-700 hover:text-white hover:bg-blue-500 p-2 rounded-full" onClick={() => dispatch(toggleSidebar())} aria-label="Stäng sidomenyn">
                            <IconArrowBackward aria-hidden="true" />
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
