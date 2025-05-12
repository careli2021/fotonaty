import { PhoneLoginForm } from '@/components/auth/phone-login-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { KeyRound } from 'lucide-react';

export default function LoginPage() {
  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-200px)] py-8">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-4">
            <KeyRound className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl">Guest Login</CardTitle>
          <CardDescription>Enter your phone number to access the event gallery.</CardDescription>
        </CardHeader>
        <CardContent>
          <PhoneLoginForm />
        </CardContent>
      </Card>
    </div>
  );
}
