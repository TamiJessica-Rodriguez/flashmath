import dayGridPlugin from '@fullcalendar/daygrid';
import FullCalendar from '@fullcalendar/react';
import Addition from '../pages/additon/Addition';
import Notes from '../pages/Apps/Notes';
import Index from '../pages/Index';
import Login from '../pages/Login';
import MainPage from '../pages/MainPage';
import SignUp from '../pages/SignUp';
import StartPageStudent from '../pages/StartPageStudent';

const routes = [
    {
        path: '/',
        element: <Index />,
        layout: 'blank',
    },
    {
        path: '/login',
        element: <Login />,
        layout: 'blank',
    },
    {
        path: '/signup',
        element: <SignUp />,
        layout: 'blank',
    },
    {
        path: '/mainPage',
        element: <MainPage />,
        layout: '',
    },
    {
        path: '/addition',
        element: <Addition />,
        layout: '',
    },
    {
        path: '/startpagestudent',
        element: <StartPageStudent />,
        layout: '',
    },
    {
        path: '/notes',
        element: <Notes />,
        layout: '',
    },
    {
        path: '/calendar',
        element: <FullCalendar plugins={[dayGridPlugin]} />,

        layout: '',
    },
];

export { routes };
