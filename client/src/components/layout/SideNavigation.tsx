import { Code2 } from "lucide-react";

import { navigationItems } from "../../data/navigation.data";
import { useActiveSection } from "../../hooks/useActiveSection";
import styles from "./SideNavigation.module.css";

const SideNavigation = () => {
  const activeSection = useActiveSection();

  return (
    <nav aria-label="Main navigation" className={styles.navigation}>
      <span aria-hidden="true" className={styles.track} />
      <ul className={styles.list}>
        {navigationItems.map((item) => {
          const isActive = activeSection === item.id;
          const Icon = item.id === "home" ? Code2 : item.icon;

          return (
            <li key={item.id} className={styles.item}>
              <a
                href={`#${item.id}`}
                aria-label={item.label}
                aria-current={isActive ? "location" : undefined}
                className={`${styles.button} ${isActive ? styles.active : ""} `}
              >
                {isActive ? (
                  <Icon size={19} aria-hidden="true" />
                ) : (
                  <span aria-hidden="true" className={styles.dot} />
                )}
                <span className={styles.label}>
                  <span aria-hidden="true" className={styles.arrow}>&gt;</span>
                  {item.label}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default SideNavigation;
