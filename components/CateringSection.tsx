"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import CateringModal from "./CateringModal";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface CateringCardData {
  id: string;
  name: string;
  serves: string;
  price: string;
  priceNum: number;
  bgColor: string;
  image: string;
  badges: string[];
}

const CATERING_CARDS: CateringCardData[] = [
  {
    id: "catering-office",
    name: "Office Gathering",
    serves: "Serves 10-15 people",
    price: "$149",
    priceNum: 149,
    bgColor: "#70D621",
    image: "/figma/catering-office.png",
    badges: ["10 Burgers", "5 Large Pizzas", "20 Wings", "Dips & Sides"],
  },
  {
    id: "catering-game",
    name: "Game Night Spread",
    serves: "Serves 6-8 people",
    price: "$99",
    priceNum: 99,
    bgColor: "#FDCC3B",
    image: "/figma/catering-gamenight.png",
    badges: ["8 Burgers", "3 Large Pizzas", "12 Wings", "Dips & Sides"],
  },
  {
    id: "catering-wedding",
    name: "Wedding Dinner",
    serves: "Serves 24-30 people",
    price: "$299",
    priceNum: 299,
    bgColor: "#FAAEDC",
    image: "/figma/catering-wedding.png",
    badges: ["25 Burgers", "8 Large Pizzas", "40 Wings", "Salad Bowls", "Desserts"],
  },
];

