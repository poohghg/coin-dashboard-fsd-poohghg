import { Context, createContext, Provider, useContext as ReactUseContext } from 'react';

interface ContextOptions {
  name: string;
  strict?: boolean;
  errorMessage?: string;
}

export type ReturnContext<T> = [Provider<T>, () => T, Context<T>];

export const createReactContext = <ContextType>({ name, strict = true, errorMessage }: ContextOptions) => {
  const Context = createContext<ContextType | undefined>(undefined);

  const useContext = () => {
    const context = ReactUseContext(Context);

    if (!context && strict) {
      const error = new Error(errorMessage || `${name} is undefined`);

      error.name = 'ContextError';
      Error.captureStackTrace?.(error, useContext);
      throw error;
    }

    return context;
  };

  Context.displayName = name;
  return [Context.Provider, useContext, Context] as ReturnContext<ContextType>;
};
