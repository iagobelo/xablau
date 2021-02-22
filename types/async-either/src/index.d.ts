import type { Either } from '../../either/src/index';
declare type AsyncEither<L, R> = () => Promise<Either<L, R>>;
declare type Chain = <L, R, R2>(fn: (value: R) => AsyncEither<L, R2>) => (either: AsyncEither<L, R>) => AsyncEither<L, R2>;
export declare type MapLeft = <L, R, L2>(fn: (value: L) => L2) => (either: AsyncEither<L, R>) => AsyncEither<L2, R>;
export declare type FromPredicate = <A, L>(predicate: (value: A) => boolean, onLeft: (value: A) => L) => (value: A) => AsyncEither<A, L>;
export declare const chain: Chain;
export {};
