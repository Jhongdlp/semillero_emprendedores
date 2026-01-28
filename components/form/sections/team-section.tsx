'use client';

import { useForm, useFieldArray } from 'react-hook-form';
import { useProject } from '@/context/project-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Plus, Trash2 } from 'lucide-react';
import type { TeamMember } from '@/types/project';

interface TeamSectionProps {
  onNext: () => void;
  onBack: () => void;
}

export function TeamSection({ onNext, onBack }: TeamSectionProps) {
  const { projectData, updateSection } = useProject();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      team: projectData.team || [{ name: '', experience: '', role: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'team',
  });

  const onSubmit = (data: { team: TeamMember[] }) => {
    updateSection('team', data.team);
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle>Equipo del Proyecto</CardTitle>
          <CardDescription>
            Define quiénes forman parte del equipo y sus roles
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="p-4 border border-border rounded-lg bg-muted/30 space-y-4"
            >
              <div className="flex justify-between items-center">
                <h4 className="font-semibold text-sm">
                  Miembro del Equipo #{index + 1}
                </h4>
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

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor={`team.${index}.name`} required>
                    Nombre y Apellido
                  </Label>
                  <Input
                    id={`team.${index}.name`}
                    placeholder="Ej: Piedad Ramos"
                    {...register(`team.${index}.name`, {
                      required: 'El nombre es requerido',
                    })}
                  />
                  {errors.team?.[index]?.name && (
                    <p className="text-destructive text-sm mt-1">
                      {errors.team[index]?.name?.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor={`team.${index}.experience`} required>
                    Experiencia
                  </Label>
                  <Input
                    id={`team.${index}.experience`}
                    placeholder="Ej: Mínima"
                    {...register(`team.${index}.experience`, {
                      required: 'La experiencia es requerida',
                    })}
                  />
                  {errors.team?.[index]?.experience && (
                    <p className="text-destructive text-sm mt-1">
                      {errors.team[index]?.experience?.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor={`team.${index}.role`} required>
                    Rol dentro del proyecto
                  </Label>
                  <Input
                    id={`team.${index}.role`}
                    placeholder="Ej: Emprendedor"
                    {...register(`team.${index}.role`, {
                      required: 'El rol es requerido',
                    })}
                  />
                  {errors.team?.[index]?.role && (
                    <p className="text-destructive text-sm mt-1">
                      {errors.team[index]?.role?.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}

          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() => append({ name: '', experience: '', role: '' })}
          >
            <Plus className="w-4 h-4 mr-2" />
            Agregar Miembro del Equipo
          </Button>
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
