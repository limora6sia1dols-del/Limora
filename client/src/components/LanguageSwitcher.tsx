import { useI18n } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";

export function LanguageSwitcher() {
  const { language, setLanguage } = useI18n();

  const languages = {
    en: "English",
    ru: "Русский",
    uz: "O'zbek"
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full w-10 h-10 bg-background/50 backdrop-blur-md border border-white/10 hover:bg-white/20 transition-all duration-300">
          <Globe className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Switch language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-background/80 backdrop-blur-xl border-white/10">
        <DropdownMenuItem onClick={() => setLanguage('uz')} className={language === 'uz' ? 'bg-primary/20 font-bold' : ''}>
          🇺🇿 O'zbek
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage('ru')} className={language === 'ru' ? 'bg-primary/20 font-bold' : ''}>
          🇷🇺 Русский
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage('en')} className={language === 'en' ? 'bg-primary/20 font-bold' : ''}>
          🇺🇸 English
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
