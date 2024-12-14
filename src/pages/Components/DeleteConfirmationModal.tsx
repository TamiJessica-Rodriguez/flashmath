import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

interface DeleteConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm }: DeleteConfirmationModalProps) => {
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen px-4">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="panel border-0 p-6 rounded-lg overflow-hidden w-full max-w-sm bg-white dark:bg-[#121c2c] text-black dark:text-white">
                                <Dialog.Title className="text-lg font-bold text-center">Är du säker?</Dialog.Title>
                                <div className="mt-4 text-center text-gray-600 dark:text-gray-300">
                                    <p>Vill du verkligen radera denna uppgift?</p>
                                </div>
                                <div className="flex justify-end space-x-3 mt-6">
                                    <button onClick={onClose} className="btn btn-outline-danger">
                                        Avbryt
                                    </button>
                                    <button onClick={onConfirm} className="btn btn-primary">
                                        Radera
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default DeleteConfirmationModal;
