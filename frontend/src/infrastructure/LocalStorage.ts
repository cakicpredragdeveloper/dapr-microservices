export class LocalStorageError extends Error {
    constructor(message: string) {
        super(`[LocalStorage] Error - ${message}`);
    }
}

export default class LocalStorage {

    constructor(private store: Storage) { }

    get(key: string): string {
        let result = this.store.getItem(key);
        if (result === null)
            throw new LocalStorageError(`Not found data with provided key. Key -> ${key}`);
        return result;
    }

    has(key: string): boolean {
        return this.store.getItem(key) !== null;
    }

    set(key: string, value: string) {
        this.store.setItem(key, value);
    }

    remove(key: string) {
        this.store.removeItem(key);
    }
}