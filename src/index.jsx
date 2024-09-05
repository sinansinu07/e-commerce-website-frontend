import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'


import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import { AuthProvider } from './context/AuthContext.jsx';

import configureStore from './store/configureStore.js';

const store = configureStore()
console.log(store.getState())

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Provider store={store}>
          <App />
       </Provider>
     </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
)