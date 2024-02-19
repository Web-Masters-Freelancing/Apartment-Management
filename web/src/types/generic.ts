export type OptionalExceptFor<T, TRequired extends keyof T> = Pick<
  T,
  TRequired
> &
  Partial<T>;

export type PartialPick<T, F extends keyof T> = Omit<T, F> &
  Partial<Pick<T, F>>;
