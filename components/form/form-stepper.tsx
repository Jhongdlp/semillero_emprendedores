'use client';

import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Step {
  number: number;
  title: string;
  completed: boolean;
}

interface FormStepperProps {
  currentStep: number;
  totalSteps: number;
  stepTitles: string[];
}

export function FormStepper({ currentStep, totalSteps, stepTitles }: FormStepperProps) {
  const steps: Step[] = stepTitles.map((title, index) => ({
    number: index + 1,
    title,
    completed: index + 1 < currentStep,
  }));

  return (
    <div className="w-full py-8">
      {/* Progress bar */}
      <div className="mb-8">
        <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500 ease-out"
            style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
          />
        </div>
        <div className="mt-3 flex justify-between text-sm">
          <span className="text-muted-foreground">
            Paso {currentStep} de {totalSteps}
          </span>
          <span className="font-medium text-primary">
            {Math.round(((currentStep - 1) / (totalSteps - 1)) * 100)}% completado
          </span>
        </div>
      </div>

      {/* Steps */}
      <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-3">
        {steps.map((step) => {
          const isCurrent = step.number === currentStep;
          const isCompleted = step.completed;
          const isUpcoming = step.number > currentStep;

          return (
            <div
              key={step.number}
              className="flex flex-col items-center gap-2 animate-fade-in"
            >
              <div
                className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 border-2",
                  {
                    "bg-primary text-primary-foreground border-primary shadow-lg scale-110":
                      isCurrent,
                    "bg-success text-success-foreground border-success":
                      isCompleted,
                    "bg-muted text-muted-foreground border-border":
                      isUpcoming,
                  }
                )}
              >
                {isCompleted ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <span>{step.number}</span>
                )}
              </div>
              <span
                className={cn(
                  "text-xs text-center font-medium transition-colors line-clamp-2",
                  {
                    "text-primary font-semibold": isCurrent,
                    "text-foreground": isCompleted,
                    "text-muted-foreground": isUpcoming,
                  }
                )}
              >
                {step.title}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
