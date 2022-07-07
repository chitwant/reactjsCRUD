import "./App.css";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { PersistGate } from "redux-persist/integration/react";
import store from "./store/store";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import PrivateRoute from "./routes/privateRoute";
import PublicRoute from "./routes/publicRoute";
import persistor from "./store/persistStore";
import UploadFile from "./views/fileupload";
import Fileupload from "./views/fileupload";
const Register = lazy(()=>import('./views/auth/register'))
const Login = lazy(() => import("./views/auth/loginredux"));
const Profile = lazy(() => import("./views/profile/profile"));
function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <ToastContainer autoClose={2000}/>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            {/* <Link to="/login">Login</Link>
          <Link to="/profile">Profile</Link> */}

            <Suspense fallback={<div>loading component</div>}>
              
              <Routes>
                <Route
                path="/register"
                element={<Register/>}/>

                <Route
                  path="/login"
                  element={
                    <PublicRoute>
                      <Login />
                    </PublicRoute>
                  }
                ></Route>
                <Route
                  path="/profile"
                  element={
                    <PrivateRoute>
                      <Profile />
                    </PrivateRoute>
                  }
                ></Route>

                <Route
                path="/fileupload"
                element={<Fileupload/>}/>

                <Route path="*" element={<Navigate to={"/login"} />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;
