

## Plan: Strip AI Aesthetic, Build Human-Crafted Portfolio

This plan addresses all 5 categories from your recommendations. The goal is to make every pixel feel intentional and hand-crafted.

---

### 1. Typography: True Hierarchy

**Changes to `src/index.css` and `tailwind.config.ts`:**
- Remove `uppercase` and `tracking-tight` from all headings globally -- use sentence case with proper weight contrast instead
- Set heading line-heights: H1 at 1.05, H2 at 1.1, H3 at 1.2
- Body line-height already 1.6 (good) -- keep it
- Define strict type scale: H1 = clamp(2.5rem, 5vw, 4rem), H2 = clamp(2rem, 4vw, 3rem), H3 = 1.25rem

**Changes across all section components:**
- Convert all headings from `UPPERCASE` to sentence/title case (e.g., "TECHNICAL ARSENAL" → "Skills", "FEATURED PROJECTS" → "Selected Projects")
- Remove `tracking-[0.3em]` and `tracking-widest` from labels -- use `tracking-wide` at most
- Remove monospace-style tiny labels (the `text-[10px] uppercase tracking-widest` pattern used everywhere) -- replace with normal `text-sm text-muted-foreground`
- Stop splitting headings into "Word\nCOLORED_WORD" -- use a single clean heading per section

### 2. Spacing & Layout: Embrace the Void

**Section spacing:**
- Increase section padding from `py-32` to `py-40` or `py-48` on all sections
- Add more margin between section headers and content (currently `mb-16`, increase to `mb-24`)

**Kill box-in-a-box:**
- About section quick-facts: Remove bordered cards, display as simple inline text with a divider
- Skills section: Remove card borders entirely -- just show category title + skill list on the background
- Contact info cards: Simplify to just icon + text, no card wrapper
- Remove the animated line + label + number pattern from every section header -- use just a plain heading

**Remove decorative filler:**
- Remove background gradient orbs from Hero, Skills, Contact, Experience, Projects, Footer (all those pulsing `radial-gradient` divs)
- Remove diagonal lines from Hero
- Remove scanning beam from Hero
- Remove marquee background text from About
- Remove "DD" pulsing monogram from Hero
- Remove "01" glitch number from Hero
- Remove corner accents from Hero
- Remove background accent gradients from Projects, Experience, Footer

### 3. Color Palette: Sophistication

**Changes to `src/index.css`:**
- Shift background from pure black (`0 0% 3%`) to a warmer charcoal (`0 0% 6%` or `20 5% 5%`)
- Lower primary saturation slightly: `38 100% 50%` → `38 80% 50%` (less neon, more muted amber)
- Use solid grayscale borders instead of opacity-based ones (`border-primary/30` → a defined gray)
- Remove all `hsl(var(--primary) / 0.05)` type background washes -- use solid subtle grays

### 4. Interaction: Tactile, Not Theatrical

**Remove across all components:**
- All 3D tilt effects (rotateX, rotateY, perspective) from skill cards and project cards
- All shine/shimmer sweep effects (the `via-white/5` gradient translate)
- All top accent bars that appear on hover
- All hover `x: 4` or `x: 8` slide effects
- All bouncing/repeating arrow animations
- Word-by-word hover color changes in About
- Letter-by-letter hover effects in Footer
- Pulsing opacity animations on labels

**Keep/Add:**
- Simple `opacity` and `background-color` transitions on hover (fast, 150ms)
- Button press: `whileTap={{ scale: 0.98 }}` (tactile click)
- Simple `whileInView` fade-in (opacity 0→1, y 20→0) -- one per section, not per element

**Remove the intro animation entirely** (`IntroAnimation.tsx`) -- static portfolio should load instantly

**Remove `scroll-behavior: smooth` from CSS** -- let native browser handle it (keep JS `scrollIntoView` with smooth for nav clicks only)

### 5. Content Strategy: Show, Don't Tell

**Copy changes across components:**
- Hero tagline: Replace "Transforming complex data into intelligent systems" → something specific like "Building NLP systems and ML pipelines at Probe42"
- About "I BUILD SYSTEMS THAT LEARN & ADAPT" → Remove entirely, replace with a conversational paragraph
- "Technical Arsenal" → "Skills"
- "Featured Projects" → "Selected Work"
- "Get In Touch" → "Contact"
- Remove all section numbering ("01", "02")
- Remove "Data Science • ML • AI" blinking cursor badge
- Project metrics badges: Keep but simplify styling -- no uppercase tracking-widest, just plain text

**Photo treatment:**
- Remove HUD corner brackets, scanline overlay, grayscale filter, and hover glow from developer photo
- Show the photo naturally with just a simple border or no border at all
- Make it visible on mobile too

---

### Files Modified (12 files)

| File | Changes |
|------|---------|
| `src/index.css` | Warmer background, lower accent saturation, remove uppercase heading rule, adjust type scale |
| `src/App.css` | Remove unused classes, clean font overrides |
| `tailwind.config.ts` | No major changes needed |
| `src/pages/Index.tsx` | Remove IntroAnimation import and usage |
| `src/components/F1HeroSection.tsx` | Major strip-down: remove grid, orbs, diagonal lines, scanning beam, "01", corner accents, "DD" monogram, HUD photo frame. Keep name reveal (simplified), tagline, CTAs |
| `src/components/F1AboutSection.tsx` | Remove marquee, word hover effects, "01" label, giant statement. Replace with conversational copy |
| `src/components/BentoSkillsSection.tsx` | Remove 3D tilt, shine, animated borders, pulsing gradient. Flat grid, simple hover |
| `src/components/HorizontalProjectsSection.tsx` | Remove 3D tilt, shine, top accent bars, "01/02" numbers. Clean cards |
| `src/components/F1PublicationsSection.tsx` | Remove top accent bars, simplify |
| `src/components/HorizontalExperienceSection.tsx` | Remove pulsing gradient, "01/02" numbers, top accent bars |
| `src/components/F1ContactSection.tsx` | Remove pulsing gradient, shine effects, corner accent. Clean form |
| `src/components/F1Footer.tsx` | Remove pulsing gradient, letter hover effects. Simple text footer |
| `src/components/SpeedLinesBackground.tsx` | Remove diagonal line animations, keep only subtle grid + vignette |
| `src/components/IntroAnimation.tsx` | Will be unused (kept in repo but removed from Index) |
| `src/components/F1NavBar.tsx` | Minor: remove uppercase from labels |

### Result

A portfolio that feels like it was designed by a person with restraint -- clean typography, generous whitespace, muted colors, instant load, and content that proves competence through specifics rather than flashy effects.

