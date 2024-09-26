import VirtualTour from './VirtualTour/virtualTour.jsx'
import NotFoundPage from './NotFoundPages/NotFoundPage.jsx'
import Cementerylot from './CementeryLot/cementerylot.jsx'
import Navbar from '../components/navbar/navbar.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from '../Layouts/MainLayout/MainLayout.jsx'
import BurialSearch from './BurialSearch/BurialSearch.jsx'

import './App.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: '/',
        element: <VirtualTour />,
      },
      {
        path: 'cementerylot',
        element: <Cementerylot />,
      },
      {
        path: 'BurialSearch',
        element: <BurialSearch />,
      },
    ],
  },
  // {
  //   path: '/Cementerylot',
  //   element: <Cementerylot />,
  // },
  
]);

export default function App(){
    return(
        <div className="App">
            {/* <Navbar/> */}
            <RouterProvider router={router}/>
        </div>
    );
}