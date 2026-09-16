import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import './PublicPage.css'
import { useTranslation } from 'react-i18next';
import LoadingPage from '../../misc/LoadingPage';
import BreadCrumb from '../../misc/breadcrumb/BreadCrumb';
import { propType as CrumbPropType } from '../../misc/breadcrumb/Crumb';

const PublicPage = ({
    children,
    heading,
    headingExtras = <></>,
    crumbs = [],
    configuration,
    loading = false
}) => {
    const { t, i18n } = useTranslation();

    useEffect(() => {
        const setLanguage = async () => {
            if (configuration?.language_used) {
                const deriveLang = (used) => {
                  return used === 'global' ? 'en' : used;
                }
                await i18n.changeLanguage(deriveLang(configuration.language_used));
                document.documentElement.lang = deriveLang(configuration.language_used);
            }
        };
        setLanguage();
    }, [configuration, i18n]);

    if (loading) {
        return <LoadingPage>
            <span>{t('loading_page')}</span>
        </LoadingPage>
    }

    return (
        <div className="page">
            <div className="page-navigation">
                {crumbs.length > 0 &&
                    <>
                        <BreadCrumb crumbs={crumbs} />
                        <div className="navigation-divider"></div>
                    </>
                }
            </div>
            <div className="page-heading">
                <h2>{heading}</h2>
                <div className="page-heading-extras">
                    {headingExtras}
                </div>
            </div>
            <div className="page-content public-page">
                {children}
            </div>
        </div>
    );

};

PublicPage.propTypes = {
    children: PropTypes.node,
    heading: PropTypes.string,
    headingExtras: PropTypes.node,
    crumbs: PropTypes.arrayOf(PropTypes.shape(CrumbPropType)),
    loading: PropTypes.bool,
    configuration: PropTypes.shape({
        language_used: PropTypes.string
    })
};

export default PublicPage;