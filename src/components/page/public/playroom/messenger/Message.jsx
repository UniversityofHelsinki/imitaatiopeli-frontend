import React from 'react';
import PropTypes from 'prop-types';
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

export const RatingMessage = ({ i, name, children, isSelected, onClick }) => {
    const content = typeof children === 'object' && children?.answer_text
        ? children.answer_text
        : children;

    return (
        <div
            className={`rating-message-container ${isSelected ? 'rating-message-selected' : ''}`}
            data-index={i}
            onClick={onClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && onClick?.()}
            name={name}
        >
            <div className="rating-message-checkbox">
                {isSelected && (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path
                            d="M13.5 3.5L6 11L2.5 7.5"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                )}
            </div>
            <div className="rating-message-content">
                {i + 1}. {content}
            </div>
        </div>
    );
};

RatingMessage.propTypes = {
    i: PropTypes.number,
    name: PropTypes.string,
    children: PropTypes.node,
    isSelected: PropTypes.bool,
    onClick: PropTypes.func,
};

export const QuestionMessage = ({ children }) => {
    const content = typeof children === 'object' && children?.answer_text
        ? children.answer_text
        : children;

    return (
        <div className="messenger-message rating-message rating-message-question">
            {content}
        </div>
    );
};

QuestionMessage.propTypes = {
    children: PropTypes.node,
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

