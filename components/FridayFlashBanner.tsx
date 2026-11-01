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
      // Content reveal
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            stagger: 0.08,
            ease: "power2.out",
            clearProps: "opacity,transform",
            scrollTrigger: {
              trigger: bannerRef.current,
              start: "top 88%",
              once: true,
            },
          }
        );
      }

      // Continuous organic multi-axis floating on wing graphics
      if (leftWingRef.current) {
        gsap.to(leftWingRef.current, {
          y: "+=20",
          rotation: "+=2.5",
          duration: 4.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        gsap.to(leftWingRef.current, {
          y: -60,
          scrollTrigger: {
            trigger: bannerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      }

      if (topWingRef.current) {
        gsap.to(topWingRef.current, {
          y: "+=16",
          x: "-=10",
          rotation: "-=3",
          duration: 5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 0.4,
        });

        gsap.to(topWingRef.current, {
          y: -40,
          scrollTrigger: {
            trigger: bannerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      }

      if (rightWingRef.current) {
        gsap.to(rightWingRef.current, {
          y: "+=22",
          rotation: "+=3",
          duration: 4.8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 0.7,
        });

        gsap.to(rightWingRef.current, {
          y: -70,
          scrollTrigger: {
            trigger: bannerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
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
      {/* Decorative Wing Graphics (Figma: #6608:481, #6608:483, #6608:485) */}
      <div
        ref={leftWingRef}
        className="absolute left-[-160px] sm:left-[-204px] top-1/2 -translate-y-1/2 w-[450px] sm:w-[617px] h-[450px] sm:h-[617px] pointer-events-none select-none z-0 opacity-80 sm:opacity-100"
      >
        <Image
          src="/figma/friday-flash-left.png"
          alt="Friday Flash Wing Left"
          fill
          sizes="(max-width: 768px) 450px, 617px"
          className="object-contain"
        />
      </div>

      <div
        ref={topWingRef}
        className="absolute right-[-40px] sm:right-[-80px] top-[-80px] sm:top-[-125px] w-[220px] sm:w-[310px] h-[240px] sm:h-[329px] pointer-events-none select-none z-0 opacity-80 sm:opacity-100"
      >
        <Image
          src="/figma/friday-flash-top-right.png"
          alt="Friday Flash Wing Top Right"
          fill
          sizes="(max-width: 768px) 220px, 310px"
          className="object-contain"
        />
      </div>

      <div
        ref={rightWingRef}
        className="absolute right-[-40px] sm:right-[-50px] bottom-[-30px] sm:bottom-[-40px] w-[350px] sm:w-[495px] h-[250px] sm:h-[356px] pointer-events-none select-none z-0 opacity-80 sm:opacity-100"
      >
        <Image
          src="/figma/friday-flash-right.png"
          alt="Friday Flash Wing Right"
          fill
          sizes="(max-width: 768px) 350px, 495px"
          className="object-contain"
        />
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
