import { Tab } from '@headlessui/react';
import { Fragment } from 'react';
import AdditionComponent from './components/AdditionComponent';
import ColumnMath from './components/ColumnMath';
import ProblemSolvingComponent from './components/ProblemSolving'; 

// Tabs Component
const Tabs = () => {
    return (
        <Tab.Group>
            <Tab.List className="mt-3 flex flex-wrap gap-6">
                {/* Addition Tab */}
                <Tab as={Fragment}>
                    {({ selected }) => (
                        <button
                            className={`${selected ? 'bg-warning text-white !outline-none' : ''} flex items-center gap-2 text-2xl font-semibold rounded p-3 py-2 hover:bg-warning hover:text-white`}
                        >
                            <span className="text-3xl">➕</span> {/* Emoji för Addition */}
                            Addition
                        </button>
                    )}
                </Tab>
                {/* Uppställning Tab */}
                <Tab as={Fragment}>
                    {({ selected }) => (
                        <button
                            className={`${selected ? 'bg-warning text-white !outline-none' : ''} flex items-center gap-2 text-2xl font-semibold rounded p-3 py-2 hover:bg-warning hover:text-white`}
                        >
                            <span className="text-3xl">🧮</span> {/* Emoji för Uppställning (Kalkylator) */}
                            Uppställning
                        </button>
                    )}
                </Tab>
                {/* Problem Solving Tab */}
                <Tab as={Fragment}>
                    {({ selected }) => (
                        <button
                            className={`${selected ? 'bg-warning text-white !outline-none' : ''} flex items-center gap-2 text-2xl font-semibold rounded p-3 py-2 hover:bg-warning hover:text-white`}
                        >
                            <span className="text-3xl">🧩</span> {/* Emoji för Problemlösning */}
                            Problemlösning
                        </button>
                    )}
                </Tab>
            </Tab.List>
            <Tab.Panels>
                {/* Addition Panel */}
                <Tab.Panel>
                    <AdditionComponent />
                </Tab.Panel>
                {/* Uppställning Panel */}
                <Tab.Panel>
                    <ColumnMath />
                </Tab.Panel>
                {/* Problem Solving Panel */}
                <Tab.Panel>
                    <ProblemSolvingComponent />
                </Tab.Panel>
            </Tab.Panels>
        </Tab.Group>
    );
};

export default Tabs;
