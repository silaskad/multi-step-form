import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App'
import { FormDataProvider } from './context/formDataProvider'

export function render(_url) {
    const html = renderToString(
        <FormDataProvider>
            <StrictMode>
                <App />
            </StrictMode>
        </FormDataProvider>
    )

    return { html }
}