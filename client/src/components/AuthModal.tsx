import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'login' | 'register';
}

export function AuthModal({ isOpen, onClose, mode }: AuthModalProps) {
  const { t } = useI18n();
  const { login } = useAuth();
  const { toast } = useToast();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (mode === 'login') {
      if ((username === "miyamura77izumiy" && password === "DalerDamir 321371") || 
          (username === "sh6x1na" && password === "shoxina77") ||
          (username === "d6lerch1k" && password === "DalerDamir8577")) {
        
        if (username === "miyamura77izumiy") {
           login('admin');
           toast({ title: "Welcome Admin", description: "Secure access granted." });
        } else {
           login('member');
           toast({ title: "Welcome Member", description: "Successfully logged in." });
        }
        onClose();
      } else {
        toast({ variant: "destructive", title: "Access Denied", description: "Invalid credentials." });
      }
    } else {
      // Mock Registration
      toast({ title: "Registered!", description: "Welcome to Lumora." });
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-background/80 backdrop-blur-xl border-white/10" aria-describedby="auth-modal-description">
        <DialogHeader>
          <DialogTitle>{mode === 'login' ? t('nav.login') : t('nav.register')}</DialogTitle>
        </DialogHeader>
        <div id="auth-modal-description" className="sr-only">
          {mode === 'login' ? 'Login to your account' : 'Create a new account'}
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="username">{t('auth.username')}</Label>
            <Input 
              id="username" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)}
              className="bg-background/50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">{t('auth.password')}</Label>
            <Input 
              id="password" 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              className="bg-background/50"
            />
          </div>
          <Button type="submit" className="w-full">
            {t('auth.submit')}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
