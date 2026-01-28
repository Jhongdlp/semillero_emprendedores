'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { generalDataSchema, type GeneralDataInput } from '@/lib/validations/project-schema';
import { useProject } from '@/context/project-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { ecuadorLocations, getCantonsByProvince, getParishesByCanton } from '@/data/ecuador-locations';
import { Upload } from 'lucide-react';
import { useState } from 'react';

interface GeneralDataSectionProps {
  onNext: () => void;
}

export function GeneralDataSection({ onNext }: GeneralDataSectionProps) {
  const { projectData, updateSection } = useProject();
  const [selectedProvince, setSelectedProvince] = useState(projectData.generalData?.province || '');
  const [selectedCanton, setSelectedCanton] = useState(projectData.generalData?.canton || '');

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<GeneralDataInput>({
    resolver: zodResolver(generalDataSchema),
    defaultValues: projectData.generalData || {
      hasRUC: false,
      gender: 'MASCULINO',
      nationality: 'ECUATORIANA',
    },
  });

  const hasRUC = watch('hasRUC');

  const onSubmit = (data: GeneralDataInput) => {
    updateSection('generalData', data);
    onNext();
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setValue('logo', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProvinceChange = (province: string) => {
    setSelectedProvince(province);
    setSelectedCanton('');
    setValue('province', province);
    setValue('canton', '');
    setValue('parish', '');
  };

  const handleCantonChange = (canton: string) => {
    setSelectedCanton(canton);
    setValue('canton', canton);
    setValue('parish', '');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 animate-fade-in">
      {/* Información del Proyecto */}
      <Card>
        <CardHeader>
          <CardTitle>Información del Proyecto</CardTitle>
          <CardDescription>
            Datos generales sobre tu proyecto emprendedor
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="projectName" required>
              Nombre del Proyecto
            </Label>
            <Input
              id="projectName"
              placeholder="Ej: Alimentos Derivados del Zambo"
              {...register('projectName')}
            />
            {errors.projectName && (
              <p className="text-destructive text-sm mt-1">
                {errors.projectName.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="logo">Marca - Logotipo</Label>
            <div className="flex items-center gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById('logo-input')?.click()}
                className="w-full"
              >
                <Upload className="w-4 h-4 mr-2" />
                Cargar Logo
              </Button>
              <input
                id="logo-input"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleLogoUpload}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Formatos: PNG, JPG, SVG (máx. 5MB)
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Datos del Representante */}
      <Card>
        <CardHeader>
          <CardTitle>Datos del Representante</CardTitle>
          <CardDescription>
            Información personal del representante del proyecto
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="representativeName" required>
              Nombre Completo del Representante
            </Label>
            <Input
              id="representativeName"
              placeholder="Nombre completo"
              {...register('representativeName')}
            />
            {errors.representativeName && (
              <p className="text-destructive text-sm mt-1">
                {errors.representativeName.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="ci" required>
                C.I.
              </Label>
              <Input
                id="ci"
                placeholder="1234567890"
                maxLength={10}
                {...register('ci')}
              />
              {errors.ci && (
                <p className="text-destructive text-sm mt-1">{errors.ci.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="gender" required>
                Género
              </Label>
              <Select id="gender" {...register('gender')}>
                <option value="MASCULINO">Masculino</option>
                <option value="FEMENINO">Femenino</option>
                <option value="OTRO">Otro</option>
              </Select>
            </div>

            <div>
              <Label htmlFor="nationality" required>
                Nacionalidad
              </Label>
              <Input
                id="nationality"
                placeholder="ECUATORIANA"
                {...register('nationality')}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="birthDate" required>
              Fecha de Nacimiento
            </Label>
            <Input id="birthDate" type="date" {...register('birthDate')} />
            {errors.birthDate && (
              <p className="text-destructive text-sm mt-1">
                {errors.birthDate.message}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Ubicación */}
      <Card>
        <CardHeader>
          <CardTitle>Ubicación</CardTitle>
          <CardDescription>Dirección del proyecto</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="province" required>
                Provincia
              </Label>
              <Select
                id="province"
                value={selectedProvince}
                {...register('province')}
                onChange={(e) => handleProvinceChange(e.target.value)}
              >
                <option value="" disabled>
                  Seleccione una provincia
                </option>
                {ecuadorLocations.provinces.map((province) => (
                  <option key={province.name} value={province.name}>
                    {province.name}
                  </option>
                ))}
              </Select>
              {errors.province && (
                <p className="text-destructive text-sm mt-1">
                  {errors.province.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="canton" required>
                Cantón
              </Label>
              <Select
                id="canton"
                value={selectedCanton}
                {...register('canton')}
                onChange={(e) => handleCantonChange(e.target.value)}
                disabled={!selectedProvince}
              >
                <option value="" disabled>
                  Seleccione un cantón
                </option>
                {selectedProvince &&
                  getCantonsByProvince(selectedProvince).map((canton) => (
                    <option key={canton.name} value={canton.name}>
                      {canton.name}
                    </option>
                  ))}
              </Select>
              {errors.canton && (
                <p className="text-destructive text-sm mt-1">
                  {errors.canton.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="parish" required>
                Parroquia
              </Label>
              <Select
                id="parish"
                {...register('parish')}
                disabled={!selectedCanton}
              >
                <option value="" disabled>
                  Seleccione una parroquia
                </option>
                {selectedProvince &&
                  selectedCanton &&
                  getParishesByCanton(selectedProvince, selectedCanton).map(
                    (parish) => (
                      <option key={parish} value={parish}>
                        {parish}
                      </option>
                    )
                  )}
              </Select>
              {errors.parish && (
                <p className="text-destructive text-sm mt-1">
                  {errors.parish.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="address" required>
              Dirección Completa
            </Label>
            <Input
              id="address"
              placeholder="Calle, número, sector..."
              {...register('address')}
            />
            {errors.address && (
              <p className="text-destructive text-sm mt-1">
                {errors.address.message}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Contacto */}
      <Card>
        <CardHeader>
          <CardTitle>Información de Contacto</CardTitle>
          <CardDescription>Datos de contacto del proyecto</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="email" required>
              Correo Electrónico
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="ejemplo@correo.com"
              {...register('email')}
            />
            {errors.email && (
              <p className="text-destructive text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="conventionalPhone">Teléfono Convencional</Label>
              <Input
                id="conventionalPhone"
                placeholder="02-1234567"
                {...register('conventionalPhone')}
              />
            </div>

            <div>
              <Label htmlFor="cellPhone" required>
                Teléfono Celular
              </Label>
              <Input
                id="cellPhone"
                placeholder="0991234567"
                maxLength={10}
                {...register('cellPhone')}
              />
              {errors.cellPhone && (
                <p className="text-destructive text-sm mt-1">
                  {errors.cellPhone.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="hasRUC"
              className="w-4 h-4 rounded border-input"
              {...register('hasRUC')}
            />
            <Label htmlFor="hasRUC" className="!mb-0 cursor-pointer">
              ¿Dispone de RUC?
            </Label>
          </div>

          {hasRUC && (
            <div>
              <Label htmlFor="ruc">Número de RUC</Label>
              <Input
                id="ruc"
                placeholder="1234567890001"
                maxLength={13}
                {...register('ruc')}
              />
            </div>
          )}

          <div>
            <Label htmlFor="startDate" required>
              Fecha de Inicio de Actividades
            </Label>
            <Input id="startDate" type="date" {...register('startDate')} />
            {errors.startDate && (
              <p className="text-destructive text-sm mt-1">
                {errors.startDate.message}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-end">
        <Button type="submit" size="lg" className="min-w-[200px]">
          Siguiente
        </Button>
      </div>
    </form>
  );
}
