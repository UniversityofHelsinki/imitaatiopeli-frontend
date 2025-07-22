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
import CreateGameForm from './components/game/form/CreateGameForm';
import EditGameForm from './components/game/form/EditGameForm';
import NotificationProvider from './components/notification/NotificationContext';
import Player from './components/players/Player.js';
import { DEFAULT_LANGUAGE } from './Constants.js';
import Imitation from './Imitation';
import reducer from './reducers';
import translations from './translations';

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
                <Route path="player" element={<Player playerId={'1'} />} />

                <Route path="admin/*" element={
                    <AuthProvider>
                        <ProtectedRoute>
                            <Outlet />
                        </ProtectedRoute>
                    </AuthProvider>
                }>
                    {/* Protected routes under admin route here */}
                    <Route index element={<Protected />} />
                    <Route path="game">
                      <Route path="create" element={<CreateGameForm />} />
                      <Route path=":id" element={<EditGameForm />} />
                    </Route>
                </Route>
            </Route>
        ),
    );

    return (
        <Provider store={store}>
          <NotificationProvider>
            <RouterProvider router={router} />
          </NotificationProvider>
        </Provider>
    );
};

App.propTypes = {};

export default App;
