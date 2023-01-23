export default interface UniqueEntityID<T> {
    getId(): T;
    isEqual(id: UniqueEntityID<T>): boolean;
}