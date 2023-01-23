import { Dependency } from ".";

export default class DependencyContainer {
  private _dependency: Dependency | undefined;

  createDependency(env: any) {
    this._dependency = new Dependency(env);
  }

  get dependency() {
    if (this._dependency === undefined)
      throw new Error("Dependency is undefined. Pleas run createDependency().");
    return this._dependency;
  }
}
