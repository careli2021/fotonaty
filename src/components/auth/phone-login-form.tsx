"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Phone } from "lucide-react";
import { useRouter } from "next/navigation";

const phoneLoginSchema = z.object({
  phoneNumber: z.string().min(10, {
    message: "Phone number must be at least 10 digits.",
  }).regex(/^\+?[1-9]\d{1,14}$/, { message: "Invalid phone number format."}),
});

type PhoneLoginFormValues = z.infer<typeof phoneLoginSchema>;

export function PhoneLoginForm() {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<PhoneLoginFormValues>({
    resolver: zodResolver(phoneLoginSchema),
    defaultValues: {
      phoneNumber: "",
    },
  });

  function onSubmit(data: PhoneLoginFormValues) {
    // Mock login action
    console.log("Login attempt with:", data.phoneNumber);
    toast({
      title: "Login Submitted",
      description: `Attempting to log in with ${data.phoneNumber}. (This is a mock action)`,
      variant: "default"
    });
    // Redirect to a sample event page after "login"
    // In a real app, you'd verify the number and redirect to the specific event
    router.push('/events/sample-event'); 
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input className="pl-10" placeholder="+1 123 456 7890" {...field} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
          Access Event
        </Button>
      </form>
    </Form>
  );
}
