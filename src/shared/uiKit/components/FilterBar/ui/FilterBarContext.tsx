import { createReactContext } from '@/src/shared/lib/reactUtils';
import { ReactNode, SetStateAction, useState } from 'react';

interface FilterBarContext {
  selectedValue: string;
  setSelectedValue: (next: SetStateAction<string>) => void;
}

const [Provider, useFilterBarContext] = createReactContext<FilterBarContext>({
  name: 'FilterBarContext',
  errorMessage: 'useFilterBarContext: `context` is undefined. Seems you forgot to wrap all components in <FilterBar />',
});

interface FilterBarProviderProps {
  children: ReactNode;
  defaultValue: string;
  onChange?: (value: string) => void;
}

const FilterBarContextProvider = ({ children, defaultValue, onChange }: FilterBarProviderProps) => {
  const [selectedValue, setSelectedValue] = useState<string>(defaultValue);

  const handleSetSelect = (next: SetStateAction<string>) => {
    const nextValue = typeof next === 'function' ? next(selectedValue) : next;
    setSelectedValue(nextValue);
    if (onChange) {
      onChange(nextValue);
    }
  };

  const value: FilterBarContext = {
    selectedValue: selectedValue,
    setSelectedValue: handleSetSelect,
  };

  return <Provider value={value}>{children}</Provider>;
};

export { useFilterBarContext, FilterBarContextProvider };
