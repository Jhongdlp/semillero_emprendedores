import type { Metadata } from "next";
import "./globals.css";
import { ProjectProvider } from "@/context/project-context";

export const metadata: Metadata = {
  title: "Semillero de Emprendedores | Generador de Perfil de Proyecto",
  description: "Plataforma para emprendedores ecuatorianos que permite generar automáticamente un Perfil de Proyecto profesional en PDF",
  keywords: "emprendimiento, Ecuador, perfil de proyecto, semillero, business plan",
  authors: [{ name: "Semillero de Emprendedores" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased">
        <ProjectProvider>
          {children}
        </ProjectProvider>
      </body>
    </html>
  );
}
