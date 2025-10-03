import "./globals.css";
import { SessionProviderWrapper } from "@/components/session-provider";
export const metadata = {
  title: "My App",
  description: "Manifestation app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: 'system-ui, sans-serif' }}>
        <SessionProviderWrapper>{children}</SessionProviderWrapper>
      </body>
    </html>
  );
}