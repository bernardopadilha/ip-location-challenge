import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App.tsx'
import './styles/global.css'
import { GetLocationProvider } from './context/get-location-context.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GetLocationProvider>
      <App />
    </GetLocationProvider>
  </React.StrictMode>,
)
