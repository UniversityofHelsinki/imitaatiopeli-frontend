import { useNavigate } from 'react-router-dom';
import HyLogo from '../misc/HyLogo';
import './Logo.css';

const Logo = () => {
  const navigate = useNavigate();

  const onClick = (event) => {
    event.preventDefault();
    navigate('/');
  };

  return (
    <div className="logo">
      <HyLogo aria-hidden />
      <h1 className="logo-text">
        <a href="/" onClick={onClick}>Imitaatiopeli</a>
      </h1>
    </div>
  )
};

export default Logo;