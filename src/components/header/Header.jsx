import Logo from './Logo';
import './Header.css';
import Languages from './Languages';

const Header = () => {
  
  return (
    <>
      <div className="header">
        <div className="header-left">
          <Logo />
        </div>
        <div className="header-right">
          <Languages />
        </div>
      </div>
      <div aria-hidden className="header-bottom-border"></div>
    </>
  );
};

export default Header;