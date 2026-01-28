'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useProject } from '@/context/project-context';
import { FormStepper } from '@/components/form/form-stepper';
import { GeneralDataSection } from '@/components/form/sections/general-data-section';
import { BusinessSection } from '@/components/form/sections/business-section';
import { TeamSection } from '@/components/form/sections/team-section';
import { FinancialRatesSection } from '@/components/form/sections/financial-rates-section';
import { DemandDetailSection } from '@/components/form/sections/demand-detail-section';
import { CostsSection } from '@/components/form/sections/costs-section';
import { ProductInputsSection } from '@/components/form/sections/product-inputs-section';
import { AnnexesSection } from '@/components/form/sections/annexes-section';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { FileDown, Home, Loader2 } from 'lucide-react';
import Link from 'next/link';

const SECTION_TITLES = [
  'Datos Generales',
  'Descripción del Negocio',
  'Equipo',
  'Tasas Financieras',
  'Demanda de Productos',
  'Equipos y Financiamiento',
  'Insumos por Producto',
  'Anexos',
];

export default function FormularioPage() {
  const { currentStep, setCurrentStep, projectData } = useProject();
  const [isGenerating, setIsGenerating] = useState(false);
  const router = useRouter();

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGeneratePDF = async () => {
    setIsGenerating(true);
    
    // Import PDF generation dynamically to avoid SSR issues
    try {
      const { generateProjectPDF } = await import('@/lib/pdf/generate-pdf');
      await generateProjectPDF(projectData as any);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error al generar el PDF. Por favor verifica que todos los campos estén completos.');
    } finally {
      setIsGenerating(false);
    }
  };

  const renderSection = () => {
    switch (currentStep) {
      case 1:
        return <GeneralDataSection onNext={handleNext} />;
      case 2:
        return <BusinessSection onNext={handleNext} onBack={handleBack} />;
      case 3:
        return <TeamSection onNext={handleNext} onBack={handleBack} />;
      case 4:
        return <FinancialRatesSection onNext={handleNext} onBack={handleBack} />;
      case 5:
        return <DemandDetailSection onNext={handleNext} onBack={handleBack} />;
      case 6:
        return <CostsSection onNext={handleNext} onBack={handleBack} />;
      case 7:
        return <ProductInputsSection onNext={handleNext} onBack={handleBack} />;
      case 8:
        return <AnnexesSection onNext={handleGeneratePDF} onBack={handleBack} isGenerating={isGenerating} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Formulario de Proyecto
            </h1>
            <Link href="/">
              <Button variant="ghost" size="sm">
                <Home className="w-4 h-4 mr-2" />
                Inicio
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-5xl">
        {currentStep <= 8 ? (
          <>
            <FormStepper
              currentStep={currentStep}
              totalSteps={8}
              stepTitles={SECTION_TITLES}
            />
            <div className="mt-8">{renderSection()}</div>
          </>
        ) : (
          <Card className="p-8 text-center space-y-6 animate-fade-in">
            <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto">
              <FileDown className="w-10 h-10 text-success" />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-2">¡Perfil de Proyecto Completado!</h2>
              <p className="text-muted-foreground">
                Haz clic en el botón para generar y descargar tu PDF
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={handleGeneratePDF}
                disabled={isGenerating}
                size="lg"
                className="text-lg px-8 py-6"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Generando PDF...
                  </>
                ) : (
                  <>
                    <FileDown className="w-5 h-5 mr-2" />
                    Descargar PDF
                  </>
                )}
              </Button>
              <Link href="/">
                <Button variant="outline" size="lg" className="text-lg px-8 py-6 w-full">
                  <Home className="w-5 h-5 mr-2" />
                  Volver al Inicio
                </Button>
              </Link>
            </div>
          </Card>
        )}
      </main>

      {/* Loading Overlay */}
      {isGenerating && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center animate-fade-in">
          <div className="bg-card border border-border p-6 rounded-xl shadow-2xl max-w-sm w-full mx-4 text-center space-y-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
               <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </div>
            <h3 className="text-xl font-bold">Generando su archivo...</h3>
            <p className="text-muted-foreground">
              Por favor espere mientras procesamos su información y creamos el PDF profesional.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
