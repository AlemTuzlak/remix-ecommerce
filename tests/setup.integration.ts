import * as integration from "./factory";

beforeEach((ctx) => {
  ctx.integration = integration;
  ctx.request = new Request("http://localhost");
});
