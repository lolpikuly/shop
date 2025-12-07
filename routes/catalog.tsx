import { useState } from "react";
import { Link } from "react-router";
import type { Route } from "./+types/catalog";
import { Header } from "~/components/header";
import { Footer } from "~/components/footer";
import { ProductCard } from "~/components/product-card";
import { products } from "~/data/products";
import styles from "./catalog.module.css";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Каталог — VAULT" },
    { name: "description", content: "Полный каталог премиальной уличной одежды от топовых брендов" },
  ];
}

export default function Catalog() {
  const [selectedCategory, setSelectedCategory] = useState<string>("Все");

  const categories = ["Все", "Куртки", "Худи", "Брюки", "Обувь", "Аксессуары"];

  const filteredProducts =
    selectedCategory === "Все" ? products : products.filter((p) => p.category === selectedCategory);

  return (
    <div className={styles.page}>
      <Header />

      <main className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Каталог</h1>
          <p className={styles.subtitle}>Эксклюзивная коллекция премиальной уличной одежды</p>

          <div className={styles.filters}>
            {categories.map((category) => (
              <button
                key={category}
                className={`${styles.filterButton} ${selectedCategory === category ? styles.active : ""}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.grid}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <Link key={product.id} to={`/product/${product.id}`} className={styles.productLink}>
                <ProductCard product={product} />
              </Link>
            ))
          ) : (
            <div className={styles.empty}>
              <p>В этой категории пока нет товаров</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
