import VirtualTour from './VirtualTour/virtualTour.jsx';
import NotFoundPage from './NotFoundPages/NotFoundPage.jsx';
import Cementerylot from './CementeryLot/cementerylot.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from '../Layouts/MainLayout/MainLayout.jsx';
import BurialSearchPage from './BurialSearch/BurialSearchPage.jsx';
import LoginPage from './Authpages/Login.pages.jsx';
import { useAuth } from '../Context/authContext.jsx'; 
import UserProtectedRoute from '../components/protectedRoute/userProtectedRoute.jsx';
import ProtectedsigninRoute from '../components/protectedRoute/signinProtectedRoute.jsx'
import { useEffect } from 'react'; 
import AdminProtectedRoute from '../components/protectedRoute/adminProtectedRoute.jsx'
import ManageUsers from './admin/mageuser/manageUsers.jsx'
import ManageGraveSite from './admin/manageGravesite/manaGraveSite.jsx'
import ManageVacantLot from './admin/manageVacantLot/manageVaCantLot.jsx'
import RoleBasedRedirect from '../components/protectedRoute/rolebasedRedirect.jsx'
import VacantLot from '../pages/vacantLot/vaCantLot.jsx'
import './App.css';
import VisitorProtectedRoute from '../components/protectedRoute/visitorProtectedRoute.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,  // Default route for '/'
        element: <RoleBasedRedirect/>,  // Custom redirection component
      },
      {
        element: <VisitorProtectedRoute/>,
        children: [
          {
            path:'visitor',
            children:[
              {
                path: '', 
                element: <VirtualTour />,
              },
              {
                path: 'vacant-lot', 
                element: <VacantLot />,
              },
            ]
          }
        ]
      },
      {
        element: <UserProtectedRoute />,
        children: [
          {
            path: 'user',  // Parent route for user
            children: [
              {
                path: '',  // Maps to '/user'
                element: <BurialSearchPage />,
              },
              {
                path: 'vacant-lot',  // Maps to '/user/cementerylot'
                element: <VacantLot />,
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
              },
              {
                path:'manage-vacant-lot',
                element: <ManageVacantLot/>
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
  },[]);

  // Show a loading screen while checking authentication
  if (isCheckingAuth) {
    return <div>checking Auth...</div>;
  }

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}
