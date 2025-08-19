import React, { useState } from 'react';
import useUser from '../../hooks/useUser.js';
import HyMenu from '../misc/HyMenu.jsx';
import HyMenuLabel from '../misc/HyMenuLabel.jsx';
import Icon from '../misc/ds/Icon.jsx';
import { useTranslation } from 'react-i18next';

const Username = () => {
    const [user, _, logout] = useUser();
    const [menuOpen, setMenuOpen] = useState(false);
    const { t } = useTranslation();

    const PersonIcon = () => <Icon name="person" size="1.2rem" />;

    const onLogoutPress = () => logout();

    if (user?.displayName) {
        return (
            <div className="user">
                <HyMenu
                    buttonLabel={
                        <HyMenuLabel Icon={PersonIcon} caretUp={menuOpen}>
                            {user?.displayName}
                        </HyMenuLabel>
                    }
                    onSelect={() => onLogoutPress()}
                    onOpen={(open) => setMenuOpen(open)}
                >
                    {t('logout')}
                </HyMenu>
            </div>
        );
    }
};

export default Username;
