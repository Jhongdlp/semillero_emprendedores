'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Rocket, Upload, Download, CheckCircle2 } from 'lucide-react';
import { useProject } from '@/context/project-context';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const { projectData, loadFromLocalStorage, clearData } = useProject();
  const router = useRouter();
  const hasSavedData = Object.keys(projectData).length > 0;

  const handleLoadProject = () => {
    loadFromLocalStorage();
    router.push('/formulario');
  };

  const handleNewProject = () => {
    if (hasSavedData) {
      if (confirm('¿Estás seguro de comenzar un nuevo proyecto? Se perderán los datos no guardados.')) {
        clearData();
        router.push('/formulario');
      }
    } else {
      router.push('/formulario');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Rocket className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Semillero de Emprendedores
                </h1>
                <p className="text-sm text-muted-foreground">Generador de Perfil de Proyecto</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold">
              Crea tu Perfil de Proyecto
              <br />
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                de forma Profesional
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Completa un formulario guiado y genera automáticamente un documento PDF profesional
              listo para presentar en convocatorias y concursos de emprendimiento.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button onClick={handleNewProject} size="lg" className="text-lg px-8 py-6">
              <FileText className="w-5 h-5 mr-2" />
              Comenzar Nuevo Proyecto
            </Button>
            {hasSavedData && (
              <Button onClick={handleLoadProject} variant="outline" size="lg" className="text-lg px-8 py-6">
                <Upload className="w-5 h-5 mr-2" />
                Continuar Proyecto Guardado
              </Button>
            )}
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            <Card className="text-left">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Formulario Guiado</CardTitle>
                <CardDescription>
                  Un proceso paso a paso que te guía a través de cada sección del perfil de proyecto
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-left">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-6 h-6 text-secondary" />
                </div>
                <CardTitle>Auto-Guardado</CardTitle>
                <CardDescription>
                  Tus datos se guardan automáticamente. Puedes volver cuando quieras sin perder tu progreso
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-left">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <Download className="w-6 h-6 text-accent" />
                </div>
                <CardTitle>PDF Profesional</CardTitle>
                <CardDescription>
                  Genera un documento PDF con formato profesional listo para imprimir o enviar
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* Info Section */}
          <Card className="mt-12 text-left">
            <CardHeader>
              <CardTitle>¿Qué incluye el Perfil de Proyecto?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                    <span>Datos generales del proyecto y del representante</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                    <span>Descripción del negocio y propuesta de valor</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                    <span>Información del equipo de trabajo</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                    <span>Canales de comunicación y comercialización</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                    <span>Cadena de suministro y socios clave</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                    <span>Segmentos de clientes objetivo</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                    <span>Estructura de costos y financiamiento</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                    <span>Anexos con evidencia fotográfica y documentos</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/30 backdrop-blur-sm mt-16">
        <div className="container mx-auto px-4 py-8">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Semillero de Emprendedores. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
