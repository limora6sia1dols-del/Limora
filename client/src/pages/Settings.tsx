import { Layout } from "@/components/Layout";
import { useI18n } from "@/lib/i18n";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { User, Lock, Save } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/lib/auth";
import { Link } from "wouter";

export function SettingsPage() {
  const { t } = useI18n();
  const { toast } = useToast();
  const { role } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: t('settings.success'),
      description: "Your login credentials have been updated (Prototype mode)",
    });
  };

  if (role === 'guest') {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
          <div className="bg-destructive/10 p-6 rounded-full mb-6">
            <Lock className="w-12 h-12 text-destructive" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Access Denied</h1>
          <p className="text-muted-foreground mb-8">Please login to view settings.</p>
          <Link href="/">
            <Button>Return Home</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-2xl mx-auto px-4 py-12">
        <Card className="bg-card/30 backdrop-blur-md border-white/10">
          <CardHeader>
            <CardTitle>{t('settings.title')}</CardTitle>
            <CardDescription>Update your account preferences and login details.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="username">{t('settings.username')}</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="username" 
                    className="pl-10 bg-background/50" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="New username"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">{t('settings.password')}</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="password" 
                    type="password" 
                    className="pl-10 bg-background/50" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="New password"
                  />
                </div>
              </div>

              <Button type="submit" className="w-full">
                <Save className="w-4 h-4 mr-2" />
                {t('settings.update')}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
