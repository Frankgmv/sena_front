import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import "toastr/build/toastr.css"
import { BrowserRouter } from 'react-router-dom'
import { CredentialProvider } from './context/CredentialContext.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CredentialProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
    </CredentialProvider>
  </React.StrictMode>,
)
