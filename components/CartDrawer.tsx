"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, CheckCircle2, Sparkles } from "lucide-react";

export default function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    subtotal,
    discount,
    deliveryFee,
    total,
    promoCode,
    applyPromoCode,
    promoError,
    clearCart,
  } = useCart();

  const [inputCode, setInputCode] = useState("");
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputCode) {
      applyPromoCode(inputCode);
    }
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setOrderComplete(true);
      setTimeout(() => {
        clearCart();
        setOrderComplete(false);
        closeCart();
      }, 3500);
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={closeCart}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-[#4D0711] text-[#FEFEF6] h-full shadow-2xl flex flex-col z-10 border-l border-[#FEFEF6]/15">
        {/* Header */}
        <div className="p-6 border-b border-[#FEFEF6]/15 flex items-center justify-between bg-[#37050C]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#FD7E3B]/20 flex items-center justify-center text-[#FD7E3B]">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-phudu text-xl font-bold tracking-tight">Your Order</h3>
              <p className="text-xs text-[#FEFEF6]/70">
                {items.length === 0 ? "Cart is empty" : `${items.length} unique item${items.length > 1 ? "s" : ""}`}
              </p>
            </div>
          </div>
          <button
            onClick={closeCart}
            className="p-2 rounded-full hover:bg-white/10 transition-colors text-[#FEFEF6]/80 hover:text-white"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {orderComplete ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-[#4D0711]">
            <div className="w-20 h-20 rounded-full bg-[#FD7E3B]/20 text-[#FD7E3B] flex items-center justify-center mb-6 animate-bounce">
              <CheckCircle2 className="w-12 h-12" />
            </div>
            <h3 className="font-phudu text-3xl font-black mb-2 text-[#FEFEF6]">Order Placed!</h3>
            <p className="text-sm text-[#FEFEF6]/80 max-w-xs mb-6">
              Thank you! Your meal is being flame-grilled and will arrive within <span className="text-[#FD7E3B] font-bold">25 minutes</span>.
            </p>
            <div className="p-4 rounded-xl bg-[#37050C] border border-[#FEFEF6]/15 w-full text-xs text-left space-y-2">
              <div className="flex justify-between text-[#FEFEF6]/70">
                <span>Estimated Arrival:</span>
                <span className="text-[#FD7E3B] font-semibold">24 mins</span>
              </div>
              <div className="flex justify-between text-[#FEFEF6]/70">
                <span>Order Status:</span>
                <span className="text-emerald-400 font-semibold">Kitchen Prepping</span>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Delivery banner */}
            <div className="px-6 py-2.5 bg-[#FD7E3B]/15 border-b border-[#FD7E3B]/30 flex items-center justify-between text-xs">
              <span className="text-[#FD7E3B] font-medium flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                {subtotal >= 35 ? "Free Delivery Unlocked!" : `Add $${(35 - subtotal).toFixed(2)} more for Free Delivery`}
              </span>
              <span className="font-semibold text-[#FEFEF6]/90">25 min arrival</span>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 text-[#FEFEF6]/40">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <h4 className="font-phudu text-lg font-bold mb-1">Your cart is empty</h4>
                  <p className="text-sm text-[#FEFEF6]/60 max-w-xs mb-6">
                    Add our flame-grilled burgers, wings, or crispy pizzas to get started!
                  </p>
                  <button
                    onClick={closeCart}
                    className="px-6 py-2.5 rounded-xl bg-[#FD7E3B] text-white font-phudu text-sm font-semibold hover:bg-[#e66a27] transition-all"
                  >
                    Explore Menu
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-2xl bg-[#37050C] border border-[#FEFEF6]/10 flex gap-3.5 items-center group hover:border-[#FD7E3B]/40 transition-all"
                  >
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-[#FEEDCF]/10 shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="80px"
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-phudu font-bold text-sm truncate text-[#FEFEF6]">{item.name}</h4>
                      {item.options && (
                        <p className="text-[11px] text-[#FEFEF6]/60 truncate mb-1">{item.options}</p>
                      )}
                      <div className="flex items-center gap-2 mt-1">
                        <span className="font-phudu font-bold text-sm text-[#FD7E3B]">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                        {item.originalPrice && (
                          <span className="text-[11px] line-through text-[#FEFEF6]/40">
                            ${(item.originalPrice * item.quantity).toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>
                    {/* Quantity controls */}
                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-[#FEFEF6]/40 hover:text-red-400 p-1 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                      <div className="flex items-center gap-1.5 bg-[#4D0711] rounded-lg p-0.5 border border-[#FEFEF6]/15">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-5 h-5 flex items-center justify-center rounded hover:bg-white/10 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-5 text-center text-xs font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-5 h-5 flex items-center justify-center rounded hover:bg-white/10 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 bg-[#37050C] border-t border-[#FEFEF6]/15 space-y-4">
                {/* Promo Code Form */}
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <input
                    type="text"
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value)}
                    placeholder="Promo code (e.g. FLASH50)"
                    className="flex-1 px-3.5 py-2 rounded-xl bg-[#4D0711] border border-[#FEFEF6]/20 text-xs text-[#FEFEF6] placeholder-[#FEFEF6]/40 focus:outline-none focus:border-[#FD7E3B]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-[#FD7E3B] text-xs font-phudu font-bold hover:bg-[#e66a27] transition-colors"
                  >
                    Apply
                  </button>
                </form>

                {promoCode && (
                  <p className="text-xs text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Code &quot;{promoCode}&quot; applied!
                  </p>
                )}
                {promoError && <p className="text-xs text-red-400">{promoError}</p>}

                {/* Bill Breakdown */}
                <div className="space-y-1.5 text-xs text-[#FEFEF6]/80 pt-1">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-phudu font-semibold">${subtotal.toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-emerald-400">
                      <span>Discount ({promoCode})</span>
                      <span className="font-phudu font-semibold">-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span className="font-phudu font-semibold">
                      {deliveryFee === 0 ? <span className="text-emerald-400">FREE</span> : `$${deliveryFee.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-[#FEFEF6] pt-2 border-t border-[#FEFEF6]/10">
                    <span className="font-phudu">Total</span>
                    <span className="font-phudu text-[#FD7E3B] text-lg font-black">${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="w-full py-3.5 rounded-xl bg-[#FD7E3B] text-white font-phudu font-bold text-base flex items-center justify-center gap-2 hover:bg-[#e66a27] active:scale-[0.99] transition-all disabled:opacity-70 shadow-lg shadow-[#FD7E3B]/20"
                >
                  {isCheckingOut ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Checkout &bull; ${total.toFixed(2)}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

