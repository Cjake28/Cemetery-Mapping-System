import VirtualTour from './VirtualTour/virtualTour.jsx';
import NotFoundPage from './NotFoundPages/NotFoundPage.jsx';
import Cementerylot from './CementeryLot/cementerylot.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from '../Layouts/MainLayout/MainLayout.jsx';
import BurialSearch from './BurialSearch/BurialSearch.jsx';
import LoginPage from './Authpages/Login.pages.jsx';
import { useAuth } from '../Context/authContext.jsx';
import UserProtectedRoute from '../components/protectedRoute/userProtectedRoute.jsx';
import ProtectedsigninRoute from '../components/protectedRoute/signinProtectedRoute.jsx'
import { useEffect } from 'react';  // Import useEffect
import AdminProtectedRoute from '../components/protectedRoute/adminProtectedRoute.jsx'
import ManageUsers from './admin/mageuser/manageUsers.jsx'
import ManageGraveSite from './admin/manageGravesite/manaGraveSite.jsx'
import './App.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        element: <UserProtectedRoute />,
        children: [
          {
            path: 'user',  // Parent route for user
            children: [
              {
                path: '',  // Maps to '/user'
                element: <BurialSearch />,
              },
              {
                path: 'cementerylot',  // Maps to '/user/cementerylot'
                element: <Cementerylot />,
              },
              {
                path: 'VirtualTour',  // Maps to '/user/VirtualTour'
                element: <VirtualTour />,
              },
            ],
          },
        ],
      },
      {
        element: <AdminProtectedRoute />,
        children: [
          {
            path: 'admin',  // Parent route for admin
            children: [
              {
                path: '',  // Maps to '/admin'
                element: <ManageUsers />,
              },
              {
                path: 'manage-gravesite',  // Maps to '/manage-gravesite'
                element: <ManageGraveSite />,
              }
            ],
          },
        ],
      },
    ],
  },
  {
    path: '/auth',
    element: <ProtectedsigninRoute />,
    children: [
      {
        path: 'signin',
        element: <LoginPage />,
      },
    ],
  },
]);

export default function App() {
  const { checkAuth, isCheckingAuth } = useAuth();

  // Run checkAuth when the app loads
  useEffect(() => {
    checkAuth();
    console.log("app.jsx: checkAuth");
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
