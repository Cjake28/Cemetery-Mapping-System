import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './pages/App.jsx'
import './index.css'
import { SceneIDProvider } from './Context/SceneIDcontext.jsx';
import { AuthProvider } from './Context/authContext.jsx'; 


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <SceneIDProvider>
        <App/>
      </SceneIDProvider>
    </AuthProvider>
  </StrictMode>,
)
