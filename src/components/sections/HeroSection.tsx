import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-image.png";
import heroImageMobile from "@/assets/hero-image-mobile.png";

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const scrollToGallery = () => {
    const gallery = document.getElementById("campaign-gallery");
    if (gallery) {
      gallery.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* Hero Image Background */}
      <div className="absolute inset-0">
        {/* Mobile Image */}
        <img
          src={heroImageMobile}
          alt="Cinematic studio backdrop"
          className="lg:hidden w-full h-full object-cover opacity-70 transition-transform duration-[20s] ease-out hover:scale-105"
        />
        {/* Desktop Image */}
        <img
          src={heroImage}
          alt="Cinematic studio backdrop"
          className="hidden lg:block w-full h-full object-cover opacity-70 transition-transform duration-[20s] ease-out hover:scale-105"
        />
        {/* Gradient Overlay for Navbar */}
        <div className="absolute top-0 left-0 right-0 h-[120px] bg-gradient-to-b from-black/60 to-transparent" />
        {/* Bottom Gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-[200px] bg-gradient-to-t from-black/80 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end px-6 lg:px-12 pb-20 lg:pb-24 max-w-[1400px] mx-auto">
        <div
          className={`space-y-6 lg:space-y-8 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Title */}
          <div className="space-y-3">
            <h1 className="font-display font-bold text-white text-[42px] sm:text-[56px] lg:text-[80px] leading-[1.1] tracking-tight">
              VISIONBOI Studios.
            </h1>
            <p className="font-body text-white/90 text-[18px] lg:text-[22px] max-w-[600px]">
              Your brand's creative lab powered by AI.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              size="lg"
              className="rounded-pill bg-white text-black hover:bg-white/90 font-label text-[15px] px-10 py-6"
            >
              Start Your Project
            </Button>
            <Button
              onClick={scrollToGallery}
              size="lg"
              variant="outline"
              className="rounded-pill bg-white text-black hover:bg-white/90 border-white font-label text-[15px] px-10 py-6"
            >
              View Work
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
