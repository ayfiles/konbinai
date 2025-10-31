import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from '@/context/LanguageContext';
import { texts } from '@/lib/texts';
import konbinaiLogo from '@/assets/konbinai logo.svg';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { currentLang, setCurrentLang } = useLanguage();

  // Glassmorphism Language Switch: show only current language (EN or DE)
  const langSwitchBtn = (
    <button
      aria-label="Switch language"
      type="button"
      className="rounded-pill bg-white/20 border border-white/30 ring-1 ring-white/40 shadow-xl backdrop-blur-frosted text-white font-label text-[15px] px-8 py-2 whitespace-nowrap transition-all duration-300 hover:bg-white/10 hover:ring-white/60"
      onClick={() => setCurrentLang(currentLang === 'EN' ? 'DE' : 'EN')}
    >
      {currentLang}
    </button>
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToGallery = (e: React.MouseEvent) => {
    e.preventDefault();
    const gallery = document.getElementById("campaign-gallery");
    if (gallery) {
      gallery.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-white/[0.06] backdrop-blur-frosted border-b border-white/[0.12] shadow-[0_8px_30px_rgba(0,0,0,0.25)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-16 lg:h-[72px]">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center hover:opacity-80 transition-opacity"
            >
              <img
                src={konbinaiLogo}
                alt="konbinai logo"
                className="h-[30px] lg:h-[36px] w-auto"
                draggable={false}
              />
            </Link>
            <div className="flex items-center gap-2 md:gap-4 h-16 md:h-auto">
              {langSwitchBtn}
              <Button
                onClick={() => navigate("/project-inquiry")}
                variant="default"
                size="lg"
                className="rounded-pill bg-white/20 border border-white/30 ring-1 ring-white/40 shadow-xl backdrop-blur-frosted text-white font-label text-[15px] px-8 transition-all duration-300 hover:bg-white/10 hover:ring-white/60"
              >
                {texts[currentLang].contact_us}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden bg-black/95 backdrop-blur-frosted animate-fade-in">
          <div className="flex flex-col items-center justify-center h-full gap-8 px-6">
            <button
              onClick={scrollToGallery}
              className="font-body text-[20px] text-white tracking-[0.02em] hover:text-white/80 transition-colors"
            >
              Content Creation
            </button>
            <Button
              onClick={() => {
                navigate("/project-inquiry");
                setIsMobileMenuOpen(false);
              }}
              variant="default"
              size="lg"
              className="rounded-pill bg-white text-black hover:bg-white/90 font-label text-[16px] px-12 w-full max-w-xs"
            >
              {texts[currentLang].contact_us}
            </Button>
            <div className="mt-4 flex justify-center w-full">{langSwitchBtn}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
