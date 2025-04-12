
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Get iOS detection early
const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || 
              (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

// Add iOS class to html element
if (isIOS) {
  document.documentElement.classList.add('ios');
}

// Wait for DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  const rootElement = document.getElementById("root");
  
  if (rootElement) {
    // Clear any existing content
    rootElement.innerHTML = '';
    
    // Force a reflow for iOS Chrome
    if (isIOS) {
      document.body.style.opacity = '0.99';
      setTimeout(() => {
        document.body.style.opacity = '1';
      }, 10);
    }
    
    // Create root and render
    createRoot(rootElement).render(<App />);
  }
});
