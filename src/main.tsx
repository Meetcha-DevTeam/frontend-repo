import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./assets/styles/main.scss";
import { GoogleOAuthProvider } from "@react-oauth/google";

async function enableMocking() {
  if(import.meta.env.MODE!=='development') return;

  const {worker}=await import('./mocks/browser');

  const isRealBackend=import.meta.env.VITE_REAL_BACKEND_MODE==='true';
/*
  if(!isRealBackend){
    await worker.start();
  }
  */
}
await enableMocking(); 
createRoot(document.getElementById("root")!).render(
  <GoogleOAuthProvider clientId="124678612470-l0adtvcmdc1664nvmsovqoa7qtc0peoh.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>
);
