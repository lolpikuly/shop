import { NavLink } from "react-router";
import { Menu } from "lucide-react";
import { Logo } from "./logo";
import { ColorSchemeToggle } from "./ui/color-scheme-toggle/color-scheme-toggle";
import { Button } from "./ui/button/button";
import styles from "./header.module.css";

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Logo />

        <nav className={styles.nav}>
          <NavLink to="/" end className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ""}`}>
            Главная
          </NavLink>
          <NavLink to="/catalog" className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ""}`}>
            Каталог
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ""}`}>
            О нас
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ""}`}>
            Контакты
          </NavLink>
        </nav>

        <div className={styles.actions}>
          <ColorSchemeToggle />
          <Button variant="outline" size="icon" className={styles.mobileMenu}>
            <Menu className={styles.icon} />
          </Button>
        </div>
      </div>
    </header>
  );
}
