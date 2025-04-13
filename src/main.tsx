
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Get the root element
const rootElement = document.getElementById("root");

// Make sure the root element exists
if (!rootElement) {
  console.error("Root element not found!");
} else {
  const root = createRoot(rootElement);
  
  // Simple error boundary
  try {
    root.render(<App />);
    console.log("App successfully rendered");
  } catch (error) {
    console.error("Error rendering the app:", error);
    rootElement.innerHTML = `
      <div style="padding: 20px; color: white; text-align: center;">
        <h2>Something went wrong</h2>
        <p>Please try refreshing the page</p>
        <pre>${error instanceof Error ? error.message : String(error)}</pre>
      </div>
    `;
  }
}
