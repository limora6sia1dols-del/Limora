import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send } from "lucide-react";

export function Comments() {
  const { t } = useI18n();
  const [comments, setComments] = useState([
    { id: 1, user: "Fan123", text: "OMG this is amazing! 😍", date: "2m ago" },
    { id: 2, user: "KpopLover", text: "Can't wait for the tour!", date: "1h ago" },
  ]);
  const [newComment, setNewComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    setComments([
      { id: Date.now(), user: "Guest", text: newComment, date: "Just now" },
      ...comments
    ]);
    setNewComment("");
  };

  return (
    <div className="bg-card/30 backdrop-blur-md border border-white/10 rounded-xl p-6 mt-8">
      <h3 className="text-xl font-bold mb-6">{t('comments.title')}</h3>
      
      <form onSubmit={handleSubmit} className="flex gap-4 mb-8">
        <Input 
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder={t('comments.placeholder')}
          className="bg-background/50"
        />
        <Button type="submit" size="icon">
          <Send className="w-4 h-4" />
        </Button>
      </form>

      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-4">
            <Avatar className="w-10 h-10 border border-white/10">
              <AvatarFallback>{comment.user[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-sm">{comment.user}</span>
                <span className="text-xs text-muted-foreground">{comment.date}</span>
              </div>
              <p className="text-sm text-muted-foreground">{comment.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
