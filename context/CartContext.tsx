"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  quantity: number;
  options?: string;
}

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  promoCode: string;
  applyPromoCode: (code: string) => boolean;
  promoError: string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([
    {
      id: "double-stack-1",
      name: "Double Stack Burger",
      price: 11.49,
      originalPrice: 13.99,
      image: "/figma/menu-double-stack.png",
      category: "Burgers",
      quantity: 1,
      options: "Medium Rare, Extra Cheese",
    },
  ]);
  const [isOpen, setIsOpen] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoError, setPromoError] = useState("");

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);
  const toggleCart = () => setIsOpen((prev) => !prev);

  const addItem = (item: Omit<CartItem, "quantity">, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...prev, { ...item, quantity }];
    });
    setIsOpen(true);
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((i) => {
          if (i.id === id) {
            const newQty = i.quantity + delta;
            return newQty > 0 ? { ...i, quantity: newQty } : null;
          }
          return i;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const applyPromoCode = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === "FLASH50" || clean === "WINGS50") {
      setPromoCode(clean);
      setDiscountPercent(0.5);
      setPromoError("");
      return true;
    } else if (clean === "RUCHI20" || clean === "WELCOME20") {
      setPromoCode(clean);
      setDiscountPercent(0.2);
      setPromoError("");
      return true;
    } else {
      setPromoError("Invalid code. Try 'FLASH50' or 'RUCHI20'");
      return false;
    }
  };

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const discount = subtotal * discountPercent;
  const deliveryFee = subtotal > 35 || subtotal === 0 ? 0 : 2.99;
  const total = Math.max(0, subtotal - discount + (subtotal > 0 ? deliveryFee : 0));

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        openCart,
        closeCart,
        toggleCart,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        discount,
        deliveryFee,
        total,
        promoCode,
        applyPromoCode,
        promoError,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

