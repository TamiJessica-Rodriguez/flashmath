import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import IconPlus from '../components/Icon/IconPlus';
import IconX from '../components/Icon/IconX';
import { setPageTitle } from '../store/themeConfigSlice';

const Calendar = () => {
    const dispatch = useDispatch();

    // Set page title
    useEffect(() => {
        dispatch(setPageTitle('Calendar'));
    }, [dispatch]);

    const now = new Date();

    // Generate current and future month dynamically
    const getMonth = (dt: Date, add: number = 0) => {
        let month = dt.getMonth() + 1 + add;
        return month < 10 ? `0${month}` : month.toString();
    };

    const [events, setEvents] = useState<any[]>([
        {
            id: 1,
            title: 'All Day Event',
            start: `${now.getFullYear()}-${getMonth(now)}-01T14:30:00`,
            end: `${now.getFullYear()}-${getMonth(now)}-02T14:30:00`,
            className: 'danger',
            description: 'An example event description.',
        },
        {
            id: 2,
            title: 'Site Visit',
            start: `${now.getFullYear()}-${getMonth(now)}-07T19:30:00`,
            end: `${now.getFullYear()}-${getMonth(now)}-08T14:30:00`,
            className: 'primary',
            description: 'Description for a site visit.',
        },
    ]);

    const [isAddEventModal, setIsAddEventModal] = useState(false);
    const [params, setParams] = useState({
        id: null,
        title: '',
        start: '',
        end: '',
        description: '',
        type: 'primary',
    });

    // Helper to format date for inputs
    const dateFormat = (dt: any) => {
        dt = new Date(dt);
        const month = dt.getMonth() + 1 < 10 ? `0${dt.getMonth() + 1}` : dt.getMonth() + 1;
        const date = dt.getDate() < 10 ? `0${dt.getDate()}` : dt.getDate();
        const hours = dt.getHours() < 10 ? `0${dt.getHours()}` : dt.getHours();
        const mins = dt.getMinutes() < 10 ? `0${dt.getMinutes()}` : dt.getMinutes();
        return `${dt.getFullYear()}-${month}-${date}T${hours}:${mins}`;
    };

    const editEvent = (data: any = null) => {
        setParams({
            id: data?.event?.id || null,
            title: data?.event?.title || '',
            start: data ? dateFormat(data.event.start) : '',
            end: data ? dateFormat(data.event.end) : '',
            description: data?.event?.extendedProps?.description || '',
            type: data?.event?.classNames?.[0] || 'primary',
        });
        setIsAddEventModal(true);
    };

    const saveEvent = () => {
        if (!params.title || !params.start || !params.end) {
            Swal.fire('Error', 'Title, start, and end dates are required!', 'error');
            return;
        }

        if (params.id) {
            // Update existing event
            const updatedEvents = events.map((event) => (event.id === params.id ? { ...event, ...params } : event));
            setEvents(updatedEvents);
        } else {
            // Add new event
            const newEvent = {
                ...params,
                id: events.length + 1,
            };
            setEvents([...events, newEvent]);
        }

        Swal.fire('Success', 'Event saved successfully!', 'success');
        setIsAddEventModal(false);
    };

    return (
        <div>
            <div className="panel mb-5">
                {/* Calendar Header */}
                <div className="mb-4 flex items-center sm:flex-row flex-col sm:justify-between justify-center">
                    <div className="sm:mb-0 mb-4">
                        <div className="text-lg font-semibold">Calendar</div>
                        <div className="flex items-center mt-2 flex-wrap">
                            <div className="flex items-center ltr:mr-4 rtl:ml-4">
                                <div className="h-2.5 w-2.5 rounded-sm ltr:mr-2 rtl:ml-2 bg-primary"></div>
                                <div>Work</div>
                            </div>
                            <div className="flex items-center ltr:mr-4 rtl:ml-4">
                                <div className="h-2.5 w-2.5 rounded-sm ltr:mr-2 rtl:ml-2 bg-danger"></div>
                                <div>Important</div>
                            </div>
                        </div>
                    </div>
                    <button type="button" className="btn btn-primary" onClick={() => setIsAddEventModal(true)}>
                        <IconPlus className="ltr:mr-2 rtl:ml-2" />
                        Create Event
                    </button>
                </div>

                {/* FullCalendar Component */}
                <div className="calendar-wrapper">
                    <FullCalendar
                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                        initialView="dayGridMonth"
                        headerToolbar={{
                            left: 'prev,next today',
                            center: 'title',
                            right: 'dayGridMonth,timeGridWeek,timeGridDay',
                        }}
                        editable={true}
                        selectable={true}
                        dayMaxEvents={true}
                        events={events}
                        eventClick={editEvent}
                    />
                </div>
            </div>

            {/* Add/Edit Event Modal */}
            <Transition appear show={isAddEventModal} as={Fragment}>
                <Dialog as="div" onClose={() => setIsAddEventModal(false)} className="relative z-[51]">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <Dialog.Panel className="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-lg text-black dark:text-white-dark">
                            <button
                                type="button"
                                className="absolute top-4 ltr:right-4 rtl:left-4 text-gray-400 hover:text-gray-800 dark:hover:text-gray-600"
                                onClick={() => setIsAddEventModal(false)}
                            >
                                <IconX />
                            </button>
                            <div className="text-lg font-medium bg-gray-100 p-4">Add/Edit Event</div>
                            <div className="p-4">
                                <form>
                                    <div>
                                        <label htmlFor="title">Title</label>
                                        <input id="title" className="form-input" value={params.title} onChange={(e) => setParams({ ...params, title: e.target.value })} required />
                                    </div>
                                    <div>
                                        <label htmlFor="start">Start</label>
                                        <input
                                            id="start"
                                            type="datetime-local"
                                            className="form-input"
                                            value={params.start}
                                            onChange={(e) => setParams({ ...params, start: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="end">End</label>
                                        <input id="end" type="datetime-local" className="form-input" value={params.end} onChange={(e) => setParams({ ...params, end: e.target.value })} required />
                                    </div>
                                    <div>
                                        <label htmlFor="description">Description</label>
                                        <textarea id="description" className="form-textarea" value={params.description} onChange={(e) => setParams({ ...params, description: e.target.value })} />
                                    </div>
                                    <button type="button" className="btn btn-primary mt-4" onClick={saveEvent}>
                                        Save
                                    </button>
                                </form>
                            </div>
                        </Dialog.Panel>
                    </Transition.Child>
                </Dialog>
            </Transition>
        </div>
    );
};

export default Calendar;
