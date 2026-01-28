'use client';

import { useForm } from 'react-hook-form';
import { useProject } from '@/context/project-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface BusinessSectionProps {
  onNext: () => void;
  onBack: () => void;
}

export function BusinessSection({ onNext, onBack }: BusinessSectionProps) {
  const { projectData, updateSection } = useProject();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      businessDescription: projectData.businessDescription || '',
      valueProposition: projectData.valueProposition || '',
      communicationChannels: projectData.communicationChannels || '',
      commercializationChannels: projectData.commercializationChannels || '',
      supplyChain: projectData.supplyChain || '',
      keyPartners: projectData.keyPartners || '',
      customerSegments: projectData.customerSegments || '',
    },
  });

  const onSubmit = (data: any) => {
    updateSection('businessDescription', data.businessDescription);
    updateSection('valueProposition', data.valueProposition);
    updateSection('communicationChannels', data.communicationChannels);
    updateSection('commercializationChannels', data.commercializationChannels);
    updateSection('supplyChain', data.supplyChain);
    updateSection('keyPartners', data.keyPartners);
    updateSection('customerSegments', data.customerSegments);
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle>Descripción del Negocio</CardTitle>
          <CardDescription>
            Describe brevemente en qué consiste tu emprendimiento
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Potencializar el consumo, producción y comercialización del zambo, a través de propuestas dulces y saladas utilizando materias primas naturales desde la cáscara hasta las pepas..."
            rows={5}
            {...register('businessDescription', {
              required: 'La descripción del negocio es requerida',
              minLength: { value: 50, message: 'Mínimo 50 caracteres' },
            })}
          />
          {errors.businessDescription && (
            <p className="text-destructive text-sm mt-1">
              {errors.businessDescription.message as string}
            </p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Propuesta de Valor</CardTitle>
          <CardDescription>
            ¿Qué hace único a tu producto o servicio?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Mis productos de zambo ofrecen innovación, garantizan un buen manejo ecológico y son sostenibles..."
            rows={5}
            {...register('valueProposition', {
              required: 'La propuesta de valor es requerida',
              minLength: { value: 50, message: 'Mínimo 50 caracteres' },
            })}
          />
          {errors.valueProposition && (
            <p className="text-destructive text-sm mt-1">
              {errors.valueProposition.message as string}
            </p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Canales de Comunicación</CardTitle>
          <CardDescription>
            ¿Cómo te comunicas con tus clientes? (Redes sociales, página web, ferias, etc.)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Relaciones con jóvenes influencers, creación de contenido en páginas web, tik tok, reels, Facebook, Instagram, participación de ferias culturales..."
            rows={4}
            {...register('communicationChannels', {
              required: 'Los canales de comunicación son requeridos',
            })}
          />
          {errors.communicationChannels && (
            <p className="text-destructive text-sm mt-1">
              {errors.communicationChannels.message as string}
            </p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Canales de Comercialización</CardTitle>
          <CardDescription>
            ¿Dónde y cómo vendes tus productos/servicios?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Distribución en tienda física, tienda online, redes sociales, Facebook, Instagram, distribución en supermercados..."
            rows={4}
            {...register('commercializationChannels', {
              required: 'Los canales de comercialización son requeridos',
            })}
          />
          {errors.commercializationChannels && (
            <p className="text-destructive text-sm mt-1">
              {errors.commercializationChannels.message as string}
            </p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Cadena de Suministro & Socios Clave</CardTitle>
          <CardDescription>
            Describe tu cadena de suministro y los socios más importantes para tu negocio
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="supplyChain" required>
              Cadena de Suministro
            </Label>
            <Textarea
              id="supplyChain"
              placeholder="Agricultores del caserío Acapulco, la señora de la tienda, jóvenes estudiantes que controlan el manejo de redes sociales..."
              rows={4}
              {...register('supplyChain', {
                required: 'La cadena de suministro es requerida',
              })}
            />
          </div>

          <div>
            <Label htmlFor="keyPartners" required>
              Socios Clave
            </Label>
            <Textarea
              id="keyPartners"
              placeholder="UTA, CORPOAMBATO, UTI..."
              rows={3}
              {...register('keyPartners', {
                required: 'Los socios clave son requeridos',
              })}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Segmentos de Clientes</CardTitle>
          <CardDescription>
            Define a quién está dirigido tu producto/servicio
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Optimistas equilibrados 14% (edad 30-50 años, quintiles B o C+, cuidan su salud). Activistas empodera dos 14% (edad 35-55 años, quintiles B, C+, C-, buscan productos orgánicos)..."
            rows={5}
            {...register('customerSegments', {
              required: 'Los segmentos de clientes son requeridos',
            })}
          />
          {errors.customerSegments && (
            <p className="text-destructive text-sm mt-1">
              {errors.customerSegments.message as string}
            </p>
          )}
          <p className="text-xs text-muted-foreground mt-2">
            💡 Tip: Puedes usar segmentación demográfica (edad, género), socioeconómica
            (nivel de ingresos), psicográfica (estilo de vida, valores), etc.
          </p>
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
