import { Outlet } from 'react-router';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import './Imitation.css';

const Imitation = () => {

  return (
    <div className="imitation-game">
      <div>
        <Header />
        <div className="main-content">
          <Outlet />
        </div>
      </div>
      <div className="footer-container">
        <Footer />
      </div>
    </div>
  );

};
export default Imitation;
