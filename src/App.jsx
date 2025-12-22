import 'bootstrap/dist/css/bootstrap.min.css';
import i18n from 'i18next';
import React from 'react';
import {initReactI18next, useTranslation} from 'react-i18next';
import { Provider } from 'react-redux';
import {
    createBrowserRouter,
    createRoutesFromElements,
    Navigate,
    Outlet,
    Route,
    RouterProvider,
} from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';
import { thunk } from 'redux-thunk';
import ErrorPage from '../src/Error.jsx';
import ProtectedRoute from '../src/ProtectedRoute.jsx';
import { defineCustomElements } from '@uh-design-system/component-library/loader';
import './App.css';
import { AuthProvider } from './AuthContext.jsx';
import NotificationProvider from './components/notification/NotificationContext';
import AdminGameLobby from './components/page/admin/AdminGameLobby.jsx';
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
import AdminMonitor from './components/page/admin/AdminMonitor.jsx';
import Playroom from './components/page/public/playroom/Playroom';
import localStorageUtil from './utilities/localStorage';
import GameSummaryPage from './components/page/admin/GameSummaryPage.jsx';
import GameEnd from './components/page/public/playroom/messenger/GameEnd.jsx';

defineCustomElements(window);


const store = createStore(reducer, applyMiddleware(thunk));

const defaultLanguage = () => {
    try {
        const savedLanguage = localStorageUtil.get('language');
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
    const { t } = useTranslation();

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<Imitation />} errorElement={<ErrorPage />}>
                {/* Public routes here */}
                <Route index element={<div className="app-instruction">{t('imitation_game_instructions')}</div>  } />
                <Route path="games">
                    <Route path=":code" element={<GameLobby />} />
                    <Route path=":code/play" element={<Playroom />} />
                    <Route path=":code/join" element={<JoinGame />} />
                    <Route path=":id/gameend" element={<GameEnd />} />
                </Route>

                <Route path="admin/*" element={
                    <AuthProvider>
                        <ProtectedRoute>
                            <Outlet />
                        </ProtectedRoute>
                    </AuthProvider>
                }>
                    {/* Protected routes under admin route here */}
                    <Route index element={<Navigate to="games" replace />} />

                    <Route path="games">
                        <Route index element={<GameListing />} />
                        <Route path="create" element={<CreateGame />} />
                        <Route path=":id" element={<EditGame />} />
                        <Route path=":id/start" element={<StartGame />} />
                        <Route path=":id/end" element={<EndGame />} />
                        <Route path=":id/lobby" element={<AdminGameLobby />} />
                        <Route path=":id/monitor" element={<AdminMonitor />} />
                        <Route path=":id/summary" element={<GameSummaryPage />} />
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
