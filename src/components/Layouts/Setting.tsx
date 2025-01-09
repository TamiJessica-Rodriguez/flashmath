import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../store';
import { toggleTheme } from '../../store/themeConfigSlice';
import IconSettings from '../Icon/IconSettings';
import IconX from '../Icon/IconX';

const Setting = () => {
    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const dispatch = useDispatch();

    const [showCustomizer, setShowCustomizer] = useState(false);
    const [isSpinning, setIsSpinning] = useState(true); // Kontrollera om hjulet snurrar

    useEffect(() => {
        // Stoppa animationen efter 5 sekunder
        const timer = setTimeout(() => {
            setIsSpinning(false);
        }, 5000);

        return () => clearTimeout(timer); // Rensa timern vid komponentborttagning
    }, []);

    return (
        <div>
            {/* Overlay */}
            <div className={`${showCustomizer ? '!block' : 'hidden'} fixed inset-0 bg-[black]/60 z-[51] px-4 transition-[display]`} onClick={() => setShowCustomizer(false)}></div>

            {/* Customizer Panel */}
            <nav
                className={`${
                    showCustomizer ? 'ltr:!right-0 rtl:!left-0' : 'ltr:-right-[400px] rtl:-left-[400px]'
                } bg-white fixed top-0 bottom-0 w-full max-w-[400px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] transition-[right] duration-300 z-[51] dark:bg-black p-4`}
            >
                {/* Inställningar-knappen */}
                <button
                    type="button"
                    className="bg-primary ltr:rounded-tl-full rtl:rounded-tr-full ltr:rounded-bl-full rtl:rounded-br-full absolute ltr:-left-12 rtl:-right-12 top-0 bottom-0 my-auto w-12 h-10 flex justify-center items-center text-white"
                    onClick={() => setShowCustomizer(!showCustomizer)}
                >
                    <IconSettings
                        className={`w-5 h-5 ${isSpinning ? 'animate-spin' : ''}`} // Stoppad animation efter 5 sekunder
                    />
                </button>

                {/* Customizer-innehåll */}
                <div className="overflow-y-auto overflow-x-hidden h-full">
                    <div className="text-center relative pb-5">
                        <button type="button" className="absolute top-0 ltr:right-0 rtl:left-0 opacity-30 hover:opacity-100 dark:text-white" onClick={() => setShowCustomizer(false)}>
                            <IconX className="w-5 h-5" />
                        </button>
                        <h4 className="mb-1 dark:text-white">TEMPLATE CUSTOMIZER</h4>
                        <p className="text-white-dark">Set preferences for your app preview.</p>
                    </div>

                    {/* Färgschema */}
                    <div className="border border-dashed border-white-light dark:border-[#1b2e4b] rounded-md mb-3 p-3">
                        <h5 className="mb-1 text-base dark:text-white">Color Scheme</h5>
                        <p className="text-white-dark text-xs">Overall light or dark presentation.</p>
                        <div className="grid grid-cols-3 gap-2 mt-3">
                            <button type="button" className={`${themeConfig.theme === 'light' ? 'btn-primary' : 'btn-outline-primary'} btn`} onClick={() => dispatch(toggleTheme('light'))}>
                                Light
                            </button>
                            <button type="button" className={`${themeConfig.theme === 'dark' ? 'btn-primary' : 'btn-outline-primary'} btn`} onClick={() => dispatch(toggleTheme('dark'))}>
                                Dark
                            </button>
                            <button type="button" className={`${themeConfig.theme === 'system' ? 'btn-primary' : 'btn-outline-primary'} btn`} onClick={() => dispatch(toggleTheme('system'))}>
                                System
                            </button>
                        </div>
                    </div>

                    {/* Andra inställningar */}
                    {/* ... (resten av innehållet) */}
                </div>
            </nav>
        </div>
    );
};

export default Setting;
