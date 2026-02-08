import { UseQueryOptions } from '@tanstack/react-query';

export type AsyncFn<T = any> = (...args: any[]) => Promise<T>;

export type InferData<T extends AsyncFn> = Awaited<ReturnType<T>>;

export type QueryOptionsFn<T extends AsyncFn, TSelect = InferData<T>> = Omit<
  UseQueryOptions<InferData<T>, Error, TSelect>,
  'queryFn' | 'queryKey'
>;

export type QueryOptions<T, TSelect> = Omit<UseQueryOptions<T, Error, TSelect>, 'queryFn' | 'queryKey'>;
