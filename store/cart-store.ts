import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CartItem, Product } from '@/types';

interface CartState {
  items: CartItem[];
  addItem: (product: Product, quantity: number, color?: string, size?: string) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  totalPrice: number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (product, quantity, color, size) => {
        const { items } = get();
        const existingItemIndex = items.findIndex(
          item => 
            item.product.id === product.id && 
            item.color === color && 
            item.size === size
        );
        
        if (existingItemIndex !== -1) {
          // Update existing item
          const updatedItems = [...items];
          updatedItems[existingItemIndex].quantity += quantity;
          set({ items: updatedItems });
        } else {
          // Add new item
          set({ items: [...items, { product, quantity, color, size }] });
        }
      },
      
      removeItem: (productId) => {
        const { items } = get();
        set({ items: items.filter(item => item.product.id !== productId) });
      },
      
      updateQuantity: (productId, quantity) => {
        const { items } = get();
        const updatedItems = items.map(item => 
          item.product.id === productId 
            ? { ...item, quantity: Math.max(1, quantity) } 
            : item
        );
        set({ items: updatedItems });
      },
      
      clearCart: () => set({ items: [] }),
      
      get itemCount() {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
      
      get totalPrice() {
        return get().items.reduce(
          (total, item) => total + (item.product.price * item.quantity), 
          0
        );
      },
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);