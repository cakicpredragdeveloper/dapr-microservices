export type ErrorResponseData = {
    message: string,
    actionType: string
}

export type ErrorCondition = {
    message: string
}

export interface ErrorConditioner  {
    condition(item: ErrorCondition): boolean;
    value(): ErrorResponseData
}

export default class ErrorProcessor {
    constructor(
        private _defaultError: ErrorResponseData,
        private _conditions: ErrorConditioner[]
    ) { }

    public process(item: ErrorCondition): ErrorResponseData {
        let result: ErrorResponseData = this._defaultError
        const pResult = this._conditions
            .map(c => c.condition(item) ? c.value() : undefined)
            .filter(item => item !== undefined);

        return pResult.length > 0 ? pResult.pop() as ErrorResponseData: result;
    }
}