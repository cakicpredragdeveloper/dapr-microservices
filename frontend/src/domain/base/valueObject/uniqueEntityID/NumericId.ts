import { ValueObject } from "../ValueObject";
import UniqueEntityID from "./UniqueEntityID";

export class NumericIdError extends Error {
    constructor(message: string) {
        super(`[NumericId] Error - ${message}`);
    }
}

interface NumericIdProps {
    value: number;
}

export default class NumericId extends ValueObject<NumericIdProps> implements UniqueEntityID<number> {

    private constructor(props: NumericIdProps) {
        super(props);
    }

    public static create(id: number): NumericId {
        if (!NumericId.validate(id))
            throw new NumericIdError(`Provided value is invalid. NumericId must be a positive number. Value - ${id}`);
        else
            return new NumericId({ value: parseInt(id as any) })
    }

    private static validate(value: number): boolean {
        return value > 0 && !isNaN(value);
    }

    public getId(): number {
        return this.props.value;
    }
    public isEqual(id: UniqueEntityID<number>): boolean {
        return this.props.value === id.getId()
    }
    public equals(vo?: ValueObject<NumericIdProps>): boolean {
        if (vo === undefined || vo === null)
            return false;
        return vo.props.value === this.props.value;
    }
}