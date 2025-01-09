import { PropsWithChildren, Suspense, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../store';
import { toggleSidebar } from '../../store/themeConfigSlice';
import Footer from './Footer';
import Header from './Header';
import Setting from './Setting';
import Sidebar from './Sidebar';

const DefaultLayout: React.FC<PropsWithChildren> = ({ children }) => {
    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const dispatch = useDispatch();

    const [showTopButton, setShowTopButton] = useState(false);

    const goToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    const onScrollHandler = () => {
        if (window.scrollY > 200) {
            setShowTopButton(true);
        } else {
            setShowTopButton(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', onScrollHandler);
        return () => {
            window.removeEventListener('scroll', onScrollHandler);
        };
    }, []);

    return (
        <div>
            <div className="relative">
                {/* Sidebar Overlay */}
                <div className={`${themeConfig.sidebar ? 'block' : 'hidden'} fixed inset-0 bg-black/60 z-50 lg:hidden`} onClick={() => dispatch(toggleSidebar())}></div>

                {/* Sidomeny */}
                <Sidebar />

                {/* Innehållsområde */}
                <div className="main-container flex flex-col min-h-screen">
                    {/* Header */}
                    <Header />

                    {/* Huvudinnehåll */}
                    <Suspense>
                        <main className="flex-grow p-6">{children}</main>
                    </Suspense>

                    {/* Footer */}
                    <Footer />
                </div>
            </div>

            {/* Go-to-top-knapp */}
            {showTopButton && (
                <div
                    className="fixed bottom-6 right-6 z-50 flex justify-center items-center w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 hover:from-blue-700 hover:to-blue-900 text-white rounded-full shadow-lg cursor-pointer transition-transform transform hover:scale-110"
                    onClick={goToTop}
                    role="button"
                    aria-label="Till toppen"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                </div>
            )}

            {/* Inställningar */}
            <Setting />
        </div>
    );
};

export default DefaultLayout;
