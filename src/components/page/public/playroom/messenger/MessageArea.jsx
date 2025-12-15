import React, { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import './MessageArea.css';
import { useTranslation } from 'react-i18next';
import { DsIcon } from '@uh-design-system/component-library-react';

const MessageArea = ({ children, storageKey }) => {
    const { t } = useTranslation();

    const [showInstructions, setShowInstructions] = useState(() => {
        try {
            const saved = sessionStorage.getItem(storageKey);
            return saved === null ? true : saved === 'true';
        } catch {
            return true;
        }
    });

    const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        sessionStorage.setItem(storageKey, String(showInstructions));

    }, [showInstructions, storageKey]);

    const shouldShowInstructions = isMobile ? showInstructions : true;

    const renderMessages = useCallback((messagesList) => {
        return React.cloneElement(messagesList, {},
            React.Children.map(messagesList.props.children, (li) => {
                const isInstructions = li?.props?.className?.includes('message-area-instructions');
                return isInstructions && !shouldShowInstructions ? null : li;
            })
        );
    }, [shouldShowInstructions]);

    const renderedChildren = useMemo(() => {
        return React.Children.map(children, (child) => {
            return child?.props?.className?.includes('message-area-messages')
                ? renderMessages(child)
                : child;
        });
    }, [children, renderMessages]);

    return (
        <div className="messenger-message-area">
            {isMobile && (
                <button
                    className="instructions-toggle"
                    onClick={() => setShowInstructions(prev => !prev)}
                    aria-label={showInstructions ? 'Hide instructions' : 'Show instructions'}
                >
                    {showInstructions ? (
                        <>
                            <DsIcon dsName='keyboard_arrow_down' />
                            {t('hide_instructions')}
                        </>
                    ) : (
                        <>
                            <DsIcon dsName='chevron_forward' />
                            {t('show_instructions')}
                        </>
                    )}
                </button>
            )}
            {renderedChildren}
        </div>
    );
};

MessageArea.propTypes = {
    children: PropTypes.node,
    storageKey: PropTypes.string,
};

export default MessageArea;
