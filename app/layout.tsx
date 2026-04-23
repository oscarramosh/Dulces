import "./globals.css";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-[#fffaf3] text-gray-800 antialiased">
        {children}
      </body>
    </html>
  );
}