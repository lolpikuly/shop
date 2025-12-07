import { Link } from "react-router";
import styles from "./logo.module.css";

interface LogoProps {
  className?: string;
}

/**
 * Brand logo component with geometric icon and wordmark
 */
export function Logo({ className }: LogoProps) {
  return (
    <Link to="/" className={`${styles.logo} ${className || ""}`}>
      <svg className={styles.icon} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M16 2L6 8V14C6 21 10.5 27.5 16 30C21.5 27.5 26 21 26 14V8L16 2Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16 10V22M12 14L16 10L20 14"
          stroke="var(--color-accent-9)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className={styles.wordmark}>VAULT</span>
    </Link>
  );
}
