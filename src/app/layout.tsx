import "./globals.css";
import ClientLayout from "@/components/ClientLayout";
import { SessionProviderWrapper } from "@/components/session-provider";
export const metadata = {
  title: "My App",
  description: "Manifestation app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isBrowser = typeof window !== "undefined";
  let pathname = "";
  if (isBrowser) pathname = window.location.pathname;
  const showSidebar = !["/login", "/register", "/"].includes(pathname);
  return (
    <html lang="en">
      <body style={{ fontFamily: "system-ui, sans-serif" }}>
        <SessionProviderWrapper>
          {showSidebar ? <ClientLayout>{children}</ClientLayout> : children}
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
