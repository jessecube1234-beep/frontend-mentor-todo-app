import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@styles/styles.css';
import '@styles/main.scss';
import App from '@/App.jsx';
import { ThemeProvider } from '@/components/providers/themeProvider';

//Get the root element from the HTML
const rootElement = document.getElementById('root');

//Create a React root and render the App component inside StrictMode

createRoot(rootElement).render(
  <StrictMode>
    <ThemeProvider defaultTheme='dark'>
      <App />
    </ThemeProvider>
  </StrictMode>,
);
