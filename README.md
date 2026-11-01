# 🍔 Ruchi — Modern Restaurant & Fast Delivery Landing Page

A high-performance, pixel-perfect restaurant landing page cloned 1:1 from Figma with modern GSAP scroll reveals, fluid micro-interactions, full shopping cart state management, and an interactive catering builder.

![Ruchi Banner](/figma/footer-brand-art.svg)

---

## ✨ Features & Highlights

### 🎨 100% Exact Figma Fidelity
- **Brand Palette:** Deep Maroon (`#4D0711`), Dark Maroon (`#37050C`), Flash Maroon (`#5E0E0D`), Warm Cream (`#FEEDCF`), Cream Light (`#FEFEF6`), Accent Orange (`#FD7E3B`), Gold (`#FDCC3B`), and vibrant deal pastels.
- **Typography:** Fully optimized Google Fonts using **Phudu** (Black 900, SemiBold 600, Medium 500) and **Poppins** (Regular 400).
- **Zero Element Clipping:** High-headroom overflow-safe category containers so food photography pops cleanly above card borders without slicing.

### 🎬 Modern GSAP & ScrollTrigger Animations
- **Glassmorphic Sticky Navbar:** Enters with a staggered slide-down and seamlessly transitions into a backdrop-blurred dark maroon bar on scroll.
- **Hero Reveal Sequence:** Staggered headline lines (`power4.out`), elastic badge pop-in (`back.out(1.7)`), and 3D category cards entrance.
- **Animated Menu Tabs:** Smooth GSAP fade-and-lift transition when switching between categories (*Burgers, Fan favorites, Pizza, Rolls, Poultry, Bowls*).
- **Organic Wing Floating:** Continuous sine-wave floating loops on Friday Flash wings with interactive scroll-scrub parallax.
- **Playful Map Marker Bounce:** Elastic drop animation on the kitchen location pin as the map scrolls into view.
- **Majestic Brand Art Scale:** Grand fade-in and scale-up of the giant 1228px Ruchi wordmark in the footer.

### 🛒 Fully Functional Interactivity
- **Global Cart Drawer:** Slide-out drawer with item quantity controls, subtotal, automatic delivery fee calculation, and animated order confirmation.
- **Promo Code Engine:** Working coupon system supporting codes like `FLASH50` (50% off) and `RUCHI20` (20% off).
- **Catering Builder Modal:** Interactive event planner with guest slider (5–150 guests), package selection, dietary toggles (Halal, Vegetarian, Gluten-Free), and live price estimation.
- **Responsive Mobile Navigation:** Full-screen slide-down navigation drawer for mobile and tablet devices.

---

## 🏗️ Architecture & Sections

```
ruchi/
├── app/
│   ├── favicon.ico           # 32x32 brand favicon
│   ├── icon.svg              # Scalable SVG brand icon
│   ├── globals.css           # Tailwind v4 theme & font variables
│   ├── layout.tsx            # Root layout with Phudu & Poppins fonts
│   └── page.tsx              # Main landing page controller
├── components/
│   ├── Navbar.tsx            # Sticky header with logo & cart trigger
│   ├── Hero.tsx              # Headline, CTAs & popping category cards
│   ├── MenuSection.tsx       # Filterable menu carousel & arrow controls
│   ├── StepsSection.tsx      # 3-phase ordering guide cards
│   ├── FridayFlashBanner.tsx # Half-off banner with floating wings
│   ├── DealsSection.tsx      # 2x2 combo sharing cards
│   ├── CateringSection.tsx   # Catering packages & "Catering, Your Way"
│   ├── CateringModal.tsx     # Interactive custom catering builder modal
│   ├── ReviewsSection.tsx    # 5-star customer review testimonials
│   ├── Footer.tsx            # 4 columns, app links, map & giant wordmark
│   └── CartDrawer.tsx        # Slide-out shopping cart & checkout flow
├── context/
│   └── CartContext.tsx       # React Context cart & promo state manager
└── public/
    ├── favicon.svg           # High-resolution vector favicon
    └── figma/                # 38+ original Figma vector & raster assets
```

---

## 🚀 Tech Stack

- **Framework:** [Next.js 16 (Turbopack)](https://nextjs.org/)
- **UI Library:** [React 19](https://react.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Animation:** [GSAP 3.15](https://greensock.com/gsap/) with [ScrollTrigger](https://greensock.com/scrolltrigger/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Fonts:** [Phudu](https://fonts.google.com/specimen/Phudu) & [Poppins](https://fonts.google.com/specimen/Poppins)

---

## 🛠️ Getting Started

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v18.18 or later)
- [pnpm](https://pnpm.io/) (or `npm` / `yarn`)

### 2. Install Dependencies
```bash
pnpm install
```

### 3. Run Development Server
```bash
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000) (or the port specified in terminal) in your browser.

### 4. Build for Production
```bash
pnpm build
pnpm start
```

---

## 📐 Figma Reference

- **Figma Design File:** [Techwitpro Website 2.0](https://www.figma.com/design/FnHE2mmi2zeqOJa4Dm8ri5/Techwitpro-Website-2.0?node-id=6599-13504)
- **Node ID:** `6599:13504`
