import { ComponentPropsWithoutRef, ElementType } from 'react';

export type MergeElementProps<T extends ElementType, Props extends object = object> = Omit<
  ComponentPropsWithoutRef<T>,
  keyof Props
> &
  Props;
