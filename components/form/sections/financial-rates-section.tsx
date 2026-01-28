"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useProject } from "@/context/project-context";
import { financialRatesSchema, type FinancialRatesInput } from "@/lib/validations/project-schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, ArrowLeft, Percent } from "lucide-react";

interface FinancialRatesSectionProps {
  onNext: () => void;
  onBack: () => void;
}

export function FinancialRatesSection({ onNext, onBack }: FinancialRatesSectionProps) {
  const { projectData, updateSection } = useProject();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FinancialRatesInput>({
    resolver: zodResolver(financialRatesSchema),
    defaultValues: {
      productionGrowth: projectData.costStructure?.financialRates?.productionGrowth || 2.4,
      priceGrowth: projectData.costStructure?.financialRates?.priceGrowth || 2.5,
      discountRate: projectData.costStructure?.financialRates?.discountRate || 12.93,
      inflationRate: projectData.costStructure?.financialRates?.inflationRate || 2.75,
      salaryIncrease: projectData.costStructure?.financialRates?.salaryIncrease || 6.25,
    },
  });

  const onSubmit = (data: FinancialRatesInput) => {
    updateSection("costStructure", {
      ...projectData.costStructure,
      equipment: projectData.costStructure?.equipment || [],
      financing: projectData.costStructure?.financing || "",
      financialRates: data,
    });
    onNext();
  };

  const rateFields = [
    {
      id: "productionGrowth",
      label: "Tasa de Crecimiento de la Producción",
      description: "Porcentaje anual de crecimiento esperado en la producción",
      defaultValue: 2.4,
    },
    {
      id: "priceGrowth",
      label: "Tasa de Crecimiento del Precio de Venta al Público",
      description: "Porcentaje anual de crecimiento del PVP",
      defaultValue: 2.5,
    },
    {
      id: "discountRate",
      label: "Tasa de Descuento",
      description: "Tasa de descuento para el análisis financiero",
      defaultValue: 12.93,
    },
    {
      id: "inflationRate",
      label: "Tasa de Inflación",
      description: "Tasa de inflación anual esperada",
      defaultValue: 2.75,
    },
    {
      id: "salaryIncrease",
      label: "Tasa de Incremento de Sueldo y Salarios",
      description: "Porcentaje anual de incremento salarial",
      defaultValue: 6.25,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Percent className="h-6 w-6 text-primary" />
            7.1 Datos Generales para el Área Financiera
          </CardTitle>
          <CardDescription>
            Ingrese las tasas financieras para el análisis económico del proyecto
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              {rateFields.map((field) => (
                <div key={field.id} className="space-y-2">
                  <Label htmlFor={field.id}>
                    {field.label}
                    <span className="text-muted-foreground text-sm ml-2">
                      (%)
                    </span>
                  </Label>
                  <p className="text-sm text-muted-foreground">{field.description}</p>
                  <div className="relative">
                    <Input
                      id={field.id}
                      type="number"
                      step="0.01"
                      min="0"
                      max="100"
                      placeholder={`Ej: ${field.defaultValue}%`}
                      {...register(field.id as keyof FinancialRatesInput, {
                        valueAsNumber: true,
                      })}
                      className="pr-10"
                    />
                    <Percent className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  </div>
                  {errors[field.id as keyof FinancialRatesInput] && (
                    <p className="text-sm text-destructive">
                      {errors[field.id as keyof FinancialRatesInput]?.message}
                    </p>
                  )}
                </div>
              ))}
            </div>

            <div className="bg-muted/50 p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong>Nota:</strong> Estas tasas se utilizarán para calcular proyecciones financieras,
                análisis de flujo de caja y evaluación de viabilidad económica del proyecto.
              </p>
            </div>

            <div className="flex justify-between pt-4">
              <Button type="button" variant="outline" onClick={onBack}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Anterior
              </Button>
              <Button type="submit">
                Siguiente
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
