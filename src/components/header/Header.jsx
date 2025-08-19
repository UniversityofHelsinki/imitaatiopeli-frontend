import React from 'react';
import './Header.css';
import Languages from './Languages';
import Logo from './Logo';
import Username from './User';

const Header = () => {

  return (
    <>
      <div className="header">
        <div className="header-left">
          <Logo />
        </div>
        <div className="header-right">
            <Username />
            <Languages />
        </div>
      </div>
      <div aria-hidden className="header-bottom-border"></div>
    </>
  );
};

export default Header;
