import { useControlledState, UseControlledStateProps } from '@/src/shared/lib/hooks';
import { createReactContext } from '@/src/shared/lib/reactUtils';
import { ReactNode, SetStateAction, useMemo } from 'react';

interface TabsContext {
  selectedKey: string;
  setSelectedKey: (next: SetStateAction<string>) => void;
}

const [Provider, useTabsContext] = createReactContext<TabsContext>({
  name: 'TabsContext',
  errorMessage: 'useTabsContext: `context` is undefined. Seems you forgot to wrap all components in <Tabs />',
});

export { useTabsContext };

interface TabsProviderProps {
  children: ReactNode;
}

export const TabsContextProvider = ({
  children,
  controlledValue,
  defaultValue,
  onChange,
}: TabsProviderProps & UseControlledStateProps<string>) => {
  const [selectedKey, setSelectedKey] = useControlledState({
    controlledValue,
    defaultValue,
    onChange,
  });

  const contextValue = useMemo(
    () => ({
      selectedKey,
      setSelectedKey,
    }),
    [selectedKey, setSelectedKey]
  );

  return <Provider value={contextValue}>{children}</Provider>;
};
