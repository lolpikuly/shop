import { Send } from "lucide-react";
import type { Product } from "~/data/products";
import styles from "./product-card.module.css";

interface ProductCardProps {
  product: Product;
  className?: string;
}

/**
 * Product card component for displaying streetwear items
 * @important
 */
export function ProductCard({ product, className }: ProductCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency: "RUB",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const telegramLink = `https://t.me/vault_store?text=Интересует: ${product.brand} ${product.title}`;

  return (
    <div className={`${styles.card} ${className || ""}`}>
      <div className={styles.imageWrapper}>
        <img src={product.imageUrl} alt={`${product.brand} ${product.title}`} className={styles.image} />
        {product.condition === 10 && <div className={styles.badge}>New</div>}
      </div>

      <div className={styles.content}>
        <div className={styles.brand}>{product.brand}</div>
        <h3 className={styles.title}>{product.title}</h3>

        <div className={styles.details}>
          <div className={styles.detail}>
            <span>Размер:</span>
            <strong>{product.size}</strong>
          </div>
          <div className={styles.detail}>
            <span>Состояние:</span>
            <div className={styles.conditionBar}>
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className={`${styles.conditionDot} ${i < product.condition ? styles.filled : ""}`} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.footer}>
        <div className={styles.price}>{formatPrice(product.price)}</div>
        <a href={telegramLink} target="_blank" rel="noopener noreferrer" className={styles.button}>
          <Send className={styles.telegramIcon} />
          Купить
        </a>
      </div>
    </div>
  );
}
