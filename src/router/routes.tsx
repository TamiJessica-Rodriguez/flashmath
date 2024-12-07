import dayGridPlugin from '@fullcalendar/daygrid';
import FullCalendar from '@fullcalendar/react';
import Addition from '../pages/additon/Addition';
import Notes from '../pages/Apps/Notes';
import Index from '../pages/Index';
import Info from '../pages/Info';
import Login from '../pages/Login';
import Mathematics from '../pages/Mathematics';
import MathematicsMenu from '../pages/MathmaticsMenu';
import Maze from '../pages/Maze';
import SignUp from '../pages/SignUp';
import StartPageStudent from '../pages/StartPageStudent';
import StudyTechniques from '../pages/Studytechniques';
import SwedishBooks from '../pages/swedish/SwedishBooks';
import SwedishGames from '../pages/swedish/SwedishGames';
import SwedishListen from '../pages/swedish/SwedishListen';
import SwedishMenu from '../pages/swedish/SwedishMenu';
import SwedishVideos from '../pages/swedish/SwedishVideos';
import SwedishVR from '../pages/swedish/SwedishVR';
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
        path: '/swedishlisten',
        element: <SwedishListen />,
        layout: 'blank',
    },
    {
        path: '/swedishvideos',
        element: <SwedishVideos />,
        layout: 'blank',
    },
    {
        path: '/swedishgames',
        element: <SwedishGames />,
        layout: 'blank',
    },
    {
        path: '/swedishvr',
        element: <SwedishVR />,
        layout: 'blank',
    },
    {
        path: '/info',
        element: <Info />,
        layout: '',
    },
    {
        path: '/maze',
        element: <Maze />,
        layout: '',
    },
    {
        path: '/studytechniques',
        element: <StudyTechniques />,
        layout: '',
    },
    {
        path: '/calendar',
        element: <FullCalendar plugins={[dayGridPlugin]} />,
        layout: '',
    },
];

export { routes };
