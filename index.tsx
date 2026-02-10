
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ErrorBoundary } from './components/ErrorBoundary';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

console.log("🚀 Starting App...");
try {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </React.StrictMode>
  );
  console.log("✅ App Mounted");
} catch (e) {
  console.error("❌ Fatal Error Mounting App:", e);
  document.body.innerHTML = `<h1 style="color:red; padding: 20px;">CRITICAL ERROR: ${e.message}</h1>`;
}
