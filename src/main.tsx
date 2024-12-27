import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import router from "./utils/router/router.tsx";
import { store, persistor } from "./store/store.ts";
import AppThemeProvider from "./utils/hocs/appthemeprovider/AppThemeProvider.tsx";
import { PersistGate } from "redux-persist/integration/react";


ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <AppThemeProvider>
        <RouterProvider router={router} />
      </AppThemeProvider>
    </PersistGate>
  </Provider>
);
