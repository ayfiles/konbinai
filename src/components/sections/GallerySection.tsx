import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { X } from "lucide-react";
import salomon1 from "@/assets/salomon-1.png";
import salomon2 from "@/assets/salomon-2.png";
import salomon3 from "@/assets/salomon-3.png";
import salomon4 from "@/assets/salomon-4.png";
import salomon5 from "@/assets/salomon-5.png";
import salomon6 from "@/assets/salomon-6.png";
import soi1 from "@/assets/soi-1.png";
import soi2 from "@/assets/soi-2.png";
import soi3 from "@/assets/soi-3.png";
import soi4 from "@/assets/soi-4.png";
import soi5 from "@/assets/soi-5.png";
import kith1 from "@/assets/kith-1.png";
import kith2 from "@/assets/kith-2.png";
import kith3 from "@/assets/kith-3.png";
import kith4 from "@/assets/kith-4.png";
import riot1 from "@/assets/riot-1.png";
import riot2 from "@/assets/riot-2.png";
import riot3 from "@/assets/riot-3.png";
import riot4 from "@/assets/riot-4.png";
import riot5 from "@/assets/riot-5.png";
import northface1 from "@/assets/northface-1.png";
import northface2 from "@/assets/northface-2.png";
import northface3 from "@/assets/northface-3.png";
import chanel1 from "@/assets/chanel-1.png";
import chanel2 from "@/assets/chanel-2.png";
import chanel3 from "@/assets/chanel-3.png";
import { useLanguage } from '@/context/LanguageContext';
import { texts } from '@/lib/texts';

