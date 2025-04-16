"use client";
import { useEffect, useState } from "react";

/**
 * Show a scroll to top button at bottom right when the user scrolls down the page.
 */
export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 60);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    // Check on mount in case already scrolled
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (!visible) return null;

  return (
    <button
      className="fixed bottom-6 right-6 z-50 rounded-full shadow-lg bg-white border border-gray-300 w-10 h-10 flex items-center justify-center text-2xl transition hover:bg-gray-100 cursor-pointer opacity-70 hover:opacity-100"
      onClick={scrollToTop}
      title="Scroll to top"
      aria-label="Scroll to top"
    >
      ↑
    </button>
  );
}
