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
    <section className="relative bg-charcoal py-24 lg:py-32 px-6 lg:px-12">
      {/* Smooth top gradient into charcoal */}
      <div className="pointer-events-none absolute -top-10 left-0 right-0 h-10 lg:-top-16 lg:h-16 bg-gradient-to-b from-transparent to-charcoal" />
      <div className="max-w-[1200px] mx-auto">
        {/* Heading */}
        <div className="text-center mb-12 lg:mb-16 space-y-4">
          <h2
            className="font-bold text-white text-[40px] lg:text-[56px] leading-[1.15] tracking-tight"
            style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
          >
            Creative Services
          </h2>
          <p className="font-body text-white/85 text-[18px] lg:text-[20px] max-w-[800px] mx-auto">
            We build creative systems that look real, move fast, and sell through emotion.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {offerings.map((offering, index) => (
            <div
              key={offering.title}
              className="group relative overflow-hidden rounded-[24px] p-8 lg:p-10 bg-black/40 border border-white/10 backdrop-blur-sm animate-fade-up transition-all duration-300 hover:-translate-y-1 hover:bg-black/50 hover:shadow-[0_12px_40px_rgba(0,0,0,0.35)]"
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              {/* Glow on hover */}
              <div className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: "radial-gradient(600px circle at var(--x,50%) var(--y,50%), rgba(255,255,255,0.06), transparent 40%)" }} />

              {/* Content */}
              <div className="relative space-y-3">
                <h3 className="font-display font-bold text-white text-[22px] lg:text-[24px] whitespace-nowrap truncate">
                  <span className="inline-block align-middle" style={{ fontFamily: "Helvetica, Arial, sans-serif" }}>{offering.title}</span>
                  <span className="inline-block align-middle ml-2 translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">→</span>
                </h3>
                <p className="font-body text-white/85 text-[15px] lg:text-[16px] leading-relaxed">
                  {offering.description}
                </p>
              </div>

              {/* Micro floating dot */}
              <span className="absolute right-4 top-4 h-1.5 w-1.5 rounded-full bg-white/60 transform transition-transform duration-500 group-hover:translate-y-1.5" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OfferingsSection;
