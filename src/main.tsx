import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { HashRouter } from 'react-router-dom'
import "@fontsource/inter";
import "@fontsource/jetbrains-mono";
import "@fontsource/press-start-2p";
import { TotalPlayerProvider } from './context/TotalPlayersContext.tsx'

createRoot(document.getElementById('root')!).render(
   <StrictMode>
    <TotalPlayerProvider>
      <HashRouter>
       <App />
      </HashRouter>
    </TotalPlayerProvider>
  </StrictMode>,
)
