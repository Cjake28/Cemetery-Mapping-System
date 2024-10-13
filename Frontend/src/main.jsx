import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './pages/App.jsx';
import './index.css';
import { LocationContextPRovider } from './Context/SceneIDcontext.jsx';
import { AuthProvider } from './Context/authContext.jsx'; 
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <LocationContextPRovider>
          <App />
        </LocationContextPRovider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
);
