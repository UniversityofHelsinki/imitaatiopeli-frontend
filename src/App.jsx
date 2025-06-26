import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translations from '../../imitaatiopeli-frontend/src/translations';
import './App.css';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { thunk } from 'redux-thunk';
import reducer from '../../imitaatiopeli-frontend/src/reducers';
import { DEFAULT_LANGUAGE } from './Constants.js';
import {
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
    Route,
    Outlet,
} from 'react-router-dom';
import Imitation from '../../imitaatiopeli-frontend/src/Imitation';
import ErrorPage from '../../imitaatiopeli-frontend/src/Error';
import {AuthProvider} from './AuthContext.js';
import ProtectedRoute from "../../imitaatiopeli-frontend/src/ProtectedRoute";
import Protected from "../../imitaatiopeli-frontend/src/Protected";

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
            <Route path="/" element={<Outlet />} errorElement={<ErrorPage />}>
                {/* Public routes - components that make /public api calls */}
                <Route index element={<Imitation />} />

                {/* Protected routes - components that DO make /api api calls */}
                <Route path="admin" element={
                    <ProtectedRoute>
                        <Outlet />
                    </ProtectedRoute>
                }>
                    {/* Add all components that use /api calls here */}
                    <Route path="protected" element={<Protected />} />
                </Route>
            </Route>
        ),
    );

    return (
        <Provider store={store}>
            <AuthProvider>
                <RouterProvider router={router} />
            </AuthProvider>
        </Provider>
    );
};

App.propTypes = {};

export default App;
