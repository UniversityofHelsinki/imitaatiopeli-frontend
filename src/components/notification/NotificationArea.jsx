import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './NotificationArea.css';
import { useTranslation } from 'react-i18next';
import { useNotification } from './NotificationContext';
import Icon from '../misc/ds/Icon';

const Notification = ({ children }) => {
    return (
        <span className="notification" aria-live="assertive">
            {children}
        </span>
    );
};

const CloseButton = ({ onClick }) => {
    const { t } = useTranslation();
    return (
        <div className="notification-area-close-button">
            <button onClick={onClick}>
                <div aria-hidden className="notification-area-close-button-icon">
                    <Icon name="close" />
                </div>
                <span className="screenreader-only">
                    {t('notification_area_close_button_label')}
                </span>
            </button>
        </div>
    );
};

const NotificationArea = () => {
    const { notification, clearNotification, setNotification } = useNotification();

    const close = () => {
        clearNotification();
    };

    const onAnimationEnd = (event) => {
        if (event.animationName === 'notification-closing' && notification.disappearing) {
            clearNotification();
        }
    };

    if (notification) {
        return (
            <div
                onAnimationEnd={onAnimationEnd}
                className={`notification-area notification-area-${notification.type}`}
            >
                <div className="notification-area-content">
                    <Notification>{notification.content}</Notification>
                    <div className="m-1"></div>
                    <CloseButton onClick={close} />
                </div>
                {notification.disappearing && (
                    <div
                        className={`notification-area-closing notification-area-closing-${notification.type}`}
                    ></div>
                )}
                {notification.additionalContent && (
                    <div className={`notification-area-additionalContent`}>
                        <span>{notification.additionalContent}</span>
                    </div>
                )}
            </div>
        );
    }

    return <></>;
};

NotificationArea.propTypes = {};

export default NotificationArea;
