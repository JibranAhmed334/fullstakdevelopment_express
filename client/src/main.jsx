import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {AuthContextProvider} from './context/AuthContext.jsx'
import  {BrowserRouter} from 'react-router-dom'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(



  <BrowserRouter>
   <AuthContextProvider>
  <StrictMode>
    <App />
  </StrictMode>
  </AuthContextProvider>
  </BrowserRouter>
  
)
