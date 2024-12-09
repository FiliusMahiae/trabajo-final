import localFont from "next/font/local";
// Importa fuentes locales para uso en la aplicación.

import Footer from "@/components/Layout/Footer";
// Importa el componente de pie de página.

import "./globals.css";
// Importa los estilos globales de la aplicación.

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
// Configura la fuente Geist Sans.

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
// Configura la fuente Geist Mono.

export const metadata = {
  title: "Albaranify",
  description: "Haz tus albaranes mejores!",
  icons: {
    icon: '/favicon.ico',
  },
};
// Metadatos para el sitio, como título y descripción.

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Aplica las fuentes configuradas y activa suavizado de fuentes. */}
        {children}
        {/* Renderiza el contenido principal. */}
        <Footer />
        {/* Incluye el pie de página en todas las páginas. */}
      </body>
    </html>
  );
}

