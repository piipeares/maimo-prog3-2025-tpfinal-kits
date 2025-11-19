import "./globals.css";
import { KitProvider } from "./context/KitContext";
import Navbar from "../components/Navbar";

export const metadata = {
  title: "KitRadar",
  description: "Catálogo de camisetas de fútbol",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="bg-neutral-950 text-neutral-100">
        <KitProvider>
          <Navbar />
          <div className="mx-auto max-w-6xl px-4 py-8">
            {children}
          </div>
        </KitProvider>
      </body>
    </html>
  );
}