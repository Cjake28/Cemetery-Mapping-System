import VirtualTour from './VirtualTour/virtualTour.jsx';
import NotFoundPage from './NotFoundPages/NotFoundPage.jsx';
import Cementerylot from './CementeryLot/cementerylot.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from '../Layouts/MainLayout/MainLayout.jsx';
import BurialSearch from './BurialSearch/BurialSearch.jsx';
import LoginPage from './Authpages/Login.pages.jsx';
import { useAuth } from '../Context/authContext.jsx';
import UserProtectedRoute from '../components/userProtectedRoute.jsx';
import ProtectedsigninRoute from '../components/signinProtectedRoute.jsx'
import { useEffect } from 'react';  // Import useEffect

import './App.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        element: <UserProtectedRoute />, // Wrap protected routes
        children: [
          {
            path: '/', // Public path
            element: <BurialSearch />,
          },
          {
            path: 'cementerylot',
            element: <Cementerylot />,
          },
          {
            path: 'VirtualTour',
            element: <VirtualTour />,
          },
        ],
      },
    ],
  },
  {
    path: '/auth',
    element: <ProtectedsigninRoute/>,
    children: [
      {
        path: 'signin',
        element:<LoginPage/>
      },
    ]
  },
]);

export default function App() {
  const { checkAuth, isCheckingAuth } = useAuth();

  // Run checkAuth when the app loads
  useEffect(() => {
    checkAuth();
    console.log("asdasd");
  },[]);  // Ensure `checkAuth` is stable or memoized

  // Show a loading screen while checking authentication
  if (isCheckingAuth) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}
