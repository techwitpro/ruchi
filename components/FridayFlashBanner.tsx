"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function FridayFlashBanner() {
  const { applyPromoCode, openCart } = useCart();
  const bannerRef = useRef<HTMLElement>(null);
  const leftWingRef = useRef<HTMLDivElement>(null);
  const topWingRef = useRef<HTMLDivElement>(null);
  const rightWingRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleBannerClick = () => {
    applyPromoCode("FLASH50");
    openCart();
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Content reveal with power4 ease
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current.children,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            stagger: 0.1,
            ease: "power4.out",
            clearProps: "opacity,transform",
            scrollTrigger: {
              trigger: bannerRef.current,
              start: "top 86%",
              once: true,
            },
          }
        );
      }

      // 1. Organic Idle Floating Wobble (applied to INNER refs to prevent matrix collision)
      const leftInner = bannerRef.current?.querySelector(".left-wing-inner");
      const topInner = bannerRef.current?.querySelector(".top-wing-inner");
      const rightInner = bannerRef.current?.querySelector(".right-wing-inner");

      if (leftInner) {
        gsap.to(leftInner, {
          y: "+=18",
          rotation: 3,
          duration: 3.8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      if (topInner) {
        gsap.to(topInner, {
          y: "+=14",
          x: "-=8",
          rotation: -4,
          duration: 4.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 0.3,
        });
      }

      if (rightInner) {
        gsap.to(rightInner, {
          y: "+=20",
          rotation: 3.5,
          duration: 4.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 0.6,
        });
      }

      // 2. Smooth Scroll Parallax (applied to OUTER refs)
      if (leftWingRef.current) {
        gsap.to(leftWingRef.current, {
          y: -50,
          scrollTrigger: {
            trigger: bannerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.0,
          },
        });
      }

      if (topWingRef.current) {
        gsap.to(topWingRef.current, {
          y: -35,
          scrollTrigger: {
            trigger: bannerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      }

      if (rightWingRef.current) {
        gsap.to(rightWingRef.current, {
          y: -60,
          scrollTrigger: {
            trigger: bannerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.0,
          },
        });
      }
    }, bannerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={bannerRef}
      onClick={handleBannerClick}
      className="relative w-full bg-[#5E0E0D] py-[80px] sm:py-[98px] overflow-hidden text-center text-white cursor-pointer select-none group transition-colors duration-300 hover:bg-[#681110]"
    >
      {/* Decorative Wing Graphics with separated parallax & floating containers */}
      <div
        ref={leftWingRef}
        className="absolute left-[-160px] sm:left-[-204px] top-1/2 -translate-y-1/2 w-[450px] sm:w-[617px] h-[450px] sm:h-[617px] pointer-events-none select-none z-0 opacity-80 sm:opacity-100 will-change-transform"
      >
        <div className="left-wing-inner relative w-full h-full will-change-transform">
          <Image
            src="/figma/friday-flash-left.png"
            alt="Friday Flash Wing Left"
            fill
            sizes="(max-width: 768px) 450px, 617px"
            className="object-contain"
          />
        </div>
      </div>

      <div
        ref={topWingRef}
        className="absolute right-[-40px] sm:right-[-80px] top-[-80px] sm:top-[-125px] w-[220px] sm:w-[310px] h-[240px] sm:h-[329px] pointer-events-none select-none z-0 opacity-80 sm:opacity-100 will-change-transform"
      >
        <div className="top-wing-inner relative w-full h-full will-change-transform">
          <Image
            src="/figma/friday-flash-top-right.png"
            alt="Friday Flash Wing Top Right"
            fill
            sizes="(max-width: 768px) 220px, 310px"
            className="object-contain"
          />
        </div>
      </div>

      <div
        ref={rightWingRef}
        className="absolute right-[-40px] sm:right-[-50px] bottom-[-30px] sm:bottom-[-40px] w-[350px] sm:w-[495px] h-[250px] sm:h-[356px] pointer-events-none select-none z-0 opacity-80 sm:opacity-100 will-change-transform"
      >
        <div className="right-wing-inner relative w-full h-full will-change-transform">
          <Image
            src="/figma/friday-flash-right.png"
            alt="Friday Flash Wing Right"
            fill
            sizes="(max-width: 768px) 350px, 495px"
            className="object-contain"
          />
        </div>
      </div>

      {/* Main Banner Content: #6608:474 (gap 12px) */}
      <div
        ref={contentRef}
        className="relative z-10 max-w-[1440px] mx-auto px-4 flex flex-col items-center gap-[12px]"
      >
        {/* Heading: Phudu Black 900, 64px, lineHeight 78px, uppercase, #FFFFFF */}
        <h2 className="font-phudu font-black text-[38px] sm:text-[54px] md:text-[64px] leading-[1.1] sm:leading-[78px] tracking-[-0.01em] uppercase text-white text-center group-hover:scale-105 transition-transform duration-300 ease-out">
          FRIDAY FLASH
        </h2>

        {/* Subtitle: Poppins Regular 16px, lineHeight 24px, #FFFFFF */}
        <p className="font-sans font-normal text-[15px] sm:text-[16px] leading-[24px] text-white/90 text-center">
          Wings half off each Friday, 5-8PM • Tap to claim
        </p>
      </div>
    </section>
  );
}
