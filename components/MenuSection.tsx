"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface MenuItem {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  image: string;
}

const MENU_DATA: Record<string, MenuItem[]> = {
  Burgers: [
    {
      id: "burger-1",
      name: "Double Stack Burger",
      category: "Burgers",
      description: "Two flame-grilled beef patties, cheddar cheese,…",
      price: 11.49,
      image: "/figma/menu-double-stack.png",
    },
    {
      id: "burger-2",
      name: "Golden Chicken Burger",
      category: "Burgers",
      description:
        "Buttermilk-crusted chicken, slaw, and smoky mayo, plus golden fries, piping hot.",
      price: 14.29,
      image: "/figma/menu-golden-chicken.png",
    },
    {
      id: "burger-3",
      name: "Smoky Bacon Burger",
      category: "Burgers",
      description: "Smoky BBQ glaze, crisp bacon, onions…",
      price: 12.33,
      image: "/figma/menu-smoky-bacon.png",
    },
    {
      id: "burger-4",
      name: "Flame Angus Classic",
      category: "Burgers",
      description: "Flame-grilled Angus patty, melted cheddar, crisp lettuce, tomato, house relish.",
      price: 13.99,
      image: "/figma/hero-burger.png",
    },
  ],
  "Fan favorites": [
    {
      id: "fav-1",
      name: "Double Stack Burger",
      category: "Fan favorites",
      description: "Two flame-grilled beef patties, cheddar cheese,…",
      price: 11.49,
      image: "/figma/menu-double-stack.png",
    },
    {
      id: "fav-2",
      name: "Golden Chicken Burger",
      category: "Fan favorites",
      description:
        "Buttermilk-crusted chicken, slaw, and smoky mayo, plus golden fries, piping hot.",
      price: 14.29,
      image: "/figma/menu-golden-chicken.png",
    },
    {
      id: "fav-3",
      name: "Smoky Bacon Burger",
      category: "Fan favorites",
      description: "Smoky BBQ glaze, crisp bacon, onions…",
      price: 12.33,
      image: "/figma/menu-smoky-bacon.png",
    },
  ],
  Pizza: [
    {
      id: "pizza-1",
      name: "Classic Margherita",
      category: "Pizza",
      description: "San Marzano tomato sauce, fresh mozzarella, aromatic basil, and olive oil.",
      price: 13.99,
      image: "/figma/hero-pizza.png",
    },
    {
      id: "pizza-2",
      name: "Spicy Pepperoni Flame",
      category: "Pizza",
      description: "Crispy beef pepperoni, hot honey drizzle, aged mozzarella, chili flakes.",
      price: 15.49,
      image: "/figma/hero-pizza.png",
    },
    {
      id: "pizza-3",
      name: "Truffle Mushroom Pie",
      category: "Pizza",
      description: "Wild mushrooms, white truffle cream, caramelized onions, melted fontina.",
      price: 16.99,
      image: "/figma/hero-pizza.png",
    },
  ],
  Rolls: [
    {
      id: "roll-1",
      name: "Signature Shawarma Roll",
      category: "Rolls",
      description: "Spit-roasted sliced chicken, garlic toum, pickles, toasted in thin flatbread.",
      price: 9.99,
      image: "/figma/hero-shawarma.png",
    },
    {
      id: "roll-2",
      name: "Flame Grilled Sausage Roll",
      category: "Rolls",
      description: "Smoked sausage, grilled peppers, melted cheese, spicy mustard mayo.",
      price: 8.49,
      image: "/figma/hero-hotdog.png",
    },
    {
      id: "roll-3",
      name: "Crispy Paneer Tikka Wrap",
      category: "Rolls",
      description: "Charred paneer cubes, mint chutney, sliced red onions in paratha roll.",
      price: 9.49,
      image: "/figma/hero-shawarma.png",
    },
  ],
  Poultry: [
    {
      id: "poultry-1",
      name: "Crispy Fried Wings (8pc)",
      category: "Poultry",
      description: "Golden fried wings tossed in sweet and spicy glaze with ranch dip.",
      price: 12.99,
      image: "/figma/hero-chicken.png",
    },
    {
      id: "poultry-2",
      name: "Golden Chicken Tenders",
      category: "Poultry",
      description: "Buttermilk crusted chicken strips with signature house dipping sauce.",
      price: 10.99,
      image: "/figma/menu-golden-chicken.png",
    },
    {
      id: "poultry-3",
      name: "Smoky BBQ Half Chicken",
      category: "Poultry",
      description: "Slow-roasted tender chicken basted in hickory smoke BBQ sauce.",
      price: 15.99,
      image: "/figma/hero-chicken.png",
    },
  ],
  Bowls: [
    {
      id: "bowl-1",
      name: "Smash Burger Protein Bowl",
      category: "Bowls",
      description: "Grilled Angus patties, seasoned fries, cheddar, tomato, house relish.",
      price: 13.49,
      image: "/figma/menu-double-stack.png",
    },
    {
      id: "bowl-2",
      name: "Roasted Chicken Harvest",
      category: "Bowls",
      description: "Herb-marinated chicken, quinoa, roasted vegetables, lemon tahini.",
      price: 12.99,
      image: "/figma/hero-chicken.png",
    },
    {
      id: "bowl-3",
      name: "Crispy Falafel Sesame Bowl",
      category: "Bowls",
      description: "Handmade chickpea falafels, cucumber relish, warm pita, garlic toum.",
      price: 11.99,
      image: "/figma/hero-shawarma.png",
    },
  ],
};

