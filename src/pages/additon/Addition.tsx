import { Tab } from '@headlessui/react';
import { Fragment } from 'react';
import AdditionComponent from './components/AdditionComponent';
import ColumnMath from './components/ColumnMath';

// Tabs Component
const Tabs = () => {
    return (
        <Tab.Group>
            <Tab.List className="mt-3 flex flex-wrap gap-2">
                <Tab as={Fragment}>
                    {({ selected }) => (
                        <button
                            className={`${selected ? 'bg-warning text-white !outline-none' : ''} before:inline-block -mb-[1px] flex items-center rounded p-3.5 py-2 hover:bg-warning hover:text-white`}
                        >
                            Addition
                        </button>
                    )}
                </Tab>
                <Tab as={Fragment}>
                    {({ selected }) => (
                        <button
                            className={`${selected ? 'bg-warning text-white !outline-none' : ''} before:inline-block -mb-[1px] flex items-center rounded p-3.5 py-2 hover:bg-warning hover:text-white`}
                        >
                            Uppställning
                        </button>
                    )}
                </Tab>
            </Tab.List>
            <Tab.Panels>
                <Tab.Panel>
                    <AdditionComponent />
                </Tab.Panel>
                <Tab.Panel>
                    <ColumnMath />
                </Tab.Panel>
            </Tab.Panels>
        </Tab.Group>
    );
};

export default Tabs;
