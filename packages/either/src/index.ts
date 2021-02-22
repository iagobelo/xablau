export type Right<R> = {
  readonly id: 'right';
  value: R;
};

export type Left<L> = {
  readonly id: 'left';
  value: L;
};

export type Either<L, R> = Right<R> | Left<L>;

export type Chain = <L, R, R2>(
  fn: (value: R) => Either<L, R2>
) => (either: Either<L, R>) => Either<L, R2>;

export type Map = <L, R, R2>(
  fn: (left: R) => R2
) => (either: Either<L, R>) => Either<L, R2>;

export type MapLeft = <L, R, L2>(
  fn: (value: L) => L2
) => (either: Either<L, R>) => Either<L2, R>;

export type FromPredicate = <A, L>(
  predicate: (value: A) => boolean,
  onLeft: (value: A) => L
) => (value: A) => Either<L, A>;

export type GetOrElse = <L, R>(
  onLeft: (value: L) => R
) => (either: Either<L, R>) => R;

export type Fold = <R, R2, L, L2>(
  onLeft: (left: L) => L2,
  onRight: (right: R) => R2
) => (either: Either<L, R>) => L2 | R2;

export const fold: Fold = (onLeft, onRight) => (either) =>
  either.id === 'left' ? onLeft(either.value) : onRight(either.value);

export const right = <R>(value: R): Right<R> => ({
  id: 'right',
  value,
});

export const left = <L>(value: L): Left<L> => ({
  id: 'left',
  value,
});

export const mapLeft: MapLeft = (fn) => (either) =>
  either.id === 'left' ? left(fn(either.value)) : either;

export const map: Map = (fn) => (either) =>
  either.id === 'right' ? right(fn(either.value)) : either;

export const fromPredicate: FromPredicate = (predicate, onLeft) => (value) =>
  predicate(value) ? right(value) : left(onLeft(value));

export const getOrElse: GetOrElse = (onLeft) => (either) =>
  either.id === 'left' ? onLeft(either.value) : either.value;

export const chain: Chain = (fn) => (either) =>
  either.id === 'left' ? either : fn(either.value);
