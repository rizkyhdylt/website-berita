import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from 'react-hot-toast'
import StorePovider from './context/StorePovider.jsx'
import {GoogleOAuthProvider} from '@react-oauth/google'

const CLIENT_ID = "802086737868-obet23idtspmmfhpkkb2nepnke6qedfk.apps.googleusercontent.com"

createRoot(document.getElementById('root')).render(
  <StorePovider>
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <App />
      <Toaster/>
    </GoogleOAuthProvider>
  </StorePovider>,
)
