import { Navbar } from "@/app/components/SideNavBar/navbar";

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