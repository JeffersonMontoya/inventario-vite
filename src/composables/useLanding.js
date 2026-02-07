import { ref, onMounted, onUnmounted } from "vue";
import gsap from "gsap";

export function useLanding() {
  const scrolled = ref(false);

  const handleScroll = () => {
    scrolled.value = window.scrollY > 50;
  };

  const initAnimations = () => {
    const tl = gsap.timeline();

    tl.from(".gsap-hero-text > *", {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      ease: "power3.out",
    }).from(
      ".gsap-hero-image",
      {
        x: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      },
      "-=0.8",
    );
  };

  onMounted(() => {
    window.addEventListener("scroll", handleScroll);
    initAnimations();
  });

  onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll);
  });

  return {
    scrolled,
  };
}
