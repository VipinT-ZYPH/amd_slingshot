# Design System Strategy: The Lucid Precision Framework

## 1. Overview & Creative North Star
**The Creative North Star: "The Digital Biome"**
This design system moves away from the rigid, sterile "dashboard" look of typical health apps. Instead, we are creating a "Digital Biome"—an environment that feels alive, breathable, and hyper-intelligent. By combining the depth of a midnight navy landscape with the luminous clarity of glassmorphism, we position the assistant not as a tool, but as a premium, intuitive companion.

**Breaking the Template:**
We reject the standard 12-column rigid grid in favor of **Intentional Asymmetry**. Larger display type should often be "hung" to the left with generous whitespace to its right, allowing the background depth to breathe. Overlapping elements—such as a glassmorphism card partially obscuring a soft background glow—create a sense of sophisticated three-dimensionality that flat designs cannot replicate.

---

## 2. Colors & Surface Philosophy

### The Tonal Palette
The palette is rooted in deep obsidian and navy, punctuated by high-vibrancy "Bio-Luminescent" accents.
- **Primary (`#4be277`):** Represents growth and vitality. Use for success states and primary progression.
- **Secondary (`#7bd0ff`):** Represents intelligence and clarity. Use for AI-driven insights and interactive elements.
- **Surface (`#0b1326`):** The foundation. It is not pitch black, but a deep ink that allows for "internal light" to feel more natural.

### The "No-Line" Rule
**Explicit Instruction:** Traditional 1px solid borders are strictly prohibited for sectioning or containment. 
Boundaries must be defined through **Tonal Transitions**. To separate a sidebar from a main feed, transition from `surface` to `surface-container-low`. The human eye perceives the shift in depth without the cognitive load of a "hard" line.

### Surface Hierarchy & Nesting
Treat the UI as a physical stack of semi-transparent layers.
1.  **Base Layer:** `surface` (The deep void).
2.  **Section Layer:** `surface-container-low` (Subtle lift for large content areas).
3.  **Active Component Layer:** `surface-container-high` or `surface-container-highest` (Used for cards and interactive units).

### The "Glass & Gradient" Rule
To achieve a signature premium feel, use **Glassmorphism** for all floating UI elements (Modals, Hover Cards, Floating Action Buttons).
- **Formula:** `surface-variant` at 40% opacity + `backdrop-filter: blur(24px)`.
- **Signature Textures:** For main CTAs, do not use flat colors. Use a linear gradient from `primary` (`#4be277`) to `primary-container` (`#22c55e`) at a 135-degree angle. This adds "soul" and a tactile, liquid quality to the buttons.

---

## 3. Typography: The Editorial Edge

We utilize a high-contrast pairing to balance authority with readability.

*   **Headlines (Plus Jakarta Sans):** This is our "Editorial" voice. It is geometric, bold, and modern. Large `display-lg` sizes should be used sparingly to create focal points, using `tight` letter-spacing (-0.02em) to feel cohesive and high-end.
*   **Body (Manrope):** This is our "Functional" voice. Manrope’s open apertures ensure legibility at small sizes. Use `body-md` for standard data and `label-sm` for metadata, ensuring a clear contrast in weight between labels and values.

**Visual Hierarchy:**
Use `headline-lg` for daily nutritional summaries, but drop to `title-sm` for supporting data points. The generous scale difference emphasizes the "AI Assistant's" confidence in its primary findings.

---

## 4. Elevation & Depth: Tonal Layering

### The Layering Principle
Depth is achieved by "stacking" container tiers. A `surface-container-lowest` card placed atop a `surface-container-low` section creates a recessed, "etched" look, while the inverse creates a "lifted" look. Avoid shadows for static elements; reserve them for temporary states.

### Ambient Shadows
When a "floating" effect is required (e.g., a pill-tracking modal):
- **Shadow:** 0px 20px 40px rgba(0, 0, 0, 0.4).
- **Ambient Light:** Use a 1px "Inner Glow" (box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.1)) to catch the "light" on the top edge of the glass.

### The "Ghost Border" Fallback
If accessibility requires a container edge, use the **Ghost Border**:
- **Token:** `outline-variant` at 15% opacity. It should feel like a faint suggestion of a boundary, never a hard cage.

---

## 5. Components

### Buttons
*   **Primary:** Gradient (`primary` to `primary-container`), `xl` (1.5rem) rounded corners. No border. White or `on-primary` text.
*   **Secondary:** Glassmorphism style. `surface-variant` (20% opacity) with a `blur(12px)`.
*   **States:** On hover, increase the `backdrop-filter` blur and slightly increase the opacity—never change the base color drastically.

### Cards & Lists
*   **Zero-Divider Policy:** Forbid 1px dividers between list items. Use vertical white space (16px–24px) or a subtle alternating background shift (`surface-container-low` vs `surface-container-lowest`).
*   **Glass Cards:** Use for health metrics (e.g., "Calories Remaining"). Apply `xl` (1.5rem) corner radius for a friendly, modern feel.

### Input Fields
*   **Styling:** Fields should be `surface-container-highest` with a `Ghost Border`.
*   **Focus State:** The border transitions from 15% opacity to 100% `secondary` (`#7bd0ff`) with a soft outer glow of the same color.

### Custom Component: The "Biometric Glow"
A small, pulsed radial gradient behind key AI insights using the `secondary` color at 5% opacity. This signals to the user where the "intelligence" is currently focused.

---

## 6. Do’s and Don'ts

### Do
*   **Do** use generous white space. If a layout feels "full," increase the padding by 1.5x.
*   **Do** use `display-lg` typography for single, impactful numbers (e.g., your "Health Score").
*   **Do** use `xl` rounded corners (1.5rem) for main containers to maintain the "Modern Startup" softness.

### Don’t
*   **Don’t** use pure black (#000000). It kills the glassmorphism effect and feels "cheap."
*   **Don’t** use 100% opaque borders. They create "visual noise" that contradicts the minimal aesthetic.
*   **Don’t** use standard "drop shadows" on every card. Let the background color shifts do the heavy lifting for hierarchy.
*   **Don’t** crowd the interface. If the AI is providing an insight, give it the entire screen width to allow for editorial-style layout.