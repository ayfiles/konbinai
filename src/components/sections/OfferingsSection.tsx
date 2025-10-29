const OfferingsSection = () => {
  const offerings = [
    {
      title: "AI Campaigns",
      description: "Full campaign visuals built in days.",
    },
    {
      title: "Product Visuals",
      description: "Studio-grade realism and consistency.",
    },
    {
      title: "Motion & Video",
      description: "Short cinematic clips for social storytelling.",
    },
    {
      title: "Creative Direction",
      description: "Defining tone, color, and brand cohesion.",
    },
  ];

  return (
    <section className="bg-charcoal py-24 lg:py-32 px-6 lg:px-12">
      <div className="max-w-[1200px] mx-auto">
        {/* Heading */}
        <div className="text-center mb-12 lg:mb-16 space-y-4">
          <h2 className="font-display font-bold text-white text-[40px] lg:text-[56px] leading-[1.15] tracking-tight">
            Creative Offerings
          </h2>
          <p className="font-body text-white/85 text-[18px] lg:text-[20px] max-w-[800px] mx-auto">
            We build creative systems that look real, move fast, and sell through emotion.
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
              <h3 className="font-display font-bold text-white text-[26px] lg:text-[30px]">
                {offering.title}
              </h3>
              <p className="font-body text-white/85 text-[17px] lg:text-[18px]">
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
