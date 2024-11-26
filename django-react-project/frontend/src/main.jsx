import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { PersistGate } from 'redux-persist/integration/react';

import App from './App.jsx';
import { persistor } from './store/store';
import Spinner from './components/Spinner.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PersistGate loading={<Spinner loading={true} />} persistor={persistor}>
      <App />
    </PersistGate>
  </StrictMode>
);
