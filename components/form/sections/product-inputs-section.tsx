"use client";

import { useState, useEffect } from "react";
import { useProject } from "@/context/project-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ArrowLeft, Plus, Trash2, Package } from "lucide-react";
import type { ProductCostDetail, ProductInput, DemandDetail } from "@/types/project";

interface ProductInputsSectionProps {
  onNext: () => void;
  onBack: () => void;
}

export function ProductInputsSection({ onNext, onBack }: ProductInputsSectionProps) {
  const { projectData, updateSection } = useProject();
  
  // Get products from demand details
  const products: DemandDetail[] = projectData.costStructure?.demandDetails || [];
  const [activeProductIndex, setActiveProductIndex] = useState(0);
  
  // Initialize product cost details from context or create empty ones
  const [productCostDetails, setProductCostDetails] = useState<ProductCostDetail[]>(() => {
    const existing = projectData.costStructure?.productCostDetails || [];
    
    // Ensure we have a productCostDetail for each product
    return products.map((product) => {
      const existingDetail = existing.find((pc) => pc.productName === product.productName);
      return existingDetail || {
        productName: product.productName,
        inputs: [{ name: "", unit: "", quantity: 0, unitPrice: 0, totalCost: 0 }],
        unitCost: 0,
      };
    });
  });

  // Calculate totals whenever inputs change
  useEffect(() => {
    const updatedDetails = productCostDetails.map((detail) => {
      const totalCost = detail.inputs.reduce((sum, input) => sum + (input.totalCost || 0), 0);
      const monthlyDemand = products.find((p) => p.productName === detail.productName)?.monthlyDemand || 1;
      const unitCost = monthlyDemand > 0 ? totalCost / monthlyDemand : 0;
      
      return { ...detail, unitCost };
    });
    setProductCostDetails(updatedDetails);
  }, [productCostDetails.map(d => d.inputs).flat().map(i => i.totalCost).join(',')]);

  const currentProduct = productCostDetails[activeProductIndex];

  const addInput = () => {
    if (!currentProduct) return;
    
    const updated = [...productCostDetails];
    updated[activeProductIndex] = {
      ...currentProduct,
      inputs: [...currentProduct.inputs, { name: "", unit: "", quantity: 0, unitPrice: 0, totalCost: 0 }],
    };
    setProductCostDetails(updated);
  };

  const removeInput = (inputIndex: number) => {
    if (!currentProduct || currentProduct.inputs.length <= 1) return;
    
    const updated = [...productCostDetails];
    updated[activeProductIndex] = {
      ...currentProduct,
      inputs: currentProduct.inputs.filter((_, i) => i !== inputIndex),
    };
    setProductCostDetails(updated);
  };

  const updateInput = (inputIndex: number, field: keyof ProductInput, value: string | number) => {
    if (!currentProduct) return;
    
    const updated = [...productCostDetails];
    const newInputs = [...currentProduct.inputs];
    newInputs[inputIndex] = { ...newInputs[inputIndex], [field]: value };
    
    // Auto-calculate totalCost
    if (field === "quantity" || field === "unitPrice") {
      const qty = field === "quantity" ? Number(value) : newInputs[inputIndex].quantity;
      const price = field === "unitPrice" ? Number(value) : newInputs[inputIndex].unitPrice;
      newInputs[inputIndex].totalCost = qty * price;
    }
    
    updated[activeProductIndex] = {
      ...currentProduct,
      inputs: newInputs,
    };
    setProductCostDetails(updated);
  };

  const onSubmit = () => {
    // Filter out empty inputs
    const cleanedDetails = productCostDetails.map((detail) => ({
      ...detail,
      inputs: detail.inputs.filter((input) => input.name.trim() !== ""),
    }));

    updateSection("costStructure", {
      ...projectData.costStructure,
      equipment: projectData.costStructure?.equipment || [],
      financing: projectData.costStructure?.financing || "",
      productCostDetails: cleanedDetails,
    });
    onNext();
  };

  if (products.length === 0) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4 animate-fade-in">
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground mb-4">
              No hay productos definidos. Por favor, regrese a la sección de Demanda y agregue al menos un producto.
            </p>
            <div className="flex justify-center">
              <Button onClick={onBack}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver a Demanda
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const monthlyDemand = products[activeProductIndex]?.monthlyDemand || 0;
  const totalInputCost = currentProduct?.inputs.reduce((sum, input) => sum + (input.totalCost || 0), 0) || 0;
  const unitCost = monthlyDemand > 0 ? totalInputCost / monthlyDemand : 0;

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-6 w-6 text-primary" />
            Insumos por Producto
          </CardTitle>
          <CardDescription>
            Detalle los insumos necesarios para cada producto/servicio
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Product Tabs */}
          <div className="flex flex-wrap gap-2 border-b-2 pb-3 mb-4">
            {products.map((product, index) => (
              <Button
                key={index}
                type="button"
                variant={activeProductIndex === index ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveProductIndex(index)}
                className={
                  activeProductIndex === index
                    ? "font-bold shadow-md border-2 border-primary"
                    : "hover:bg-accent"
                }
              >
                {product.productName || `Producto ${index + 1}`}
              </Button>
            ))}
          </div>

          {/* Current Product Details */}
          {currentProduct && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">
                  {currentProduct.productName}
                </h3>
                <div className="flex gap-4 text-sm">
                  <Badge variant="outline">
                    Demanda mensual: {monthlyDemand} unidades
                  </Badge>
                  <Badge variant="secondary">
                    Costo unitario:${unitCost.toFixed(4)}
                  </Badge>
                </div>
              </div>

              {/* Input Table */}
              <div className="space-y-3">
                {currentProduct.inputs.map((input, inputIndex) => (
                  <Card key={inputIndex} className="relative">
                    <CardContent className="pt-6">
                      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                        <div className="md:col-span-2 space-y-2">
                          <Label htmlFor={`input-name-${inputIndex}`}>Insumo</Label>
                          <Input
                            id={`input-name-${inputIndex}`}
                            placeholder="Ej: Zambo"
                            value={input.name}
                            onChange={(e) => updateInput(inputIndex, "name", e.target.value)}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`input-unit-${inputIndex}`}>Unidad</Label>
                          <Input
                            id={`input-unit-${inputIndex}`}
                            placeholder="UNIDAD/GRAMOS/KG"
                            value={input.unit}
                            onChange={(e) => updateInput(inputIndex, "unit", e.target.value)}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`input-quantity-${inputIndex}`}>Cantidad</Label>
                          <Input
                            id={`input-quantity-${inputIndex}`}
                            type="number"
                            step="0.01"
                            min="0"
                            value={input.quantity || ""}
                            onChange={(e) =>
                              updateInput(inputIndex, "quantity", parseFloat(e.target.value) || 0)
                            }
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`input-price-${inputIndex}`}>Precio Unit. ($)</Label>
                          <Input
                            id={`input-price-${inputIndex}`}
                            type="number"
                            step="0.01"
                            min="0"
                            value={input.unitPrice || ""}
                            onChange={(e) =>
                              updateInput(inputIndex, "unitPrice", parseFloat(e.target.value) || 0)
                            }
                          />
                        </div>
                      </div>

                      <div className="mt-3 flex items-center justify-between">
                        <div className="text-sm">
                          <span className="text-muted-foreground">Costo Total: </span>
                          <span className="font-semibold">${input.totalCost.toFixed(2)}</span>
                        </div>
                        
                        {currentProduct.inputs.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeInput(inputIndex)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Button
                type="button"
                variant="outline"
                onClick={addInput}
                className="w-full"
              >
                <Plus className="mr-2 h-4 w-4" />
                Agregar Insumo
              </Button>

              {/* Totals Summary */}
              <Card className="bg-muted/50">
                <CardContent className="pt-6 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Costo Total de Insumos (mensual):</span>
                    <span className="font-semibold">${totalInputCost.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Costo Unitario:</span>
                    <span className="font-bold text-primary">${unitCost.toFixed(4)}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-between pt-6">
        <Button type="button" variant="outline" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Anterior
        </Button>
        <Button onClick={onSubmit}>
          Siguiente
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
