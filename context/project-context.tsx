'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { ProjectProfile } from '@/types/project';

interface ProjectContextType {
  projectData: Partial<ProjectProfile>;
  updateSection: <K extends keyof ProjectProfile>(section: K, data: ProjectProfile[K]) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  saveToLocalStorage: () => void;
  loadFromLocalStorage: () => void;
  clearData: () => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

const STORAGE_KEY = 'semillero_project_data';

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [projectData, setProjectData] = useState<Partial<ProjectProfile>>({});
  const [currentStep, setCurrentStep] = useState(1);

  // Load data from localStorage on mount
  useEffect(() => {
    loadFromLocalStorage();
  }, []);

  // Note: Removed auto-save useEffect to prevent quota errors
  // Data is now saved only when explicitly updating sections via updateSection

  const updateSection = <K extends keyof ProjectProfile>(
    section: K,
    data: ProjectProfile[K]
  ) => {
    setProjectData((prev) => {
      const newData = {
        ...prev,
        [section]: data,
      };

      // Auto-calculate unit costs when productCostDetails AND demandDetails both exist
      if (section === 'costStructure') {
        const costData = data as ProjectProfile['costStructure'];
        
        // Only calculate unitCosts if we have BOTH productCostDetails and demandDetails
        if (costData.productCostDetails && costData.demandDetails) {
          const unitCosts = costData.productCostDetails.map((product) => {
            const demand = costData.demandDetails?.find(d => d.productName === product.productName);
            const monthlyDemand = demand?.monthlyDemand || 0;
            const totalInputCost = product.inputs.reduce((sum, input) => sum + input.totalCost, 0);
            
            return {
              productName: product.productName,
              unit: 'UNIDAD',
              quantity: monthlyDemand,
              unitPrice: product.unitCost,
              totalCost: totalInputCost,
            };
          });

          // Calculate totals
          const monthlyCostTotal = unitCosts.reduce((sum, item) => sum + item.totalCost, 0);
          const annualCostTotal = monthlyCostTotal * 12;

          // Update with calculated values
          newData.costStructure = {
            ...costData,
            unitCosts,
            monthlyCostTotal,
            annualCostTotal,
          };
          
          // Auto-calculate advanced financial projections if we have all required data
          if (costData.financialRates && costData.equipment && costData.equipment.length > 0) {
            // Import calculations dynamically to avoid circular dependencies
            import('@/lib/utils/financial-calculations').then(({ calculateAllFinancialProjections }) => {
              const projections = calculateAllFinancialProjections(newData.costStructure!);
              
              setProjectData(prev => ({
                ...prev,
                costStructure: {
                  ...prev.costStructure!,
                  ...projections,
                },
              }));
            });
          }
        }
        // If we don't have both, just save what we have (important!)
        // This ensures demandDetails gets saved even without productCostDetails
      }

      // Save to localStorage after updating
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
      } catch (error) {
        console.error('Error saving to localStorage:', error);
        // If quota exceeded, try to clear old data
        if (error instanceof Error && error.name === 'QuotaExceededError') {
          console.warn('localStorage quota exceeded, clearing old data');
          localStorage.clear();
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
          } catch (e) {
            console.error('Failed to save even after clearing:', e);
          }
        }
      }

      return newData;
    });
  };

  const saveToLocalStorage = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(projectData));
      localStorage.setItem(`${STORAGE_KEY}_step`, currentStep.toString());
    } catch (error) {
      console.error('Error saving to localStorage:', error);
      if (error instanceof Error && error.name === 'QuotaExceededError') {
        alert('Advertencia: El almacenamiento está lleno. Algunos datos podrían no guardarse.');
      }
    }
  };

  const loadFromLocalStorage = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      const savedStep = localStorage.getItem(`${STORAGE_KEY}_step`);
      
      if (saved) {
        setProjectData(JSON.parse(saved));
      }
      
      if (savedStep) {
        setCurrentStep(parseInt(savedStep, 10));
      }
    } catch (error) {
      console.error('Error loading from localStorage:', error);
    }
  };

  const clearData = () => {
    setProjectData({});
    setCurrentStep(1);
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(`${STORAGE_KEY}_step`);
  };

  return (
    <ProjectContext.Provider
      value={{
        projectData,
        updateSection,
        currentStep,
        setCurrentStep,
        saveToLocalStorage,
        loadFromLocalStorage,
        clearData,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}

export function useProject() {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
}
