# VAULT — Style Guide

## Brand Identity

**VAULT** is a high-end streetwear resale platform specializing in authenticated, pre-owned luxury items with occasional new pieces. The brand combines sustainability with exclusivity, targeting fashion-conscious consumers who value both heritage brands and environmental responsibility.

## Visual Identity

### Logo
- Primary: SVG logo with bold, geometric typography
- Usage: Header, footer, marketing materials
- Spacing: Minimum 24px clear space on all sides
- Do not: Distort, add effects, or change colors

### Color Palette

#### Primary Colors

**Neutral (Gray Scale)**
- Background Light: `--color-neutral-1` → `#fcfcfc`
- Surface: `--color-neutral-2` → `#f8f8f8`
- Border: `--color-neutral-6` → `#e3e3e3`
- Text Secondary: `--color-neutral-11` → `#646464`
- Text Primary: `--color-neutral-12` → `#202020`

**Accent (Neon Lime)**
- Subtle: `--color-accent-3` → `#f2fde1`
- Interactive: `--color-accent-9` → `#bdee63`
- Contrast Text: `--color-accent-contrast` → `#000000`

#### Semantic Colors

**Success** (Green)
- Background: `--color-success-3`
- Text: `--color-success-11`
- Use for: In stock badges, success messages

**Error** (Red)
- Background: `--color-error-3`
- Text: `--color-error-11`
- Use for: Out of stock, error states

### Typography

#### Font Family
- Primary: **Neo Grotesque** (Space Grotesk)
- Fallback: `-apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif`

#### Type Scale

**Display** (Hero Headlines)
- Size: `clamp(2rem, 5vw, 3.5rem)`
- Weight: 900
- Usage: Hero titles, landing pages
- Transform: Uppercase
- Letter-spacing: -0.02em

**Heading** (Section Titles)
- Size: `clamp(1.5rem, 3vw, 2.5rem)`
- Weight: 700
- Usage: Page titles, major sections
- Transform: Uppercase
- Letter-spacing: -0.01em

**Subheading** (Card Titles)
- Size: `1.25rem`
- Weight: 600
- Usage: Product titles, card headers

**Body** (Regular Text)
- Size: `1rem`
- Weight: 400
- Line-height: 1.7
- Usage: Descriptions, paragraph text

**Caption** (Meta Info)
- Size: `0.875rem`
- Weight: 500
- Usage: Labels, metadata, prices

### Spacing System

Based on 8px grid:

```
--space-1: 4px
--space-2: 8px
--space-3: 12px
--space-4: 16px
--space-5: 24px
--space-6: 32px
--space-7: 40px
--space-8: 48px
--space-9: 64px
```

**Usage Guidelines:**
- Component padding: `--space-4` to `--space-6`
- Section margins: `--space-8` to `--space-9`
- Element gaps: `--space-3` to `--space-4`

### Border Radius

```
--radius-1: 2px  (Subtle)
--radius-2: 4px  (Small elements)
--radius-3: 8px  (Buttons, inputs)
--radius-4: 12px (Cards, images)
--radius-5: 16px (Large containers)
--radius-round: 50% (Circular)
```

**Standard:** `--radius-4` (12px) for most UI elements

### Shadows

```
--shadow-1: Subtle elevation
--shadow-2: Card elevation
--shadow-3: Modal/dialog elevation
--shadow-4: Maximum elevation
```

**Usage:**
- Cards on hover: `--shadow-2`
- Buttons on hover: `--shadow-3`
- Modals/dialogs: `--shadow-4`

### Animations

#### Timing Functions
```
--ease: cubic-bezier(0.4, 0.0, 0.2, 1)
--ease-in: cubic-bezier(0.4, 0.0, 1, 1)
--ease-out: cubic-bezier(0.0, 0.0, 0.2, 1)
--ease-in-out: cubic-bezier(0.4, 0.0, 0.2, 1)
```

#### Standard Transitions
- Hover states: `0.2s ease`
- Page transitions: `0.3s ease-in-out`
- Modal animations: `0.4s ease-out`

## UI Components

### Buttons

#### Primary Button
```css
background: var(--color-accent-9);
color: var(--color-accent-contrast);
padding: var(--space-3) var(--space-6);
border-radius: var(--radius-3);
font-weight: 700;
transition: all 0.2s ease;
```

States:
- Hover: Lift effect (`translateY(-2px)`) + shadow
- Active: `background: var(--color-accent-10)`
- Disabled: Opacity 0.5, no pointer events

#### Secondary Button (Outline)
```css
background: transparent;
border: 1px solid var(--color-neutral-6);
color: var(--color-neutral-12);
```

### Cards

#### Product Card
- Aspect Ratio: 3:4 (portrait)
- Border Radius: `--radius-4`
- Border: `1px solid var(--color-neutral-6)`
- Padding: `var(--space-4)`
- Hover: Transform up 4px, add shadow

#### Info Card
- Background: `var(--color-neutral-2)`
- Border: `1px solid var(--color-neutral-6)`
- Padding: `var(--space-5)`

### Badges

