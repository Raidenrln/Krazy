import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { HashRouter } from 'react-router-dom'
import "@fontsource/inter";
import "@fontsource/jetbrains-mono";
import "@fontsource/press-start-2p";
import { TotalPlayerProvider } from './context/TotalPlayersContext.tsx'
import { ProfileProvider } from './context/ProfileContext.tsx'

createRoot(document.getElementById('root')!).render(
   <StrictMode>
    <TotalPlayerProvider>
      <ProfileProvider>
      <HashRouter>
       <App />
      </HashRouter>
      </ProfileProvider>
    </TotalPlayerProvider>
  </StrictMode>,
)
