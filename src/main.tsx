import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./assets/styles/main.scss";
import { GoogleOAuthProvider } from "@react-oauth/google";

async function enableMocking() {
  if (process.env.NODE_ENV !== "development") {
    return;
  }
  const { worker } = await import("./mocks/browser");
  return worker.start();
}
await enableMocking(); 
createRoot(document.getElementById("root")!).render(
  <GoogleOAuthProvider clientId="124678612470-l0adtvcmdc1664nvmsovqoa7qtc0peoh.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>
);
