export interface GeneralData {
  projectName: string;
  logo?: string; // Base64 or URL
  representativeName: string;
  ci: string;
  gender: 'MASCULINO' | 'FEMENINO' | 'OTRO';
  nationality: string;
  birthDate: string;
  province: string;
  canton: string;
  parish: string;
  address: string;
  email: string;
  conventionalPhone?: string;
  cellPhone: string;
  hasRUC: boolean;
  ruc?: string;
  startDate: string;
}

export interface TeamMember {
  name: string;
  experience: string;
  role: string;
}

export interface Equipment {
  description: string;
  annualQuantity: number;
  unitPrice: number;
  totalCost: number;
  accountName?: string;
  financingType?: string;
}

// 7.1 Financial Rates
export interface FinancialRates {
  productionGrowth: number; // %
  priceGrowth: number; // %
  discountRate: number; // %
  inflationRate: number; // %
  salaryIncrease: number; // %
}

// 7.2 Demand Detail
export interface DemandDetail {
  productName: string;
  monthlyDemand: number;
  pvp: number; // Precio de venta al público
}

// 7.4 Unit Cost (summary per product)
export interface UnitCost {
  productName: string;
  unit: string;
  quantity: number;
  unitPrice: number;
  totalCost: number;
}

// Product Input (insumo) - detailed breakdown
export interface ProductInput {
  name: string;
  unit: string;
  quantity: number;
  unitPrice: number;
  totalCost: number;
}

// Complete product cost with all inputs
export interface ProductCostDetail {
  productName: string;
  inputs: ProductInput[];
  unitCost: number; // Calculated from sum of inputs / quantity
}

// 7.5 Financing Structure
export interface FinancingItem {
  description: string;
  investment: number;
  ownSource: boolean;      // PROPIA
  donationSource: boolean; // DONACIÓN
  loanSource: boolean;     // PRÉSTAMO
}

export interface FinancingStructure {
  items: FinancingItem[];
  totalInvestment: number;
  participationPercentage: number;
}

// 7.6 Income Projection (5 years)
export interface YearlyProjection {
  year: number;
  entries: number;
  sales: number;
  capitalContribution: number;
  loan: number;
  exits: number;
  forInvestment: number;
  workingCapital: number;
  fixedAsset: number;
  deferredAsset: number;
  otherAssets: number;
  forCostsAndExpenses: number;
}

export interface IncomeProjection {
  years: YearlyProjection[]; // 6 years (0-5)
}

// Costs and Expenses Projection (5 years)
export interface YearlyCostsExpenses {
  year: number;
  totalVariableCost: number;
  materialCost: number;
  salaries: number;
  basicServices: number;
  fuel: number;
  transport: number;
  rent: number;
  advertising: number;
  otherExpenses: number;
  depreciationExpense: number;
  financialExpense: number;
  depreciationExpense15: number;
  incomeTax25: number;
  capitalPayment: number;
  loanPayment: number;
  effectiveCashFlow: number;
  initialEffective: number;
  finalEffective: number;
}

export interface CostsExpensesProjection {
  years: YearlyCostsExpenses[]; // 5 years (1-5)
}

// 7.7 Income Statement Projection (5 years)
export interface YearlyIncomeStatement {
  year: number;
  income: number;
  operativeIncome: number;
  sales: number;
  operativeExpenses: number;
  total: number;
  salariesWages: number;
  basicServices: number;
  fuel: number;
  transport: number;
  rent: number;
  advertising: number;
  otherExpenses: number;
  depreciationExpense: number;
  amortizationExpense: number;
}

export interface IncomeStatementProjection {
  years: YearlyIncomeStatement[]; // 5 years (1-5)
}

// 7.8 Financial Indicators
export interface FinancialIndicators {
  van: number; // Valor Actual Neto (Net Present Value)
  tir: number; // Tasa Interna de Retorno (Internal Rate of Return) in %
  bc: number;  // Relación Beneficio-Costo (Benefit-Cost Ratio)
  pr: string;  // Período de Recuperación (Payback Period) - e.g., "MAYOR A LOS 5 AÑOS"
}

// 7.9 Investment Recovery Table
export interface YearlyInvestmentRecovery {
  year: number;
  netCashFlow: number;     // Flujo neto del año
  accumulatedRecovered: number; // Acumulado recuperado
  remainingBalance: number;     // Saldo por recuperar
}

export interface InvestmentRecoveryTable {
  years: YearlyInvestmentRecovery[]; // 6 years (0-5)
}

export interface CostStructure {
  // 7.1 Financial rates
  financialRates?: FinancialRates;
  
  // 7.2 Demand detail
  demandDetails?: DemandDetail[];
  
  // 7.3 Equipment and machinery
  equipment: Equipment[];
  
  // 7.4 Unit costs and totals
  unitCosts?: UnitCost[];
  monthlyCostTotal?: number;
  annualCostTotal?: number;
  
  // 7.5 Administrative provisions
  administrativeProvisions?: string;
  
  // Detailed inputs per product
  productCostDetails?: ProductCostDetail[];
  
  // Original financing field
  financing: string;
  
  // New: Advanced financial projections
  financingStructure?: FinancingStructure;
  incomeProjection?: IncomeProjection;
  costsExpensesProjection?: CostsExpensesProjection;
  incomeStatementProjection?: IncomeStatementProjection;
  financialIndicators?: FinancialIndicators;
  investmentRecoveryTable?: InvestmentRecoveryTable;
}

export interface Annexes {
  photos: string[]; // Base64 encoded images
  documents: string[]; // Base64 encoded documents
}

export interface ProjectProfile {
  generalData: GeneralData;
  businessDescription: string;
  valueProposition: string;
  team: TeamMember[];
  communicationChannels: string;
  commercializationChannels: string;
  supplyChain: string;
  keyPartners: string;
  customerSegments: string;
  costStructure: CostStructure;
  annexes: Annexes;
}
