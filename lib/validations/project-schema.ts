import { z } from 'zod';

export const generalDataSchema = z.object({
  projectName: z.string().min(3, 'El nombre del proyecto debe tener al menos 3 caracteres'),
  logo: z.string().optional(),
  representativeName: z.string().min(3, 'El nombre del representante es requerido'),
  ci: z.string().min(10, 'La cédula debe tener 10 dígitos').max(10, 'La cédula debe tener 10 dígitos'),
  gender: z.enum(['MASCULINO', 'FEMENINO', 'OTRO']),
  nationality: z.string().min(1, 'La nacionalidad es requerida'),
  birthDate: z.string().min(1, 'La fecha de nacimiento es requerida'),
  province: z.string().min(1, 'La provincia es requerida'),
  canton: z.string().min(1, 'El cantón es requerido'),
  parish: z.string().min(1, 'La parroquia es requerida'),
  address: z.string().min(5, 'La dirección completa es requerida'),
  email: z.string().email('Email inválido'),
  conventionalPhone: z.string().optional(),
  cellPhone: z.string().min(10, 'El teléfono celular debe tener 10 dígitos'),
  hasRUC: z.boolean(),
  ruc: z.string().optional(),
  startDate: z.string().min(1, 'La fecha de inicio de actividades es requerida'),
});

export const teamMemberSchema = z.object({
  name: z.string().min(3, 'El nombre es requerido'),
  experience: z.string().min(1, 'La experiencia es requerida'),
  role: z.string().min(1, 'El rol es requerido'),
});

export const equipmentSchema = z.object({
  description: z.string().min(1, 'La descripción es requerida'),
  annualQuantity: z.number().min(1, 'La cantidad debe ser mayor a 0'),
  unitPrice: z.number().min(0, 'El precio unitario debe ser mayor o igual a 0'),
  totalCost: z.number().min(0, 'El costo total debe ser mayor o igual a 0'),
  accountName: z.string().optional(),
  financingType: z.string().optional(),
});

// 7.1 Financial Rates
export const financialRatesSchema = z.object({
  productionGrowth: z.number().min(0).max(100, 'Debe ser un porcentaje entre 0 y 100'),
  priceGrowth: z.number().min(0).max(100),
  discountRate: z.number().min(0).max(100),
  inflationRate: z.number().min(0).max(100),
  salaryIncrease: z.number().min(0).max(100),
});

// 7.2 Demand Detail
export const demandDetailSchema = z.object({
  productName: z.string().min(1, 'El nombre del producto es requerido'),
  monthlyDemand: z.number().min(0, 'La demanda debe ser mayor o igual a 0'),
  pvp: z.number().min(0, 'El PVP debe ser mayor a 0'),
});

// 7.4 Unit Cost
export const unitCostSchema = z.object({
  productName: z.string().min(1, 'El nombre del producto es requerido'),
  unit: z.string().min(1, 'La unidad es requerida'),
  quantity: z.number().min(0),
  unitPrice: z.number().min(0),
  totalCost: z.number().min(0),
});

// Product Input
export const productInputSchema = z.object({
  name: z.string().min(1, 'El nombre del insumo es requerido'),
  unit: z.string().min(1, 'La unidad es requerida'),
  quantity: z.number().min(0),
  unitPrice: z.number().min(0),
  totalCost: z.number().min(0),
});

// Product Cost Detail
export const productCostDetailSchema = z.object({
  productName: z.string().min(1, 'El nombre del producto es requerido'),
  inputs: z.array(productInputSchema),
  unitCost: z.number().min(0),
});

export const projectProfileSchema = z.object({
  generalData: generalDataSchema,
  businessDescription: z.string().min(50, 'La descripción del negocio debe tener al menos 50 caracteres'),
  valueProposition: z.string().min(50, 'La propuesta de valor debe tener al menos 50 caracteres'),
  team: z.array(teamMemberSchema).min(1, 'Debe haber al menos un miembro del equipo'),
  communicationChannels: z.string().min(20, 'Describe los canales de comunicación'),
  commercializationChannels: z.string().min(20, 'Describe los canales de comercialización'),
  supplyChain: z.string().min(20, 'Describe la cadena de suministro'),
  keyPartners: z.string().min(20, 'Describe los socios clave'),
  customerSegments: z.string().min(20, 'Describe los segmentos de clientes'),
  costStructure: z.object({
    financialRates: financialRatesSchema.optional(),
    demandDetails: z.array(demandDetailSchema).optional(),
    equipment: z.array(equipmentSchema),
    unitCosts: z.array(unitCostSchema).optional(),
    monthlyCostTotal: z.number().optional(),
    annualCostTotal: z.number().optional(),
    administrativeProvisions: z.string().optional(),
    productCostDetails: z.array(productCostDetailSchema).optional(),
    financing: z.string().min(20, 'Describe la estructura de financiamiento'),
  }),
  annexes: z.object({
    photos: z.array(z.string()),
    documents: z.array(z.string()),
  }),
});

export type GeneralDataInput = z.infer<typeof generalDataSchema>;
export type TeamMemberInput = z.infer<typeof teamMemberSchema>;
export type EquipmentInput = z.infer<typeof equipmentSchema>;
export type FinancialRatesInput = z.infer<typeof financialRatesSchema>;
export type DemandDetailInput = z.infer<typeof demandDetailSchema>;
export type UnitCostInput = z.infer<typeof unitCostSchema>;
export type ProductInputInput = z.infer<typeof productInputSchema>;
export type ProductCostDetailInput = z.infer<typeof productCostDetailSchema>;
export type ProjectProfileInput = z.infer<typeof projectProfileSchema>;
