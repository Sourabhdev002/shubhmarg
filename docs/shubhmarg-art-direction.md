# ShubhMarg Art Direction

## 1. Brand Philosophy
**"Traditional Vedic Guidance for Modern Life."**
ShubhMarg is a premium Indian heritage brand. It is an elegant, authentic digital publication bridging ancient Vedic wisdom with modern luxury. It rejects the hyper-minimalist SaaS aesthetic in favor of emotional resonance, rich physical materiality, and meaningful visual storytelling. Every pixel must communicate authenticity, trust, and deep respect for tradition.

## 2. Visual References & Concepts
- **Editorial Indian Luxury:** High-end spiritual/wellness publications, bespoke handmade physical materials, meticulous typography, and intentional asymmetry.
- **Storytelling over Grids:** The interface must tell a visual story (Ancient Wisdom → Cosmos → Personal Guidance → Clarity) rather than presenting a grid of UI components.
- **Physical Materiality:** Handmade paper, brushed antique gold, deep ink, and subtle celestial light.

## 3. Color Palette
The colors are restrained, warm, and highly deliberate. No bright modern SaaS colors, neon oranges, or gratuitous gradients.
- **Primary:** Deep Maroon (`#6F1D24`) — anchors the brand, used for profound statements and primary CTAs.
- **Secondary:** Antique Gold — used sparingly for elegant hairlines, subtle borders, and delicate highlights.
- **Background:** Warm Ivory & Parchment — creates the tactile base, replacing stark white and gray.
- **Supporting:** Deep Brown — grounds typography, offering a softer, richer alternative to pure black.
- **Accents:** Muted Saffron (for key spiritual indicators) and very dark celestial Indigo (for deep astronomical/astrological visual weight).

## 4. Typography
Typography is a paramount design element. It must mimic a luxury print publication.
- **Hero & Display:** Large, sophisticated serif. Commands authority and tradition.
- **Supporting Body:** Modern, restrained, and highly readable sans-serif.
- **Labels & Metadata:** Small, uppercase editorial typography with generous tracking (letter spacing) to organize complex information elegantly.

## 5. Hero Composition
The hero will abandon the standard "text + button in whitespace" layout.
Instead, it will frame the typography organically:
- A framing celestial composition (see below) rests partially behind and around the typography.
- Small editorial "eyebrow" text.
- Large, commanding main headline.
- Deliberate, beautifully spaced primary CTA that feels like the start of a profound journey.

## 6. Celestial Visual Language
- **Concept:** An ancient astronomical instrument redesigned as modern art.
- **Elements:** Subtle planetary orbits, geometric Nakshatra constellation points, radial mathematical structure, and subtle sun/moon forms.
- **Execution:** Restrained, sophisticated SVG geometry. No cliché horoscope zodiac wheels, no AI-generated mandalas. It must feel like authentic, ancient celestial knowledge rendered beautifully.

## 7. Panchang Visual Language
- **Concept:** A Daily Vedic Almanac, not a dashboard widget.
- **Execution:** A beautiful editorial composition. Explicitly spelled out dates and profound typography for the Tithi, Nakshatra, Paksha, and Lunar Month.
- **Imagery:** The moon phase must look like a real moon. Sunrise must visually evoke a sunrise. Nakshatras must resemble constellations. No generic tiny vector icons.

## 8. Guidance Illustration System
- **Concept:** Visual paths, not UI icons. Each Area of Guidance has a substantial (56–80px desktop) original illustration.
- **Career:** Celestial rising path.
- **Business:** Growth + prosperity geometry.
- **Marriage:** Two intertwined forms / sacred union.
- **Family:** Home + people.
- **Education:** Vedic manuscript/book + diya.
- **Wealth:** Lotus + abundance geometry.
- **Property:** Traditional home + foundation.
- **General Guidance:** Compass + celestial star.
- **Style:** Dimensional, elegant, limited to 2-4 core colors (maroon, gold, saffron, ivory), soft highlights, and purposeful meaning. No emojis or generic line icons.

## 9. Card Composition
- **Concept:** Organic hierarchy, not an 8-cell spreadsheet.
- **Execution:** Feature the most requested paths (e.g., Career) with a large visual illustration and descriptive editorial text.
- **Layout:** Asymmetric grouping. Larger feature blocks mixed with elegantly balanced dual or triple card rows.

## 10. Mobile Composition
- **Target:** Primary design target is `390 × 844`.
- **Execution:** Mobile is not compressed desktop. It is a premium vertical experience. 
- The celestial artwork must remain impactful on the first screen. 
- Guidance cards transition into beautiful, highly legible vertical blocks. 
- Icons remain large and substantial. Buttons maintain generous, comfortable touch targets.

## 11. Animation Philosophy
- **Concept:** Quality, stability, and calm.
- **Execution:** Ethereal opacity fades, very slow celestial orbits, and soft glows. 
- **Strictly Banned:** Aggressive parallax, heavy 3D frameworks, bouncy transitions, and transform-based translations (`slide-in`) on interactive elements (to preserve strict iOS touch reliability).

## 12. Accessibility & Performance
- **Accessibility:** Maintain strict WCAG contrast (especially over parchment backgrounds), semantic HTML, and proper focus states. `prefers-reduced-motion` must be explicitly respected by pausing orbits and fades.
- **Performance:** Fast, native rendering. Use CSS filters, layered SVGs, and native browser rendering instead of heavy external animation or 3D libraries.

---
*This document serves as the foundational Art Direction for ShubhMarg. No UI code will be modified until this direction is approved.*
