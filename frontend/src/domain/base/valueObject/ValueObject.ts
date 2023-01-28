interface ValueObjectProps {
    [index: string]: any;
}

export abstract class ValueObject<T extends ValueObjectProps> {
    public readonly props: T;

    constructor(props: T) {
        this.props = Object.freeze(props);
    }

    public abstract equals(vo: ValueObject<T>): boolean;

    protected static isDefined(value: any): boolean {
        return value !== undefined && value !== null;
    }
    protected static determineNextValue<T>(newValue: T | undefined, oldValue: T | undefined) {
        return ValueObject.isDefined(newValue) ? newValue : oldValue;
    }
}