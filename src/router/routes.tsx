import Index from '../pages/Index';
import Login from '../pages/Login';
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
        layout: 'default',
    },
    // {
    //     path: '/bildhantering',
    //     element: <ProcessedImages />,
    //     layout: 'default',
    // },
];

export { routes };
