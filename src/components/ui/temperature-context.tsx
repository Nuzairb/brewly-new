import * as React from "react";

export type TemperatureUnit = 'C' | 'F';

interface TemperatureContextValue {
  unit: TemperatureUnit;
  setUnit: (u: TemperatureUnit) => void;
}

const TemperatureUnitContext = React.createContext<TemperatureContextValue | undefined>(undefined);

export function TemperatureUnitProvider({ children }: { children: React.ReactNode }) {
  const [unit, setUnit] = React.useState<TemperatureUnit>('C');
  const value = React.useMemo(() => ({ unit, setUnit }), [unit]);
  return (
    <TemperatureUnitContext.Provider value={value}>
      {children}
    </TemperatureUnitContext.Provider>
  );
}

export function useTemperatureUnit() {
  const ctx = React.useContext(TemperatureUnitContext);
  if (!ctx) throw new Error('useTemperatureUnit must be used within a TemperatureUnitProvider');
  return ctx;
}
