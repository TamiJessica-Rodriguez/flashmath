import React, { useState } from 'react';
import IconCaretDown from './Icon/IconCaretDown';
import Dropdown from './Dropdown';

interface LabelBoxProps {
    setLabel: (label: string) => void;
    onCancel: () => void;
}

const LabelBox: React.FC<LabelBoxProps> = ({ setLabel, onCancel }) => {
    const [selectedLabel, setSelectedLabel] = useState('');

    const handleLabelSubmit = () => {
        const finalLabel = selectedLabel;
        setLabel(finalLabel);
    };

    return (
        <div className="panel p-5 border border-gray-500/20 rounded-md shadow-md w-64 h-32">
            <div className="dropdown mb-3">
                <Dropdown
                    placement="bottom-end"
                    btnClassName="btn btn-primary dropdown-toggle w-full"
                    button={
                        <>
                            {selectedLabel || 'Välj typ'}
                            <span>
                                <IconCaretDown className="ltr:ml-1 rtl:mr-1 inline-block" />
                            </span>
                        </>
                    }
                >
                    <ul className="!min-w-[180px]">
                        <li>
                            <button type="button" onClick={() => setSelectedLabel('Lamputtag 2500 ÖG')}>
                                Lamputtag 2500 ÖG
                            </button>
                        </li>
                        <li>
                            <button type="button" onClick={() => setSelectedLabel('Lamputtag, ovan U-tak')}>
                                Lamputtag, ovan U-tak
                            </button>
                        </li>
                        <li>
                            <button type="button" onClick={() => setSelectedLabel('Trafo')}>
                                Trafo
                            </button>
                        </li>
                        <li>
                            <button type="button" onClick={() => setSelectedLabel('Okänd')}>
                                Okänd
                            </button>
                        </li>
                    </ul>
                </Dropdown>
            </div>

            <div className="flex justify-center space-x-4">
                <span onClick={handleLabelSubmit} className="text-primary font-semibold cursor-pointer hover:underline">
                    Spara
                </span>
                <span onClick={onCancel} className="text-red-500 font-semibold cursor-pointer hover:underline">
                    Avbryt
                </span>
            </div>
        </div>
    );
};

export default LabelBox;
