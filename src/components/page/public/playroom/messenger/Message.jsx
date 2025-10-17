import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../../../misc/ds/Button';
import './Message.css'

export const InstructionMessage = ({ content }) => {
    return (
        <div className="messenger-message messenger-message-instructions">
            {content}
        </div>
    )
};

InstructionMessage.propTypes = {
    content: PropTypes.node,
}

export const RatingMessage = ({ i, name, children, isSelected }) => {
    const content = typeof children === 'object' && children?.answer_text
        ? children.answer_text
        : children;

    return (
        <Button
            variant='secondary'
            icon={isSelected ? 'check_box_fill' : 'check_box_outline_blank'}
            type="button"
            className="messenger-message rating-message"
            data-index={i}
            name={name}
        >
            <div>
                {i+1}. {content}
            </div>
        </Button>
    );
};

RatingMessage.propTypes = {
    i: PropTypes.number,
    name: PropTypes.string,
    children: PropTypes.node,
    isSelected: PropTypes.bool,
};

const Message = ({ children }) => {
    return (
        <div className="messenger-message">
            {children}
        </div>
    );
};

Message.propTypes = {
    children: PropTypes.node,
};

export default Message;
