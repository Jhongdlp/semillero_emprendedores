"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useProject } from "@/context/project-context";
import { demandDetailSchema, type DemandDetailInput } from "@/lib/validations/project-schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, ArrowLeft, Plus, Trash2, TrendingUp } from "lucide-react";
import type { DemandDetail } from "@/types/project";

interface DemandDetailSectionProps {
  onNext: () => void;
  onBack: () => void;
}

export function DemandDetailSection({ onNext, onBack }: DemandDetailSectionProps) {
  const { projectData, updateSection } = useProject();
  
  // Initialize state from context, ensuring we always have at least one empty product
  const initialDemands = projectData.costStructure?.demandDetails && 
                         projectData.costStructure.demandDetails.length > 0
    ? projectData.costStructure.demandDetails
    : [{ productName: "", monthlyDemand: 0, pvp: 0 }];
  
  const [demands, setDemands] = useState<DemandDetail[]>(initialDemands);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      demands,
    },
  });

  const addDemand = () => {
    const newDemands = [...demands, { productName: "", monthlyDemand: 0, pvp: 0 }];
    setDemands(newDemands);
  };

  const removeDemand = (index: number) => {
    if (demands.length > 1) {
      const newDemands = demands.filter((_, i) => i !== index);
      setDemands(newDemands);
    }
  };

  const updateDemand = (index: number, field: keyof DemandDetail, value: string | number) => {
    const newDemands = [...demands];
    newDemands[index] = { ...newDemands[index], [field]: value };
    setDemands(newDemands);
  };

  const onSubmit = () => {
    // Filter out empty demands
    const validDemands = demands.filter(
      (d) => d.productName.trim() !== "" && d.monthlyDemand > 0 && d.pvp > 0
    );

    // Validate that we have at least one valid product
    if (validDemands.length === 0) {
      alert("Por favor, complete al menos un producto con nombre, demanda mensual y PVP antes de continuar.");
      return;
    }

    updateSection("costStructure", {
      ...projectData.costStructure,
      equipment: projectData.costStructure?.equipment || [],
      financing: projectData.costStructure?.financing || "",
      demandDetails: validDemands,
    });
    
    onNext();
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-primary" />
            7.2 Detalle de Demanda
          </CardTitle>
          <CardDescription>
            Ingrese los productos/servicios que ofrecerá y su demanda mensual estimada
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              {demands.map((demand, index) => (
                <Card key={index} className="relative">
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="md:col-span-1 space-y-2">
                        <Label htmlFor={`productName-${index}`}>
                          Nombre del Producto/Servicio *
                        </Label>
                        <Input
                          id={`productName-${index}`}
                          placeholder="Ej: Dulce de Zambo Normal"
                          value={demand.productName}
                          onChange={(e) => updateDemand(index, "productName", e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`monthlyDemand-${index}`}>
                          Demanda Efectiva Mensual *
                          <span className="text-muted-foreground text-sm ml-2">(unidades)</span>
                        </Label>
                        <Input
                          id={`monthlyDemand-${index}`}
                          type="number"
                          min="0"
                          step="1"
                          placeholder="Ej: 300"
                          value={demand.monthlyDemand || ""}
                          onChange={(e) =>
                            updateDemand(index, "monthlyDemand", parseFloat(e.target.value) || 0)
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`pvp-${index}`}>
                          PVP *
                          <span className="text-muted-foreground text-sm ml-2">(USD)</span>
                        </Label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                            $
                          </span>
                          <Input
                            id={`pvp-${index}`}
                            type="number"
                            min="0"
                            step="0.01"
                            placeholder="2.00"
                            value={demand.pvp || ""}
                            onChange={(e) =>
                              updateDemand(index, "pvp", parseFloat(e.target.value) || 0)
                            }
                            className="pl-7"
                          />
                        </div>
                      </div>
                    </div>

                    {demands.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeDemand(index)}
                        className="absolute top-2 right-2 text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            <Button
              type="button"
              variant="outline"
              onClick={addDemand}
              className="w-full"
            >
              <Plus className="mr-2 h-4 w-4" />
              Agregar Producto
            </Button>

            <div className="bg-muted/50 p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong>Ayuda:</strong> La demanda efectiva mensual es la cantidad de unidades
                que espera vender por mes. El PVP (Precio de Venta al Público) es el precio
                por unidad que cobrará al cliente final.
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
