import Icon from '../misc/ds/Icon';
import HyLogo from '../misc/HyLogo';
import './Logo.css';

const Logo = () => {
  return (
    <div className="logo">
      <HyLogo aria-hidden />
      <h1 className="logo-text">Imitaatiopeli</h1>
    </div>
  )
};

export default Logo;