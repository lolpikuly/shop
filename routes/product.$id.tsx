import { useNavigate } from "react-router";
import { Badge } from "~/components/ui/badge/badge";
import { Button } from "~/components/ui/button/button";
import { Card } from "~/components/ui/card/card";
import { Separator } from "~/components/ui/separator/separator";
import { ShoppingCart, ArrowLeft, CheckCircle2, Package, Shield } from "lucide-react";
import { fetchProductById } from "~/data/products";
import type { Route } from "./+types/product.$id";
import styles from "./product.$id.module.css";
import { useState } from "react";

export async function loader({ params }: Route.LoaderArgs) {
  const product = await fetchProductById(params.id);
  
  if (!product) {
    throw new Response("Product not found", { status: 404 });
  }
  
  return { product };
}

export default function ProductDetail({ loaderData }: Route.ComponentProps) {
  const { product } = loaderData;
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  
  const images = product.images || [product.imageUrl];
  
  const handleBuyInTelegram = () => {
    // Telegram WebApp API integration
    const botUsername = "your_bot_username"; // Replace with actual bot username
    const message = `Хочу купить: ${product.brand} ${product.title} (${product.size})`;
    const telegramUrl = `https://t.me/${botUsername}?start=product_${product.id}`;
    
    // If running in Telegram WebApp context
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.openTelegramLink(telegramUrl);
    } else {
      window.open(telegramUrl, '_blank');
    }
  };

  return (
    <div className={styles.container}>
      <button className={styles.backButton} onClick={() => navigate(-1)}>
        <ArrowLeft size={20} />
        <span>Назад к каталогу</span>
      </button>

      <div className={styles.productLayout}>
        {/* Image Gallery */}
        <div className={styles.gallery}>
          <div className={styles.mainImage}>
            <img src={images[selectedImage]} alt={product.title} />
            {product.isNew && (
              <Badge className={styles.newBadge} variant="default">
                NEW
              </Badge>
            )}
          </div>
          
          <div className={styles.thumbnails}>
            {images.map((img, idx) => (
              <button
                key={idx}
                className={`${styles.thumbnail} ${idx === selectedImage ? styles.active : ''}`}
                onClick={() => setSelectedImage(idx)}
              >
                <img src={img} alt={`${product.title} ${idx + 1}`} />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className={styles.info}>
          <div className={styles.header}>
            <div>
              <p className={styles.brand}>{product.brand}</p>
              <h1 className={styles.title}>{product.title}</h1>
            </div>
            <div className={styles.price}>{product.price.toLocaleString('ru-RU')} ₽</div>
          </div>

          <Separator />

          <div className={styles.details}>
            <div className={styles.detailRow}>
              <span className={styles.label}>Размер:</span>
              <span className={styles.value}>{product.size}</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.label}>Состояние:</span>
              <span className={styles.value}>
                {product.condition}/10
                {product.isNew && <Badge variant="outline" className={styles.conditionBadge}>Новое</Badge>}
              </span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.label}>Категория:</span>
              <span className={styles.value}>{product.category}</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.label}>Наличие:</span>
              <span className={styles.value}>
                {product.inStock ? (
                  <Badge variant="default" className={styles.stockBadge}>
                    <CheckCircle2 size={14} />
                    В наличии
                  </Badge>
                ) : (
                  <Badge variant="secondary">Нет в наличии</Badge>
                )}
              </span>
            </div>
          </div>

          <Separator />

          <div className={styles.description}>
            <h3>Описание</h3>
            <p>{product.description}</p>
          </div>

          <Button 
            size="lg" 
            className={styles.buyButton}
            onClick={handleBuyInTelegram}
          >
            <ShoppingCart size={20} />
            Купить в Telegram
          </Button>

          {/* Trust Signals */}
          <div className={styles.trustSignals}>
            <Card className={styles.trustCard}>
              <Shield size={20} />
              <div>
                <strong>100% оригинал</strong>
                <p>Проверка подлинности</p>
              </div>
            </Card>
            <Card className={styles.trustCard}>
              <Package size={20} />
              <div>
                <strong>Быстрая доставка</strong>
                <p>По всей России</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
