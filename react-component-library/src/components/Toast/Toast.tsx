import React, { useEffect, useState } from "react";
import styles from "./Toast.module.css";

export type ToastType = "success" | "error" | "warning" | "info";
export type ToastPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

export interface ToastProps {
  message: string;
  type?: ToastType;
  duration?: number;
  onClose?: () => void;
  showCloseButton?: boolean;
  position?: ToastPosition;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  type = "info",
  duration = 5000,
  onClose,
  showCloseButton = false,
  position = "bottom-right",
}) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onClose?.(), 300);
  };

useEffect(() => {
  if (duration > 0) {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => onClose?.(), 300);
    }, duration);

    return () => clearTimeout(timer);
  }
}, [duration, onClose]);

  if (!isVisible) return null;

  const icons = {
    success: "✓",
    error: "✗",
    warning: "!",
    info: "i",
  };

  const positionClass = {
    'top-left': styles.topLeft,
    'top-right': styles.topRight,
    'bottom-left': styles.bottomLeft,
    'bottom-right': styles.bottomRight,
  }[position];

  return (
    <div
      className={`${styles.toast} ${styles[type]} ${positionClass} ${
        isVisible ? styles.visible : ""
      }`}
    >
      <span className={styles.icon}>{icons[type]}</span>
      <span className={styles.text}>{message}</span>
      {showCloseButton && (
        <button
          className={styles.close}
          onClick={handleClose}
          aria-label="Close"
        >
          ×
        </button>
      )}
    </div>
  );
};