import IconArrowLeft from './Icon/IconArrowLeft';
import IconBox from './Icon/IconBox';

interface InfoBoxProps {
    message: string;
    firstButtonText: string;
    secondButtonText: string;
    onFirstButtonClick: () => void;
    onSecondButtonClick: () => void;
}

const InfoBox: React.FC<InfoBoxProps> = ({ message, firstButtonText, secondButtonText, onFirstButtonClick, onSecondButtonClick }) => {
    return (
        <div className="panel" id="infobox_3">
            <div className="flex flex-wrap w-full justify-center mb-5">
                <div className="bg-primary absolute text-white-light ltr:left-6 rtl:right-6 -top-8 w-16 h-16 rounded-md flex items-center justify-center mb-5 mx-auto">
                    <IconBox className="w-12 h-12" />
                </div>
                <div className="w-full text-center">
                    <h5 className="text-dark text-lg font-semibold mb-3.5 dark:text-white-light">Spara ändringar</h5>
                </div>
                <div className="w-full text-center">
                    <p className="text-white-dark text-[15px] mb-3.5">{message}</p>
                </div>
                <div className="flex flex-col gap-2 w-full items-center">
                    <button type="button" onClick={onFirstButtonClick} className="text-primary font-semibold hover:underline group mb-2">
                        {firstButtonText}
                        <IconArrowLeft className="ltr:ml-1 rtl:mr-1 inline-block relative transition-all duration-300 group-hover:translate-x-2 rtl:group-hover:-translate-x-2 rtl:rotate-180" />
                    </button>
                    <button type="button" onClick={onSecondButtonClick} className="text-primary font-semibold hover:underline group">
                        {secondButtonText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InfoBox;
