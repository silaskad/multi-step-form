import './index.css'
import { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'
import App from './App'
import { FormDataProvider } from './context/formDataProvider'

hydrateRoot(document.getElementById('root'),
    <FormDataProvider>
        <StrictMode>
            <App />
        </StrictMode>
    </FormDataProvider>
)