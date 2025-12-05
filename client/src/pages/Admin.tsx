import { Layout } from "@/components/Layout";
import { useI18n } from "@/lib/i18n";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, Image, Video, FileText, Upload, Users, Lock } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/lib/auth";
import { useMembers } from "@/lib/members";
import { Link } from "wouter";

export function AdminPage() {
  const { t } = useI18n();
  const { toast } = useToast();
  const { role } = useAuth();
  const { members, updateMember } = useMembers();
  const [activeTab, setActiveTab] = useState("news");

  const handleMemberUpdate = (id: number, field: string, value: string) => {
    if (field.startsWith('stats.')) {
      const statKey = field.split('.')[1];
      updateMember(id, { stats: { ...members.find(m => m.id === id)?.stats, [statKey]: value } as any });
    } else {
      updateMember(id, { [field]: value });
    }
    toast({
      title: "Updated",
      description: "Member profile updated successfully",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Success",
      description: "Content updated successfully (Prototype mode)",
    });
  };

  if (role !== 'admin') {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
          <div className="bg-destructive/10 p-6 rounded-full mb-6">
            <Lock className="w-12 h-12 text-destructive" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Access Denied</h1>
          <p className="text-muted-foreground mb-8">You need administrator privileges to view this page.</p>
          <Link href="/">
            <Button>Return Home</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{t('admin.dashboard')}</h1>
          <p className="text-muted-foreground">Manage your content across all platforms.</p>
        </div>

        <Tabs defaultValue="news" className="w-full" onValueChange={setActiveTab}>
          <div className="overflow-x-auto pb-4 md:pb-0">
            <TabsList className="inline-flex w-full min-w-[600px] md:min-w-0 grid-cols-4 bg-card/50 backdrop-blur-md border border-white/5 h-auto p-1">
              <TabsTrigger value="news" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-3">
                <FileText className="w-4 h-4 mr-2" />
                News
              </TabsTrigger>
              <TabsTrigger value="photos" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-3">
                <Image className="w-4 h-4 mr-2" />
                Photos
              </TabsTrigger>
              <TabsTrigger value="videos" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-3">
                <Video className="w-4 h-4 mr-2" />
                Videos
              </TabsTrigger>
              <TabsTrigger value="members" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-3">
                <Users className="w-4 h-4 mr-2" />
                Members
              </TabsTrigger>
            </TabsList>
          </div>

          {/* ... existing tabs ... */}
          <TabsContent value="news">
            <Card className="bg-card/30 backdrop-blur-md border-white/10">
              <CardHeader>
                <CardTitle>{t('admin.add_news')}</CardTitle>
                <CardDescription>Publish updates about tours, releases, and events.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">{t('form.title')}</Label>
                    <Input id="title" placeholder="Enter news title" className="bg-background/50" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="image">{t('form.image')}</Label>
                    <div className="flex gap-2">
                      <Input id="image" placeholder="https://..." className="bg-background/50" />
                      <Button type="button" variant="outline" size="icon">
                        <Upload className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="desc">{t('form.description')}</Label>
                    <Textarea id="desc" placeholder="Write your content here..." className="min-h-[150px] bg-background/50" />
                  </div>
                  <Button type="submit" className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    {t('form.submit')}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="photos">
            <Card className="bg-card/30 backdrop-blur-md border-white/10">
              <CardHeader>
                <CardTitle>{t('admin.add_photo')}</CardTitle>
                <CardDescription>Upload new photos to the gallery.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="picture">Picture</Label>
                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-12 text-center hover:bg-muted/5 transition-colors cursor-pointer">
                      <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">Drag and drop or click to upload</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="caption">{t('form.description')}</Label>
                    <Input id="caption" placeholder="Photo caption..." className="bg-background/50" />
                  </div>
                  <Button type="submit" className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    {t('form.submit')}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="videos">
            <Card className="bg-card/30 backdrop-blur-md border-white/10">
              <CardHeader>
                <CardTitle>{t('admin.add_video')}</CardTitle>
                <CardDescription>Add YouTube or Vimeo links.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="video-title">{t('form.title')}</Label>
                    <Input id="video-title" placeholder="Video Title" className="bg-background/50" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="video-url">{t('form.video')}</Label>
                    <Input id="video-url" placeholder="https://youtube.com/..." className="bg-background/50" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="video-desc">{t('form.description')}</Label>
                    <Textarea id="video-desc" placeholder="Video description..." className="bg-background/50" />
                  </div>
                  <Button type="submit" className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    {t('form.submit')}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="members">
            <Card className="bg-card/30 backdrop-blur-md border-white/10">
              <CardHeader>
                <CardTitle>Manage Members</CardTitle>
                <CardDescription>Update member profiles and statistics.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {members.map((member) => (
                    <div key={member.id} className="border border-white/10 rounded-lg p-6 bg-background/20">
                      <h3 className="text-lg font-bold mb-4">{member.name}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         <div className="space-y-2">
                          <Label>Name</Label>
                          <Input 
                            value={member.name}
                            onChange={(e) => handleMemberUpdate(member.id, 'name', e.target.value)}
                            className="bg-background/50" 
                          />
                        </div>
                         <div className="space-y-2">
                          <Label>Role</Label>
                          <Input 
                            value={member.role}
                            onChange={(e) => handleMemberUpdate(member.id, 'role', e.target.value)}
                            className="bg-background/50" 
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Bio</Label>
                          <Input 
                            value={member.bio}
                            onChange={(e) => handleMemberUpdate(member.id, 'bio', e.target.value)}
                            className="bg-background/50" 
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Age</Label>
                          <Input 
                            value={member.stats.age}
                            onChange={(e) => handleMemberUpdate(member.id, 'stats.age', e.target.value)}
                            className="bg-background/50" 
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Height</Label>
                          <Input 
                            value={member.stats.height}
                            onChange={(e) => handleMemberUpdate(member.id, 'stats.height', e.target.value)}
                            className="bg-background/50" 
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}

