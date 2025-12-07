import type { Route } from "./+types/contact";
import { Header } from "~/components/header";
import { Footer } from "~/components/footer";
import { Send, Instagram, Mail } from "lucide-react";
import styles from "./contact.module.css";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Контакты — VAULT" },
    { name: "description", content: "Свяжитесь с нами через Telegram, Instagram или Email" },
  ];
}

export default function Contact() {
  return (
    <div className={styles.page}>
      <Header />

      <main className={styles.container}>
        <h1 className={styles.title}>Контакты</h1>
        <p className={styles.subtitle}>Выберите удобный способ связи</p>

        <div className={styles.methods}>
          <div className={styles.method}>
            <Send className={styles.methodIcon} />
            <h2 className={styles.methodTitle}>Telegram</h2>
            <p className={styles.methodText}>Самый быстрый способ связи. Отвечаем в течение 15 минут.</p>
            <a href="https://t.me/vault_store" target="_blank" rel="noopener noreferrer" className={styles.methodLink}>
              Написать в Telegram
            </a>
          </div>

          <div className={styles.method}>
            <Instagram className={styles.methodIcon} />
            <h2 className={styles.methodTitle}>Instagram</h2>
            <p className={styles.methodText}>Следите за новинками и эксклюзивными предложениями.</p>
            <a
              href="https://instagram.com/vault_store"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.methodLink}
            >
              Открыть Instagram
            </a>
          </div>

          <div className={styles.method}>
            <Mail className={styles.methodIcon} />
            <h2 className={styles.methodTitle}>Email</h2>
            <p className={styles.methodText}>Для официальных запросов и партнерских предложений.</p>
            <a href="mailto:info@vault-store.ru" className={styles.methodLink}>
              info@vault-store.ru
            </a>
          </div>
        </div>

        <div className={styles.info}>
          <h3 className={styles.infoTitle}>Режим работы</h3>
          <p className={styles.infoText}>
            Понедельник - Воскресенье: 10:00 - 22:00 (МСК)
            <br />
            Отвечаем на сообщения в Telegram круглосуточно
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
