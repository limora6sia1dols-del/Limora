import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { Home } from "@/pages/Home";
import { MusicPage } from "@/pages/Music";
import { PhotosPage } from "@/pages/Photos";
import { NewsPage } from "@/pages/News";
import { MembersPage } from "@/pages/Members";
import { AdminPage } from "@/pages/Admin";
import { SettingsPage } from "@/pages/Settings";
import { I18nProvider } from "@/lib/i18n";
import { AuthProvider } from "@/lib/auth";
import { MembersProvider } from "@/lib/members";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/music" component={MusicPage} />
      <Route path="/photos" component={PhotosPage} />
      <Route path="/news" component={NewsPage} />
      <Route path="/members" component={MembersPage} />
      <Route path="/admin" component={AdminPage} />
      <Route path="/settings" component={SettingsPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <I18nProvider>
          <MembersProvider>
            <TooltipProvider>
              <Toaster />
              <Router />
            </TooltipProvider>
          </MembersProvider>
        </I18nProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
