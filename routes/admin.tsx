import { useState } from "react";
import { Button } from "~/components/ui/button/button";
import { Input } from "~/components/ui/input/input";
import { Label } from "~/components/ui/label/label";
import { Textarea } from "~/components/ui/textarea/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card/card";
import { Badge } from "~/components/ui/badge/badge";
import { Separator } from "~/components/ui/separator/separator";
import { Plus, Trash2, Edit, Save, X } from "lucide-react";
import { products } from "~/data/products";
import type { Product } from "~/data/products";
import styles from "./admin.module.css";

export default function AdminPanel() {
  const [productList, setProductList] = useState<Product[]>(products);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Product>>({});

  const handleAddNew = () => {
    setIsAdding(true);
    setEditingId(null);
    setFormData({
      title: "",
      brand: "",
      size: "",
      condition: 10,
      price: 0,
      description: "",
      imageUrl: "",
      category: "",
      inStock: true,
      isNew: false,
    });
  };

  const handleEdit = (product: Product) => {
    setEditingId(product.id);
    setIsAdding(false);
    setFormData(product);
  };

  const handleDelete = (id: string) => {
    if (confirm("Удалить этот товар?")) {
      setProductList(productList.filter(p => p.id !== id));
    }
  };

  const handleSave = () => {
    if (isAdding) {
      const newProduct: Product = {
        ...formData as Product,
        id: Date.now().toString(),
      };
      setProductList([...productList, newProduct]);
    } else if (editingId) {
      setProductList(productList.map(p => 
        p.id === editingId ? { ...p, ...formData } : p
      ));
    }
    
    setIsAdding(false);
    setEditingId(null);
    setFormData({});
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingId(null);
    setFormData({});
  };

  const updateFormData = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Панель управления</h1>
          <p className={styles.subtitle}>Управление каталогом товаров</p>
        </div>
        <Button onClick={handleAddNew} size="lg">
          <Plus size={20} />
          Добавить товар
        </Button>
      </div>

      <Separator />

      {(isAdding || editingId) && (
        <Card className={styles.formCard}>
          <CardHeader>
            <CardTitle>
              {isAdding ? "Новый товар" : "Редактирование товара"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form className={styles.form} onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <Label htmlFor="brand">Бренд</Label>
                  <Input
                    id="brand"
                    value={formData.brand || ""}
                    onChange={(e) => updateFormData("brand", e.target.value)}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <Label htmlFor="title">Название</Label>
                  <Input
                    id="title"
                    value={formData.title || ""}
                    onChange={(e) => updateFormData("title", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <Label htmlFor="size">Размер</Label>
                  <Input
                    id="size"
                    value={formData.size || ""}
                    onChange={(e) => updateFormData("size", e.target.value)}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <Label htmlFor="category">Категория</Label>
                  <Input
                    id="category"
                    value={formData.category || ""}
                    onChange={(e) => updateFormData("category", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <Label htmlFor="price">Цена (₽)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price || 0}
                    onChange={(e) => updateFormData("price", Number(e.target.value))}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <Label htmlFor="condition">Состояние (1-10)</Label>
                  <Input
                    id="condition"
                    type="number"
                    min="1"
                    max="10"
                    value={formData.condition || 10}
                    onChange={(e) => updateFormData("condition", Number(e.target.value))}
                    required
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <Label htmlFor="imageUrl">URL фото</Label>
                <Input
                  id="imageUrl"
                  type="url"
                  value={formData.imageUrl || ""}
                  onChange={(e) => updateFormData("imageUrl", e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <Label htmlFor="description">Описание</Label>
                <Textarea
                  id="description"
                  value={formData.description || ""}
                  onChange={(e) => updateFormData("description", e.target.value)}
                  rows={4}
                  required
                />
              </div>

              <div className={styles.checkboxGroup}>
                <label>
                  <input
                    type="checkbox"
                    checked={formData.inStock || false}
                    onChange={(e) => updateFormData("inStock", e.target.checked)}
                  />
                  <span>В наличии</span>
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={formData.isNew || false}
                    onChange={(e) => updateFormData("isNew", e.target.checked)}
                  />
                  <span>Новое</span>
                </label>
              </div>

              <div className={styles.formActions}>
                <Button type="button" variant="outline" onClick={handleCancel}>
                  <X size={18} />
                  Отмена
                </Button>
                <Button type="submit">
                  <Save size={18} />
                  Сохранить
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className={styles.productGrid}>
        {productList.map((product) => (
          <Card key={product.id} className={styles.productCard}>
            <div className={styles.productImage}>
              <img src={product.imageUrl} alt={product.title} />
              {product.isNew && (
                <Badge className={styles.newBadge}>NEW</Badge>
              )}
            </div>
            <div className={styles.productInfo}>
              <div className={styles.productHeader}>
                <div>
                  <p className={styles.productBrand}>{product.brand}</p>
                  <h3 className={styles.productTitle}>{product.title}</h3>
                </div>
                <p className={styles.productPrice}>
                  {product.price.toLocaleString('ru-RU')} ₽
                </p>
              </div>
              <div className={styles.productMeta}>
                <span>Размер: {product.size}</span>
                <span>Состояние: {product.condition}/10</span>
                <Badge variant={product.inStock ? "default" : "secondary"}>
                  {product.inStock ? "В наличии" : "Нет"}
                </Badge>
              </div>
              <div className={styles.productActions}>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleEdit(product)}
                >
                  <Edit size={16} />
                  Изменить
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleDelete(product.id)}
                  className={styles.deleteButton}
                >
                  <Trash2 size={16} />
                  Удалить
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
