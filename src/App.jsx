import './App.css';
import { DataProvider } from './context/AnunciosContext';
import { ArchivoProvider } from './context/ArchivoContext';
import { CredentialProvider } from './context/AuthContext';
import { EventProvider } from './context/EventContext';
import { GaleriaProvider } from './context/GaleriaContext';
import { GeneralProvider } from './context/GeneralContext';
import { ItemProvider } from './context/ItemsContext';
import { LinkProvider } from './context/LinkContext';
import { NoticiaProvider } from './context/NoticiaContext';
import { NotificacionesProvider } from './context/NotificacionesContext';
import { PqrsProvider } from './context/PqrsContext';
import { SeccionProvider } from './context/SeccionContext';
import { SliderProvider } from './context/SliderContext';
import { TokensProvider } from './context/TokenContext';
import { UserProvider } from './context/UserContext';
import { VideoProvider } from './context/VideoContext';
import AdminRoutes from './routes/AdminRoutes';
import PublicRoutes from './routes/PublicRoutes';

function App() {
  return (
    <>
      <PqrsProvider>
        {/* Contextos habilitados para administración. */}
        <CredentialProvider>
          <UserProvider>
            <DataProvider>
              <SeccionProvider>
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
                                    <NotificacionesProvider>
                                      <AdminRoutes />
                                    </NotificacionesProvider>
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
              </SeccionProvider>
            </DataProvider>
          </UserProvider>
        </CredentialProvider>

        {/* Contextos habilitados para páginas publicas */}
        <PublicRoutes />
      </PqrsProvider>
    </>
  );
}

export default App;
