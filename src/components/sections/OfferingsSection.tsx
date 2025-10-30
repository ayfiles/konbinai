import { useLanguage } from '@/context/LanguageContext';
import { texts } from '@/lib/texts';

const OfferingsSection = () => {
  const { currentLang } = useLanguage();
  const offerings = [
    {
      title: texts[currentLang].service_ai_title,
      description: texts[currentLang].service_ai_desc,
    },
    {
      title: texts[currentLang].service_product_title,
      description: texts[currentLang].service_product_desc,
    },
    {
      title: texts[currentLang].service_motion_title,
      description: texts[currentLang].service_motion_desc,
    },
    {
      title: texts[currentLang].service_direction_title,
      description: texts[currentLang].service_direction_desc,
    },
  ];

  return (
    <section className="relative bg-charcoal py-24 lg:py-32 px-6 lg:px-12">
      {/* Smooth top gradient from previous black section into charcoal */}
      <div className="pointer-events-none absolute -top-16 left-0 right-0 h-16 bg-gradient-to-b from-black to-charcoal" />
      <div className="max-w-[1200px] mx-auto">
        {/* Heading */}
        <div className="text-center mb-12 lg:mb-16 space-y-4">
          <h2
            className="font-bold text-white text-[40px] lg:text-[56px] leading-[1.15] tracking-tight"
            style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
          >
            {texts[currentLang].services_title}
          </h2>
          <p className="font-body text-white/85 text-[18px] lg:text-[20px] max-w-[800px] mx-auto">
            {texts[currentLang].services_subtitle}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {offerings.map((offering, index) => (
            <div
              key={offering.title}
              className="bg-black/40 rounded-[28px] p-8 lg:p-12 space-y-3 animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <h3 className="font-display font-bold text-white text-[22px] lg:text-[24px] whitespace-nowrap truncate">
                <span className="inline-block align-middle" style={{ fontFamily: "Helvetica, Arial, sans-serif" }}>{offering.title}</span>
                <span className="inline-block align-middle ml-2 translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">→</span>
              </h3>
              <p className="font-body text-white/85 text-[15px] lg:text-[16px] leading-relaxed">
                {offering.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OfferingsSection;
