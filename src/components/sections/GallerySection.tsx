import { useState } from "react";
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

const GallerySection = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const projects = [
    {
      name: "Salomon",
      thumbnail: salomon1,
      images: [
        salomon1,
        salomon2,
        salomon3,
        salomon4,
        salomon5,
        salomon6,
      ],
    },
    {
      name: "Kith",
      thumbnail: kith1,
      images: [
        kith1,
        kith2,
        kith3,
        kith4,
      ],
    },
    {
      name: "The North Face",
      thumbnail: northface1,
      images: [
        northface1,
        northface2,
        northface3,
      ],
    },
    {
      name: "Riot Hill",
      thumbnail: riot1,
      images: [
        riot1,
        riot2,
        riot3,
        riot4,
        riot5,
      ],
    },
    {
      name: "SOI Studios",
      thumbnail: soi1,
      images: [
        soi1,
        soi2,
        soi3,
        soi4,
        soi5,
      ],
    },
    {
      name: "Chanel Perfume",
      thumbnail: chanel1,
      images: [
        chanel1,
        chanel2,
        chanel3,
      ],
    },
  ];

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
      <section id="campaign-gallery" className="bg-black py-24 lg:py-32 px-6 lg:px-12">
        <div className="max-w-[1400px] mx-auto">
          {/* Title */}
          <div className="text-center mb-16 lg:mb-20">
            <h2 className="font-display font-bold text-white text-[40px] lg:text-[56px] leading-[1.15] tracking-tight">
              Campaign Gallery
            </h2>
            <p className="font-body text-white/70 text-[18px] lg:text-[20px] mt-4 max-w-[600px] mx-auto">
              Cinematic visuals designed to stop the scroll and drive action.
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {projects.map((project, index) => (
              <button
                key={project.name}
                onClick={() => openLightbox(project.name)}
                className="group relative aspect-[4/5] rounded-[24px] overflow-hidden animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <img
                  src={project.thumbnail}
                  alt={project.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <p className="font-body font-medium text-white text-[13px] lg:text-[14px] tracking-wide">
                    {project.name}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 lg:p-8 animate-fade-in">
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-white hover:text-white/80 z-10"
            aria-label="Close lightbox"
          >
            <X size={32} />
          </button>

          <div className="max-w-[1200px] w-full grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto max-h-[90vh] py-8">
            {selectedImages.map((img, index) => (
              <div key={index} className="rounded-[20px] overflow-hidden">
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
      )}
    </>
  );
};

export default GallerySection;
