import dayGridPlugin from '@fullcalendar/daygrid';
import FullCalendar from '@fullcalendar/react';
import Addition from '../pages/additon/Addition';
import Notes from '../pages/Apps/Notes';
import Index from '../pages/Index';
import Login from '../pages/Login';
import Mathematics from '../pages/Mathematics';
import MathematicsMenu from '../pages/MathmaticsMenu';
import SignUp from '../pages/SignUp';
import StartPageStudent from '../pages/StartPageStudent';
import SwedishBooks from '../pages/SwedishBooks';
import SwedishMenu from '../pages/SwedishMenu';
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
        path: '/mathematicsmenu',
        element: <MathematicsMenu />,
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
        path: '/swedishmenu',
        element: <SwedishMenu />,
        layout: '',
    },
    {
        path: '/swedishbooks',
        element: <SwedishBooks />,
        layout: 'blank',
    },
    {
        path: '/calendar',
        element: <FullCalendar plugins={[dayGridPlugin]} />,
        layout: '',
    },
];

export { routes };
