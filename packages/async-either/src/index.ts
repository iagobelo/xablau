import type { Either } from '../../either/src/index';
import * as E from '../../either/src/index';

type AsyncEither<L, R> = () => Promise<Either<L, R>>;

type Chain = <L, R, R2>(
  fn: (value: R) => AsyncEither<L, R2>
) => (either: AsyncEither<L, R>) => AsyncEither<L, R2>;

type Flat = <L, R>(
  asyncEither: AsyncEither<L, AsyncEither<L, R>>
) => AsyncEither<L, R>;

const flat: Flat = (asyncEither) => () =>
  asyncEither().then(E.fold(E.left, (r) => r()));

type Map = <R, R2>(
  fn: (right: R) => R2
) => <L>(asyncEither: AsyncEither<L, R>) => AsyncEither<L, R2>;

const map: Map = (fn) => (asyncEither) => () => asyncEither().then(E.map(fn));

export type MapLeft = <L, R, L2>(
  fn: (value: L) => L2
) => (either: AsyncEither<L, R>) => AsyncEither<L2, R>;

export type FromPredicate = <A, L>(
  predicate: (value: A) => boolean,
  onLeft: (value: A) => L
) => (value: A) => AsyncEither<A, L>;

export const chain: Chain = (fn) => (asyncEither) => {
  const nested = map(fn)(asyncEither);
  return flat(nested);
};
