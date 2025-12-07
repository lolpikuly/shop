# Telegram Web App Integration Guide

## Overview
This guide explains how to integrate your high-end streetwear resale store with Telegram as a Web App.

## Architecture

```
User → Telegram Bot → Web App (This Application) → Google Sheets (Product Data)
```

## Setup Steps

### 1. Create Telegram Bot

1. Open Telegram and search for [@BotFather](https://t.me/botfather)
2. Send `/newbot` command
3. Choose a name for your bot (e.g., "VAULT Streetwear")
4. Choose a username (e.g., "@vault_streetwear_bot")
5. Save the API token you receive

### 2. Configure Web App

1. Send `/newapp` to @BotFather
2. Select your bot
3. Provide app title: "VAULT Каталог"
4. Provide description: "Премиальная pre-owned одежда"
5. Upload app photo (512x512px)
6. Send Web App URL: `https://yourdomain.com` (or Dazl deployment URL)
7. Choose short name: "catalog"

### 3. Environment Variables

Create `.env` file with:

```env
# Telegram Bot Configuration
VITE_TELEGRAM_BOT_USERNAME=your_bot_username
VITE_TELEGRAM_BOT_TOKEN=your_bot_token

# Google Sheets Integration (Optional)
VITE_GOOGLE_SHEETS_URL=https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/export?format=csv
VITE_GOOGLE_SHEET_ID=your_sheet_id
VITE_GOOGLE_API_KEY=your_api_key
```

### 4. Google Sheets Setup (Dynamic Catalog)

#### Option A: Public CSV Export (Simple)

1. Create a Google Sheet with these columns:
   ```
   id | title | brand | size | condition | price | description | imageUrl | images | category | inStock | isNew
   ```

2. Example row:
   ```
   13 | Bomber Jacket | Moncler | M | 9 | 95000 | Pre-owned. Легендарная... | https://... | https://...|https://... | Куртки | true | false
   ```

3. Publish to web:
   - File → Share → Publish to web
   - Choose "Entire Document" and "CSV"
   - Copy the URL
   - Add to `.env` as `VITE_GOOGLE_SHEETS_URL`

#### Option B: Google Sheets API (Advanced)

1. Enable Google Sheets API in Google Cloud Console
2. Create API credentials
3. Add credentials to `.env`
4. Use `fetchProductsFromAPI()` instead of `fetchProductsFromSheet()`

### 5. Bot Commands Setup

Configure these commands in @BotFather using `/setcommands`:

```
start - Запустить бота
catalog - Открыть каталог
help - Помощь
```

### 6. Create Bot Logic (Python Example)

```python
from telegram import Update, WebAppInfo, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import Application, CommandHandler, MessageHandler, filters, ContextTypes

# Your bot token
TOKEN = "YOUR_BOT_TOKEN"
WEB_APP_URL = "https://yourdomain.com"

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    keyboard = [[InlineKeyboardButton(
        "🛍 Открыть каталог",
        web_app=WebAppInfo(url=WEB_APP_URL)
    )]]
    reply_markup = InlineKeyboardMarkup(keyboard)
    
    await update.message.reply_text(
        "👋 Добро пожаловать в VAULT!\n\n"
        "Премиальная pre-owned одежда от лучших брендов.\n"
        "Нажмите кнопку ниже, чтобы открыть каталог:",
        reply_markup=reply_markup
    )

async def catalog(update: Update, context: ContextTypes.DEFAULT_TYPE):
    keyboard = [[InlineKeyboardButton(
        "🛍 Каталог",
        web_app=WebAppInfo(url=f"{WEB_APP_URL}/catalog")
    )]]
    reply_markup = InlineKeyboardMarkup(keyboard)
    
    await update.message.reply_text(
        "Выберите товары из нашей коллекции:",
        reply_markup=reply_markup
    )

async def handle_web_app_data(update: Update, context: ContextTypes.DEFAULT_TYPE):
    # Handle data sent from Web App
    data = update.effective_message.web_app_data.data
    # Process purchase request
    await update.message.reply_text(f"Получен запрос: {data}")

def main():
    application = Application.builder().token(TOKEN).build()
    
    application.add_handler(CommandHandler("start", start))
    application.add_handler(CommandHandler("catalog", catalog))
    application.add_handler(MessageHandler(
        filters.StatusUpdate.WEB_APP_DATA, 
        handle_web_app_data
    ))
    
    application.run_polling()

if __name__ == "__main__":
    main()
```

### 7. Telegram Payments Integration (Optional)

To accept payments directly in Telegram:

1. Contact [@BotFather](https://t.me/botfather)
2. Send `/mybots` → Choose your bot → Payments
3. Connect a payment provider (Stripe, YooMoney, etc.)
4. Implement payment flow in bot:

```python
from telegram import LabeledPrice

async def send_invoice(update: Update, context: ContextTypes.DEFAULT_TYPE):
    product_id = context.args[0]  # From /buy product_id
    
    # Fetch product details
    product = get_product(product_id)
    
    await context.bot.send_invoice(
        chat_id=update.effective_chat.id,
        title=f"{product.brand} {product.title}",
        description=product.description,
        payload=f"product_{product_id}",
        provider_token="YOUR_PROVIDER_TOKEN",
        currency="RUB",
        prices=[LabeledPrice(label=product.title, amount=product.price * 100)],
        photo_url=product.imageUrl,
    )
```

## Web App Features

### Dynamic Product Loading

The app automatically fetches products from Google Sheets on page load:

```typescript
// In your route loader
export async function loader() {
  const sheetProducts = await fetchProductsFromSheet();
  const staticProducts = products; // Fallback
  
  return { 
    products: sheetProducts.length > 0 ? sheetProducts : staticProducts 
  };
}
```

### Product Detail Page

Each product has a dedicated page at `/product/:id` with:
- Image gallery (5 photos)
- Full product details
- "Buy in Telegram" button that opens chat with bot

### Admin Panel

Access at `/admin` to:
- Add new products
- Edit existing products
- Delete products
- Upload images
- Manage inventory

**Note**: In production, secure this route with authentication!

## Deployment

### Deploy to Vercel/Netlify

1. Push code to GitHub
2. Connect to Vercel/Netlify
3. Add environment variables
4. Deploy
5. Update Web App URL in @BotFather

### Update Bot with Web App URL

```
/newapp → Select bot → Update URL → https://your-deployed-url.vercel.app
```

## User Flow

1. User opens Telegram bot
2. Clicks "Каталог товаров" button
3. Web App opens inside Telegram
4. User browses products, filters by category
5. Clicks on product → Views details with 5 photos
6. Clicks "Купить в Telegram" → Chat with bot opens
7. Bot assists with purchase, payment, delivery

## Testing

### Local Testing

1. Install [ngrok](https://ngrok.com/) or similar tunnel service
2. Run your app: `npm run dev`
3. Create tunnel: `ngrok http 3000`
4. Use ngrok URL as Web App URL in Telegram
5. Test bot commands

### Production Testing

1. Deploy to staging environment
2. Update Web App URL
3. Test all flows
4. Enable payments (if using Telegram Payments)
5. Deploy to production

## Monitoring & Analytics

Track user behavior:

```typescript
// In Telegram WebApp
if (window.Telegram?.WebApp) {
  // Track page views
  window.Telegram.WebApp.sendData(JSON.stringify({
    event: 'page_view',
    page: '/catalog'
  }));
}
```

## Security Best Practices

1. **Validate Web App Data**: Always verify `initData` hash on backend
2. **Secure Admin Panel**: Add authentication (OAuth, JWT)
3. **Rate Limiting**: Prevent abuse of Google Sheets API
4. **HTTPS Only**: Always use HTTPS for Web App URL
5. **Environment Variables**: Never commit secrets to git

## Troubleshooting

### Web App not opening
- Check HTTPS is enabled
- Verify Web App URL in @BotFather
- Check console for errors

### Products not loading
- Verify Google Sheets URL is public
- Check CORS settings
- Ensure CSV format is correct

### Images not displaying
- Use HTTPS URLs only
- Verify image URLs are accessible
- Check Content Security Policy

## Support

For issues:
- Telegram Bot API: https://core.telegram.org/bots/api
- Web Apps: https://core.telegram.org/bots/webapps
- Google Sheets API: https://developers.google.com/sheets/api

## Next Steps

1. Set up bot with @BotFather
2. Configure Google Sheets for products
3. Deploy Web App
4. Connect bot to Web App
5. Test purchase flow
6. Enable payments
7. Launch! 🚀
