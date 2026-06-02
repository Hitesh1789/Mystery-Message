import AuthProvider from "@/context/AuthProvider";
import { Toaster } from "@/components/ui/sonner"
import './globals.css'
import Navabar from "@/components/Navabar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
    >
      <body className="min-h-full flex flex-col">
        <AuthProvider>
          <Navabar />
          {children}
          <Toaster toastOptions={{
            classNames: {
              description: '!text-red-900',
            },
          }} />
        </AuthProvider>
      </body>
    </html>
  );
}
