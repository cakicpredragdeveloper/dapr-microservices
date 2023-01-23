import { ValueObject } from "../ValueObject";
import UniqueEntityID from "./UniqueEntityID";

export class StringIdError extends Error {
    constructor(message: string) {
        super(`[StringId] Error - ${message}`);
    }
}

interface StringIdProps {
    value: string;
}

export default class StringId extends ValueObject<StringIdProps> implements UniqueEntityID<string> {

    private constructor(props: StringIdProps) {
        super(props);
    }

    public static create(id: string, tag?: string): StringId {
        if (!StringId.validate(id))
            throw new StringIdError(`Provided value is empty string. StringId must not be empty. [tag - ${tag}]`);
        else
            return new StringId({ value: id })
    }

    private static validate(value: string): boolean {
        if (value === undefined || value === null)
            return false;
        return value.length > 0;
    }

    public getId(): string {
        return this.props.value;
    }

    public isEqual(id: UniqueEntityID<string>): boolean {
        return this.getId() === id.getId()
    }

    public equals(vo?: ValueObject<StringIdProps>): boolean {
        if (vo === undefined || vo === null)
            return false;
        return vo.props.value === this.props.value;
    }
}