const GallerySection = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const { currentLang } = useLanguage();

  // List of projects
  const projects = [
    {
      name: "Salomon",
      thumbnail: salomon1,
      images: [salomon1, salomon2, salomon3, salomon4, salomon5, salomon6],
    },
    {
      name: "Kith",
      thumbnail: kith1,
      images: [kith1, kith2, kith3, kith4],
    },
    {
      name: "The North Face",
      thumbnail: northface1,
      images: [northface1, northface2, northface3],
    },
    {
      name: "Riot Hill",
      thumbnail: riot1,
      images: [riot1, riot2, riot3, riot4, riot5],
    },
    {
      name: "SOI Studios",
      thumbnail: soi1,
      images: [soi1, soi2, soi3, soi4, soi5],
    },
    {
      name: "Chanel Perfume",
      thumbnail: chanel1,
      images: [chanel1, chanel2, chanel3],
    },
  ];

  // Build projectRows
  const projectRows: typeof projects[][] = [];
  for (let i = 0; i < projects.length; i += 3) {
    projectRows.push(projects.slice(i, i + 3));
  }

  // Row-based reveal on scroll
  useEffect(() => {
    const rows = Array.from(document.querySelectorAll<HTMLElement>(".js-row-reveal"));
    if (!rows.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            el.classList.add("animate-fade-up", "opacity-100", "translate-y-0");
            el.classList.remove("opacity-0", "translate-y-4");
            observer.unobserve(el);
          }
        });
      },
      {rootMargin: "0px 0px -10% 0px", threshold: 0.15}
    );
    rows.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const openLightbox = (projectName: string) => {
    setSelectedProject(projectName);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setSelectedProject(null);
    document.body.style.overflow = "auto";
  };

  const selectedImages =
    projects.find((p) => p.name === selectedProject)?.images || [];

  return (
    <>
      <section id="campaign-gallery" className="relative -mt-16 lg:-mt-24 bg-black py-24 lg:py-32 px-6 lg:px-12">
        {/* Top gradient to smooth transition from hero into gallery */}
        <div className="pointer-events-none absolute -top-10 left-0 right-0 h-10 lg:-top-16 lg:h-16 bg-gradient-to-b from-transparent to-black" />
        <div className="max-w-[1400px] mx-auto">
          {/* Title */}
          <div className="text-center mb-16 lg:mb-20">
            <h2
              className="font-bold text-white text-[40px] lg:text-[56px] leading-[1.15] tracking-tight"
              style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
            >
              {texts[currentLang].gallery_title}
            </h2>
            <p className="font-body text-white/70 text-[18px] lg:text-[20px] mt-4 max-w-[600px] mx-auto">
              {texts[currentLang].gallery_subtitle}
            </p>
          </div>

          {/* Carousel for desktop/ipad */}
          {projects.length > 0 && (
            <div className="hidden md:block group w-full relative overflow-x-hidden select-none pb-8">
              <div className="flex w-max gap-8 animate-infinite-carousel group-hover:[animation-play-state:paused]">
                {[...projects, ...projects].map((project, idx) => (
                  <button
                    key={project.name + '-' + idx}
                    onClick={() => openLightbox(project.name)}
                    className="relative aspect-[4/5] rounded-[24px] overflow-hidden cursor-pointer"
                    style={{ width: '280px', minWidth: '280px', maxWidth: '320px' }}
                  >
                    <img
                      src={project.thumbnail}
                      alt={project.name}
                      className="w-full h-full object-cover duration-700 transition-transform group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                    <div className="absolute bottom-6 left-6">
                      <p className="font-body font-medium text-white text-[15px] tracking-wide">
                        {project.name}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Mobile: swipe carousel */}
          <MobileProjectsCarousel projects={projects} onOpen={openLightbox} />
        </div>
      </section>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4 md:p-8 animate-fade-in" onClick={closeLightbox}>
          <div className="relative w-full max-w-[980px] md:max-w-[860px] lg:max-w-[980px] max-h-[80vh] rounded-3xl bg-white/12 border border-white/20 backdrop-blur-frosted shadow-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white hover:text-white/80 z-10"
              aria-label="Close lightbox"
            >
              <X size={28} />
            </button>
            <div className="p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Info Card (1/3) */}
                <div className="md:col-span-1">
                  <div className="rounded-2xl bg-white/10 border border-white/20 backdrop-blur-frosted shadow-xl p-5 md:p-6 max-h-[80vh] overflow-y-auto hide-scrollbar">
                    <h3 className="text-white font-bold text-xl md:text-2xl" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
                      {selectedProject || 'Project Title'}
                    </h3>
                    <div className="text-white/70 text-sm mt-2">
                      {/* Date + timeframe from translations if available */}
                      <p>
                        {(selectedProject && texts[currentLang].project_info[selectedProject]?.date) || 'Januar 2024'}
                      </p>
                      <p className="mt-1">{currentLang === 'DE' ? 'Zeitraum: 2 Wochen' : 'Timeframe: 2 weeks'}</p>
                    </div>
                    <p className="text-white/85 text-sm md:text-base leading-relaxed mt-4">
                      {(selectedProject && texts[currentLang].project_info[selectedProject]?.description) ||
                        (currentLang === 'DE'
                          ? 'Beispielbeschreibung: Konzeption, Produktion und Postproduktion für eine visuelle Kampagne. Fokus auf Markenästhetik und Emotion.'
                          : 'Sample description: Concept, production, and post-production for a visual campaign. Focused on brand aesthetics and emotion.')}
                    </p>
                  </div>
                </div>

                {/* Images Card (2/3) */}
                <div className="md:col-span-2">
                  <div className="max-h-[80vh] overflow-y-auto hide-scrollbar">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedImages.map((img, index) => (
                        <div key={index} className="rounded-[18px] overflow-hidden">
                          <img
                            src={img}
                            alt={`${selectedProject} - Image ${index + 1}`}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

type MobileProjectsCarouselProps = {
  projects: { name: string; thumbnail: string }[];
  onOpen: (name: string) => void;
};

const MobileProjectsCarousel = ({ projects, onOpen }: MobileProjectsCarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    dragFree: true,
    containScroll: 'trimSnaps',
  } as any);

  // Simple autoplay: advance every few seconds, pause on interaction
  useEffect(() => {
    if (!emblaApi) return;
    let timer: number | undefined;
    let paused = false;

    const play = () => {
      if (paused) return;
      stop();
      timer = window.setInterval(() => {
        if (!emblaApi) return;
        if (emblaApi.canScrollNext()) emblaApi.scrollNext();
        else emblaApi.scrollTo(0);
      }, 2800); // slow auto-advance
    };

    const stop = () => {
      if (timer !== undefined) {
        clearInterval(timer);
        timer = undefined;
      }
    };

    const pause = () => {
      paused = true;
      stop();
    };

    const resume = () => {
      paused = false;
      play();
    };

    play();
    emblaApi.on('pointerDown', pause);
    emblaApi.on('pointerUp', () => setTimeout(resume, 1000));
    emblaApi.on('reInit', play);

    return () => {
      stop();
    };
  }, [emblaApi]);

  return (
    <div className="block md:hidden">
      <div
        className="overflow-hidden"
        ref={emblaRef}
        onMouseEnter={() => {/* desktop hover pause noop on mobile */}}
      >
        <div className="flex gap-4 pl-1">
          {projects.map((project) => (
            <button
              key={project.name}
              onClick={() => onOpen(project.name)}
              className="relative aspect-[4/5] rounded-[24px] overflow-hidden flex-[0_0_86%] sm:flex-[0_0_70%]"
              onTouchStart={(e) => { /* pause handled via embla pointerDown */ }}
              onTouchEnd={(e) => { /* resume handled via embla pointerUp */ }}
            >
              <img
                src={project.thumbnail}
                alt={project.name}
                className="w-full h-full object-cover transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-5 left-5">
                <p className="font-body font-medium text-white text-[13px] tracking-wide">
                  {project.name}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GallerySection;
