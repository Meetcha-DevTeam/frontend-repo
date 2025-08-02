import { setupWorker } from "msw/browser";
import { handlers } from "./handlers";

export const worker = setupWorker(...handlers);
worker.events.on("request:unhandled", ({ request }) =>
  console.warn("🛑  unhandled →", request.method, request.url)
);
