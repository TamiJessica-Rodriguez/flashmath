import Addition from '../pages/additon/Addition';
import Index from '../pages/Index';
import Login from '../pages/Login';
import MainPage from '../pages/MainPage';
import SignUp from '../pages/SignUp';

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
        layout: 'blank',
    },
    {
        path: 'addition',
        element: <Addition />,
        layout: 'blank',
    },
    // {
    //     path: '/bildhantering',
    //     element: <ProcessedImages />,
    //     layout: 'default',
    // },
];

export { routes };
