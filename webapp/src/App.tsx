import { Provider, useSelector } from "react-redux";
import { persistor, store } from "./redux/store";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import ConfirmEmail from "./pages/ConfirmEmail/ConfirmEmail";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import { PersistGate } from "redux-persist/integration/react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./assets/css/global.css";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import {
  GeneralStateType,
  getGeneralState,
} from "./redux/slices/general/generalSlice";
import { customTheme } from "./assets/theme";
import PublicRoutes from "./components/PublicRoutes";
import PrivateRoutes from "./components/PrivateRoutes";

function AppRoutes() {
  const generalState: GeneralStateType = useSelector(getGeneralState);
  const theme = createTheme(customTheme(generalState.darkmode));
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route element={<PublicRoutes />}>
            <Route element={<Register />} path="/register" />
            <Route element={<Login />} path="/login" />
          </Route>
          <Route element={<PrivateRoutes />}>
            <Route element={<Dashboard />} path="/" />
            <Route element={<ConfirmEmail />} path="/confirmemail" />
            <Route element={<Dashboard />} path="/dashboard" />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppRoutes />
      </PersistGate>
    </Provider>
  );
}

export default App;
