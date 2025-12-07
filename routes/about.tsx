import type { Route } from "./+types/about";
import { Header } from "~/components/header";
import { Footer } from "~/components/footer";
import { Shield, Award, Truck } from "lucide-react";
import styles from "./about.module.css";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "О нас — VAULT" },
    { name: "description", content: "Премиальный ресейл люксовой уличной одежды с гарантией подлинности" },
  ];
}

export default function About() {
  return (
    <div className={styles.page}>
      <Header />

      <section className={styles.hero}>
        <img
          src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1920&q=80"
          alt="About VAULT"
          className={styles.heroBackground}
        />
        <h1 className={styles.heroTitle}>О нас</h1>
      </section>

      <main className={styles.content}>
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Наша миссия</h2>
          <p className={styles.text}>
            VAULT — это премиальная платформа для ресейла люксовой уличной одежды, созданная для тех, кто ценит
            аутентичность, качество и устойчивость. Мы специализируемся на культовых брендах, которые определяют
            современную уличную моду.
          </p>
          <p className={styles.text}>
            Большинство вещей в нашей коллекции — это pre-owned изделия в отличном состоянии, бережно использованные
            и тщательно отобранные. Иногда в каталоге появляются новые вещи с бирками. Каждая вещь проходит
            проверку подлинности и детальную оценку состояния, чтобы вы могли быть уверены в качестве.
          </p>
        </div>

        <div className={styles.features}>
          <div className={styles.feature}>
            <Shield className={styles.featureIcon} />
            <h3 className={styles.featureTitle}>Гарантия подлинности</h3>
            <p className={styles.featureText}>
              Каждая вещь проходит многоступенчатую проверку на подлинность нашими экспертами
            </p>
          </div>

          <div className={styles.feature}>
            <Award className={styles.featureIcon} />
            <h3 className={styles.featureTitle}>Премиум качество</h3>
            <p className={styles.featureText}>
              Тщательно отбираем pre-owned вещи в отличном состоянии и оцениваем каждое изделие по 10-балльной шкале
            </p>
          </div>

          <div className={styles.feature}>
            <Truck className={styles.featureIcon} />
            <h3 className={styles.featureTitle}>Быстрая доставка</h3>
            <p className={styles.featureText}>Доставка по всей России с возможностью примерки перед оплатой</p>
          </div>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Наши бренды</h2>
          <p className={styles.text}>
            В нашей коллекции представлены культовые бренды уличной моды: Stone Island, Louis Vuitton, Saint Laurent,
            Burberry, CP Company, Arc'teryx, Acne Studios, A Cold Wall, Maison Margiela, Rick Owens, Balenciaga,
            Vetements, Moncler, The North Face Black Series и многие другие.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
