import './App.css';
import {NextUIProvider} from "@nextui-org/react";
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
import { SliderProvider } from './context/SliderContext';
import { TokensProvider } from './context/TokenContext';
import { UserProvider } from './context/UserContext';
import { VideoProvider } from './context/VideoContext';
import AdminRoutes from './routes/AdminRoutes';
import PublicRoutes from './routes/PublicRoutes';

function App() {
  return (
    <>
      <NextUIProvider>
        <PqrsProvider>
          <CredentialProvider>
            <UserProvider>
              <DataProvider>
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
              </DataProvider>
            </UserProvider>
          </CredentialProvider>
          <PublicRoutes />
        </PqrsProvider>
      </NextUIProvider>
    </>
  );
}

export default App;