const CATEGORIES = [
  "Fan favorites",
  "Burgers",
  "Pizza",
  "Rolls",
  "Poultry",
  "Bowls",
];

interface MenuSectionProps {
  selectedCategory?: string;
  onSelectCategory?: (category: string) => void;
}

export default function MenuSection({
  selectedCategory = "Burgers",
  onSelectCategory,
}: MenuSectionProps) {
  const [activeTab, setActiveTab] = useState(selectedCategory);
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const { addItem } = useCart();
  const carouselRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const currentItems = MENU_DATA[activeTab] || MENU_DATA["Burgers"];

  // Sync external category prop if changed
  useEffect(() => {
    if (selectedCategory && selectedCategory !== activeTab) {
      handleTabChange(selectedCategory);
    }
  }, [selectedCategory]);

  // Check scroll position to update arrow buttons and pagination dots
  const checkScrollBounds = useCallback(() => {
    if (!carouselRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
    setCanScrollLeft(scrollLeft > 15);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 15);

    // Calculate active slide index
    const firstCard = carouselRef.current.firstElementChild as HTMLElement;
    if (firstCard) {
      const cardWidth = firstCard.offsetWidth + 20;
      const idx = Math.round(scrollLeft / cardWidth);
      setActiveIndex(Math.max(0, Math.min(idx, currentItems.length - 1)));
    }
  }, [currentItems.length]);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;

    checkScrollBounds();
    el.addEventListener("scroll", checkScrollBounds, { passive: true });
    window.addEventListener("resize", checkScrollBounds);

    return () => {
      el.removeEventListener("scroll", checkScrollBounds);
      window.removeEventListener("resize", checkScrollBounds);
    };
  }, [activeTab, checkScrollBounds]);

  const handleTabChange = (tab: string) => {
    if (tab === activeTab) return;
    setActiveTab(tab);
    setActiveIndex(0);
    if (onSelectCategory) {
      onSelectCategory(tab);
    }

    // Reset carousel scroll smoothly to beginning
    if (carouselRef.current) {
      carouselRef.current.scrollTo({ left: 0, behavior: "smooth" });
    }

    setTimeout(() => {
      checkScrollBounds();
    }, 150);

    // Clean, responsive tab entrance for cards with playful tactile settle
    requestAnimationFrame(() => {
      if (carouselRef.current) {
        gsap.fromTo(
          carouselRef.current.children,
          { opacity: 0, y: 30, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.55,
            stagger: 0.06,
            ease: "back.out(1.25)",
            clearProps: "opacity,transform",
          }
        );
      }
    });
  };

  const handleScroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const firstCard = carouselRef.current.firstElementChild as HTMLElement;
      const scrollAmount = firstCard ? firstCard.offsetWidth + 20 : 420;
      carouselRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const scrollToCard = (index: number) => {
    if (carouselRef.current) {
      const firstCard = carouselRef.current.firstElementChild as HTMLElement;
      if (firstCard) {
        const cardWidth = firstCard.offsetWidth + 20;
        carouselRef.current.scrollTo({
          left: index * cardWidth,
          behavior: "smooth",
        });
      }
    }
  };

  // Tactile "Get yours" click interaction
  const handleAddToCart = (item: MenuItem, buttonEl: HTMLButtonElement) => {
    gsap.timeline()
      .to(buttonEl, { scale: 0.92, duration: 0.1, ease: "power1.in" })
      .to(buttonEl, { scale: 1.05, duration: 0.15, ease: "back.out(2)" })
      .to(buttonEl, { scale: 1, duration: 0.1, ease: "power1.out" });

    setAddedIds((prev) => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [item.id]: false }));
    }, 1300);

    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      category: item.category,
    });
  };

  // Master scroll reveal timeline with satisfying spring domino entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headerRef.current) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 86%",
            once: true,
          },
        });

        const badge = headerRef.current.querySelector(".meals-badge");
        const title = headerRef.current.querySelector("h2");
        const subtitle = headerRef.current.querySelector("p");
        const tabs = headerRef.current.querySelectorAll(".meals-tab-btn");

        if (badge) {
          tl.fromTo(
            badge,
            { opacity: 0, scale: 0.75, y: -15 },
            { opacity: 1, scale: 1, y: 0, duration: 0.7, ease: "back.out(2)", clearProps: "opacity,transform" }
          );
        }

        if (title && subtitle) {
          tl.fromTo(
            [title, subtitle],
            { opacity: 0, y: 35 },
            { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power4.out", clearProps: "opacity,transform" },
            "-=0.4"
          );
        }

        if (tabs.length > 0) {
          tl.fromTo(
            tabs,
            { opacity: 0, scale: 0.9, y: 15 },
            { opacity: 1, scale: 1, y: 0, duration: 0.55, stagger: 0.04, ease: "back.out(1.5)", clearProps: "opacity,transform" },
            "-=0.3"
          );
        }
      }

      if (carouselRef.current) {
        gsap.fromTo(
          carouselRef.current.children,
          { opacity: 0, y: 55, scale: 0.94 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.85,
            stagger: 0.08,
            ease: "back.out(1.25)",
            clearProps: "opacity,transform",
            scrollTrigger: {
              trigger: carouselRef.current,
              start: "top 85%",
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
      id="menu"
      className="relative w-full bg-[#FEFEF6] text-[#4D0711] pt-[90px] md:pt-[100px] pb-[85px] md:pb-[95px] rounded-t-[44px] z-20 overflow-hidden"
    >
      {/* Header Container: Figma #6829:677 (width 734px, gap 30px) */}
      <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 flex flex-col items-center">
        <div
          ref={headerRef}
          className="flex flex-col items-center text-center gap-[24px] md:gap-[30px] mb-[30px] max-w-[734px] w-full"
        >
          {/* Subheader Block: #6829:678 (width 611px, gap 2px) */}
          <div className="flex flex-col items-center gap-[4px] w-full">
            {/* Badge: #6829:679 (65x32, border #FD7E3B 1px, 50px radius, padding 6px 12px, no shadow) */}
            <div className="meals-badge w-[65px] h-[32px] rounded-[50px] border border-[#FD7E3B] flex items-center justify-center mb-[6px]">
              <span className="font-sans font-normal text-[14px] leading-[20px] text-[#FD7E3B]">
                Meals
              </span>
            </div>

            {/* Title: Phudu Black 900, 64px, #4D0711 */}
            <h2 className="font-phudu font-black text-[36px] sm:text-[48px] md:text-[64px] leading-[1.1] text-[#4D0711] text-center">
              Choose your favorite
            </h2>

            {/* Subtitle: Phudu Regular 400, 16px, lineHeight 24px, #757575 */}
            <p className="font-phudu font-normal text-[15px] sm:text-[16px] leading-[24px] text-[#757575] text-center max-w-md">
              Find your favorite. Choose a category and dig in.
            </p>
          </div>

          {/* Filter Tabs: #6829:684 (gap 10px) */}
          <div className="flex items-center justify-start md:justify-center gap-[10px] overflow-x-auto no-scrollbar w-full py-2 px-1">
            {CATEGORIES.map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => handleTabChange(tab)}
                  className={`meals-tab-btn px-[22px] sm:px-[24px] py-[10px] sm:py-[11px] rounded-[50px] font-phudu font-medium text-[15px] sm:text-[16px] leading-[20px] transition-all duration-300 shrink-0 select-none cursor-pointer hover:scale-105 active:scale-95 ${
                    isActive
                      ? "bg-[#DC1425] text-white border border-[#FEFEF6]"
                      : "bg-[#FEC387] text-[#4D0711] border border-[#FEFEF6] hover:bg-[#fed3a3]"
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Food Items Carousel Track Wrapper:
          Matches Figma: exactly 1240px width on desktop (3 x 400px cards + 2 x 20px gaps).
          max-w-[1280px] with xl:px-5 provides a full 1240px inner track with ZERO side cutoff!
          Dynamic soft edge fade masks indicate more items when scrolling,
          preventing any visual feeling of elements being abruptly sliced or cut.
      */}
      <div className="relative w-full max-w-[1280px] mx-auto px-4 sm:px-6 xl:px-5">
        {/* Soft edge fade - Left */}
        <div
          className={`pointer-events-none absolute left-3 sm:left-5 top-0 bottom-10 w-12 sm:w-20 bg-gradient-to-r from-[#FEFEF6] to-transparent z-10 transition-opacity duration-300 ${
            canScrollLeft ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Soft edge fade - Right */}
        <div
          className={`pointer-events-none absolute right-3 sm:right-5 top-0 bottom-10 w-12 sm:w-20 bg-gradient-to-l from-[#FEFEF6] to-transparent z-10 transition-opacity duration-300 ${
            canScrollRight ? "opacity-100" : "opacity-0"
          }`}
        />

        <div
          ref={carouselRef}
          onScroll={checkScrollBounds}
          className="w-full flex items-stretch gap-[20px] overflow-x-auto no-scrollbar pt-3 pb-8 scroll-smooth justify-start snap-x snap-mandatory"
          style={{ scrollPaddingLeft: "20px", scrollPaddingRight: "20px" }}
        >
          {currentItems.map((item) => {
            const isAdded = addedIds[item.id];
            return (
              <FoodCard
                key={item.id}
                item={item}
                isAdded={isAdded}
                onAdd={(e) => handleAddToCart(item, e.currentTarget)}
              />
            );
          })}
        </div>

        {/* Carousel Pagination Dots & Arrow Controls */}
        <div className="flex items-center justify-center gap-[20px] mt-2 md:mt-4">
          {/* Previous Button */}
          <button
            onClick={() => handleScroll("left")}
            disabled={!canScrollLeft}
            className={`w-[40px] h-[40px] rounded-[34px] bg-[#FDCC3B] flex items-center justify-center transition-all duration-200 select-none ${
              canScrollLeft
                ? "opacity-100 hover:bg-[#e6b82e] hover:scale-110 active:scale-95 cursor-pointer"
                : "opacity-35 cursor-not-allowed scale-100"
            }`}
            aria-label="Previous menu items"
          >
            <div className="relative w-4 h-4 flex items-center justify-center pointer-events-none">
              <Image
                src="/figma/icon-arrow-prev.svg"
                alt="Previous"
                width={16}
                height={16}
                className="object-contain"
              />
            </div>
          </button>

          {/* Interactive Slide Pagination Dots */}
          <div className="flex items-center gap-2 px-2">
            {currentItems.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => scrollToCard(idx)}
                className={`transition-all duration-300 rounded-full cursor-pointer h-2 ${
                  activeIndex === idx
                    ? "w-7 bg-[#FD7E3B]"
                    : "w-2 bg-[#4D0711]/25 hover:bg-[#4D0711]/50"
                }`}
                aria-label={`Go to item ${idx + 1}`}
              />
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={() => handleScroll("right")}
            disabled={!canScrollRight}
            className={`w-[40px] h-[40px] rounded-[34px] bg-[#FDCC3B] flex items-center justify-center transition-all duration-200 select-none ${
              canScrollRight
                ? "opacity-100 hover:bg-[#e6b82e] hover:scale-110 active:scale-95 cursor-pointer"
                : "opacity-35 cursor-not-allowed scale-100"
            }`}
            aria-label="Next menu items"
          >
            <div className="relative w-4 h-4 flex items-center justify-center pointer-events-none">
              <Image
                src="/figma/icon-arrow-next.svg"
                alt="Next"
                width={16}
                height={16}
                className="object-contain"
              />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}

/**
 * Interactive Food Card: Exact Figma Dimensions (400x535), No Artificial Drop Shadows, Flat Clean Aesthetic
 */
function FoodCard({
  item,
  isAdded,
  onAdd,
}: {
  item: MenuItem;
  isAdded?: boolean;
  onAdd: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  return (
    <div
      className="w-[82vw] max-w-[340px] sm:w-[350px] md:w-[380px] lg:w-[390px] xl:w-[400px] h-[510px] sm:h-[535px] shrink-0 snap-start rounded-[28px] border border-[rgba(77,7,17,0.2)] bg-[#FEFEF6] p-[24px] sm:p-[30px] flex flex-col justify-between relative group select-none transition-all duration-300 hover:-translate-y-1.5 hover:border-[rgba(77,7,17,0.4)]"
    >
      {/* Image Box: Figma layout_27b6fec6 (height 302px on desktop, borderRadius 12px) */}
      <div className="relative w-full h-[240px] sm:h-[302px] shrink-0 rounded-[12px] overflow-hidden bg-transparent mb-[14px]">
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="(max-width: 640px) 85vw, (max-width: 1024px) 380px, 400px"
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
        />
      </div>

      {/* Title & Description: Uniform container prevents card distortion */}
      <div className="flex flex-col gap-[6px] mb-2 flex-1 justify-start">
        <h3 className="font-phudu font-semibold text-[22px] sm:text-[24px] leading-[26px] sm:leading-[24px] text-[#4D0711] group-hover:text-[#FD7E3B] transition-colors duration-200 line-clamp-1">
          {item.name}
        </h3>
        <p className="font-phudu font-medium text-[15px] sm:text-[16px] leading-[22px] sm:leading-[24px] text-[#6B7280] line-clamp-2 min-h-[44px] sm:min-h-[48px]">
          {item.description}
        </p>
      </div>

      {/* Bottom Row: Figma #6829:730 (Price left, "Get yours" Button right) */}
      <div className="flex items-center justify-between pt-3 border-t border-[rgba(77,7,17,0.08)] relative z-20 shrink-0">
        {/* Price: Phudu SemiBold 42px, #FD7E3B */}
        <span className="font-phudu font-semibold text-[32px] sm:text-[42px] leading-none text-[#FD7E3B]">
          ${item.price.toFixed(2)}
        </span>

        {/* "Get yours" Button: Figma EL-4cfb822a (149x47, 12px radius, no drop shadow) */}
        <button
          onClick={onAdd}
          className={`w-[130px] sm:w-[149px] h-[45px] sm:h-[47px] rounded-[12px] border font-phudu font-medium text-[17px] sm:text-[20px] leading-normal flex items-center justify-center gap-1.5 transition-all duration-200 text-center cursor-pointer select-none ${
            isAdded
              ? "bg-[#FD7E3B] border-[#FD7E3B] text-white"
              : "bg-[#4D0711] border-[#FEFEF6] text-[#FEFEF6] hover:bg-[#FD7E3B] hover:border-[#FD7E3B]"
          }`}
        >
          {isAdded ? (
            <>
              <Check className="w-5 h-5 text-white stroke-[2.5]" />
              <span>Added!</span>
            </>
          ) : (
            "Get yours"
          )}
        </button>
      </div>
    </div>
  );
}
