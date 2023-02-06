import { Provider, useSelector } from "react-redux";
import { store } from "./redux/store";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import "./assets/css/bootstrap.min.css";
import "./assets/css/custom.css";
import ConfirmEmail from "./pages/ConfirmEmail/ConfirmEmail";
import { getAuthInfo } from "./redux/slices/auth/authSlice";
import { AuthStateType } from "./redux/slices/auth/types";

function ProtectedRoute(element: any) {
  const authInfo: AuthStateType = useSelector(getAuthInfo);
  if (authInfo.authenticated) {
    if (authInfo.confirmed) {
      return element;
    } else {
      return <ConfirmEmail />;
    }
  } else {
    return <Login />;
  }
}

function AppRoutes() {
  const authInfo: AuthStateType = useSelector(getAuthInfo);
  return (
    <Router>
      <Routes>
        <Route
          element={authInfo.authenticated ? <Register /> : <Login />}
          path="/"
        />
        <Route
          element={authInfo.authenticated ? <Register /> : <Register />}
          path="/register"
        />
        <Route
          element={authInfo.authenticated ? <ConfirmEmail /> : <ConfirmEmail />}
          path="/confirmemail"
        />
      </Routes>
    </Router>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AppRoutes />
    </Provider>
  );
}

export default App;
