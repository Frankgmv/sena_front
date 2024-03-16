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
import { ItemProvider } from './context/ItemsContext.jsx';
import { NoticiaProvider } from './context/NoticiaContext.jsx';
import { LinkProvider } from './context/LinkContext.jsx';
import { TokensProvider } from './context/TokenContext.jsx';
import { ArchivoProvider } from './context/ArchivoContext.jsx';
import { GaleriaProvider } from './context/GaleriaContext.jsx';
import { VideoProvider } from './context/VideoContext.jsx';
import { SliderProvider } from './context/SliderContext.jsx';
import { PqrsProvider } from './context/PqrsContext.jsx';
import { NotificacionesProvider } from './context/NotificacionesContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CredentialProvider>
      <UserProvider>
        <DataProvider>
          <SeccionProvider>
            <MultimediaProvider>
              <GeneralProvider>
                <EventProvider>
                  <ItemProvider>
                    <NoticiaProvider>
                      <LinkProvider>
                        <TokensProvider>
                          <ArchivoProvider>
                            <GaleriaProvider>
                              <VideoProvider>
                                <SliderProvider>
                                  <PqrsProvider>
                                    <NotificacionesProvider>
                                      <BrowserRouter>
                                        <App />
                                      </BrowserRouter>
                                    </NotificacionesProvider>
                                  </PqrsProvider>
                                </SliderProvider>
                              </VideoProvider>
                            </GaleriaProvider>
                          </ArchivoProvider>
                        </TokensProvider>
                      </LinkProvider>
                    </NoticiaProvider>
                  </ItemProvider>
                </EventProvider>
              </GeneralProvider>
            </MultimediaProvider>
          </SeccionProvider>
        </DataProvider>
      </UserProvider>
    </CredentialProvider>
  </React.StrictMode >
);
