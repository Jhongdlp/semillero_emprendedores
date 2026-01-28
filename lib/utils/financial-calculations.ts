import type {
  CostStructure,
  FinancingStructure,
  FinancingItem,
  IncomeProjection,
  YearlyProjection,
  CostsExpensesProjection,
  YearlyCostsExpenses,
  IncomeStatementProjection,
  YearlyIncomeStatement,
  FinancialIndicators,
  InvestmentRecoveryTable,
  YearlyInvestmentRecovery,
} from '@/types/project';

/**
 * Calculate Financing Structure (7.5) based on equipment data
 */
export function calculateFinancingStructure(costStructure: CostStructure): FinancingStructure {
  const equipment = costStructure.equipment || [];
  
  const items: FinancingItem[] = equipment.map((eq) => ({
    description: eq.description,
    investment: eq.totalCost,
    ownSource: eq.financingType === 'PROPIA' || !eq.financingType,
    donationSource: eq.financingType === 'DONACIÓN',
    loanSource: eq.financingType === 'PRÉSTAMO',
  }));

  const totalInvestment = items.reduce((sum, item) => sum + item.investment, 0);

  return {
    items,
    totalInvestment,
    participationPercentage: 100, // Default to 100%
  };
}

/**
 * Calculate Income Projection (7.6) for years 0-5
 */
export function calculateIncomeProjection(costStructure: CostStructure): IncomeProjection {
  const rates = costStructure.financialRates;
  const demandDetails = costStructure.demandDetails || [];
  const equipment = costStructure.equipment || [];
  
  // Base values
  const baseSales = demandDetails.reduce(
    (sum, d) => sum + d.monthlyDemand * d.pvp * 12,
    0
  );
  const totalInvestment = equipment.reduce((sum, eq) => sum + eq.totalCost, 0);
  const monthlyCost = costStructure.monthlyCostTotal || 0;
  const workingCapital = monthlyCost; // 1 month of working capital
  
  const years: YearlyProjection[] = [];
  
  for (let year = 0; year <= 5; year++) {
    const growthFactor = Math.pow(1 + (rates?.productionGrowth || 0) / 100, year);
    const sales = year === 0 ? 0 : baseSales * growthFactor;
    
    years.push({
      year,
      entries: sales + (year === 0 ? totalInvestment : 0),
      sales,
      capitalContribution: year === 0 ? workingCapital : 0,
      loan: year === 0 ? totalInvestment * 0.6 : 0, // Assume 60% loan
      exits: year === 0 ? totalInvestment : sales * 0.8,
      forInvestment: year === 0 ? totalInvestment : 0,
      workingCapital: year === 0 ? workingCapital : 0,
      fixedAsset: year === 0 ? totalInvestment * 0.8 : 0,
      deferredAsset: 0,
      otherAssets: 0,
      forCostsAndExpenses: year === 0 ? 0 : sales * 0.8,
    });
  }
  
  return { years };
}

/**
 * Calculate Costs and Expenses Projection for years 1-5
 */
export function calculateCostsExpensesProjection(costStructure: CostStructure): CostsExpensesProjection {
  const rates = costStructure.financialRates;
  const monthlyCost = costStructure.monthlyCostTotal || 0;
  const annualCost = monthlyCost * 12;
  const equipment = costStructure.equipment || [];
  const totalEquipment = equipment.reduce((sum, eq) => sum + eq.totalCost, 0);
  
  const years: YearlyCostsExpenses[] = [];
  
  for (let year = 1; year <= 5; year++) {
    const inflationFactor = Math.pow(1 + (rates?.inflationRate || 0) / 100, year - 1);
    const base = annualCost * inflationFactor;
    const salaries = base * 0.6; // Assumption: 60% of cost is salaries
    
    years.push({
      year,
      totalVariableCost: base,
      materialCost: base * 0.3, // 30% materials
      salaries,
      basicServices: base * 0.05,
      fuel: base * 0.05,
      transport: base * 0.02,
      rent: 0,
      advertising: 0,
      otherExpenses: base * 0.03,
      depreciationExpense: totalEquipment * 0.1, // 10% depreciation
      financialExpense: 0,
      depreciationExpense15: totalEquipment * 0.15,
      incomeTax25: 0, // To be calculated from income
      capitalPayment: 0,
      loanPayment: 0,
      effectiveCashFlow: 0,
      initialEffective: year === 1 ? monthlyCost : 0,
      finalEffective: 0,
    });
  }
  
  return { years };
}

/**
 * Calculate Income Statement Projection (7.7) for years 1-5
 */
