"use client";

import React, { useState, useEffect } from "react";
import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MenuSection from "@/components/MenuSection";
import StepsSection from "@/components/StepsSection";
import FridayFlashBanner from "@/components/FridayFlashBanner";
import DealsSection from "@/components/DealsSection";
import CateringSection from "@/components/CateringSection";
import ReviewsSection from "@/components/ReviewsSection";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("Burgers");

  useEffect(() => {
    // Ensure all ScrollTrigger positions are accurately calculated after initial render
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  const handleSelectCategory = (cat: string) => {
    setSelectedCategory(cat);
  };

  return (
    <CartProvider>
      <main className="min-h-screen flex flex-col bg-[#4D0711] overflow-x-hidden selection:bg-[#FD7E3B] selection:text-white">
        {/* Navigation */}
        <Navbar />

        {/* Hero Section */}
        <Hero onSelectCategory={handleSelectCategory} />

        {/* Menu Section with curved top */}
        <MenuSection
          selectedCategory={selectedCategory}
          onSelectCategory={handleSelectCategory}
        />

        {/* Explore, then order (Steps) */}
        <StepsSection />

        {/* Friday Flash Promo Banner */}
        <FridayFlashBanner />

        {/* Combos made for sharing (Deals) */}
        <DealsSection />

        {/* Catering & Gatherings */}
        <CateringSection />

        {/* Real reviews (Voices) */}
        <ReviewsSection />

        {/* Footer */}
        <Footer />

        {/* Slide-out Cart Drawer */}
        <CartDrawer />
      </main>
    </CartProvider>
  );
}
