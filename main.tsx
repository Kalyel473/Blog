import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Initialize AdSense if in production
const initializeAdsense = () => {
  const script = document.createElement('script');
  script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
  script.async = true;
  script.crossOrigin = 'anonymous';
  // Note: in a real implementation, you would add your AdSense client ID here
  // script.dataset.adClient = 'ca-pub-XXXXXXXXXXXXXXXX';
  document.head.appendChild(script);
};

// Check if we're in production
if (process.env.NODE_ENV === 'production') {
  initializeAdsense();
}

createRoot(document.getElementById("root")!).render(<App />);