export function calculateIncomeStatementProjection(
  costStructure: CostStructure
): IncomeStatementProjection {
  const rates = costStructure.financialRates;
  const demandDetails = costStructure.demandDetails || [];
  const monthlyCost = costStructure.monthlyCostTotal || 0;
  const annualCost = monthlyCost * 12;
  const equipment = costStructure.equipment || [];
  const totalEquipment = equipment.reduce((sum, eq) => sum + eq.totalCost, 0);
  
  const baseSales = demandDetails.reduce(
    (sum, d) => sum + d.monthlyDemand * d.pvp * 12,
    0
  );
  
  const years: YearlyIncomeStatement[] = [];
  
  for (let year = 1; year <= 5; year++) {
    const growthFactor = Math.pow(1 + (rates?.productionGrowth || 0) / 100, year);
    const sales = baseSales * growthFactor;
    const expenses = annualCost * Math.pow(1 + (rates?.inflationRate || 0) / 100, year - 1);
    
    years.push({
      year,
      income: sales,
      operativeIncome: sales,
      sales,
      operativeExpenses: expenses,
      total: expenses,
      salariesWages: expenses * 0.6,
      basicServices: expenses * 0.05,
      fuel: expenses * 0.05,
      transport: expenses * 0.02,
      rent: 0,
      advertising: 0,
      otherExpenses: expenses * 0.03,
      depreciationExpense: totalEquipment * 0.1,
      amortizationExpense: 0,
    });
  }
  
  return { years };
}

/**
 * Calculate all advanced financial projections at once
 */
export function calculateAllFinancialProjections(costStructure: CostStructure) {
  const financing = calculateFinancingStructure(costStructure);
  const income = calculateIncomeProjection(costStructure);
  const costs = calculateCostsExpensesProjection(costStructure);
  const statement = calculateIncomeStatementProjection(costStructure);
  const recovery = calculateInvestmentRecoveryTable(costStructure, income, statement);
  const indicators = calculateFinancialIndicators(costStructure, income, recovery);

  return {
    financingStructure: financing,
    incomeProjection: income,
    costsExpensesProjection: costs,
    incomeStatementProjection: statement,
    investmentRecoveryTable: recovery,
    financialIndicators: indicators,
  };
}

/**
 * Calculate Investment Recovery Table (7.9)
 */
export function calculateInvestmentRecoveryTable(
  costStructure: CostStructure,
  incomeProjection: IncomeProjection,
  incomeStatement: IncomeStatementProjection
): InvestmentRecoveryTable {
  const equipment = costStructure.equipment || [];
  const totalInvestment = equipment.reduce((sum, eq) => sum + eq.totalCost, 0);
  const monthlyCost = costStructure.monthlyCostTotal || 0;

  const years: YearlyInvestmentRecovery[] = [];
  let accumulated = 0;

  for (let year = 0; year <= 5; year++) {
    let netCashFlow: number;

    if (year === 0) {
      netCashFlow = -totalInvestment; // Initial investment is negative
    } else {
      // Net cash flow = Sales - Operating Expenses
      const yearData = incomeStatement.years.find((y) => y.year === year);
      if (yearData) {
        netCashFlow = yearData.income - yearData.operativeExpenses;
      } else {
        netCashFlow = 0;
      }
    }

    accumulated += netCashFlow;
    const remaining = totalInvestment - Math.abs(accumulated);

    years.push({
      year,
      netCashFlow,
      accumulatedRecovered: accumulated,
      remainingBalance: remaining > 0 ? remaining : 0,
    });
  }

  return { years };
}

/**
 * Calculate Financial Indicators (7.8)
 */
export function calculateFinancialIndicators(
  costStructure: CostStructure,
  incomeProjection: IncomeProjection,
  recoveryTable: InvestmentRecoveryTable
): FinancialIndicators {
  const discountRate = (costStructure.financialRates?.discountRate || 10) / 100;
  const cashFlows = recoveryTable.years.map((y) => y.netCashFlow);

  // Calculate NPV (VAN)
  let npv = 0;
  cashFlows.forEach((cf, index) => {
    npv += cf / Math.pow(1 + discountRate, index);
  });

  // Calculate IRR (TIR) using approximation
  let irr = 0;
  const maxIterations = 100;
  let rate = 0.1; // Start with 10%

  for (let i = 0; i < maxIterations; i++) {
    let npvAtRate = 0;
    let derivative = 0;

    cashFlows.forEach((cf, index) => {
      npvAtRate += cf / Math.pow(1 + rate, index);
      if (index > 0) {
        derivative -= (index * cf) / Math.pow(1 + rate, index + 1);
      }
    });

    if (Math.abs(npvAtRate) < 0.01) break;
    rate = rate - npvAtRate / derivative;
  }
  irr = rate * 100; // Convert to percentage

  // Calculate Benefit-Cost Ratio (B/C)
  const totalBenefits = cashFlows.slice(1).reduce((sum, cf) => sum + (cf > 0 ? cf : 0), 0);
  const totalCosts = Math.abs(cashFlows[0]); // Initial investment
  const bc = totalCosts > 0 ? totalBenefits / totalCosts : 0;

  // Calculate Payback Period (PR)
  let pr = "MAYOR A LOS 5 AÑOS";
  for (let i = 1; i < recoveryTable.years.length; i++) {
    if (recoveryTable.years[i].accumulatedRecovered >= 0) {
      pr = `${i} AÑOS`;
      break;
    }
  }

  return {
    van: npv,
    tir: irr,
    bc,
    pr,
  };
}

