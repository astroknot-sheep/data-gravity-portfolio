
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Get the root element
const rootElement = document.getElementById("root");

// Function to display error screen
const showErrorScreen = (error: unknown) => {
  const errorMessage = error instanceof Error ? error.message : String(error);
  return `
    <div style="
      padding: 2rem;
      color: #fff;
      text-align: center;
      font-family: 'League Spartan', sans-serif;
      background: linear-gradient(to bottom right, #1f2937, #111827);
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    ">
      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#d97706" stroke-width="2" style="margin-bottom: 1.5rem;">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
      </svg>
      <h2 style="margin-bottom: 1rem; font-size: 1.5rem; font-weight: 600; color: #d97706;">Something went wrong</h2>
      <p style="margin-bottom: 2rem; max-width: 500px; color: #e5e7eb;">Please try refreshing the page or check your internet connection.</p>
      <pre style="
        background: rgba(0,0,0,0.2);
        padding: 1rem;
        border-radius: 0.5rem;
        overflow: auto;
        max-width: 90%;
        text-align: left;
        font-size: 0.875rem;
        color: #e5e7eb;
      ">${errorMessage}</pre>
      <button onclick="location.reload()" style="
        margin-top: 2rem;
        background: #d97706;
        color: white;
        border: none;
        padding: 0.75rem 1.5rem;
        border-radius: 0.375rem;
        font-weight: 500;
        cursor: pointer;
        transition: background-color 0.2s;
      ">Reload Page</button>
    </div>
  `;
}

// Make sure the root element exists
if (!rootElement) {
  console.error("Root element not found!");
  document.body.innerHTML = showErrorScreen(new Error("Root element not found"));
} else {
  const root = createRoot(rootElement);
  
  // More robust error boundary
  try {
    root.render(<App />);
    console.log("App successfully rendered");
  } catch (error) {
    console.error("Error rendering the app:", error);
    rootElement.innerHTML = showErrorScreen(error);
  }
}
