import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://agentic-5ea2a079.vercel.app"),
  title: {
    default: "Trending Shorts",
    template: "%s ? Trending Shorts",
  },
  description: "Tonton short video yang tengah trending hari ini.",
  openGraph: {
    title: "Trending Shorts",
    description: "Short video trending dari berbagai sumber.",
    url: "https://agentic-5ea2a079.vercel.app",
    siteName: "Trending Shorts",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Trending Shorts",
    description: "Short video trending dari berbagai sumber.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body>
        <header className="site-header">
          <div className="container">
            <h1>Trending Shorts</h1>
            <p className="tagline">Short video yang tengah trending</p>
          </div>
        </header>
        <main className="container">{children}</main>
        <footer className="site-footer">
          <div className="container">
            <p>Data via Piped API ? Region: ID</p>
          </div>
        </footer>
      </body>
    </html>
  );
}

