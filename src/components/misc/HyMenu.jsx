import React, { useId, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import './HyMenu.css';

const HyMenuItem = ({ 
  children, 
  disabled, 
  selected,
  onClick,
  onKeyDown,
  onBlur
}) => {

  const disabledClass = disabled ? `hy-menu-item-disabled` : '';
  const selectedClass = selected ? `hy-menu-item-selected` : '';

  const disabledMenuItem = (
    <span 
      role="menuitem" 
      className="hy-menu-item-button"
      onKeyDown={(event) => { 
        event.preventDefault(); 
        onKeyDown(event); 
      }}
      onBlur={onBlur}
      aria-disabled={disabled}
      tabIndex={0}
    >
      {children}
    </span>
  );

  return (
    <li className={`hy-menu-item ${disabledClass} ${selectedClass}`} role="presentation">
      {(() => {
        if (disabled) {
          return disabledMenuItem;
        }
        return (
          <button 
            role="menuitem"
            className="hy-menu-item-button" 
            onClick={onClick} 
            onKeyDown={onKeyDown}
            disabled={disabled}
            aria-disabled={disabled}
          >
            {children}
          </button>
        );
      })()}
    </li>
  );
};

HyMenuItem.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  selected: PropTypes.bool
};

const HyMenu = ({ 
  children = [], 
  disabledItems = [], 
  selectedItems = [],
  onSelect,
  buttonLabel,
  onOpen,
  openTo = 'right'
}) => {
  const [open, setOpen] = useState(false);
  const buttonId = useId();
  const menuId = useId();
  const ref = useRef();

  const toggleMenu = () => {
    setOpen(!open);
    if (onOpen) {
      onOpen(!open);
    }
  };

  const onMenuItemClick = (index) => {
    setOpen(false);
    onSelect(index);
    if (onOpen) {
      onOpen(false);
    }
  };

  const closeOnBlur = (event) => {
    const blurTarget = event.nativeEvent.relatedTarget;
    if (ref.current) {
      const focusInsideMenu = ref.current.contains(blurTarget);
      if (!focusInsideMenu) {
        setOpen(false);
        if (onOpen) {
          onOpen(false);
        }
      }
    }
  };

  const onKeyPress = (event, index) => {
    const code = event.code;
    if (ref.current && ['ArrowDown', 'ArrowUp'].includes(code)) {
      event.preventDefault();
      const focusableMenuItems = ref.current.querySelectorAll("[role=menuitem]");
      const direction = code === 'ArrowDown' ? 1 : -1;
      const nextElementPosition = (index + direction + focusableMenuItems.length) % focusableMenuItems.length;
      const nextElement = focusableMenuItems[nextElementPosition];
      if (nextElement) {
        nextElement.focus();
      }
    }
  };

  return (
    <div ref={ref} className="hy-menu" onBlur={closeOnBlur}>
      <button 
        id={buttonId} 
        className="hy-menu-button"
        onClick={toggleMenu}
        onKeyDown={(event) => onKeyPress(event, -1)}
        aria-haspopup="true"
        aria-controls={menuId}
      >
        {buttonLabel}
      </button>
      {open && 
        <div className={`hy-menu-container hy-menu-container-${openTo}`} tabIndex={-1}>
          <ul id={menuId} role="menu" aria-labelledby={buttonId}>
            {[ (children || []) ].flat().map((child, i) => (
              <HyMenuItem 
                key={i}
                onClick={() => onMenuItemClick(i)}
                onBlur={closeOnBlur}
                onKeyDown={(event) => onKeyPress(event, i)}
                disabled={disabledItems.includes(i)}
                selected={selectedItems.includes(i)}>
                {child}
              </HyMenuItem>
            ))} 
          </ul>
        </div>}
    </div>
  );
};

HyMenu.propTypes = {
  children: PropTypes.node,
  disabledItems: PropTypes.arrayOf(PropTypes.number),
  selectedItems: PropTypes.arrayOf(PropTypes.number),
  onSelect: PropTypes.func.isRequired,
  buttonLabel: PropTypes.node,
  onOpen: PropTypes.func,
  openTo: PropTypes.oneOf(['left', 'right'])
};

export default HyMenu;
