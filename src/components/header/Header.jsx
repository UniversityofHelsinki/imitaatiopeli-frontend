import React from 'react';
import './Header.css';
import Languages from './Languages';
import Logo from './Logo';
import Username from './User';
import useUser from '../../hooks/useUser.js';

const Header = () => {
    const user = useUser();

    return (
        <>
            <div className="header">
                <div className="header-left">
                    <Logo />
                </div>
                {user?.[0] ?
                    <div className="header-right">
                        <Username />
                        <Languages />
                    </div>
                : null}
            </div>
            <div aria-hidden className="header-bottom-border"></div>
        </>
    );
};

export default Header;