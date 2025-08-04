import React, { ReactNode } from 'react';
import '../../styles/common.css';

interface ModalProps {
  show: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ show, onClose, children }) => {
  if (!show) return null;
  return (
    <div className="modal-backdrop">
      <div className="modal-container">
        <button onClick={onClose} className="action-btn delete" aria-label="Close modal">
          {/* SVG icon */}
          <svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <line x1="4" y1="4" x2="16" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <line x1="16" y1="4" x2="4" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;