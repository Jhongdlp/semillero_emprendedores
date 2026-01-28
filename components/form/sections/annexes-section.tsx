'use client';

import { useForm } from 'react-hook-form';
import { useProject } from '@/context/project-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Upload, X, FileText, Image } from 'lucide-react';
import { useState } from 'react';

interface AnnexesSectionProps {
  onNext: () => void;
  onBack: () => void;
  isGenerating?: boolean;
}

export function AnnexesSection({ onNext, onBack, isGenerating = false }: AnnexesSectionProps) {
  const { projectData, updateSection } = useProject();
  const [photos, setPhotos] = useState<string[]>(projectData.annexes?.photos || []);
  const [documents, setDocuments] = useState<string[]>(
    projectData.annexes?.documents || []
  );

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotos((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setDocuments((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removePhoto = (index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const removeDocument = (index: number) => {
    setDocuments((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    updateSection('annexes', { photos, documents });
    onNext();
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* ... (previous JSX content is unchanged until the button) ... */}
      <Card>
        <CardHeader>
          <CardTitle>Evidencia Fotográfica</CardTitle>
          <CardDescription>
            Sube fotos de tu producto, proceso, equipo, instalaciones, etc.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => document.getElementById('photos-input')?.click()}
            className="w-full"
          >
            <Upload className="w-4 h-4 mr-2" />
            Cargar Fotos
          </Button>
          <input
            id="photos-input"
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handlePhotoUpload}
          />

          {photos.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              {photos.map((photo, index) => (
                <div key={index} className="relative group">
                  <img
                    src={photo}
                    alt={`Foto ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg border border-border"
                  />
                  <button
                    type="button"
                    onClick={() => removePhoto(index)}
                    className="absolute top-2 right-2 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Documentos de Respaldo</CardTitle>
          <CardDescription>
            Sube documentos adicionales que respalden tu proyecto (permisos, certificaciones, etc.)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => document.getElementById('documents-input')?.click()}
            className="w-full"
          >
            <Upload className="w-4 h-4 mr-2" />
            Cargar Documentos
          </Button>
          <input
            id="documents-input"
            type="file"
            accept=".pdf,.doc,.docx"
            multiple
            className="hidden"
            onChange={handleDocumentUpload}
          />

          {documents.length > 0 && (
            <div className="space-y-2 mt-4">
              {documents.map((doc, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-muted rounded-lg"
                >
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-muted-foreground" />
                    <span className="text-sm font-medium">Documento {index + 1}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeDocument(index)}
                    className="text-destructive hover:text-destructive/80"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={onBack} size="lg" disabled={isGenerating}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Anterior
        </Button>
        <Button 
          type="button" 
          onClick={handleSubmit} 
          size="lg" 
          className="min-w-[200px]"
          disabled={isGenerating}
        >
          {isGenerating ? 'Generando PDF...' : 'Finalizar'}
        </Button>
      </div>
    </div>
  );
}
