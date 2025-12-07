import type { Product } from "~/data/products";

/**
 * Google Sheets integration for dynamic product management
 * 
 * Setup Instructions:
 * 1. Create a Google Sheet with columns: id, title, brand, size, condition, price, description, imageUrl, images, category, inStock, isNew
 * 2. Publish the sheet: File > Share > Publish to web > CSV
 * 3. Get the published CSV URL
 * 4. Add VITE_GOOGLE_SHEETS_URL to your .env file
 * 
 * Alternative: Use Google Sheets API for real-time updates
 */

const SHEET_URL = import.meta.env.VITE_GOOGLE_SHEETS_URL || '';

export async function fetchProductsFromSheet(): Promise<Product[]> {
  if (!SHEET_URL) {
    console.warn('Google Sheets URL not configured. Using static data.');
    return [];
  }

  try {
    const response = await fetch(SHEET_URL);
    const csvText = await response.text();
    
    return parseCSVToProducts(csvText);
  } catch (error) {
    console.error('Error fetching products from Google Sheets:', error);
    return [];
  }
}

function parseCSVToProducts(csvText: string): Product[] {
  const lines = csvText.split('\n');
  const headers = lines[0].split(',').map(h => h.trim());
  
  const products: Product[] = [];
  
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim()) continue;
    
    const values = line.split(',').map(v => v.trim());
    const product: any = {};
    
    headers.forEach((header, index) => {
      const value = values[index];
      
      switch (header) {
        case 'id':
        case 'title':
        case 'brand':
        case 'size':
        case 'description':
        case 'imageUrl':
        case 'category':
          product[header] = value;
          break;
        case 'condition':
        case 'price':
          product[header] = Number(value);
          break;
        case 'inStock':
        case 'isNew':
          product[header] = value.toLowerCase() === 'true' || value === '1';
          break;
        case 'images':
          product[header] = value ? value.split('|') : [];
          break;
      }
    });
    
    if (product.id && product.title) {
      products.push(product as Product);
    }
  }
  
  return products;
}

/**
 * Alternative: Google Sheets API integration
 * Requires API key and more complex setup but provides real-time updates
 */
export async function fetchProductsFromAPI(): Promise<Product[]> {
  const SHEET_ID = import.meta.env.VITE_GOOGLE_SHEET_ID;
  const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
  const RANGE = 'Products!A2:L'; // Adjust range as needed
  
  if (!SHEET_ID || !API_KEY) {
    console.warn('Google Sheets API not configured');
    return [];
  }

  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${API_KEY}`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    
    return data.values.map((row: any[]) => ({
      id: row[0],
      title: row[1],
      brand: row[2],
      size: row[3],
      condition: Number(row[4]),
      price: Number(row[5]),
      description: row[6],
      imageUrl: row[7],
      images: row[8] ? row[8].split('|') : [],
      category: row[9],
      inStock: row[10] === 'true' || row[10] === '1',
      isNew: row[11] === 'true' || row[11] === '1',
    }));
  } catch (error) {
    console.error('Error fetching from Google Sheets API:', error);
    return [];
  }
}
