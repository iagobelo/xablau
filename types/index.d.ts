export declare type Right<R> = {
    readonly id: 'right';
    value: R;
};
export declare type Left<L> = {
    readonly id: 'left';
    value: L;
};
export declare type Either<L, R> = Right<R> | Left<L>;
export declare type Chain = <L, R, R2>(fn: (value: R) => Either<L, R2>) => (either: Either<L, R>) => Either<L, R2>;
export declare type Map = <L, R, R2>(fn: (left: R) => R2) => (either: Either<L, R>) => Either<L, R2>;
export declare type MapLeft = <L, R, L2>(fn: (value: L) => L2) => (either: Either<L, R>) => Either<L2, R>;
export declare type FromPredicate = <A, L>(predicate: (value: A) => boolean, onLeft: (value: A) => L) => (value: A) => Either<L, A>;
export declare type GetOrElse = <L, R>(onLeft: (value: L) => R) => (either: Either<L, R>) => R;
export declare type Fold = <R, R2, L, L2>(onLeft: (left: L) => L2, onRight: (right: R) => R2) => (either: Either<L, R>) => L2 | R2;
export declare const fold: Fold;
export declare const right: <R>(value: R) => Right<R>;
export declare const left: <L>(value: L) => Left<L>;
export declare const mapLeft: MapLeft;
export declare const map: Map;
export declare const fromPredicate: FromPredicate;
export declare const getOrElse: GetOrElse;
export declare const chain: Chain;
