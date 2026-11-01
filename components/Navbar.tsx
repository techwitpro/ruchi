"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { Menu as MenuIcon, X } from "lucide-react";
import gsap from "gsap";

export default function Navbar() {
  const { openCart, totalItems } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (navRef.current) {
      gsap.fromTo(
        navRef.current,
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      );
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animate cart badge bounce when items change
  useEffect(() => {
    if (badgeRef.current && totalItems > 0) {
      gsap.timeline()
        .to(badgeRef.current, { scale: 1.35, duration: 0.15, ease: "back.out(2)" })
        .to(badgeRef.current, { scale: 1, duration: 0.15, ease: "power1.out" });
    }
  }, [totalItems]);

  const navLinks = [
    { label: "Meals", href: "#menu" },
    { label: "Offers", href: "#offers" },
    { label: "Rating", href: "#reviews" },
    { label: "Visit us", href: "#visit" },
  ];

  return (
    <header
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "py-3 bg-[#4D0711]/92 backdrop-blur-md shadow-xl border-b border-[#FEFEF6]/10"
          : "pt-[30px] md:pt-[45px] pb-4 bg-transparent"
      }`}
    >
      <div className="max-w-[1197px] mx-auto px-4 md:px-6">
        {/* Figma: #6829:225 (width 1197px, space-between, alignItems center) */}
        <div className="flex items-center justify-between w-full">
          {/* Left section: #6829:226 (width 655px, space-between: links on left, logo on right) */}
          <div className="flex items-center justify-between w-full md:w-[655px]">
            {/* Nav links: #6829:227 (gap 16px, Phudu Medium 20px, #FEFEF6) */}
            <nav className="hidden md:flex items-center gap-[16px]">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="font-phudu font-medium text-[20px] text-[#FEFEF6] hover:text-[#FD7E3B] transition-colors leading-normal"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Logo: #6829:232 (150x55, navbar-logo.svg) */}
            <Link href="/" className="relative flex items-center shrink-0">
              <div className="relative w-[130px] h-[48px] md:w-[150px] md:h-[55px] hover:scale-105 transition-transform duration-300">
                <Image
                  src="/figma/navbar-logo.svg"
                  alt="Ruchi Logo"
                  fill
                  priority
                  sizes="(max-width: 768px) 130px, 150px"
                  className="object-contain"
                />
              </div>
            </Link>
          </div>

          {/* Right Action: #6829:241 "Get yours" Button */}
          {/* Dimensions: 149x47, 12px radius, fill #4D0711, border 1px #FEFEF6, Phudu Medium 20px, #FEFEF6 */}
          <div className="flex items-center gap-3">
            <button
              onClick={openCart}
              className="hidden sm:inline-flex items-center justify-center min-w-[149px] px-4 h-[47px] rounded-[12px] border border-[#FEFEF6] bg-[#4D0711] text-[#FEFEF6] font-phudu font-medium text-[20px] leading-normal hover:bg-[#FEFEF6] hover:text-[#4D0711] active:scale-95 transition-all duration-200 select-none text-center cursor-pointer shadow-sm hover:shadow-md"
            >
              <span>Get yours</span>
              {totalItems > 0 && (
                <span
                  ref={badgeRef}
                  className="ml-2 w-5 h-5 rounded-full bg-[#FD7E3B] text-white text-[12px] font-sans font-bold flex items-center justify-center"
                >
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl border border-[#FEFEF6]/40 text-[#FEFEF6] hover:bg-white/10 transition-colors"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 p-6 rounded-2xl bg-[#37050C] border border-[#FEFEF6]/20 shadow-2xl space-y-4 animate-in fade-in duration-200">
            <nav className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-phudu text-xl font-medium text-[#FEFEF6] hover:text-[#FD7E3B] transition-colors py-1.5"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="pt-2 border-t border-[#FEFEF6]/15">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openCart();
                }}
                className="w-full inline-flex items-center justify-center py-3 rounded-xl border border-[#FEFEF6] text-[#FEFEF6] font-phudu font-medium text-lg hover:bg-[#FEFEF6] hover:text-[#4D0711] transition-all gap-2"
              >
                <span>Get yours</span>
                {totalItems > 0 && (
                  <span className="w-5 h-5 rounded-full bg-[#FD7E3B] text-white text-xs font-bold flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
