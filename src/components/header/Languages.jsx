import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { LANGUAGES } from '../../Constants';
import HyMenu from '../misc/HyMenu';
import HyMenuLabel from '../misc/HyMenuLabel';
import Icon from '../misc/ds/Icon';
import './Languages.css';
import localStorage from '../../utilities/localStorage';

const GlobeIcon = () => <Icon name="public" size="1.2rem" />;

const Languages = () => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const [menuOpen, setMenuOpen] = useState(false);

  const saveLanguage = (language) => {
    localStorage.set('language', language);
  }

  const onClick = async (language) => {
    document.documentElement.lang = language;
    await i18n.changeLanguage(language);
    saveLanguage(language);
  };

  const languages = LANGUAGES;

  return (
   <div className="languages">
      <HyMenu 
        selectedItems={[languages.indexOf(currentLanguage)]}
        buttonLabel={(
        <HyMenuLabel Icon={GlobeIcon} caretUp={menuOpen}>
          <span>{t(`language_select_${currentLanguage}`)}</span>
        </HyMenuLabel>
        )}
        onOpen={(open) => setMenuOpen(open)}
        onSelect={(i) => onClick(languages[i])}
      >
        {languages.map(l => t(`language_select_${l}`))}
      </HyMenu>
    </div>
  );
};

Languages.propTypes = {
};

export default Languages;
