'use client';

import { useForm, useFieldArray } from 'react-hook-form';
import { useProject } from '@/context/project-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Plus, Trash2 } from 'lucide-react';
import type { Equipment } from '@/types/project';

interface CostsSectionProps {
  onNext: () => void;
  onBack: () => void;
}

export function CostsSection({ onNext, onBack }: CostsSectionProps) {
  const { projectData, updateSection } = useProject();

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      equipment: projectData.costStructure?.equipment || [
        { description: '', annualQuantity: 0, unitPrice: 0, totalCost: 0 },
      ],
      financing: projectData.costStructure?.financing || '',
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'equipment',
  });

  const calculateTotal = (index: number) => {
    const annualQuantity = watch(`equipment.${index}.annualQuantity`);
    const unitPrice = watch(`equipment.${index}.unitPrice`);
    const total = (Number(annualQuantity) || 0) * (Number(unitPrice) || 0);
    setValue(`equipment.${index}.totalCost`, total);
  };

  const onSubmit = (data: { equipment: Equipment[]; financing: string }) => {
    updateSection('costStructure', {
      ...projectData.costStructure, // ✅ Preserve existing data
      equipment: data.equipment,
      financing: data.financing,
    });
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle>Equipos y Maquinaria</CardTitle>
          <CardDescription>
            Detalla los equipos y maquinaria necesarios para tu proyecto
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="p-4 border border-border rounded-lg bg-muted/30 space-y-4"
            >
              <div className="flex justify-between items-center">
                <h4 className="font-semibold text-sm">Equipo #{index + 1}</h4>
                {fields.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => remove(index)}
                  >
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                )}
              </div>

              <div>
                <Label htmlFor={`equipment.${index}.description`} required>
                  Descripción
                </Label>
                <Input
                  id={`equipment.${index}.description`}
                  placeholder="Ej: Cocina industrial"
                  {...register(`equipment.${index}.description`, {
                    required: 'La descripción es requerida',
                  })}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor={`equipment.${index}.annualQuantity`} required>
                    Cantidad Anual
                  </Label>
                  <Input
                    id={`equipment.${index}.annualQuantity`}
                    type="number"
                    min="0"
                    step="1"
                    {...register(`equipment.${index}.annualQuantity`, {
                      required: 'La cantidad es requerida',
                      valueAsNumber: true,
                      onChange: () => calculateTotal(index),
                    })}
                  />
                </div>

                <div>
                  <Label htmlFor={`equipment.${index}.unitPrice`} required>
                    Precio Unitario ($)
                  </Label>
                  <Input
                    id={`equipment.${index}.unitPrice`}
                    type="number"
                    min="0"
                    step="0.01"
                    {...register(`equipment.${index}.unitPrice`, {
                      required: 'El costo unitario es requerido',
                      valueAsNumber: true,
                      onChange: () => calculateTotal(index),
                    })}
                  />
                </div>

                <div>
                  <Label htmlFor={`equipment.${index}.totalCost`}>
                    Costo Total ($)
                  </Label>
                  <Input
                    id={`equipment.${index}.totalCost`}
                    type="number"
                    readOnly
                    className="bg-muted"
                    {...register(`equipment.${index}.totalCost`, {
                      valueAsNumber: true,
                    })}
                  />
                </div>
              </div>
            </div>
          ))}

          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() =>
              append({ description: '', annualQuantity: 0, unitPrice: 0, totalCost: 0 })
            }
          >
            <Plus className="w-4 h-4 mr-2" />
            Agregar Equipo/Maquinaria
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Estructura de Financiamiento</CardTitle>
          <CardDescription>
            Describe cómo se financiará tu proyecto
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Capital propio, préstamos bancarios, inversores, subsidios gubernamentales, etc..."
            rows={5}
            {...register('financing', {
              required: 'La estructura de financiamiento es requerida',
            })}
          />
          {errors.financing && (
            <p className="text-destructive text-sm mt-1">
              {errors.financing.message}
            </p>
          )}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={onBack} size="lg">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Anterior
        </Button>
        <Button type="submit" size="lg" className="min-w-[200px]">
          Siguiente
        </Button>
      </div>
    </form>
  );
}
