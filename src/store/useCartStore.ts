// store/cartStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartItem {
  _id: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartState {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  totalItems: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addToCart: (item) => {
        const items = get().items;
        const existing = items.find((i) => i._id === item._id);
        if (existing) {
          existing.quantity += item.quantity;
        } else {
          items.push(item);
        }
        set({ items: [...items] });
      },
      removeFromCart: (id) => {
        set({ items: get().items.filter((i) => i._id !== id) });
      },
      clearCart: () => set({ items: [] }),
      totalItems: () =>
        get().items.reduce((acc, item) => acc + item.quantity, 0),
    }),
    { name: "brancy" }
  )
);
