import React from 'react';
import PropTypes from 'prop-types';
import './Messenger.css'
import MessageArea from './MessageArea';
import MessageField from './MessageField';

const Messenger = ({
                       messageFieldDisabled,
                       announcement,
                       onMessageSubmit,
                       message,
                       onMessageChange,
                       children,
                       msglength = null,
                       messageFieldHidden = false,
                       storageKey,
                   }) => {

    const handleMessageSubmit = (message) => {
        if (onMessageSubmit) {
            onMessageSubmit(message);
            onMessageChange('');
        }
    };

    return (
        <div className="messenger">
            <MessageArea storageKey={storageKey}>
                {children}
            </MessageArea>
            <MessageField
                onSubmit={handleMessageSubmit}
                onChange={onMessageChange}
                disabled={messageFieldDisabled}
                announcement={announcement}
                message={message}
                msglength={msglength}
                hidden={messageFieldHidden}
            />
        </div>
    );

};

Messenger.propTypes = {
    messageFieldDisabled: PropTypes.bool,
    announcement: PropTypes.node,
    onMessageSubmit: PropTypes.func,
    received: PropTypes.array,
    messages: PropTypes.arrayOf(PropTypes.shape({
        content: PropTypes.string,
        type: PropTypes.oneOf(['received', 'sent'])
    })),
    messageFieldHidden: PropTypes.bool,
    storageKey: PropTypes.string,
};

export default Messenger;
