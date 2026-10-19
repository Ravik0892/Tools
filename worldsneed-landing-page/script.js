/**
 * WorldsNeed — Official Landing Page JavaScript
 * Interactive Navigation, Canvas Constellation Background, Filtering & 3D Card Spotlight
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Mobile Menu Drawer Navigation
  const toggleBtn = document.getElementById("mobile-toggle");
  const navMenu = document.getElementById("nav-menu");

  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("open");
      toggleBtn.setAttribute("aria-expanded", String(isOpen));
    });

    // Close menu when clicking any nav item
    navMenu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("open");
        toggleBtn.setAttribute("aria-expanded", "false");
      });
    });

    // Close on Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && navMenu.classList.contains("open")) {
        navMenu.classList.remove("open");
        toggleBtn.setAttribute("aria-expanded", "false");
      }
    });
  }

  // 2. Sticky Header Backdrop on Scroll
  const header = document.getElementById("header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 30) {
      header?.classList.add("scrolled");
    } else {
      header?.classList.remove("scrolled");
    }
  }, { passive: true });

  // 3. Dynamic Project Category Filtering
  const filterTabs = document.querySelectorAll(".filter-tab");
  const projectCards = document.querySelectorAll(".project-card");

  filterTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      filterTabs.forEach(t => {
        t.classList.remove("active");
        t.setAttribute("aria-selected", "false");
      });
      tab.classList.add("active");
      tab.setAttribute("aria-selected", "true");

      const filterValue = tab.getAttribute("data-filter");

      projectCards.forEach(card => {
        const category = card.getAttribute("data-category");

        if (filterValue === "all" || category === filterValue) {
          card.style.display = "flex";
          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
          }, 10);
        } else {
          card.style.opacity = "0";
          card.style.transform = "translateY(12px)";
          setTimeout(() => {
            card.style.display = "none";
          }, 240);
        }
      });
    });
  });

  // 4. Mouse Interactive Spotlight & Tilt on Project Cards
  const cards = document.querySelectorAll(".project-card");
  cards.forEach(card => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const glow = card.querySelector(".card-glow-layer");
      if (glow) {
        glow.style.background = `radial-gradient(circle 220px at ${x}px ${y}px, rgba(0, 242, 254, 0.12), transparent 80%)`;
      }
    });

    card.addEventListener("mouseleave", () => {
      const glow = card.querySelector(".card-glow-layer");
      if (glow) {
        glow.style.background = "none";
      }
    });
  });

  // 5. Hero Satellite Node Gentle 3D Mouse Parallax
  const heroVisual = document.querySelector(".hero-visual");
  const nodes = document.querySelectorAll(".satellite-node");

  if (heroVisual && nodes.length > 0) {
    heroVisual.addEventListener("mousemove", (e) => {
      const rect = heroVisual.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (e.clientX - centerX) / 25;
      const deltaY = (e.clientY - centerY) / 25;

      nodes.forEach((node, i) => {
        const factor = (i + 1) * 0.4;
        node.style.transform = `translate(${deltaX * factor}px, ${deltaY * factor}px)`;
      });
    });

    heroVisual.addEventListener("mouseleave", () => {
      nodes.forEach(node => {
        node.style.transform = "translate(0, 0)";
      });
    });
  }

  // 6. Interactive Constellation Canvas Ambient Effect
  const canvas = document.getElementById("ambient-canvas");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener("resize", () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const count = Math.min(Math.floor((width * height) / 25000), 55);

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: Math.random() * 1.5 + 0.6,
        alpha: Math.random() * 0.5 + 0.2
      });
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(140, 195, 255, ${p.alpha})`;
        ctx.fill();

        // Connect nearby points
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(0, 242, 254, ${0.08 * (1 - dist / 130)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animate);
    }

    animate();
  }

  // 7. Auto Current Year in Footer
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});
