import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

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
              className="font-body font-medium text-[16px] lg:text-[18px] text-white/90 lowercase tracking-wide hover:text-white transition-colors"
            >
              visions made possible.
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              <button
                onClick={scrollToGallery}
                className="font-body text-[15px] lg:text-[16px] text-white tracking-[0.02em] hover:text-white/80 transition-colors"
              >
                Content Creation
              </button>
              <Button
                onClick={() => navigate("/project-inquiry")}
                variant="default"
                size="lg"
                className="rounded-pill bg-white text-black hover:bg-white/90 font-label text-[15px] px-8"
              >
                Contact Us
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-white p-2"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
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
              Contact Us
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
