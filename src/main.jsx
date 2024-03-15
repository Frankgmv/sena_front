import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import "toastr/build/toastr.css";
import { BrowserRouter } from 'react-router-dom'
import { CredentialProvider } from './context/AuthContext.jsx'
import { UserProvider } from './context/UserContext.jsx'
import { DataProvider } from './context/AnunciosContext.jsx'
import { SeccionProvider } from './context/SeccionContext.jsx'
import { MultimediaProvider } from './context/MultimediaContext.jsx'
import { GeneralProvider } from './context/GeneralContext.jsx';
import { EventProvider } from './context/EventContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CredentialProvider>
      <UserProvider>
        <DataProvider>
          <SeccionProvider>
            <MultimediaProvider>
              <GeneralProvider>
                <EventProvider>
                  <BrowserRouter>
                    <App />
                  </BrowserRouter>
                </EventProvider>
              </GeneralProvider>
            </MultimediaProvider>
          </SeccionProvider>
        </DataProvider>
      </UserProvider>
    </CredentialProvider>
  </React.StrictMode>
);
