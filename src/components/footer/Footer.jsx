import React from 'react';
import { useTranslation } from 'react-i18next';
import Link from '../misc/ds/Link';
import HyLogo from '../misc/HyLogo';
import './Footer.css';

const FooterLogo = () => {
  return <div className="footer-logo">
    <HyLogo aria-hidden fill="#ffffff" />
  </div>
};


const ContactInformation = () => {
  const { t } = useTranslation();
  
  return <div className="footer-contact-information">
    <p>
      {t('footer_contact_information_hy')}
    </p>
    <p>
      {t('footer_contact_information_address_line_1')}
    </p>
    <p>
      {t('footer_contact_information_address_line_2')}
    </p>
    <p>
      {t('footer_contact_information_phone_switchboard')}
    </p>
  </div>
};

const ExternalLink = ({ label, href }) => {
  return <Link label={label} href={href} icon="open_in_new" iconPosition="end" target="_blank" colour="white" />;
};

const ExternalLinks = () => {
  const { t } = useTranslation();

  return <div className="footer-external-links">
    <ul>
      <li><ExternalLink label={t('footer_external_link_contact_info_label')} href={t('footer_external_link_contact_info_link')} /></li>
      <li><ExternalLink label={t('footer_external_link_terms_of_service_label')} href={t('footer_external_link_terms_of_service_link')} /></li>
      <li><ExternalLink label={t('footer_external_link_accessibility_statement_label')} href={t('footer_external_link_accessibility_statement_link')} /></li>
    </ul>
  </div>
};


const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-column footer-logo-column">
        <FooterLogo />
      </div>
      <div className="footer-column">
        <ContactInformation />
      </div>
      <div className="footer-column">
        <ExternalLinks />
      </div>
    </div>
  )
};

export default Footer;