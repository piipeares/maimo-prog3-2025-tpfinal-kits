import "./globals.css";
import { KitProvider } from "./context/KitContext";
import { FavoritesProvider } from "./context/FavoritesContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata = {
  title: "KitRadar",
  description: "Catálogo de camisetas de fútbol",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="bg-neutral-950 text-neutral-100 flex flex-col min-h-screen"> {/* Flex col para empujar el footer */}
        <KitProvider>
          <FavoritesProvider>
            <Navbar />
            
            <div className="mx-auto max-w-7xl px-4 py-8 w-full flex-1">
              {children}
            </div>
            <Footer /> 
          </FavoritesProvider>
        </KitProvider>
      </body>
    </html>
  );
}