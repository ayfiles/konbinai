import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-image.png";
import heroImageMobile from "@/assets/hero-image-mobile.png";
import heroVideoMobile from "@/assets/hero-video.webm";
import logoFont from "@/assets/konbinai logo font.png";
import { useLanguage } from '@/context/LanguageContext';
import { texts } from '@/lib/texts';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { currentLang } = useLanguage();

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
        {/* Mobile Video statt Bild */}
        <video
          autoPlay
          loop
          muted
          playsInline
          poster={heroImageMobile}
          className="lg:hidden w-full h-full object-cover opacity-70"
        >
          <source src={heroVideoMobile} type="video/webm" />
          Your browser does not support the video tag.
        </video>
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
            <div className="relative">
              <img
                src={logoFont}
                alt="VISIONBOI Studios"
                className="h-[42px] sm:h-[56px] lg:h-[80px] w-auto object-contain"
              />
            </div>
            <p className="font-body text-white/90 text-[18px] lg:text-[22px] max-w-[600px]">
              {texts[currentLang].hero_subtitle}
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
              className="rounded-pill bg-white/20 border border-white/30 ring-1 ring-white/40 shadow-xl backdrop-blur-frosted text-white font-label text-[15px] px-10 py-6 transition-all duration-300 hover:bg-white/10 hover:ring-white/60"
            >
              {texts[currentLang].hero_cta}
            </Button>
            <Button
              onClick={scrollToGallery}
              size="lg"
              className="rounded-pill bg-white/20 border border-white/30 ring-1 ring-white/40 shadow-xl backdrop-blur-frosted text-white font-label text-[15px] px-10 py-6 transition-all duration-300 hover:bg-white/10 hover:ring-white/60"
            >
              {texts[currentLang].portfolio}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
