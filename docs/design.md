# TASK: REDESIGN MEU HOMEPAGE UI & FRONTEND IMPLEMENTATION

## 1. PROJECT OVERVIEW & BRAND POSITIONING
- **Brand:** MeU (Enterprise Software Outsourcing & Technology Solutions Studio).
- **Target Audience:** Enterprise C-level executives, Product Owners, and Global Clients seeking high-performance software engineering and digital transformation.
- **Goal:** Redesign the homepage UI/UX to feel modern, high-tech, and trustworthy, with a strong "Visual Signature" (Abstract Digital Ecosystem) and a dynamic layout rhythm. Avoid generic "developers sitting with laptops" stock photos.

---

## 2. TECHNICAL STACK & LIBRARIES
- **Framework:** React / Next.js (Tailwind CSS for styling).
- **Animation & Interactive Graphic:**
  - **Three.js / React Three Fiber (R3F):** For rendering 3D Interactive Abstract Nodes / Data Flow / Digital Ecosystem in Hero & key sections.
  - **GSAP + ScrollTrigger:** For smooth scroll-driven animations, section pinning, and staggered element reveals.
  - **HTML5 Canvas (Fallback/Optimization):** For lightweight particle/node connections where 3D is unnecessary.
  - **Lucide React:** Minimalist iconography.

---

## 3. UI/UX SYSTEM REQUIREMENTS

### A. Layout Rhythm & Composition (Breaking Monotony)
Do NOT use the same `Label -> Heading -> Description -> Grid Cards` pattern for all sections. Vary the compositions:
1. **Hero:** Full Viewport Height (100vh), Split 50/50 (Left: High-impact Typography & CTA; Right: Interactive 3D Three.js Node Ecosystem).
2. **Problem/Challenge Section ("Điều gì cần thay đổi?"):** Split 40/60 with Giant Accent Typography and high-contrast text layout.
3. **Core Solutions:** Asymmetric Cards Grid with hover interactive lighting.
4. **Capabilities:** Flat List / Accordion View with dividers (NO cards to avoid "Dashboard feeling").
5. **Industries:** Horizontal Drag/Scroll Cards system.
6. **Social Proof & Metrics:** Full-width high-contrast banner (Break section rhythm).
7. **Footer CTA (Mini-Hero):** Immersive dark/gradient block with huge display fonts.

### B. Card Hierarchy System
Establish a clear 3-tier Card Design System:
- **Primary Card (Core Solutions / Featured Case Study):** Large footprint, Subtle border gradient, Glassmorphism hover effect, subtle glowing accent line on active state.
- **Secondary Card (Industries):** Flat solid background (`#0F172A` / `#1E293B`), 1px subtle stroke, monochrome icons.
- **Tertiary / Flat Structure (Capabilities):** No bounding box or cards. Use horizontal dividers, large typography, and inline status/tags.

### C. Color & Spacing Strategy
- **Whitespace Rule:** Intentional padding.
  - *Primary Sections (Hero, Case Studies, Final CTA):* Large padding (`120px` to `160px` top/bottom).
  - *Secondary Sections (Capabilities, Industries):* Compact padding (`60px` to `80px` top/bottom).
- **Strategic Accent Color:**
  - Pick a single signature Accent Color (e.g., Electric Cyan `#00F0FF` or High-Tech Purple/Blue `#6366F1`).
  - Reserve Accent color ONLY for: Primary CTA, Active/Hover states, Three.js node highlights, Metric numbers, and key emphasized words.

---

## 4. SECTION-BY-SECTION DETAILED SPECIFICATION

### Section 1: Hero (Visual Signature)
- **Left:** Headline focused on MeU's capability, primary CTA button ("Start a Project"), and subtle secondary proof.
- **Right (Visual Signature):** A Three.js interactive canvas displaying a 3D "Digital Ecosystem" (Floating interconnected data nodes/particles that subtly react to mouse cursor position and scroll depth).

### Section 2: Social Proof Banner (Metrics & Trust)
- **Design:** Full-width block with a distinct background shade.
- **Components:**
  - Animated Number Counters: `50+ Projects Delivered`, `95% Client Retention`, `6+ Core Industries`.
  - Continuous Infinite Marquee Ticker for Client Logos with opacity `0.6` (brightens to `1.0` on hover).

### Section 3: Core Solutions & Capabilities
- **Solutions:** Tier-1 Primary Cards with GSAP staggered entrance on scroll (`y: 40, opacity: 0, stagger: 0.15`).
- **Capabilities:** Clean typography list with hover preview or expanding drawer/tabs.

### Section 4: Final CTA (Mini-Hero)
- **Copy:** "Mang đến thách thức. Chúng tôi mang đến hướng đi."
- **Design:** Display font size (`48px` to `64px`), immersive gradient background, prominent glow-effect CTA button, minimal distraction.

---

## 5. YOUR OUTPUT DELIVERABLES
Please provide:
1. **React / Tailwind Code Structure** implementing the redesigned homepage layout.
2. **Three.js / React Three Fiber Component Code** for the Hero "Abstract Digital Ecosystem / Node System".
3. **GSAP ScrollTrigger setup snippet** demonstrating how the layout elements reveal gracefully on scroll without performance lag.