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
import { DEFAULT_LANGUAGE } from '../../imitaatiopeli-frontend/src/Constants';
import {
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
    Route,
    Outlet,
} from 'react-router-dom';
import Imitation from '../../imitaatiopeli-frontend/src/Imitation';
import ErrorPage from '../../imitaatiopeli-frontend/src/Error';
import {AuthProvider} from "../../imitaatiopeli-frontend/src/AuthContext";
import ProtectedRoute from "../../imitaatiopeli-frontend/src/ProtectedRoute";

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
    supportedLngs: ['fi', 'en', 'sv', 'et'],
});

const App = () => {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<Imitation />} errorElement={<ErrorPage />}></Route>,
        ),
    );

    return (
        <Provider store={store}>
            <AuthProvider>
                <ProtectedRoute component={Imitation}>
                    <RouterProvider router={router} />
                </ProtectedRoute>
            </AuthProvider>
        </Provider>
    );
};

App.propTypes = {};

export default App;
