export interface Product {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    description: string;
    images: string[];
    rating: number;
    reviewCount: number;
    category: string;
    tags: string[];
    colors?: string[];
    sizes?: string[];
    inStock: boolean;
    featured?: boolean;
    isNew?: boolean;
    discount?: number;
  }
  
  export interface Category {
    id: string;
    name: string;
    image: string;
    productCount: number;
  }
  
  export interface Banner {
    id: string;
    title: string;
    subtitle: string;
    image: string;
    buttonText: string;
    link: string;
  }
  
  export interface CartItem {
    product: Product;
    quantity: number;
    color?: string;
    size?: string;
  }
  
  export interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    phone?: string;
    addresses: Address[];
  }
  
  export interface Address {
    id: string;
    name: string;
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    isDefault?: boolean;
    phone?: string;
  }
  
  export interface Order {
    id: string;
    date: string;
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    items: CartItem[];
    total: number;
    shippingAddress: Address;
    paymentMethod: string;
    trackingNumber?: string;
  }
  
  export type ThemeType = 'light' | 'dark' | 'system';