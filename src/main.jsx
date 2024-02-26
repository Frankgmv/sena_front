import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import "toastr/build/toastr.css"
import { BrowserRouter } from 'react-router-dom'
import { CredentialProvider } from './context/AuthContext.jsx'
import { UserProvider } from './context/UserContext.jsx'
import { MultimediaProvider } from './context/MultimediaContext.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CredentialProvider>
      <UserProvider>
        <MultimediaProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </MultimediaProvider>
      </UserProvider>
    </CredentialProvider>

  </React.StrictMode>,
)
