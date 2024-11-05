import './App.css';
<<<<<<< HEAD
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
=======
import { NextUIProvider } from "@nextui-org/react";
>>>>>>> improve_response
import AdminRoutes from './routes/AdminRoutes';
import PublicRoutes from './routes/PublicRoutes';

import { PermisosProvider } from './context/migration/GeneralContext';
import { BasicallyProvider } from './context/migration/BasicallyContext';
import { AuthProvider } from './context/migration/AuthContext';
import { DataContextProvider } from './context/migration/DataContext';
import { MultimediaProvider } from './context/migration/MultimediaContext';
import { InfoContextProvider } from './context/migration/InfoContext';

function App() {
  return (
<<<<<<< HEAD
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
=======
    <NextUIProvider>
      <BasicallyProvider>
        <AuthProvider>
          <DataContextProvider>
            <MultimediaProvider>
              <InfoContextProvider>

                <PermisosProvider>
                  <AdminRoutes />
                </PermisosProvider>
                
                <PublicRoutes />
              </InfoContextProvider>
            </MultimediaProvider>
          </DataContextProvider>
        </AuthProvider>
      </BasicallyProvider>
    </NextUIProvider>

>>>>>>> improve_response
  );
}

export default App;