export default function CateringSection() {
  const { addItem } = useCart();
  const [modalOpen, setModalOpen] = useState(false);
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);

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

      // Catering cards entrance
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

      // Bottom banner smooth reveal
      if (bannerRef.current) {
        gsap.fromTo(
          bannerRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleClaimDeal = (card: CateringCardData, btnEl: HTMLButtonElement) => {
    gsap.timeline()
      .to(btnEl, { scale: 0.93, duration: 0.1, ease: "power1.in" })
      .to(btnEl, { scale: 1.05, duration: 0.15, ease: "back.out(2)" })
      .to(btnEl, { scale: 1, duration: 0.1, ease: "power1.out" });

    setAddedIds((prev) => ({ ...prev, [card.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [card.id]: false }));
    }, 1300);

    addItem({
      id: card.id,
      name: `Catering: ${card.name}`,
      price: card.priceNum,
      image: card.image,
      category: "Catering",
      options: `${card.serves} • ${card.badges.join(", ")}`,
    });
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#FEEDCF] text-[#4D0711] py-[80px] md:py-[100px] overflow-hidden"
    >
      <div className="max-w-[1240px] mx-auto px-4 md:px-6 flex flex-col items-center">
        {/* Header Block: #6599:14112 (gap 10px) */}
        <div
          ref={headerRef}
          className="flex flex-col items-center text-center gap-[10px] mb-[42px] max-w-[700px]"
        >
          {/* Badge: #6599:14113 (193x32 border #FD7E3B 1px, 50px radius, padding 6px 12px) */}
          <div className="w-[193px] h-[32px] rounded-[50px] border border-[#FD7E3B] flex items-center justify-center shadow-sm">
            <span className="font-sans font-normal text-[14px] leading-[20px] text-[#FD7E3B]">
              Catering &amp; Gatherings
            </span>
          </div>

          {/* Title: Phudu Black 900, 64px, #4D0711 */}
          <h2 className="font-phudu font-black text-[36px] sm:text-[50px] md:text-[64px] leading-[1.05] tracking-tight uppercase text-[#4D0711] text-center">
            SERVE THE CROWD.
          </h2>

          {/* Subtitle: Poppins Regular 16px, lineHeight 24px, #757575 */}
          <p className="font-sans font-normal text-[15px] sm:text-[16px] leading-[24px] text-[#757575] text-center">
            Mix your favorites and save more. Limited time offers that really matter.
          </p>
        </div>

        {/* 3 Catering Cards: #6599:14125 (gap 20px, height 468px) */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px] w-full mb-[42px] justify-items-center"
        >
          {CATERING_CARDS.map((card) => (
            <InteractiveCateringCard
              key={card.id}
              card={card}
              isAdded={addedIds[card.id]}
              onClaim={(btn) => handleClaimDeal(card, btn)}
            />
          ))}
        </div>

        {/* Banner: #6599:14269 */}
        <div
          ref={bannerRef}
          className="w-full max-w-[1240px] rounded-[28px] bg-[#FEFEF6] border border-[rgba(77,7,17,0.2)] p-[28px] sm:p-[34px] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm hover:border-[#FD7E3B]/40 transition-colors duration-200"
        >
          <div className="flex flex-col gap-2 text-center sm:text-left">
            <h3 className="font-phudu font-semibold text-[22px] sm:text-[24px] leading-tight text-[#4D0711]">
              Catering, Your Way
            </h3>
            <p className="font-sans font-normal text-[14px] leading-normal text-[#757575] whitespace-pre-line">
              Birthdays, team lunches, graduations,{"\n"}we shape menus your way.
            </p>
          </div>

          {/* Button: Phudu Medium 18px, height 50px, fill #FD7E3B, text #FEFEF6, 14px radius */}
          <button
            onClick={() => setModalOpen(true)}
            className="h-[50px] px-[24px] py-[11px] rounded-[14px] bg-[#FD7E3B] text-[#FEFEF6] font-phudu font-medium text-[18px] leading-normal flex items-center justify-center hover:bg-[#e66a27] hover:scale-105 active:scale-95 transition-all duration-200 text-center shrink-0 cursor-pointer shadow-md select-none"
          >
            Create Your Menu
          </button>
        </div>
      </div>

      {/* Builder Modal */}
      <CateringModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
}

/**
 * Interactive Catering Card with 3D Tilt
 */
function InteractiveCateringCard({
  card,
  isAdded,
  onClaim,
}: {
  card: CateringCardData;
  isAdded?: boolean;
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
        transition: "transform 0.25s ease-out, box-shadow 0.3s ease",
        transformStyle: "preserve-3d",
      }}
      className="w-full max-w-[400px] rounded-[28px] overflow-hidden shadow-lg flex flex-col justify-between group hover:shadow-2xl select-none"
    >
      {/* Photo: layout_21c0a370 (width 400px, height 231px) */}
      <div className="relative w-full h-[231px] overflow-hidden bg-white">
        <Image
          src={card.image}
          alt={card.name}
          fill
          sizes="(max-width: 768px) 100vw, 400px"
          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />
      </div>

      {/* Lower Info Block: layout_25078428 (padding 20px) */}
      <div
        style={{ backgroundColor: card.bgColor }}
        className="p-[20px] flex flex-col justify-between gap-[16px] flex-1 text-[#FEFEF6]"
      >
        <div className="flex flex-col gap-3">
          {/* Top Line: Title & Subtitle left, Price right */}
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-phudu font-semibold text-[22px] sm:text-[24px] leading-tight text-[#4D0711]">
                {card.name}
              </h3>
              <p className="font-sans font-normal text-[14px] leading-normal text-[#FEFEF6]">
                {card.serves}
              </p>
            </div>
            <span className="font-phudu font-semibold text-[30px] sm:text-[32px] text-[#FEFEF6] leading-none">
              {card.price}
            </span>
          </div>

          {/* Chips List: border #FEFEF6 1px, 9999px radius */}
          <div className="flex flex-wrap gap-[6px]">
            {card.badges.map((badge, idx) => (
              <span
                key={idx}
                className="px-[8px] py-[3px] rounded-full border border-[#FEFEF6] text-[12.5px] sm:text-[13px] font-sans font-normal text-[#FEFEF6] leading-normal"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>

        {/* Full-width "Claim Deal" Button: EL-192b8e3c */}
        <button
          onClick={(e) => onClaim(e.currentTarget)}
          className={`w-full py-[14px] sm:py-[15px] rounded-[12px] border font-phudu font-medium text-[18px] sm:text-[20px] leading-normal flex items-center justify-center gap-2 transition-all duration-200 text-center cursor-pointer shadow-sm select-none ${
            isAdded
              ? "bg-[#37050C] border-[#FEFEF6] text-[#FEFEF6] shadow-md"
              : "bg-[#4D0711] border-[#FEFEF6] text-[#FEFEF6] hover:bg-[#37050C]"
          }`}
        >
          {isAdded ? (
            <>
              <Check className="w-5 h-5 text-emerald-400 stroke-[3]" />
              <span>Deal Added!</span>
            </>
          ) : (
            "Claim Deal"
          )}
        </button>
      </div>
    </div>
  );
}
