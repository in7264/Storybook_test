import React, { useState, useEffect, useRef } from "react";
import styles from "./SidebarMenu.module.css";

export interface MenuItem {
  id: string;
  label: string;
  icon?: string;
  children?: MenuItem[];
}

export interface SidebarMenuProps {
  items: MenuItem[];
  isOpen: boolean;
  onClose: () => void;
}

export const SidebarMenu: React.FC<SidebarMenuProps> = ({
  items,
  isOpen,
  onClose,
}) => {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleItem = (id: string) => {
    setExpandedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        isOpen
      ) {
        onClose();
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  const renderItems = (menuItems: MenuItem[], level = 0) => {
    return menuItems.map((item) => (
      <div key={item.id} className={styles.item}>
        <div
          className={`${styles.itemContent} ${level > 0 ? styles.nested : ""}`}
          style={{ paddingLeft: `${12 + level * 20}px` }}
          onClick={() => item.children && toggleItem(item.id)}
        >
          {item.icon && <span className={styles.itemIcon}>{item.icon}</span>}
          <span className={styles.itemLabel}>{item.label}</span>
          {item.children && (
            <span className={styles.arrow}>
              {expandedItems.has(item.id) ? "▲" : "▼"}
            </span>
          )}
        </div>
        {item.children && expandedItems.has(item.id) && (
          <div className={styles.submenu}>
            {renderItems(item.children, level + 1)}
          </div>
        )}
      </div>
    ));
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div ref={menuRef} className={styles.menu}>
        <div className={styles.header}>
          <h3 className={styles.title}>Menu</h3>
          <button className={styles.close} onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>
        <div className={styles.items}>{renderItems(items)}</div>
      </div>
    </div>
  );
};
