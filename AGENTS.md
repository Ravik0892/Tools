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
1. **Design System & Styling**:
   - Maintain consistency across `style.css` and existing semantic design tokens (`--bg-primary`, `--accent`, `--border-color`, etc.).
   - Avoid ad-hoc inline styles when reusable utility or semantic classes exist.
2. **Logic & Computation**:
   - All tool computations in `app.js` and `tools/*.js` run 100% client-side for zero latency and absolute privacy.
   - Attach robust event listeners, validate clipboard inputs, and handle edge cases gracefully.

---

## 🔍 3. Verification & Testing Protocol
- Follow the workspace's manual verification guidelines: provide clear, numbered step-by-step checklists and browser console diagnostics so the user can verify changes seamlessly in their live environment.

