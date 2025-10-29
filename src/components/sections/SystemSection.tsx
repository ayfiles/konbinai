const SystemSection = () => {
  const steps = [
    {
      number: "01",
      title: "Direction",
      description:
        "Define goals, audience, and creative intent.",
    },
    {
      number: "02",
      title: "Design",
      description:
        "Build moodboards and tone references to define your visual DNA.",
    },
    {
      number: "03",
      title: "Creation",
      description:
        "Combine AI and human refinement for realism and precision.",
    },
    {
      number: "04",
      title: "Delivery",
      description:
        "Provide ready-to-launch assets aligned with your brand.",
    },
  ];

  return (
    <section className="bg-white py-24 lg:py-32 px-6 lg:px-12">
      <div className="max-w-[1200px] mx-auto">
        {/* Title */}
        <div className="text-center mb-16 lg:mb-20">
          <h2 className="font-display font-bold text-black text-[40px] lg:text-[56px] leading-[1.15] tracking-tight">
            Our System
          </h2>
          <p className="font-body text-black/70 text-[18px] lg:text-[20px] mt-4 max-w-[600px] mx-auto">
            A streamlined process that transforms creative vision into production-ready visuals.
          </p>
        </div>

        {/* Steps Container */}
        <div className="bg-white rounded-[32px] shadow-[0_4px_60px_rgba(0,0,0,0.05)] p-8 lg:p-16 space-y-16 lg:space-y-20">
          {steps.map((step, index) => (
            <div key={step.number} className="relative flex gap-8 lg:gap-12 items-start">
              {/* Number and Line */}
              <div className="flex flex-col items-center flex-shrink-0">
                <div className="font-display font-bold text-[56px] lg:text-[64px] text-black/20 leading-none">
                  {step.number}
                </div>
                {index < steps.length - 1 && (
                  <div className="w-px h-[100px] lg:h-[120px] bg-black/10 mt-6" />
                )}
              </div>

              {/* Content */}
              <div className="pt-4 space-y-3">
                <h3 className="font-display font-bold text-black text-[26px] lg:text-[30px]">
                  {step.title}
                </h3>
                <p className="font-body text-black/80 text-[17px] lg:text-[20px] max-w-[700px] leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SystemSection;
