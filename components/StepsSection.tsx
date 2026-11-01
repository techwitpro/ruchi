"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface StepData {
  phase: string;
  title: string;
  description: string;
  word: string;
  wordColor: string;
  image: string;
  widthStyle: string;
}

export default function StepsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const steps: StepData[] = [
    {
      phase: "Phase 1",
      title: "Choose your favorite",
      description: "Add picks to your cart and check out \nquickly and easily.",
      word: "Discover",
      wordColor: "text-[#FDCC3B]",
      image: "/figma/step-phase-1.png",
      widthStyle: "w-full max-w-[420px] lg:w-[399px]",
    },
    {
      phase: "Phase 2",
      title: "Wait for your delivery",
      description: "Your meal arrives hot and ready within 25 \nminutes or less.",
      word: "Checkout",
      wordColor: "text-[#8BDFFA]",
      image: "/figma/step-phase-2.png",
      widthStyle: "w-full max-w-[420px] lg:w-[420px]",
    },
    {
      phase: "Phase 3",
      title: "Eat well, savor every bite",
      description: "Dig right in. No waiting, no fuss, just \ndelicious food.",
      word: "Savor",
      wordColor: "text-[#FAAEDC]",
      image: "/figma/step-phase-3.png",
      widthStyle: "w-full max-w-[420px] lg:w-[400px]",
    },
  ];

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

      // Step cards staggered reveal - no low opacity lag
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
      className="relative w-full bg-[#FEEDCF] text-[#4D0711] py-[80px] md:py-[100px] overflow-hidden"
    >
      <div className="max-w-[1240px] mx-auto px-4 md:px-6 flex flex-col items-center">
        {/* Header Block: #6599:13781 (gap 10px, height 139px) */}
        <div
          ref={headerRef}
          className="flex flex-col items-center text-center gap-[10px] mb-[42px] max-w-[700px]"
        >
          {/* Badge: #6599:13783 (63x32 border #FD7E3B 1px, 50px radius, padding 6px 12px) */}
          <div className="w-[63px] h-[32px] rounded-[50px] border border-[#FD7E3B] flex items-center justify-center shadow-sm">
            <span className="font-sans font-normal text-[14px] leading-[20px] text-[#FD7E3B]">
              Steps
            </span>
          </div>

          {/* Title: Phudu Black 900, 64px, lineHeight 62px, #4D0711 */}
          <h2 className="font-phudu font-black text-[36px] sm:text-[50px] md:text-[64px] leading-[1.05] sm:leading-[62px] text-[#4D0711] text-center">
            Explore, then order
          </h2>

          {/* Subtitle: Poppins Regular 16px, lineHeight 24px, #757575 */}
          <p className="font-sans font-normal text-[15px] sm:text-[16px] leading-[24px] text-[#757575] text-center">
            See what&apos;s cooking on our menu.
          </p>
        </div>

        {/* 3 Step Phase Cards: #6829:1144 (gap 10px, height 551px, borderRadius 28px) */}
        <div
          ref={cardsRef}
          className="flex flex-col lg:flex-row items-center justify-center gap-[16px] lg:gap-[10px] w-full"
        >
          {steps.map((step) => (
            <InteractiveStepCard key={step.phase} step={step} />
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Interactive Step Card with 3D Hover Depth
 */
function InteractiveStepCard({ step }: { step: StepData }) {
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
      className={`relative h-[480px] sm:h-[551px] ${step.widthStyle} shrink-0 rounded-[28px] overflow-hidden shadow-lg flex flex-col justify-end p-[24px] sm:p-[30px] group select-none hover:shadow-2xl`}
    >
      {/* Background Image with Figma Gradient */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src={step.image}
          alt={step.title}
          fill
          sizes="(max-width: 768px) 100vw, 420px"
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(0, 0, 0, 0) 45%, rgba(0, 0, 0, 0.88) 100%)",
          }}
        />
      </div>

      {/* Bottom Content: EL-3f67675d (width 300px, gap 8px) */}
      <div className="relative z-10 flex flex-col gap-[8px] w-full max-w-[300px]">
        {/* Phase Pill: EL-6a1c370f (padding 4px 25px, fill #FFFFFF, borderRadius 37px) */}
        <div className="self-start inline-flex items-center justify-center px-[25px] py-[4px] rounded-[37px] bg-white shadow-sm group-hover:scale-105 transition-transform duration-200">
          <span className="font-phudu font-medium text-[16px] text-[#4D0711]">
            {step.phase}
          </span>
        </div>

        {/* Text Group */}
        <div className="flex flex-col gap-[6px]">
          <h3 className="font-phudu font-semibold text-[22px] sm:text-[24px] leading-[26px] sm:leading-[24px] tracking-[-0.02em] text-[#FEFEF6]">
            {step.title}
          </h3>
          <p className="font-sans font-normal text-[14px] sm:text-[16px] leading-[22px] sm:leading-[24px] text-[#FEFEF6] whitespace-pre-line">
            {step.description}
          </p>
        </div>

        {/* Big Accent Text: Phudu SemiBold 42px, lineHeight 48px */}
        <div className="pt-1">
          <span
            className={`font-phudu font-semibold text-[38px] sm:text-[42px] leading-[48px] ${step.wordColor} block group-hover:translate-x-1.5 transition-transform duration-200`}
          >
            {step.word}
          </span>
        </div>
      </div>
    </div>
  );
}
