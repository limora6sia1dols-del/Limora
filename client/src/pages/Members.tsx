import { Layout } from "@/components/Layout";
import { useI18n } from "@/lib/i18n";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/lib/auth";
import { useMembers } from "@/lib/members";
import { Edit, Instagram, Twitter, Music2 } from "lucide-react";

export function MembersPage() {
  const { t } = useI18n();
  const { role } = useAuth();
  const { members } = useMembers();

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('members.title')}</h1>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {members.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-transparent rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <Card className="relative overflow-hidden border-white/10 bg-card/40 backdrop-blur-md h-full">
                <div className="aspect-[3/4] md:aspect-square overflow-hidden relative">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  
                  <div className="absolute bottom-0 left-0 p-8 w-full">
                    <h2 className="text-4xl font-bold text-white mb-2 font-sans">{member.name}</h2>
                    <Badge variant="secondary" className="text-sm mb-4 bg-white/20 text-white backdrop-blur-md border-none">{member.role}</Badge>
                    
                    <div className="flex gap-4 text-white/80">
                      <Instagram className="w-6 h-6 hover:text-primary cursor-pointer transition-colors" />
                      <Twitter className="w-6 h-6 hover:text-primary cursor-pointer transition-colors" />
                      <Music2 className="w-6 h-6 hover:text-primary cursor-pointer transition-colors" />
                    </div>
                  </div>
                </div>

                <CardContent className="p-8">
                  <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                    {member.bio}
                  </p>
                  
                  <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
                    <div className="text-center">
                      <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Age</div>
                      <div className="text-xl font-bold">{member.stats.age}</div>
                    </div>
                    <div className="text-center border-l border-white/10">
                      <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Height</div>
                      <div className="text-xl font-bold">{member.stats.height}</div>
                    </div>
                    <div className="text-center border-l border-white/10">
                      <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Zodiac</div>
                      <div className="text-xl font-bold">{member.stats.zodiac}</div>
                    </div>
                  </div>

                  {(role === 'admin' || role === 'member') && (
                    <Button className="w-full mt-6" variant="outline">
                      <Edit className="w-4 h-4 mr-2" />
                      {t('members.edit')}
                    </Button>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