#### Status Badge
- In Stock: Green background
- New: Lime accent background
- Pre-owned: Neutral background
- Padding: `var(--space-2) var(--space-3)`
- Border-radius: `var(--radius-2)`
- Font-size: `0.75rem`
- Font-weight: 700
- Uppercase

### Forms

#### Input Fields
```css
background: var(--color-neutral-1);
border: 1px solid var(--color-neutral-6);
border-radius: var(--radius-3);
padding: var(--space-3) var(--space-4);
font-size: 1rem;
transition: border-color 0.2s ease;
```

States:
- Focus: `border-color: var(--color-accent-9)`
- Error: `border-color: var(--color-error-9)`

## Layout Patterns

### Grid System

#### Product Grid
```css
display: grid;
grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
gap: var(--space-6);
```

Responsive:
- Desktop: 3-4 columns
- Tablet: 2 columns
- Mobile: 1 column

### Container Widths
- Max width: `1400px`
- Padding: `var(--space-6)` desktop, `var(--space-4)` mobile

## Photography Guidelines

### Product Images

**Requirements:**
- Format: JPEG or WebP
- Resolution: Minimum 1200px width
- Aspect Ratio: 3:4 (portrait)
- Quality: 85-90%

**Style:**
- Clean backgrounds (white, gray, or minimal urban)
- Natural or studio lighting
- Focus on texture and details
- No watermarks or logos

**Shot Types:**
1. Front view (main)
2. Detail shots (fabric, tags, hardware)
3. Back view
4. Worn/lifestyle shot (optional)
5. Packaging/accessories

### Editorial/Lifestyle Images

**Hero Banners:**
- Resolution: Minimum 1920x1080px
- Style: Cinematic, moody lighting
- Subject: Urban environments, premium fabrics
- No faces (maintain anonymity and focus on product)
- Color grading: High contrast, desaturated with lime accent

**Brand Aesthetic:**
- Street photography influence
- High-fashion editorial quality
- Dramatic lighting (GQ/Vogue style)
- Premium fabric close-ups
- Urban/industrial backgrounds

## Content Guidelines

### Product Descriptions

**Structure:**
1. Condition statement (Pre-owned/New)
2. Brand heritage or product highlight
3. Key features
4. Condition details

**Example:**
```
Pre-owned. Классическая кожаная куртка Saint Laurent. 
Премиальная кожа ягненка, классический силуэт. 
Естественная патина добавляет характер.
```

**Tone:**
- Confident yet authentic
- Focus on quality and heritage
- Transparent about condition
- Emphasize sustainability

### Brand Voice

**Characteristics:**
- Premium but accessible
- Knowledgeable without being pretentious
- Sustainability-conscious
- Authentic and transparent
- Urban and contemporary

**Do:**
- Use Russian language naturally
- Highlight brand heritage
- Be honest about pre-owned condition
- Celebrate sustainable fashion

**Don't:**
- Oversell or exaggerate
- Use overly technical jargon
- Ignore wear/imperfections
- Sound corporate or stiff

## Accessibility Standards

### Color Contrast
- Text on backgrounds: Minimum 4.5:1 (WCAG AA)
- Large text (18pt+): Minimum 3:1
- UI controls: Minimum 3:1

### Interactive Elements
- Minimum tap target: 44x44px
- Clear focus states
- Keyboard navigable
- Screen reader friendly labels

### Text
- Minimum font size: 14px (body text)
- Maximum line length: 70 characters
- Line height: 1.5-1.7 for body text

## Dark Mode

The application supports automatic dark mode via `light-dark()` CSS function.

**Key Differences:**
- Background: Dark gray instead of white
- Text: Light instead of dark
- Accent: Maintains neon lime for consistency
- Shadows: More subtle in dark mode

## Brand Applications

### Social Media
- Instagram: High-fashion editorial shots
- Telegram: Product cards, new arrivals
- Platform: 1:1 square crops for posts

### Packaging
- Minimalist black packaging
- Lime accent logo sticker
- Sustainability messaging

### Marketing Materials
- Typography-forward designs
- High-contrast imagery
- Lime accent as highlight color
- "Pre-owned excellence" messaging

## File Naming Conventions

### Images
```
product-[brand]-[item]-[view].jpg
Example: product-stoneisland-cargo-front.jpg
```

### Components
```
component-name.tsx
component-name.module.css
```

### Routes
```
kebab-case.tsx
product.$id.tsx (dynamic routes)
```

## Development Standards

### CSS
- Use CSS Modules
- Mobile-first responsive design
- CSS custom properties for theming
- BEM-inspired class naming

### Components
- Functional components with TypeScript
- Props interface for type safety
- Reusable, single-purpose components
- Accessibility attributes (ARIA)

### Performance
- Lazy load images
- Optimize image sizes (WebP)
- Code splitting for routes
- Minimize bundle size

---

## Quick Reference

**Primary Accent:** Neon Lime (`--color-accent-9`)  
**Font:** Space Grotesk (Neo Grotesque)  
**Radius:** 12px  
**Grid Gap:** 24px  
**Container:** 1400px  
**Image Ratio:** 3:4

**Brand Essence:** Premium pre-owned streetwear with sustainable values, delivered through cinematic visuals and authentic curation.
