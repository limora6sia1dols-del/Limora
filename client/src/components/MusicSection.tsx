import { useI18n } from "@/lib/i18n";
import { motion } from "framer-motion";
import { Play, Pause, Heart, Share2 } from "lucide-react";
import { useState } from "react";
import albumArt from "@assets/generated_images/abstract_album_art_1.png";
import { Button } from "@/components/ui/button";

export function MusicSection() {
  const { t } = useI18n();
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section id="music" className="py-24 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row gap-12 items-center">
        {/* Album Art */}
        <motion.div 
          className="w-full md:w-1/2 max-w-md relative group"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute inset-0 bg-primary/30 blur-3xl rounded-full opacity-50 group-hover:opacity-75 transition-opacity duration-500" />
          <img 
            src={albumArt} 
            alt="Latest Release" 
            className="relative z-10 w-full aspect-square object-cover rounded-2xl shadow-2xl border border-white/10 group-hover:scale-[1.02] transition-transform duration-500"
          />
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="absolute inset-0 z-20 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
          >
            <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 hover:scale-110 transition-transform">
              {isPlaying ? <Pause className="w-8 h-8 text-white fill-current" /> : <Play className="w-8 h-8 text-white fill-current ml-1" />}
            </div>
          </button>
        </motion.div>

        {/* Track Info */}
        <motion.div 
          className="w-full md:w-1/2 space-y-8"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div>
            <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-2">{t('latest.release')}</h2>
            <h3 className="text-5xl md:text-6xl font-bold text-foreground mb-4">Neon Dreams</h3>
            <p className="text-muted-foreground text-lg max-w-md">
              {t('about.desc')}
            </p>
          </div>

          {/* Player Controls Mockup */}
          <div className="bg-card/50 backdrop-blur-sm border border-white/5 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex flex-col">
                <span className="text-lg font-medium">Neon Dreams</span>
                <span className="text-sm text-muted-foreground">Lumora</span>
              </div>
              <div className="flex gap-4">
                <button className="text-muted-foreground hover:text-primary transition-colors">
                  <Heart className="w-6 h-6" />
                </button>
                <button className="text-muted-foreground hover:text-primary transition-colors">
                  <Share2 className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full h-1 bg-muted rounded-full mb-2 overflow-hidden">
              <motion.div 
                className="h-full bg-primary"
                initial={{ width: "0%" }}
                animate={isPlaying ? { width: "100%" } : { width: "30%" }}
                transition={isPlaying ? { duration: 180, ease: "linear" } : { duration: 0 }}
              />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground font-mono">
              <span>1:24</span>
              <span>3:45</span>
            </div>
            
            <Button className="w-full mt-6 rounded-full h-12 text-lg font-medium bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25" size="lg">
              {t('listen.now')}
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
