import Navbar from "@/components/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import GallerySection from "@/components/sections/GallerySection";
import OfferingsSection from "@/components/sections/OfferingsSection";
import ContactSection from "@/components/sections/ContactSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <HeroSection />
      <GallerySection />
      <OfferingsSection />
      <ContactSection />
    </div>
  );
};

export default Index;
