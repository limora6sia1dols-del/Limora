import { Layout } from "@/components/Layout";
import { useI18n } from "@/lib/i18n";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Comments } from "@/components/Comments";

export function NewsPage() {
  const { t } = useI18n();

  const newsItems = [
    {
      id: 1,
      title: "Neon Dreams Tour Announced",
      date: "2024-05-15",
      category: "Tour",
      image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80&w=1000",
      description: "We are excited to announce our upcoming world tour starting this summer! Get ready for an unforgettable show."
    },
    {
      id: 2,
      title: "New Single Release Date",
      date: "2024-04-20",
      category: "Music",
      image: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?auto=format&fit=crop&q=80&w=1000",
      description: "Our new single 'Midnight Echoes' drops next Friday. Pre-save now on all platforms."
    },
    {
      id: 3,
      title: "Behind the Scenes: MV Shoot",
      date: "2024-04-10",
      category: "Exclusive",
      image: "https://images.unsplash.com/photo-1598501421307-b311e7be4c59?auto=format&fit=crop&q=80&w=1000",
      description: "Check out these exclusive shots from our latest music video shoot in Seoul."
    }
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('news.title')}</h1>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden bg-card/50 backdrop-blur-sm border-white/10 hover:border-primary/50 transition-colors h-full flex flex-col">
                <div className="aspect-video relative overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <Badge className="absolute top-4 right-4 bg-primary/80 backdrop-blur-md">
                    {item.category}
                  </Badge>
                </div>
                <CardHeader>
                  <div className="text-sm text-muted-foreground mb-2">{item.date}</div>
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground flex-grow">
                  {item.description}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 max-w-3xl mx-auto">
          <Comments />
        </div>
      </div>
    </Layout>
  );
}
