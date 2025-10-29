import Navbar from "@/components/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import ValueSection from "@/components/sections/ValueSection";
import ImageBanner from "@/components/sections/ImageBanner";
import SystemSection from "@/components/sections/SystemSection";
import GallerySection from "@/components/sections/GallerySection";
import OfferingsSection from "@/components/sections/OfferingsSection";
import PackagesSection from "@/components/sections/PackagesSection";
import RetainersSection from "@/components/sections/RetainersSection";
import ContactSection from "@/components/sections/ContactSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <HeroSection />
      <ValueSection />
      <ImageBanner />
      <SystemSection />
      <GallerySection />
      <OfferingsSection />
      <PackagesSection />
      <RetainersSection />
      <ContactSection />
    </div>
  );
};

export default Index;
