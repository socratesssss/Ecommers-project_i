// redux/cartSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// 
type ProductColor = {
  color: string;
  images: string[];
};

export interface CartItem {
  _id: string;
  productName: { original: string };
  price: { amount: number };
  quantity: number;
  imageUrl: string;
  inStock: boolean; // ✅ changed from "availability"
  selectedColor?: string | null;
  allColors?: ProductColor[];
}



// Define Cart State
interface CartState {
  items: CartItem[];
}

// Helper: Load cart items from localStorage
const loadInitialState = (): CartItem[] => {
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem('cart');
      if (stored) {
        return JSON.parse(stored) as CartItem[];
      }
    } catch (error) {
      console.error('Failed to load cart from localStorage', error);
    }
  }
  return [];
};

// Save cart items to localStorage
const saveToStorage = (items: CartItem[]) => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('cart', JSON.stringify(items));
    } catch (error) {
      console.error('Failed to save cart to localStorage', error);
    }
  }
};

// Initial state with loaded items
const initialState: CartState = {
  items: loadInitialState(),
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
addToCart(state, action: PayloadAction<CartItem>) {
  const { _id, selectedColor } = action.payload;

  // Match existing cart item by _id and selectedColor (if any)
  const existing = state.items.find(
    item => item._id === _id && item.selectedColor === selectedColor
  );

  if (existing) {
    existing.quantity += action.payload.quantity;
  } else {
    state.items.push(action.payload);
  }

  saveToStorage(state.items);
},


    removeFromCart(state, action: PayloadAction<string>) {
      state.items = state.items.filter(item => item._id !== action.payload);
      saveToStorage(state.items);
    },

    adjustQuantity(state, action: PayloadAction<{ _id: string; quantity: number }>) {
      const item = state.items.find(i => i._id === action.payload._id);
      if (item) {
        item.quantity += action.payload.quantity;

        // Remove item if quantity is zero or less
        if (item.quantity <= 0) {
          state.items = state.items.filter(i => i._id !== action.payload._id);
        }
        saveToStorage(state.items);
      }
    },

    clearCart(state) {
      state.items = [];
      saveToStorage(state.items);
    },
  },
});

export const { addToCart, removeFromCart, adjustQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
