import { Link } from "react-router";
import type { Route } from "./+types/home";
import { Header } from "~/components/header";
import { Footer } from "~/components/footer";
import { ProductCard } from "~/components/product-card";
import { fetchProducts } from "~/data/products";
import { ArrowRight } from "lucide-react";

export async function loader() {
  // In production, this would fetch from Google Sheets
  const allProducts = await fetchProducts();
  // Get 6 random featured products
  const featured = allProducts
    .sort(() => Math.random() - 0.5)
    .slice(0, 6);
  
  return { featuredProducts: featured };
}
import styles from "./home.module.css";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "VAULT — Премиальный ресейл люксовой уличной одежды" },
    {
      name: "description",
      content:
        "Эксклюзивная коллекция премиальной уличной одежды от топовых брендов. Stone Island, Rick Owens, Balenciaga и другие.",
    },
  ];
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { featuredProducts } = loaderData;
  const brands = [
    "Stone Island",
    "Louis Vuitton",
    "Saint Laurent",
    "Burberry",
    "CP Company",
    "Arc'teryx",
    "Acne Studios",
    "A Cold Wall",
    "Maison Margiela",
    "Rick Owens",
    "Balenciaga",
    "Vetements",
  ];

  return (
    <div className={styles.page}>
      <Header />

      <section className={styles.hero}>
        <img
          src="https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=1920&q=80"
          alt="Luxury streetwear"
          className={styles.heroBackground}
        />
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Премиальный ресейл
            <span className={styles.heroAccent}>Люксовой одежды</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Тщательно отобранные pre-owned вещи в отличном состоянии от топовых брендов уличной моды. Каждая вещь проходит проверку подлинности.
          </p>
          <Link to="/catalog" className={styles.heroCta}>
            Смотреть каталог
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      <section className={styles.featured}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Избранное</h2>
          <p className={styles.sectionSubtitle}>Лучшие предложения этой недели</p>
        </div>
        <div className={styles.grid}>
          {featuredProducts.map((product) => (
            <Link key={product.id} to={`/product/${product.id}`} className={styles.productLink}>
              <ProductCard product={product} />
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.brands}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Бренды</h2>
          <p className={styles.sectionSubtitle}>Работаем только с оригинальными вещами</p>
        </div>
        <div className={styles.brandsGrid}>
          {brands.map((brand) => (
            <div key={brand} className={styles.brandCard}>
              {brand}
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
