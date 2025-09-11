import { useNavigate } from 'react-router-dom';
import HyLogo from '../misc/HyLogo';
import './Logo.css';
import {useTranslation} from "react-i18next";

const Logo = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const onClick = (event) => {
    event.preventDefault();
    navigate('/');
  };

  return (
    <div className="logo">
      <HyLogo aria-hidden />
      <h1 className="logo-text">
        <a href="/" onClick={onClick}>{t('imitation_game_logo_name')}</a>
      </h1>
    </div>
  )
};

export default Logo;