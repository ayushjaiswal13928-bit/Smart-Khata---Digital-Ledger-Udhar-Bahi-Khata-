import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Capture PWA beforeinstallprompt event early before React mounts
declare global {
  interface Window {
    __pwaInstallPrompt?: any;
  }
}

if (typeof window !== 'undefined') {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    window.__pwaInstallPrompt = e;
    window.dispatchEvent(new CustomEvent('pwa-prompt-ready'));
  });

  window.addEventListener('appinstalled', () => {
    window.__pwaInstallPrompt = null;
    window.dispatchEvent(new CustomEvent('pwa-installed'));
  });
}

// Register Service Worker for PWA Offline and Installability
if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch((err) => {
      console.warn('PWA Service Worker registration:', err);
    });
  });
}

createRoot(document.getElementById('root')!).render(<App />);
