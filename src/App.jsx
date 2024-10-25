import './App.css';
import { NextUIProvider } from "@nextui-org/react";
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

  );
}

export default App;
