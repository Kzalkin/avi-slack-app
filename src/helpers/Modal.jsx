import React from 'react';
import ReactDOM from 'react-dom';

function Modal({ open, children }) {
  if (!open) return null;

  return ReactDOM.createPortal (
    <React.Fragment>{children}</React.Fragment>,
    document.getElementById('portal')
    );
}

export default Modal;