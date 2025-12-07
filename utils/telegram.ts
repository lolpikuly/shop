// Telegram WebApp SDK types
declare global {
  interface Window {
    Telegram?: {
      WebApp: {
        initData: string;
        initDataUnsafe: {
          query_id?: string;
          user?: {
            id: number;
            first_name: string;
            last_name?: string;
            username?: string;
            language_code?: string;
          };
          auth_date?: number;
          hash?: string;
        };
        version: string;
        platform: string;
        colorScheme: 'light' | 'dark';
        themeParams: {
          bg_color?: string;
          text_color?: string;
          hint_color?: string;
          link_color?: string;
          button_color?: string;
          button_text_color?: string;
        };
        isExpanded: boolean;
        viewportHeight: number;
        viewportStableHeight: number;
        headerColor: string;
        backgroundColor: string;
        BackButton: {
          isVisible: boolean;
          show(): void;
          hide(): void;
          onClick(callback: () => void): void;
          offClick(callback: () => void): void;
        };
        MainButton: {
          text: string;
          color: string;
          textColor: string;
          isVisible: boolean;
          isActive: boolean;
          isProgressVisible: boolean;
          setText(text: string): void;
          show(): void;
          hide(): void;
          enable(): void;
          disable(): void;
          showProgress(leaveActive?: boolean): void;
          hideProgress(): void;
          onClick(callback: () => void): void;
          offClick(callback: () => void): void;
        };
        HapticFeedback: {
          impactOccurred(style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft'): void;
          notificationOccurred(type: 'error' | 'success' | 'warning'): void;
          selectionChanged(): void;
        };
        ready(): void;
        expand(): void;
        close(): void;
        sendData(data: string): void;
        openLink(url: string, options?: { try_instant_view?: boolean }): void;
        openTelegramLink(url: string): void;
        showPopup(params: {
          title?: string;
          message: string;
          buttons?: Array<{
            id?: string;
            type?: 'default' | 'ok' | 'close' | 'cancel' | 'destructive';
            text?: string;
          }>;
        }, callback?: (buttonId: string) => void): void;
        showAlert(message: string, callback?: () => void): void;
        showConfirm(message: string, callback?: (confirmed: boolean) => void): void;
      };
    };
  }
}

export class TelegramWebApp {
  private static instance: TelegramWebApp;
  
  private constructor() {
    if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
      window.Telegram.WebApp.ready();
      this.applyTheme();
    }
  }

  static getInstance(): TelegramWebApp {
    if (!TelegramWebApp.instance) {
      TelegramWebApp.instance = new TelegramWebApp();
    }
    return TelegramWebApp.instance;
  }

  isAvailable(): boolean {
    return typeof window !== 'undefined' && !!window.Telegram?.WebApp;
  }

  getUser() {
    return window.Telegram?.WebApp?.initDataUnsafe?.user;
  }

  openProductInBot(productId: string, productName: string) {
    const botUsername = import.meta.env.VITE_TELEGRAM_BOT_USERNAME || 'your_bot_username';
    const message = encodeURIComponent(`Хочу купить: ${productName}`);
    const url = `https://t.me/${botUsername}?start=product_${productId}&text=${message}`;
    
    if (this.isAvailable()) {
      window.Telegram!.WebApp.openTelegramLink(url);
      this.hapticFeedback('medium');
    } else {
      window.open(url, '_blank');
    }
  }

  hapticFeedback(style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft' = 'medium') {
    if (this.isAvailable()) {
      window.Telegram!.WebApp.HapticFeedback.impactOccurred(style);
    }
  }

  notificationFeedback(type: 'error' | 'success' | 'warning') {
    if (this.isAvailable()) {
      window.Telegram!.WebApp.HapticFeedback.notificationOccurred(type);
    }
  }

  showBackButton(callback: () => void) {
    if (this.isAvailable()) {
      const backButton = window.Telegram!.WebApp.BackButton;
      backButton.onClick(callback);
      backButton.show();
    }
  }

  hideBackButton() {
    if (this.isAvailable()) {
      window.Telegram!.WebApp.BackButton.hide();
    }
  }

  showMainButton(text: string, callback: () => void) {
    if (this.isAvailable()) {
      const mainButton = window.Telegram!.WebApp.MainButton;
      mainButton.setText(text);
      mainButton.onClick(callback);
      mainButton.show();
    }
  }

  hideMainButton() {
    if (this.isAvailable()) {
      window.Telegram!.WebApp.MainButton.hide();
    }
  }

  expand() {
    if (this.isAvailable()) {
      window.Telegram!.WebApp.expand();
    }
  }

  close() {
    if (this.isAvailable()) {
      window.Telegram!.WebApp.close();
    }
  }

  private applyTheme() {
    if (this.isAvailable()) {
      const { themeParams, colorScheme } = window.Telegram!.WebApp;
      
      // Apply Telegram theme colors to CSS variables
      if (colorScheme === 'dark') {
        document.documentElement.setAttribute('data-color-scheme', 'dark');
      } else {
        document.documentElement.setAttribute('data-color-scheme', 'light');
      }
    }
  }

  showAlert(message: string) {
    if (this.isAvailable()) {
      window.Telegram!.WebApp.showAlert(message);
    } else {
      alert(message);
    }
  }

  showConfirm(message: string, callback: (confirmed: boolean) => void) {
    if (this.isAvailable()) {
      window.Telegram!.WebApp.showConfirm(message, callback);
    } else {
      callback(confirm(message));
    }
  }
}

export const telegramWebApp = TelegramWebApp.getInstance();
