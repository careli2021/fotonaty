
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, UserCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format } from 'date-fns';

type Message = {
  id: string;
  user: string;
  avatar?: string;
  text: string;
  timestamp: Date;
};

const initialMessages: Message[] = [
  { id: '1', user: 'Alice', text: 'Such a beautiful event! Congrats!', timestamp: new Date(Date.now() - 3600000 * 2) }, // 2 hours ago
  { id: '2', user: 'Bob', avatar: 'https://picsum.photos/seed/bob/40/40', text: 'Having a great time! 🎉', timestamp: new Date(Date.now() - 3600000 * 1) }, // 1 hour ago
  { id: '3', user: 'Carol', text: 'The venue is stunning. ✨', timestamp: new Date(Date.now() - 1800000) }, // 30 minutes ago
];


export function EventChat() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const { toast } = useToast();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;

    const message: Message = {
      id: Date.now().toString(),
      user: "You", // In a real app, this would be the logged-in user's name
      text: newMessage,
      timestamp: new Date(),
    };
    setMessages((prevMessages) => [...prevMessages, message]);
    setNewMessage("");
    toast({
      title: "Message Sent!",
      description: "Your message has been added to the event wall.",
      variant: "default"
    });
  };
  
  // Effect to scroll to bottom when new messages are added
  useEffect(() => {
    const scrollArea = document.getElementById('chat-scroll-area')?.children[1] as HTMLElement | undefined;
    if (scrollArea) {
      scrollArea.scrollTop = scrollArea.scrollHeight;
    }
  }, [messages]);


  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm max-w-2xl mx-auto">
      <ScrollArea id="chat-scroll-area" className="h-72 w-full p-4">
        <div className="space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className="flex items-start gap-3">
              <Avatar className="h-8 w-8 border">
                <AvatarImage src={msg.avatar} alt={msg.user} data-ai-hint="avatar person" />
                <AvatarFallback>
                  {msg.user.substring(0, 1).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 bg-muted/50 p-3 rounded-lg shadow-sm">
                <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-primary">{msg.user}</p>
                    <p className="text-xs text-muted-foreground">
                      {isClient ? format(msg.timestamp, "p") : ""}
                    </p>
                </div>
                <p className="text-sm text-foreground mt-1">{msg.text}</p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      <form onSubmit={handleSendMessage} className="p-4 border-t flex items-center gap-2">
        <Input
          type="text"
          placeholder="Write a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1"
          aria-label="Chat message input"
        />
        <Button type="submit" size="icon" className="bg-primary hover:bg-primary/90 text-primary-foreground" aria-label="Send message">
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
}
