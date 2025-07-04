import { Outlet } from 'react-router';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import './Imitation.css';

const Imitation = () => {

  return (
    <div className="imitation-game">
      <div>
        <header>
          <Header />
        </header>
        <main className="main-content">
          <Outlet />
        </main>
      </div>
      <footer className="footer-container">
        <Footer />
      </footer>
    </div>
  );

};
export default Imitation;
