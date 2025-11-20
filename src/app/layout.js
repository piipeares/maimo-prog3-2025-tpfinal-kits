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
      {/* Agregada la clase 'overflow-x-hidden' para eliminar el scroll horizontal */}
      <body className="bg-neutral-950 text-neutral-100 flex flex-col min-h-screen overflow-x-hidden">
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