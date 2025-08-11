import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartItem {
  _id: string; // product id
  variantLabel?: string; // variant identification
  title: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartState {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string, variantLabel?: string) => void;
  clearCart: () => void;
  updateQuantity: (
    id: string,
    variantLabel: string | undefined,
    quantity: number
  ) => void;
  totalItems: () => number;
  totalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],

      addToCart: (item) => {
        const cart = get().cart;
        const existingIndex = cart.findIndex(
          (i) => i._id === item._id && i.variantLabel === item.variantLabel
        );
        if (existingIndex !== -1) {
          cart[existingIndex].quantity += item.quantity;
        } else {
          cart.push(item);
        }
        set({ cart: [...cart] });
      },

      removeFromCart: (id, variantLabel) => {
        set({
          cart: get().cart.filter(
            (i) => !(i._id === id && i.variantLabel === variantLabel)
          ),
        });
      },

      clearCart: () => set({ cart: [] }),

      updateQuantity: (id, variantLabel, quantity) => {
        if (quantity < 1) return;
        const cart = get().cart.map((item) =>
          item._id === id && item.variantLabel === variantLabel
            ? { ...item, quantity }
            : item
        );
        set({ cart });
      },

      totalItems: () =>
        get().cart.reduce((acc, item) => acc + item.quantity, 0),

      totalPrice: () =>
        get().cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
    }),
    { name: "brancy" }
  )
);
