import DependencyContainer, { Dependency } from "./DependencyContainer";
import HttpApi from "./HttpApi";

let dependency: Dependency;

(async () => {
  dependency = await new DependencyContainer().dependency(process.env);
})()
  .then(() => {
    const { config, api } = dependency;
    const server = new HttpApi(config, api);
    server.start();
  })
  .catch((err) => {
    console.log(err);
  });
