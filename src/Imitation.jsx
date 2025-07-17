import React from 'react';
import { Outlet } from 'react-router';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import './Imitation.css';
import NotificationArea from './components/notification/NotificationArea';

const Imitation = () => {

  return (
    <div className="imitation-game">
      <div>
        <header>
          <Header />
        </header>
        <main className="main-content">
          <Outlet />
          <div className="notification-area-container">
            <NotificationArea />
          </div>
        </main>
      </div>
      <footer className="footer-container">
        <Footer />
      </footer>
    </div>
  );

};
export default Imitation;
