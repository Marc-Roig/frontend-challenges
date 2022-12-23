export type MergeComponentProps<
  ElementType extends React.ElementType,
  Props extends object
> = Omit<React.ComponentPropsWithoutRef<ElementType>, keyof Props> & Props;
