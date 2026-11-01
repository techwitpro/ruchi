"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ReviewData {
  id: string;
  name: string;
  quoteLines: string[];
  avatar: string;
}

const REVIEWS: ReviewData[] = [
  {
    id: "rev-1",
    name: "Aiden R.",
    quoteLines: [
      "\"That burger was just what I craved",
      "at midnight. Quick, hot, and worth each",
      "penny.\"",
    ],
    avatar: "/figma/avatar-aiden.png",
  },
  {
    id: "rev-2",
    name: "Sarah Williams",
    quoteLines: [
      "\"My pizza showed up in 20 minutes, still",
      "Still crisp. That's the service I still truly",
      "love.\"",
    ],
    avatar: "/figma/avatar-sarah.png",
  },
  {
    id: "rev-3",
    name: "James Rodriguez",
    quoteLines: [
      "\"That tasty chicken wrap totally changed my",
      "game. Made with fresh, punchy ingredients,",
      "flavor, nothing fake.\"",
    ],
    avatar: "/figma/avatar-james.png",
  },
];

export default function ReviewsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header reveal
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.08,
            ease: "power2.out",
            clearProps: "opacity,transform",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 88%",
              once: true,
            },
          }
        );
      }

      // Review cards entrance
      if (cardsRef.current) {
        gsap.fromTo(
          cardsRef.current.children,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            stagger: 0.08,
            ease: "power2.out",
            clearProps: "opacity,transform",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 88%",
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="reviews"
      className="relative w-full bg-[#FEEDCF] text-[#4D0711] pt-[40px] sm:pt-[50px] pb-[80px] sm:pb-[100px] overflow-hidden"
    >
      <div className="max-w-[1240px] mx-auto px-4 md:px-6 flex flex-col items-center">
        {/* Header Block: #6599:14285 (gap 10px) */}
        <div
          ref={headerRef}
          className="flex flex-col items-center text-center gap-[10px] mb-[42px] max-w-[700px]"
        >
          {/* Badge: #6599:14286 (83x32 border #FD7E3B 1px, 50px radius, padding 6px 12px) */}
          <div className="w-[83px] h-[32px] rounded-[50px] border border-[#FD7E3B] flex items-center justify-center shadow-sm">
            <span className="font-sans font-normal text-[14px] leading-[20px] text-[#FD7E3B]">
              Voices
            </span>
          </div>

          {/* Title: Phudu Black 900, 64px, #4D0711 */}
          <h2 className="font-phudu font-black text-[36px] sm:text-[50px] md:text-[64px] leading-[1.05] tracking-tight uppercase text-[#4D0711] text-center">
            Real reviews
          </h2>

          {/* Subtitle: Poppins Regular 16px, lineHeight 24px, #757575 */}
          <p className="font-sans font-normal text-[15px] sm:text-[16px] leading-[24px] text-[#757575] text-center">
            Our guests share the love. See what they&apos;re saying.
          </p>
        </div>

        {/* 3 Review Cards: #6599:14302 (gap 20px, card width 399.98px, fill #FEFEF6, borderRadius 28px, padding 30px) */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px] w-full justify-items-center"
        >
          {REVIEWS.map((rev) => (
            <InteractiveReviewCard key={rev.id} review={rev} />
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Interactive Review Card with 3D Tilt
 */
function InteractiveReviewCard({ review }: { review: ReviewData }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || window.innerWidth < 1024) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -4;
    const rotateY = ((x - centerX) / centerX) * 4;

    cardRef.current.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = `perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transition: "transform 0.25s ease-out, box-shadow 0.3s ease, border-color 0.3s ease",
        transformStyle: "preserve-3d",
      }}
      className="w-full max-w-[400px] lg:w-[399.98px] rounded-[28px] bg-[#FEFEF6] border border-[rgba(77,7,17,0.2)] p-[26px] sm:p-[30px] flex flex-col justify-between gap-[24px] sm:gap-[28px] shadow-sm hover:shadow-2xl hover:border-[#FD7E3B]/40 select-none group"
    >
      <div className="flex flex-col gap-[20px]">
        {/* 5-Star SVG Rating: EL-8f989bf6 (width 98px, height 18px) */}
        <div className="relative w-[98px] h-[18px] group-hover:scale-105 transition-transform duration-200 origin-left">
          <Image
            src="/figma/icon-stars.svg"
            alt="5 Stars"
            width={98}
            height={18}
            className="object-contain"
          />
        </div>

        {/* Quote Text: Phudu Medium 20px, lineHeight 20px, #4D0711 */}
        <div className="flex flex-col gap-[2px]">
          {review.quoteLines.map((line, idx) => (
            <p
              key={idx}
              className="font-phudu font-medium text-[18px] sm:text-[20px] leading-[22px] sm:leading-[20px] text-[#4D0711]"
            >
              {line}
            </p>
          ))}
        </div>
      </div>

      {/* Reviewer Row: gap 20px */}
      <div className="flex items-center gap-[16px] sm:gap-[20px]">
        {/* Avatar: 48x48 rounded full */}
        <div className="relative w-[48px] h-[48px] rounded-full overflow-hidden bg-[#FEEDCF] shrink-0 border border-[#4D0711]/10 group-hover:scale-105 transition-transform duration-200">
          <Image
            src={review.avatar}
            alt={review.name}
            fill
            sizes="48px"
            className="object-cover"
          />
        </div>
        {/* Name: Poppins Regular 16px, lineHeight 24px, #4D0711 */}
        <span className="font-sans font-normal text-[15px] sm:text-[16px] leading-[24px] text-[#4D0711]">
          {review.name}
        </span>
      </div>
    </div>
  );
}
