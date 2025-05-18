
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
import { useLanguage } from "@/contexts/language-context";

const getPhoneLoginSchema = (t: (key: string) => string) => z.object({
  phoneNumber: z.string()
    .min(10, { message: t('phoneMinDigitsError')})
    .regex(/^\+?[1-9]\d{1,14}$/, { message: t('phoneInvalidFormatError')}),
});

type PhoneLoginFormValues = z.infer<ReturnType<typeof getPhoneLoginSchema>>;

export function PhoneLoginForm() {
  const { toast } = useToast();
  const router = useRouter();
  const { t } = useLanguage();

  const phoneLoginSchema = getPhoneLoginSchema(t);

  const form = useForm<PhoneLoginFormValues>({
    resolver: zodResolver(phoneLoginSchema),
    defaultValues: {
      phoneNumber: "",
    },
  });

  function onSubmit(data: PhoneLoginFormValues) {
    console.log("Login attempt with:", data.phoneNumber);
    toast({
      title: t('loginSubmittedToastTitle'),
      description: t('loginSubmittedToastDesc', { phoneNumber: data.phoneNumber }),
      variant: "default"
    });
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
              <FormLabel>{t('phoneNumberLabel')}</FormLabel>
              <FormControl>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input className="pl-10" placeholder={t('phoneNumberPlaceholder')} {...field} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
          {t('accessEventButton')}
        </Button>
      </form>
    </Form>
  );
}
