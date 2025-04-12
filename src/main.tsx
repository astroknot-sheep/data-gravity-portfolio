
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Make sure the DOM is fully loaded before rendering
document.addEventListener('DOMContentLoaded', () => {
  const rootElement = document.getElementById("root");
  
  if (rootElement) {
    // Force a repaint for iOS Chrome
    rootElement.style.display = 'none';
    rootElement.offsetHeight; // Trigger a reflow
    rootElement.style.display = '';
    
    createRoot(rootElement).render(<App />);
  }
});
