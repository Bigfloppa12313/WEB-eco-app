import "./globals.css";
import "leaflet/dist/leaflet.css";
import Analytics from "@/components/Analytics";

import Header from "@/components/Header";
import ErrorBoundary from "@/components/ErrorBoundary";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk">
      <body>
        <Header />
        <Analytics />
         <ErrorBoundary>
          <main className="container">
            {children}
          </main>
        </ErrorBoundary>
      </body>
    </html>
  );
}