"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";

interface HeroProps {
  onSelectCategory?: (category: string) => void;
}

export default function Hero({ onSelectCategory }: HeroProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const title1Ref = useRef<HTMLSpanElement>(null);
  const title2Ref = useRef<HTMLSpanElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const categories = [
    {
      id: "chicken",
      name: "CHICKEN",
      image: "/figma/hero-chicken.png",
      filterKey: "Poultry",
    },
    {
      id: "hotdog",
      name: "HOT DOG",
      image: "/figma/hero-hotdog.png",
      filterKey: "Rolls",
    },
    {
      id: "burgers",
      name: "BURGERS",
      image: "/figma/hero-burger.png",
      filterKey: "Burgers",
    },
    {
      id: "pizza",
      name: "PIZZA",
      image: "/figma/hero-pizza.png",
      filterKey: "Pizza",
    },
    {
      id: "shawarma",
      name: "SHAWARMA",
      image: "/figma/hero-shawarma.png",
      filterKey: "Rolls",
    },
    {
      id: "combos",
      name: "COMBOS",
      image: "/figma/hero-extra.png",
      filterKey: "Fan favorites",
    },
  ];

  // Repeat categories to ensure seamless infinite loop across all viewport widths up to 4K
  const marqueeItems = [...categories, ...categories];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Clean entrance timeline on page load - NO scroll animations
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Ambient background glow gentle pulse
      if (glowRef.current) {
        gsap.to(glowRef.current, {
          scale: 1.08,
          opacity: 0.16,
          duration: 5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      // Top pill badge: spring pop-in
      if (badgeRef.current) {
        tl.fromTo(
          badgeRef.current,
          { opacity: 0, scale: 0.75, y: -20 },
          { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: "back.out(2)", clearProps: "opacity,transform" },
          0.05
        );
      }

      // Heading lines: cinematic smooth slide up with power4 ease
      if (title1Ref.current && title2Ref.current) {
        tl.fromTo(
          [title1Ref.current, title2Ref.current],
          { opacity: 0, y: 55 },
          {
            opacity: 1,
            y: 0,
            duration: 0.95,
            stagger: 0.12,
            ease: "power4.out",
            clearProps: "opacity,transform",
          },
          0.15
        );
      }

      // CTA buttons: tactile spring rise
      if (ctaRef.current) {
        tl.fromTo(
          ctaRef.current.children,
          { opacity: 0, scale: 0.88, y: 25 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.75,
            stagger: 0.1,
            ease: "back.out(1.8)",
            clearProps: "opacity,transform",
          },
          0.3
        );
      }

      // Category cards marquee: smooth entrance rise & settle
      if (cardsRef.current) {
        tl.fromTo(
          cardsRef.current,
          { opacity: 0, y: 40, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            ease: "power3.out",
            clearProps: "opacity,transform",
          },
          0.35
        );
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const handleCategoryClick = (filterKey: string) => {
    if (onSelectCategory) {
      onSelectCategory(filterKey);
    }
    const menuEl = document.getElementById("menu");
    if (menuEl) {
      menuEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={heroRef}
      className="relative w-full bg-[#4D0711] pt-[135px] sm:pt-[155px] md:pt-[180px] pb-14 overflow-hidden flex flex-col items-center"
    >
      {/* Background ambient warm glow */}
      <div
        ref={glowRef}
        className="absolute top-[18%] left-1/2 -translate-x-1/2 w-[900px] h-[650px] bg-[#FD7E3B]/10 rounded-full blur-[170px] pointer-events-none"
      />

      {/* Hero Content (Figma: #6829:246, width 1245px, gap 38px) */}
      <div className="w-full max-w-[1245px] mx-auto px-4 flex flex-col items-center text-center relative z-10">
        {/* Text Container: #6829:247 (gap 23px) */}
        <div className="flex flex-col items-center gap-[23px] w-full">
          {/* Top Pill Badge: #6829:248 (width 303px, height 32px, border #FD7E3B 1px, 50px radius, padding 6px 18px, no drop shadow) */}
          <div
            ref={badgeRef}
            className="w-[303px] h-[32px] rounded-[50px] border border-[#FD7E3B] flex items-center justify-center gap-[10px] px-[18px] py-[6px] shrink-0"
          >
            <div className="relative w-4 h-4 shrink-0 flex items-center justify-center">
              <Image
                src="/figma/icon-flash.svg"
                alt="Flash Icon"
                width={16}
                height={16}
                className="object-contain"
              />
            </div>
            <span className="font-sans font-normal text-[14px] leading-[20px] text-[#FD7E3B] text-center whitespace-nowrap">
              Delivered within 25 minutes or less
            </span>
          </div>

          {/* Heading: #6829:258 (Phudu Black 900, 118px, lineHeight 101px, uppercase, letterSpacing -0.01em, #FEFEF6) */}
          <div className="flex flex-col items-center w-full">
            <h1 className="font-phudu font-black text-[38px] sm:text-[64px] md:text-[92px] lg:text-[118px] leading-[0.98] md:leading-[101px] tracking-[-0.01em] uppercase text-[#FEFEF6] text-center select-none">
              <span ref={title1Ref} className="block">
                Enjoy Best Food.
              </span>
              <span ref={title2Ref} className="block mt-1 sm:mt-0">
                Tap. Order. Enjoy. Repeat.
              </span>
            </h1>
          </div>
        </div>

        {/* CTA Buttons: #6829:263 (gap 13px) */}
        <div
          ref={ctaRef}
          className="flex flex-wrap items-center justify-center gap-[13px] mt-[34px] md:mt-[38px] mb-[30px]"
        >
          {/* Order Today Button: #6829:265 */}
          <Link
            href="#menu"
            className="inline-flex items-center justify-center gap-[8px] px-[30px] py-[14px] rounded-[12px] bg-[#FD7E3B] text-[#FEFEF6] font-phudu font-semibold text-[20px] leading-normal tracking-[-0.02em] hover:bg-[#e66a27] hover:scale-105 active:scale-95 transition-all group"
          >
            <span>Order Today</span>
            <div className="relative w-6 h-6 shrink-0 flex items-center justify-center group-hover:translate-x-1.5 transition-transform duration-300">
              <Image
                src="/figma/icon-arrow-right.svg"
                alt="Arrow Right"
                width={24}
                height={24}
                className="object-contain"
              />
            </div>
          </Link>

          {/* See Offers Button: #6829:275 */}
          <Link
            href="#offers"
            className="inline-flex items-center justify-center w-[147px] h-[58px] rounded-[12px] border border-[#FEFEF6] bg-[#4D0711] text-[#FEFEF6] font-phudu font-semibold text-[20px] leading-normal tracking-[-0.02em] hover:bg-[#FEFEF6] hover:text-[#4D0711] hover:scale-105 active:scale-95 transition-all text-center"
          >
            See Offers
          </Link>
        </div>
      </div>

      {/* Hero Category Infinite Marquee: Figma #6829:280 */}
      <div
        ref={cardsRef}
        className="relative w-full overflow-hidden pt-4 pb-6 marquee-container"
      >
        <div className="animate-hero-marquee flex items-end">
          {/* Set 1 */}
          <div className="flex items-end gap-[20px] pr-[20px]">
            {marqueeItems.map((cat, idx) => (
              <HeroCategoryCard
                key={`set1-${cat.id}-${idx}`}
                category={cat}
                priority={idx < 3}
                onClick={() => handleCategoryClick(cat.filterKey)}
              />
            ))}
          </div>

          {/* Set 2 (Identical clone for seamless continuous infinite marquee) */}
          <div className="flex items-end gap-[20px] pr-[20px]" aria-hidden="true">
            {marqueeItems.map((cat, idx) => (
              <HeroCategoryCard
                key={`set2-${cat.id}-${idx}`}
                category={cat}
                priority={false}
                onClick={() => handleCategoryClick(cat.filterKey)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Hero Category Card: Pure Flat Figma Aesthetic, No Drop Shadows, Smooth Micro-Lift
 */
function HeroCategoryCard({
  category,
  priority,
  onClick,
}: {
  category: { id: string; name: string; image: string; filterKey: string };
  priority?: boolean;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="shrink-0 w-[285px] sm:w-[303.33px] rounded-[20.26px] bg-[#FEEDCF] p-[12.08px] flex flex-col items-center gap-[6px] cursor-pointer group select-none relative transition-transform duration-300 hover:-translate-y-2.5 active:scale-95"
    >
      {/* Inner Photo Box: Figma #6829:282 (height 322px, borderRadius 12.51px, overflow-hidden) */}
      <div className="relative w-full h-[322px] rounded-[12.51px] overflow-hidden bg-[#FEEDCF]">
        <Image
          src={category.image}
          alt={category.name}
          fill
          priority={priority}
          sizes="(max-width: 768px) 285px, 303px"
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
        />
      </div>

      {/* Category Label: Phudu Black 900, 38.6px, lineHeight 47px, uppercase, #4D0711 */}
      <div className="w-full text-center py-[2px]">
        <span className="font-phudu font-black text-[30px] sm:text-[38.6px] leading-[47px] tracking-[-0.01em] uppercase text-[#4D0711] block group-hover:text-[#FD7E3B] transition-colors duration-300">
          {category.name}
        </span>
      </div>
    </div>
  );
}
