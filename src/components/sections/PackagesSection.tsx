import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const PackagesSection = () => {
  const navigate = useNavigate();

  const imagePackages = [
    { name: "Starter", count: "3 images", price: "from $350 AUD" },
    { name: "Launch", count: "6 images", price: "from $600 AUD" },
    { name: "Campaign", count: "10+ images", price: "from $900 AUD" },
  ];

  const motionPackages = [
    { name: "Loop", count: "1 video", price: "from $150 AUD" },
    { name: "Pack", count: "3 videos", price: "from $400 AUD" },
    { name: "Pack", count: "6 videos", price: "from $750 AUD" },
  ];

  return (
    <section className="bg-white py-24 lg:py-32 px-6 lg:px-12">
      <div className="max-w-[1200px] mx-auto space-y-20">
        {/* Image Packages */}
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="font-display font-bold text-black text-[40px] lg:text-[56px] leading-[1.15] tracking-tight mb-3">
              Image Packages
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {imagePackages.map((pkg, index) => (
              <div
                key={`img-${index}`}
                className="border border-divider rounded-[24px] p-8 lg:p-10 space-y-4 animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <h3 className="font-display font-bold text-black text-[28px] lg:text-[32px]">
                  {pkg.name}
                </h3>
                <p className="font-body text-black/70 text-[16px] lg:text-[18px]">
                  {pkg.count}
                </p>
                <p className="font-body font-semibold text-black text-[18px] lg:text-[20px]">
                  {pkg.price}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Motion Packages */}
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="font-display font-bold text-black text-[40px] lg:text-[56px] leading-[1.15] tracking-tight mb-3">
              Motion Packages
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {motionPackages.map((pkg, index) => (
              <div
                key={`motion-${index}`}
                className="border border-divider rounded-[24px] p-8 lg:p-10 space-y-4 animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <h3 className="font-display font-bold text-black text-[28px] lg:text-[32px]">
                  {pkg.name}
                </h3>
                <p className="font-body text-black/70 text-[16px] lg:text-[18px]">
                  {pkg.count}
                </p>
                <p className="font-body font-semibold text-black text-[18px] lg:text-[20px]">
                  {pkg.price}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bundle Note */}
        <div className="text-center pt-8">
          <p className="font-body text-black/70 text-[16px] lg:text-[18px] mb-6">
            Need both images and motion? We build custom bundles.
          </p>
          <Button
            onClick={() => navigate("/project-inquiry")}
            size="lg"
            className="rounded-pill bg-white/20 border border-white/30 ring-1 ring-white/40 shadow-xl backdrop-blur-frosted text-white font-label text-[15px] px-10 transition-all duration-300 hover:bg-white/10 hover:ring-white/60"
          >
            Enquire About Bundles
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PackagesSection;
