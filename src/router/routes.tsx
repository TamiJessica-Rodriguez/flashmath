import dayGridPlugin from '@fullcalendar/daygrid';
import FullCalendar from '@fullcalendar/react';
import Addition from '../pages/additon/Addition';
import Notes from '../pages/Apps/Notes';
import English from '../pages/English';
import EnglishBooks from '../pages/EnglishBooks';
import Index from '../pages/Index';
import Login from '../pages/Login';
import Mathematics from '../pages/Mathematics';
import SignUp from '../pages/SignUp';
import StartPageStudent from '../pages/StartPageStudent';
import WeeklySchedule from '../pages/WeeklySchedule';

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
        path: '/mathematics',
        element: <Mathematics />,
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
        path: '/weeklyschedule',
        element: <WeeklySchedule />,
        layout: '',
    },
    {
        path: '/notes',
        element: <Notes />,
        layout: '',
    },
    {
        path: '/english',
        element: <English />,
        layout: '',
    },
    {
        path: '/englishbooks',
        element: <EnglishBooks />,
        layout: 'blank',
    },
    {
        path: '/calendar',
        element: <FullCalendar plugins={[dayGridPlugin]} />,
        layout: '',
    },
];

export { routes };
