import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useI18n } from "@/lib/i18n";
import { Link, useLocation } from "wouter";
import { useState, useEffect } from "react";
import { Menu, X, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AuthModal } from "@/components/AuthModal";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";

export function Layout({ children }: { children: React.ReactNode }) {
  const { t } = useI18n();
  const { role, logout } = useAuth();
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register' | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: '/music', label: 'nav.music' },
    { href: '/photos', label: 'nav.photos' },
    { href: '/news', label: 'nav.news' },
    { href: '/members', label: 'nav.members' },
  ];

  if (role === 'admin') {
    navLinks.push({ href: '/admin', label: 'nav.admin' });
  }

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-white flex flex-col">
      <AuthModal 
        isOpen={!!authMode} 
        onClose={() => setAuthMode(null)} 
        mode={authMode || 'login'} 
      />

      {/* Navigation */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || mobileMenuOpen ? "bg-background/80 backdrop-blur-lg border-b border-white/5 py-4" : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
          <Link href="/">
            <div className="text-2xl font-bold tracking-tighter font-sans bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/50 cursor-pointer">
              LUMORA
            </div>
          </Link>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide uppercase">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <span className={`cursor-pointer transition-colors ${location === link.href ? 'text-primary font-bold' : 'hover:text-primary'}`}>
                  {t(link.label)}
                </span>
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-2">
            {role === 'guest' ? (
              <>
                <Button variant="ghost" onClick={() => setAuthMode('login')}>{t('nav.login')}</Button>
                <Button onClick={() => setAuthMode('register')}>{t('nav.register')}</Button>
              </>
            ) : (
              <Button variant="ghost" onClick={logout}>
                <User className="w-4 h-4 mr-2" />
                {t('nav.logout')}
              </Button>
            )}
            {role !== 'guest' && (
              <Link href="/settings">
                <Button variant="outline" size="icon" className="ml-2">
                  <User className="w-4 h-4" />
                </Button>
              </Link>
            )}
            <div className="w-px h-6 bg-white/10 mx-2" />
            <LanguageSwitcher />
            <ThemeToggle />
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-foreground p-2 hover:bg-white/10 rounded-full transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 top-0 z-40 bg-background md:hidden flex flex-col pt-24 px-6 overflow-y-auto"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <span 
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-4xl font-black uppercase tracking-tighter hover:text-primary transition-colors ${location === link.href ? 'text-primary' : 'text-foreground/80'}`}
                  >
                    {t(link.label)}
                  </span>
                </Link>
              ))}
            </div>

            <div className="mt-12 pt-12 border-t border-white/10 flex flex-col gap-6">
              <div className="flex gap-4">
                {role === 'guest' ? (
                  <>
                    <Button variant="outline" size="lg" className="flex-1" onClick={() => { setAuthMode('login'); setMobileMenuOpen(false); }}>{t('nav.login')}</Button>
                    <Button size="lg" className="flex-1" onClick={() => { setAuthMode('register'); setMobileMenuOpen(false); }}>{t('nav.register')}</Button>
                  </>
                ) : (
                  <Button variant="ghost" size="lg" className="w-full justify-start" onClick={() => { logout(); setMobileMenuOpen(false); }}>
                    <User className="w-5 h-5 mr-3" />
                    {t('nav.logout')}
                  </Button>
                )}
              </div>
              
              <div className="flex items-center justify-between mt-4 bg-card/30 p-4 rounded-2xl">
                <span className="text-muted-foreground font-medium">Appearance</span>
                <div className="flex gap-4">
                  <LanguageSwitcher />
                  <ThemeToggle />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-grow pt-20">
        {children}
      </main>
      
      {/* Footer */}
      <footer className="bg-card text-card-foreground py-12 px-4 border-t border-white/5 mt-auto">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="text-xl font-bold tracking-tighter">LUMORA</div>
          <div className="text-sm text-muted-foreground/60">
            {t('footer.rights')}
          </div>
        </div>
      </footer>
    </div>
  );
}
