"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface ComboCard {
  id: string;
  name: string;
  bgClass: string;
  image: string;
  saveText: string;
  price: number;
  originalPrice: number;
  items: string[];
}

const COMBOS: ComboCard[] = [
  {
    id: "combo-pink",
    name: "The Feast Combo",
    bgClass: "bg-[#FDA7C9]",
    image: "/figma/combo-feast-pink.png",
    saveText: "SAVE $5.97",
    price: 26.99,
    originalPrice: 32.96,
    items: [
      "Double Smash Burger",
      "Spicy Fried Wings (8pc)",
      "Large Fries",
      "2 Sodas",
    ],
  },
  {
    id: "combo-blue",
    name: "The Feast Combo",
    bgClass: "bg-[#3794FE]",
    image: "/figma/combo-feast-blue.png",
    saveText: "SAVE $5.97",
    price: 26.99,
    originalPrice: 32.96,
    items: [
      "Double Smash Burger",
      "Spicy Fried Wings (8pc)",
      "Large Fries",
      "2 Sodas",
    ],
  },
  {
    id: "combo-yellow",
    name: "The Feast Combo",
    bgClass: "bg-[#FFC325]",
    image: "/figma/combo-feast-yellow.png",
    saveText: "SAVE $5.97",
    price: 26.99,
    originalPrice: 32.96,
    items: [
      "Double Smash Burger",
      "Spicy Fried Wings (8pc)",
      "Large Fries",
      "2 Sodas",
    ],
  },
  {
    id: "combo-lime",
    name: "The Feast Combo",
    bgClass: "bg-[#C7D625]",
    image: "/figma/combo-feast-lime.png",
    saveText: "SAVE $5.97",
    price: 26.99,
    originalPrice: 32.96,
    items: [
      "Double Smash Burger",
      "Spicy Fried Wings (8pc)",
      "Large Fries",
      "2 Sodas",
    ],
  },
];

