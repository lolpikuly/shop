import { Link } from "react-router";
import { Instagram, Send } from "lucide-react";
import { Logo } from "./logo";
import styles from "./footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.section}>
            <Logo />
            <p style={{ marginTop: "var(--space-4)", color: "var(--color-neutral-10)", fontSize: "0.875rem" }}>
              Премиальный ресейл люксовой уличной одежды. Только оригинальные вещи от топовых брендов.
            </p>
          </div>

          <div className={styles.section}>
            <h3>Навигация</h3>
            <div className={styles.links}>
              <Link to="/" className={styles.link}>
                Главная
              </Link>
              <Link to="/catalog" className={styles.link}>
                Каталог
              </Link>
              <Link to="/about" className={styles.link}>
                О нас
              </Link>
              <Link to="/contact" className={styles.link}>
                Контакты
              </Link>
            </div>
          </div>

          <div className={styles.section}>
            <h3>Информация</h3>
            <div className={styles.links}>
              <a href="#" className={styles.link}>
                Как купить
              </a>
              <a href="#" className={styles.link}>
                Доставка
              </a>
              <a href="#" className={styles.link}>
                Гарантия подлинности
              </a>
              <a href="#" className={styles.link}>
                FAQ
              </a>
            </div>
          </div>

          <div className={styles.section}>
            <h3>Контакты</h3>
            <div className={styles.links}>
              <a href="https://t.me/vault_store" className={styles.link}>
                Telegram
              </a>
              <a href="mailto:info@vault-store.ru" className={styles.link}>
                info@vault-store.ru
              </a>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>© 2024 VAULT. Все права защищены.</p>
          <div className={styles.social}>
            <a href="https://t.me/vault_store" className={styles.socialLink} aria-label="Telegram">
              <Send size={20} />
            </a>
            <a href="https://instagram.com/vault_store" className={styles.socialLink} aria-label="Instagram">
              <Instagram size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
