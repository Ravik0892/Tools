# UI/UX & Engineering Intelligence Guide

This workspace is empowered with advanced UI/UX intelligence, real-world design reference tools, and client-side architecture standards for OmniTool Hub v2.

---

## 🎨 1. Real-World UI/UX Inspiration & Design Intelligence
Whenever designing, refactoring, or expanding tools and interfaces:
1. **Real Human-Made Design References**:
   - Leverage `awwwards-mcp` to search award-winning web applications, SaaS tools, and developer utilities.
   - Extract **Design DNA**: color palettes, contrast ratios, typographic scales, visual rhythm (4px/8px grid), and subtle card border treatments (`rgba(255, 255, 255, 0.08)` on dark surfaces).
2. **Modern Aesthetics**:
   - Deep modern dark themes, glassmorphism, accent glows, crisp borders, and clean typography.
   - Micro-interactions: distinct hover states, tactile button presses, smooth transitions (`150ms-250ms ease-out`), accessible focus rings (`focus-visible:ring-2`), and empty/loading states.
3. **Generative UI & Visual Previews**:
   - When proposing or testing new UI components or interactive tools, utilize Antigravity's **Generative UI** capabilities to preview rich interactive HTML/CSS widgets directly.

---

## ⚙️ 2. Separation of Concerns & Clean Architecture
1. **Canonical Tool Layout Standard**:
   - Every tool interface must conform to the **CSS Studio Suite** dual-panel split-view blueprint documented in [`LAYOUT_STANDARDS.md`](file:///f:/Tools%20website/LAYOUT_STANDARDS.md).
   - Use `.tool-content-layout.split-view` with two `.tool-panel`s (Left: Config/Inputs, Right: Preview/Output) and `.tool-guide-card` at the bottom.
   - Do NOT use hardcoded fixed large heights (>= 350px) that cause double scrollbars.
2. **Design System & Styling**:
   - Maintain consistency across `style.css` and existing semantic design tokens (`--bg-primary`, `--accent`, `--border-color`, etc.).
   - Avoid ad-hoc inline styles when reusable utility or semantic classes exist.
3. **Logic & Computation**:
   - All tool computations in `app.js` and `tools/*.js` run 100% client-side for zero latency and absolute privacy.
   - Attach robust event listeners, validate clipboard inputs, and handle edge cases gracefully.

---

## 🔍 3. Verification & Testing Protocol
- Follow the workspace's manual verification guidelines: provide clear, numbered step-by-step checklists and browser console diagnostics so the user can verify changes seamlessly in their live environment.

---

## 🛡️ 4. Responsive Viewport Discipline & Zero-Overflow Protocol
Every interface, header, navbar, tool layout, card grid, and modal MUST strictly conform to the **Zero Horizontal Overflow Standard** across ALL viewport resolutions and window scalings (from 320px mobile to 1024px tablet, 1280px/1366px laptops, and 1920px+ desktops):

1. **Absolute Viewport Containment (`max-width: 100vw; overflow-x: clip;`)**:
   - Never allow any element, header, navbar, or control to protrude outside the viewport bounds (`100vw`) or trigger horizontal scrollbars.
   - Enforce `overflow-x: clip; max-width: 100vw; width: 100%;` on root containers (`html`, `body`, `.app-container`, `.main-wrapper`).
2. **Progressive Responsive Header Cascade**:
   - Headers with multiple functional zones (e.g., Left Brand/Mode Switcher, Center Navigation, Right Controls/Search) must progressively and gracefully collapse secondary elements as screen width narrows:
     - **Wide Desktops (>= 1380px)**: Full display (Logo, Live Clock, Everyday/Developer Switcher, Full Desktop Nav Menu with text labels, Search Pill with Ctrl+K, Control Capsule).
     - **Standard Laptops & Scaled Screens (1180px - 1379px)**:
       - Hide the clock widget (`display: none !important;`).
       - Hide the search keyboard badge ("Ctrl K").
       - Tighten navmenu item padding and font size.
       - Reduce header padding (`padding: 0 16px;`).
     - **Compact Laptops & Small Displays (1024px - 1179px)**:
       - Collapse search pill into a compact icon-only circular button.
       - Hide secondary desktop nav links (Tour) and sparkle badges.
       - Tighten experience mode switcher pill padding.
       - Reduce header padding (`padding: 0 12px;`).
     - **Mobile & Tablet Drawer (< 1024px)**:
       - Completely hide desktop floating nav capsule (`.desktop-nav-menu { display: none !important; }`).
       - Activate mobile drawer trigger (`#sidebar-open-btn { display: flex !important; }`).
       - Ensure all navigation is housed in the slide-out drawer (`.sidebar`).
3. **No Multi-Flex-Shrink-0 Collisions**:
   - Never place multiple wide sibling elements with `flex-shrink: 0` in the same horizontal flex row without responsive media queries that ensure their combined width never exceeds `100%` of the viewport width.
   - Never use `position: absolute; left: 50%; transform: translateX(-50%);` for centered elements if sibling elements on the left or right have variable widths that can collide on 1200px–1440px displays. Use centered flex items with `margin: 0 auto; min-width: 0;` and elastic shrink capabilities (`flex-shrink: 1`).
4. **Testing Obligation Across Viewports**:
   - Any AI editing layout or header styling must test and verify that:
     1. On 1024px (compact desktop): Header width <= 1024px with zero overflow.
     2. On 1280px / 1366px (standard laptop): Header width <= 1280px with comfortable spacing.
     3. On 1920px (full desktop): Full luxury layout with zero gaps or overlap.
     4. On mobile (< 1024px): Desktop nav is cleanly hidden, mobile drawer works seamlessly.

