import { useI18n } from "@/lib/i18n";
import { motion } from "framer-motion";
import boyImage from "@assets/generated_images/male_pop_idol_portrait.png";
import girlImage from "@assets/generated_images/female_pop_idol_portrait.png";

const photos = [
  { src: boyImage, alt: "Idol Boy", span: "col-span-1 md:col-span-2" },
  { src: girlImage, alt: "Idol Girl", span: "col-span-1" },
  { src: boyImage, alt: "Stage Performance", span: "col-span-1" }, // Reusing for demo
  { src: girlImage, alt: "Backstage", span: "col-span-1 md:col-span-2" }, // Reusing for demo
];

export function Gallery() {
  const { t } = useI18n();

  return (
    <section id="photos" className="py-24 bg-secondary/20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">{t('gallery.title')}</h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 auto-rows-[300px] md:auto-rows-[400px]">
          {photos.map((photo, index) => (
            <motion.div
              key={index}
              className={`relative overflow-hidden rounded-3xl group ${photo.span}`}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <img 
                src={photo.src} 
                alt={photo.alt} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                <p className="text-white text-lg font-medium translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                  {photo.alt}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
