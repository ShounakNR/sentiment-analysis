import type { Metadata } from "next";
import { Navbar } from "@/app/components/SideNavBar/navbar";

export const metadata: Metadata = {
  title: {
    default: 'Sentify',
    template: '%s | Shounak Rangwala'
  },
  description: "AI powered sentiment analysis",
  metadataBase: new URL("http://localhost:3000"),
  openGraph:{
    title: 'Sentify',
    description: 'AI powered sentiment analysis',
    locale: 'en_US',
    type: 'website',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="lg:flex">
          <Navbar />
          {children}
        </div>
      </body>
    </html>
  );
}