export default function DealsSection() {
  const { addItem } = useCart();
  const [claimedIds, setClaimedIds] = useState<Record<string, boolean>>({});
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Clean header reveal
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

      // Combo cards entrance - only animates opacity and y, NEVER touches colors or scale
      if (gridRef.current) {
        gsap.fromTo(
          gridRef.current.children,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            stagger: 0.08,
            ease: "power2.out",
            clearProps: "opacity,transform",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 88%",
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleClaim = (combo: ComboCard, btnEl: HTMLButtonElement) => {
    gsap.timeline()
      .to(btnEl, { scale: 0.92, duration: 0.1, ease: "power1.in" })
      .to(btnEl, { scale: 1.05, duration: 0.15, ease: "back.out(2)" })
      .to(btnEl, { scale: 1, duration: 0.1, ease: "power1.out" });

    setClaimedIds((prev) => ({ ...prev, [combo.id]: true }));
    setTimeout(() => {
      setClaimedIds((prev) => ({ ...prev, [combo.id]: false }));
    }, 1300);

    addItem({
      id: combo.id,
      name: combo.name,
      price: combo.price,
      originalPrice: combo.originalPrice,
      image: combo.image,
      category: "Deals",
      options: combo.items.join(", "),
    });
  };

  return (
    <section
      ref={sectionRef}
      id="offers"
      className="relative w-full bg-[#FEFEF6] py-[80px] md:py-[100px] overflow-hidden"
    >
      <div className="max-w-[1240px] mx-auto px-4 md:px-6 flex flex-col items-center">
        {/* Header Block: #6599:13879 (gap 10px) */}
        <div
          ref={headerRef}
          className="flex flex-col items-center text-center gap-[10px] mb-[42px] max-w-[700px]"
        >
          {/* Badge: #6599:13880 (78x32 border #FD7E3B 1px, 50px radius, padding 6px 12px) */}
          <div className="w-[78px] h-[32px] rounded-[50px] border border-[#FD7E3B] flex items-center justify-center shadow-sm">
            <span className="font-sans font-normal text-[14px] leading-[20px] text-[#FD7E3B]">
              Offers
            </span>
          </div>

          {/* Title: Phudu Black 900, 64px, lineHeight 78px, uppercase, #4D0711 */}
          <h2 className="font-phudu font-black text-[36px] sm:text-[48px] md:text-[64px] leading-[1.05] tracking-tight uppercase text-[#4D0711] text-center">
            Combos made for sharing
          </h2>

          {/* Subtitle: Phudu Regular 16px, lineHeight 24px, #757575 */}
          <p className="font-phudu font-normal text-[15px] sm:text-[16px] leading-[24px] text-[#757575] text-center">
            Mix your favorites and save more. Limited time offers that really matter.
          </p>
        </div>

        {/* 2x2 Combos Grid: Figma #6599:13892 (gap 20px, card width 610px, height 378px) */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-[20px] w-full"
        >
          {COMBOS.map((combo) => (
            <InteractiveComboCard
              key={combo.id}
              combo={combo}
              isClaimed={claimedIds[combo.id]}
              onClaim={(btn) => handleClaim(combo, btn)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Interactive Combo Card with completely static colors - no color animation
 */
function InteractiveComboCard({
  combo,
  isClaimed,
  onClaim,
}: {
  combo: ComboCard;
  isClaimed?: boolean;
  onClaim: (btn: HTMLButtonElement) => void;
}) {
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

    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-3px)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transition: "transform 0.25s ease-out, box-shadow 0.25s ease",
        transformStyle: "preserve-3d",
      }}
      className={`w-full min-h-[378px] rounded-[28px] p-[20px] sm:p-[28px] xl:p-[35px] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md hover:shadow-xl select-none ${combo.bgClass}`}
    >
      {/* Left: Food Image in white frame (borderRadius 16px, 8px white stroke) */}
      <div className="relative w-[210px] sm:w-[240px] md:w-[260px] xl:w-[294px] h-[210px] sm:h-[240px] md:h-[260px] xl:h-[294px] shrink-0 rounded-[16px] overflow-hidden bg-white border-[6px] sm:border-[8px] border-white shadow-md flex items-center justify-center">
        <Image
          src={combo.image}
          alt={combo.name}
          fill
          sizes="(max-width: 768px) 240px, 294px"
          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />
      </div>

      {/* Right: Info container (width 230px, gap 20px) */}
      <div className="w-full sm:w-[230px] flex flex-col justify-between h-full gap-4 sm:gap-[20px]">
        <div className="flex flex-col gap-3">
          {/* Save Tag Pill: EL-6a1e6686 (padding 4px 12px, fill #4D0711, 50px radius) */}
          <div className="self-start px-[12px] py-[4px] rounded-[50px] bg-[#4D0711]">
            <span className="font-phudu font-medium text-[15px] sm:text-[16px] leading-tight text-[#FEFEF6]">
              {combo.saveText}
            </span>
          </div>

          {/* Title: Phudu SemiBold 24px, #4D0711 */}
          <h3 className="font-phudu font-semibold text-[22px] sm:text-[24px] leading-tight text-[#4D0711]">
            {combo.name}
          </h3>

          {/* Included Items with Checkmark SVG (gap 6px) */}
          <div className="flex flex-col gap-[6px]">
            {combo.items.map((item, idx) => (
              <div key={idx} className="flex items-start gap-[8px]">
                <div className="relative w-[10px] h-[10px] shrink-0 flex items-center justify-center mt-1">
                  <Image
                    src="/figma/icon-combo-check.svg"
                    alt="Check"
                    width={4}
                    height={5}
                    className="object-contain"
                  />
                </div>
                <span className="font-sans font-medium text-[13.5px] sm:text-[14px] leading-tight text-[#4D0711]">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Row: Price & "Claim Deal" Button */}
        <div className="flex flex-col items-start justify-between gap-2 pt-2">
          <div className="flex items-baseline gap-1.5">
            <span className="font-phudu font-semibold text-[22px] sm:text-[24px] text-[#4D0711]">
              ${combo.price.toFixed(2)}
            </span>
            <span className="font-sans text-[13px] text-[#4D0711]/60 line-through">
              ${combo.originalPrice.toFixed(2)}
            </span>
          </div>

          {/* "Claim Deal" Button: EL-7ced2ffd (borderRadius 12px, fill #4D0711, border 1px #FEFEF6) */}
          <button
            onClick={(e) => onClaim(e.currentTarget)}
            className={`py-[8px] sm:py-[10px] rounded-[12px] border font-phudu font-medium text-[17px] sm:text-[19px] leading-normal flex items-center justify-center gap-1.5 transition-all duration-200 text-center cursor-pointer shadow-sm select-none w-full ${
              isClaimed
                ? "bg-[#4D0711] border-[#4D0711] text-[#FEFEF6] shadow-md"
                : "bg-[#4D0711] border-[#FEFEF6] text-[#FEFEF6] hover:bg-[#37050C] hover:shadow-md"
            }`}
          >
            {isClaimed ? (
              <>
                <Check className="w-4 h-4 text-emerald-400 stroke-[3]" />
                <span>Claimed!</span>
              </>
            ) : (
              "Claim Deal"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
