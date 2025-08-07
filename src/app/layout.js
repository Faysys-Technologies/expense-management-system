import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";

export const metadata = {
  title: "Faysys Expense Management - Demo",
  description: "Experience our modern expense management system with seamless tracking, approval workflows, and real-time insights.",
  icons: {
    icon: '/faysys-logo.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/faysys-logo.png" type="image/png" />
        <link rel="shortcut icon" href="/faysys-logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/faysys-logo.png" />
      </head>
      <body className="antialiased">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
