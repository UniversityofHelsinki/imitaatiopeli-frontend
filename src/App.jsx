import 'bootstrap/dist/css/bootstrap.min.css';
import i18n from 'i18next';
import React from 'react';
import { initReactI18next } from 'react-i18next';
import { Provider } from 'react-redux';
import { createBrowserRouter, createRoutesFromElements, Outlet, Route, RouterProvider } from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';
import { thunk } from 'redux-thunk';
import ErrorPage from '../src/Error';
import Protected from '../src/Protected';
import ProtectedRoute from '../src/ProtectedRoute';
import './App.css';
import { AuthProvider } from './AuthContext.js';
import NotificationProvider from './components/notification/NotificationContext';
import AdminGameLobby from "./components/page/admin/AdminGameLobby.jsx";
import CreateGame from './components/page/admin/CreateGame';
import EditGame from './components/page/admin/EditGame';
import EndGame from './components/page/admin/EndGame';
import GameListing from './components/page/admin/GameListing';
import StartGame from './components/page/admin/StartGame';
import GameLobby from './components/page/public/GameLobby';
import JoinGame from './components/page/public/JoinGame';
import { SocketProvider } from './contexts/SocketContext.jsx';
import { DEFAULT_LANGUAGE } from './Constants.js';
import Imitation from './Imitation';
import reducer from './reducers';
import translations from './translations';
import EndOfGame from "./components/page/public/EndOfGame.js";

const store = createStore(reducer, applyMiddleware(thunk));

const defaultLanguage = () => {
    try {
        const savedLanguage = localStorage.getItem('language');
        if (savedLanguage) {
            document.documentElement.lang = savedLanguage;
            return savedLanguage;
        }
    } catch (error) {
        console.error(error.message);
    }
    document.documentElement.lang = DEFAULT_LANGUAGE;
    return DEFAULT_LANGUAGE;
};

i18n.use(initReactI18next).init({
    resources: translations,
    lng: defaultLanguage(),
    fallbackLng: 'cimode',
    supportedLngs: ['fi', 'en', 'sv'],
});

const App = () => {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<Imitation />} errorElement={<ErrorPage />}>
                {/* Public routes here */}
                <Route index element={<div></div>} />
                <Route path="games">
                  <Route path=":code" element={<GameLobby />}>
                  </Route>
                  <Route path=":code/join" element={<JoinGame />} />
                  <Route path=":id/end" element={<EndOfGame />} />
                </Route>

                <Route path="admin/*" element={
                    <AuthProvider>
                        <ProtectedRoute>
                            <Outlet />
                        </ProtectedRoute>
                    </AuthProvider>
                }>
                    {/* Protected routes under admin route here */}
                    <Route index element={<Protected />} />
                    <Route path="games">
                      <Route index element={<GameListing />} />
                      <Route path="create" element={<CreateGame />} />
                      <Route path=":id" element={<EditGame />} />
                      <Route path=":id/start" element={<StartGame />} />
                      <Route path=":id/end" element={<EndGame />} />
                      <Route path=":id/lobby" element={<AdminGameLobby />} />
                    </Route>
                </Route>
            </Route>
        ),
    );

    return (
        <Provider store={store}>
          <NotificationProvider>
              <SocketProvider>
                  <RouterProvider router={router} />
              </SocketProvider>
          </NotificationProvider>
        </Provider>
    );
};

App.propTypes = {};

export default App;
