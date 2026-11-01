"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Footer() {
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);
  const footerRef = useRef<HTMLElement>(null);
  const columnsRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const brandArtRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setJoined(true);
    setTimeout(() => {
      setJoined(false);
      setEmail("");
    }, 2500);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Columns reveal
      if (columnsRef.current) {
        gsap.fromTo(
          columnsRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.08,
            ease: "power2.out",
            clearProps: "opacity,transform",
            scrollTrigger: {
              trigger: columnsRef.current,
              start: "top 88%",
              once: true,
            },
          }
        );
      }

      // Map card reveal and marker drop bounce
      if (mapRef.current && pinRef.current) {
        gsap.fromTo(
          mapRef.current,
          { opacity: 0, scale: 0.95 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.75,
            ease: "power2.out",
            clearProps: "opacity,transform",
            scrollTrigger: {
              trigger: mapRef.current,
              start: "top 88%",
              once: true,
            },
          }
        );

        gsap.fromTo(
          pinRef.current,
          { opacity: 0, y: -30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "bounce.out",
            delay: 0.2,
            clearProps: "opacity,transform",
            scrollTrigger: {
              trigger: mapRef.current,
              start: "top 86%",
              once: true,
            },
          }
        );
      }

      // Giant brand art majestic reveal
      if (brandArtRef.current) {
        gsap.fromTo(
          brandArtRef.current,
          { opacity: 0, y: 40, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.85,
            ease: "power2.out",
            clearProps: "opacity,transform",
            scrollTrigger: {
              trigger: brandArtRef.current,
              start: "top 90%",
              once: true,
            },
          }
        );
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      id="visit"
      className="relative w-full bg-[#4D0711] text-[#FEFEF6] pt-[80px] sm:pt-[100px] pb-4 overflow-hidden"
    >
      <div className="max-w-[1240px] mx-auto px-4 md:px-6 flex flex-col gap-[29px]">
        {/* Top Content Row: #6829:1315 (alignItems center, gap 48px) */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-[48px] w-full">
          {/* Left Block: #6829:1314 (width 870px, gap 48px) */}
          <div className="flex flex-col gap-[48px] w-full lg:w-[870px]">
            {/* 4 Info Columns: #6829:1311 (gap 74px) */}
            <div
              ref={columnsRef}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-[30px] lg:gap-[40px] xl:gap-[74px] w-full"
            >
              {/* Col 1: Useful Links (width 101px, gap 21px) */}
              <div className="flex flex-col gap-[21px] w-full">
                <h4 className="font-phudu font-medium text-[18px] text-[#FD7E3B]">
                  Useful links
                </h4>
                <div className="flex flex-col gap-[12px] font-phudu font-medium text-[16px] text-[#FEFEF6]">
                  <Link href="#menu" className="hover:text-[#FD7E3B] transition-colors">
                    Meals
                  </Link>
                  <Link href="#offers" className="hover:text-[#FD7E3B] transition-colors">
                    Offers
                  </Link>
                  <Link href="#reviews" className="hover:text-[#FD7E3B] transition-colors">
                    Reviews
                  </Link>
                  <Link href="#visit" className="hover:text-[#FD7E3B] transition-colors">
                    Visit Us
                  </Link>
                </div>
              </div>

              {/* Col 2: Policies (width 118px, gap 26px) */}
              <div className="flex flex-col gap-[26px] w-full">
                <h4 className="font-phudu font-medium text-[18px] text-[#FD7E3B]">
                  Policies
                </h4>
                <div className="flex flex-col gap-[12px] font-phudu font-medium text-[16px] text-[#FEFEF6]">
                  <a href="#privacy" className="hover:text-[#FD7E3B] transition-colors">
                    Privacy Policy
                  </a>
                  <a href="#terms" className="hover:text-[#FD7E3B] transition-colors">
                    Terms of Service
                  </a>
                  <a href="#refund" className="hover:text-[#FD7E3B] transition-colors">
                    Refund Policy
                  </a>
                </div>
              </div>

              {/* Col 3: Install Our App (width 181px, gap 29px) */}
              <div className="flex flex-col gap-[29px] w-full">
                <h4 className="font-phudu font-medium text-[18px] text-[#FD7E3B]">
                  Install Our App
                </h4>
                <div className="flex flex-col gap-[14px]">
                  {/* App Store Row */}
                  <a
                    href="https://apple.com/app-store"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-[22px] group"
                  >
                    <div className="relative w-[20px] h-[24px] shrink-0">
                      <Image
                        src="/figma/icon-appstore.svg"
                        alt="App Store"
                        width={20}
                        height={24}
                        style={{ width: "auto", height: "auto" }}
                        className="object-contain"
                      />
                    </div>
                    <div className="flex flex-col gap-[3px]">
                      <span className="font-sans font-normal text-[14px] leading-tight text-[#FEFEF6]/70">
                        Available from the
                      </span>
                      <span className="font-sans font-normal text-[16px] leading-tight text-[#FEFEF6] group-hover:text-[#FD7E3B] transition-colors">
                        App Store
                      </span>
                    </div>
                  </a>

                  {/* Google Play Row */}
                  <a
                    href="https://play.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-[20px] group"
                  >
                    <div className="relative w-[24px] h-[21px] shrink-0">
                      <Image
                        src="/figma/icon-playstore.svg"
                        alt="Google Play"
                        width={24}
                        height={21}
                        style={{ width: "auto", height: "auto" }}
                        className="object-contain"
                      />
                    </div>
                    <div className="flex flex-col gap-[3px]">
                      <span className="font-sans font-normal text-[14px] leading-tight text-[#FEFEF6]/70">
                        Get it via
                      </span>
                      <span className="font-sans font-normal text-[16px] leading-tight text-[#FEFEF6] group-hover:text-[#FD7E3B] transition-colors">
                        Google Play
                      </span>
                    </div>
                  </a>
                </div>
              </div>

              {/* Col 4: Visit Our Kitchen (width 248px, gap 22px) */}
              <div className="flex flex-col gap-[22px] w-full">
                <h4 className="font-phudu font-semibold text-[28px] sm:text-[32px] leading-[36px] text-[#FEFEF6]">
                  Visit Our Kitchen
                </h4>
                <div className="flex flex-col gap-[14px]">
                  {/* Address */}
                  <div className="flex items-start gap-[16px] sm:gap-[18px]">
                    <div className="relative w-[28px] h-[28px] shrink-0 mt-0.5">
                      <Image
                        src="/figma/icon-location.svg"
                        alt="Location"
                        width={28}
                        height={28}
                        className="object-contain"
                      />
                    </div>
                    <div className="flex flex-col gap-[2px]">
                      <span className="font-sans font-normal text-[16px] text-[#FEFEF6]">
                        42 Connaught Place
                      </span>
                      <span className="font-sans font-normal text-[14px] text-[#FEFEF6]/70">
                        New Delhi, Delhi 110001, India
                      </span>
                    </div>
                  </div>

                  {/* Phone & Hours */}
                  <div className="flex items-start gap-[16px] sm:gap-[20px]">
                    <div className="relative w-[26px] h-[26px] shrink-0 mt-0.5">
                      <Image
                        src="/figma/icon-phone.svg"
                        alt="Phone"
                        width={26}
                        height={26}
                        className="object-contain"
                      />
                    </div>
                    <div className="flex flex-col gap-[2px]">
                      <span className="font-sans font-normal text-[16px] text-[#FEFEF6]">
                        +91 11 4100 5678
                      </span>
                      <span className="font-sans font-normal text-[14px] text-[#FEFEF6]/70">
                        Mon-Sun, 11AM - 11PM
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Newsletter Row: #6829:1313 (width 416px, gap 18px) */}
            <div className="flex flex-col gap-[18px] w-full max-w-[416px]">
              <div className="flex flex-col gap-[14px]">
                {/* Title: Phudu Medium 20px, #FD7E3B */}
                <h4 className="font-phudu font-medium text-[20px] leading-[20px] text-[#FD7E3B]">
                  Never Miss A Deal Again
                </h4>

                {/* Form: #6599:14542 (gap 10px) */}
                <form onSubmit={handleSubmit} className="flex items-center gap-[10px] w-full">
                  <div className="flex-1 rounded-[8px] border border-[#FEFEF6] p-[15px] bg-transparent">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@email.com"
                      className="w-full bg-transparent font-phudu font-normal text-[15.6px] leading-tight text-[#FEFEF6] placeholder-[#FEFEF6]/60 focus:outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-[25px] py-[15px] rounded-[8px] bg-[#FD7E3B] text-white font-phudu font-medium text-[20px] leading-normal flex items-center justify-center hover:bg-[#e66a27] active:scale-95 transition-all text-center shrink-0 cursor-pointer shadow-sm"
                  >
                    {joined ? "Joined" : "Join"}
                  </button>
                </form>
              </div>

              {/* Note: Phudu Regular 14px, #FEFEF6/70 */}
              <p className="font-phudu font-normal text-[14px] leading-[20px] text-[#FEFEF6]/70 whitespace-pre-line">
                Get new combos sent to your inbox. {"\n"}No spam, ever.
              </p>
            </div>
          </div>

          {/* Right Block: Map Card #6599:14553 (width 310px, height 391px, borderRadius 12px) */}
          <div
            ref={mapRef}
            className="w-full max-w-[310px] h-[391px] shrink-0 rounded-[12px] overflow-hidden bg-white relative shadow-xl mx-auto lg:mx-0"
          >
            <Image
              src="/figma/footer-map.png"
              alt="Restaurant Map"
              fill
              sizes="310px"
              className="object-cover"
            />
            {/* Map Marker: #6599:14557 (27x41 at x:81, y:110.23) */}
            <div ref={pinRef} className="absolute top-[110px] left-[81px]">
              <div className="relative w-[27px] h-[41px]">
                <Image
                  src="/figma/icon-map-marker.svg"
                  alt="Map Marker"
                  width={27}
                  height={41}
                  className="object-contain drop-shadow-md"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer Giant Wordmark Illustration: #6838:2423 (width 1228px, height 447.37px, footer-brand-art.svg) */}
        <div
          ref={brandArtRef}
          className="w-full max-w-[1228px] mx-auto pt-8 flex items-center justify-center select-none"
        >
          <div className="relative w-full h-[140px] sm:h-[240px] md:h-[350px] lg:h-[447.37px]">
            <Image
              src="/figma/footer-brand-art.svg"
              alt="Ruchi Giant Wordmark"
              fill
              sizes="(max-width: 768px) 100vw, 1228px"
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
