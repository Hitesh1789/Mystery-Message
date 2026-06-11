import AuthProvider from "@/context/AuthProvider";
import { Toaster } from "@/components/ui/sonner"
import './globals.css'
import Navabar from "@/components/Navabar";
import { ThemeProvider } from "@/components/ThemeProvider"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en" suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <Navabar />
            {children}
            <Toaster toastOptions={{
              classNames: {
                description: '!text-red-900',
              },
            }} />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
