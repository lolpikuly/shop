# VAULT — Premium Pre-Owned Streetwear Platform

A modern Telegram Web App for a high-end streetwear resale store, built with React Router v7, TypeScript, and CSS Modules.

![VAULT Preview](https://images.unsplash.com/photo-1558769132-cb1aea1c8a5b?w=1200&q=80)

## 🎯 Features

### Core Functionality
- **Dynamic Catalog** - Product data synced with Google Sheets or admin panel
- **Product Detail Pages** - Full product information with 5-image gallery
- **Category Filtering** - Browse by product category
- **Telegram Integration** - Native "Buy in Telegram" buttons
- **Admin Panel** - Manage products, inventory, and images
- **Responsive Design** - Optimized for mobile and desktop
- **Dark Mode Support** - Automatic theme switching

### E-Commerce Features
- Pre-owned item emphasis with condition ratings (1-10)
- Multiple product images per item
- Real-time inventory status
- Brand filtering and search
- Featured products on homepage

## 🛠 Tech Stack

- **Framework**: React Router v7 (SPA mode)
- **Language**: TypeScript
- **Styling**: CSS Modules + OpenProps design tokens
- **UI Components**: Custom components + Radix UI
- **Icons**: Lucide React
- **Integration**: Telegram WebApp SDK
- **Data Source**: Google Sheets API / Static JSON

## 📦 Project Structure

```
vault/
├── app/
│   ├── components/          # Reusable UI components
│   │   ├── ui/             # Base UI components (buttons, cards, etc.)
│   │   ├── header.tsx      # Site header
│   │   ├── footer.tsx      # Site footer
│   │   └── product-card.tsx # Product display card
│   ├── routes/             # Application routes
│   │   ├── home.tsx        # Homepage with featured products
│   │   ├── catalog.tsx     # Full product catalog
│   │   ├── product.$id.tsx # Product detail page
│   │   ├── admin.tsx       # Admin management panel
│   │   ├── about.tsx       # About page
│   │   └── contact.tsx     # Contact page
│   ├── data/               # Data layer
│   │   └── products.ts     # Product type definitions & data
│   ├── services/           # External integrations
│   │   └── google-sheets.ts # Google Sheets API integration
│   ├── utils/              # Utility functions
│   │   └── telegram.ts     # Telegram WebApp SDK wrapper
│   ├── styles/             # Global styles
│   │   ├── theme.css       # Theme variables
│   │   ├── global.css      # Global styles
│   │   └── tokens/         # Design tokens
│   └── root.tsx            # Root component
├── public/                 # Static assets
├── telegram-integration.md # Telegram setup guide
├── STYLE_GUIDE.md         # Design system documentation
└── package.json
```

## 🚀 Quick Start

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Environment Setup

Create `.env` file:

```env
# Telegram Configuration
VITE_TELEGRAM_BOT_USERNAME=your_bot_username
VITE_TELEGRAM_BOT_TOKEN=your_bot_token

# Google Sheets (Optional)
VITE_GOOGLE_SHEETS_URL=your_published_csv_url
VITE_GOOGLE_SHEET_ID=your_sheet_id
VITE_GOOGLE_API_KEY=your_api_key
```

### Build for Production

```bash
npm run build
```

## 📱 Telegram Integration

### Setup Bot

1. Create bot with [@BotFather](https://t.me/botfather)
2. Configure Web App with `/newapp`
3. Set Web App URL to your deployment
4. Add bot commands:
   ```
   start - Запустить бота
   catalog - Открыть каталог
   help - Помощь
   ```

See [telegram-integration.md](./telegram-integration.md) for detailed setup instructions.

### Bot Features

- **Web App Button** - Opens catalog inside Telegram
- **Product Deep Links** - Direct links to specific products
- **Haptic Feedback** - Native-feeling interactions
- **Theme Integration** - Respects Telegram theme colors
- **Back Button** - Native Telegram navigation

## 📊 Google Sheets Integration

### CSV Export (Simple Method)

1. Create Google Sheet with columns:
   ```
   id, title, brand, size, condition, price, description, imageUrl, images, category, inStock, isNew
   ```

2. Publish as CSV:
   - File → Share → Publish to web
   - Format: CSV
   - Copy URL to `.env`

### API Integration (Advanced)

```typescript
import { fetchProductsFromAPI } from '~/services/google-sheets';

const products = await fetchProductsFromAPI();
```

Requires:
- Google Cloud project
- Sheets API enabled
- API credentials

## 🎨 Design System

### Color Palette

- **Neutral**: High-contrast black/white/gray
- **Accent**: Neon lime (`#bdee63`)
- **Success**: Green tones
- **Error**: Red tones

### Typography

- **Font**: Space Grotesk (Neo Grotesque)
- **Weights**: 400 (regular), 600 (semibold), 700 (bold), 900 (black)
- **Scale**: Fluid responsive sizing

### Component Tokens

```css
--space-1 through --space-9    /* 4px to 64px */
--radius-1 through --radius-6  /* 2px to 16px */
--shadow-1 through --shadow-4  /* Elevation levels */
```

See [STYLE_GUIDE.md](./STYLE_GUIDE.md) for complete design documentation.

## 🔐 Admin Panel

Access at `/admin` to manage products.

**Features:**
- Add new products
- Edit existing items
- Delete products
- Upload images
- Manage stock status
- Set condition ratings

**Security Note**: Add authentication before deploying to production!

## 📸 Image Guidelines

### Product Photos

- **Resolution**: Minimum 1200px width
- **Aspect Ratio**: 3:4 (portrait)
- **Format**: JPEG or WebP
- **Quality**: 85-90%
- **Quantity**: 5 images per product

### Recommended Sources

- [Unsplash](https://unsplash.com) - High-quality free photos
- [Pexels](https://pexels.com) - Curated stock photos

### Example URLs

```
https://images.unsplash.com/photo-ID?w=1200&q=90
```

## 🌐 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod
```

### Environment Variables

Add all `.env` variables to your deployment platform:
- Vercel: Project Settings → Environment Variables
- Netlify: Site Settings → Build & Deploy → Environment

## 📖 Routes

| Route | Description |
|-------|-------------|
| `/` | Homepage with featured products |
| `/catalog` | Full product catalog with filters |
| `/product/:id` | Product detail page |
| `/admin` | Product management panel |
| `/about` | About the brand |
| `/contact` | Contact information |

## 🎯 Product Data Structure

```typescript
interface Product {
  id: string;
  title: string;          // e.g., "Cargo Pants"
  brand: string;          // e.g., "Stone Island"
  size: string;           // e.g., "L", "M", "43"
  condition: number;      // 1-10 rating
  price: number;          // in rubles
  description: string;    // Full description
  imageUrl: string;       // Main image
  images?: string[];      // Additional images (5 total)
  category: string;       // e.g., "Куртки", "Обувь"
  inStock: boolean;       // Availability
  isNew?: boolean;        // New vs pre-owned
}
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📝 License

This project is MIT licensed.

## 🆘 Support

- **Documentation**: See `/docs` folder
- **Telegram Guide**: [telegram-integration.md](./telegram-integration.md)
- **Style Guide**: [STYLE_GUIDE.md](./STYLE_GUIDE.md)
- **Issues**: [GitHub Issues](https://github.com/yourusername/vault/issues)

## 🎓 Resources

- [React Router v7 Docs](https://reactrouter.com)
- [Telegram Bot API](https://core.telegram.org/bots/api)
- [Telegram WebApps](https://core.telegram.org/bots/webapps)
- [Google Sheets API](https://developers.google.com/sheets/api)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## 🏷 Brands Featured

Stone Island • Louis Vuitton • Saint Laurent • Burberry • CP Company • Arc'teryx • Acne Studios • A Cold Wall • Maison Margiela • Rick Owens • Balenciaga • Vetements • Moncler • The North Face

---

**Built with ❤️ for the streetwear community**

*Sustainable fashion through premium pre-owned pieces*
