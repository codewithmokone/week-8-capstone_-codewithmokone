import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { LearnerProvider } from './context/LearnerContext.jsx'
import { EmployeeProvider } from './context/employeeContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LearnerProvider>
      <EmployeeProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </EmployeeProvider>
    </LearnerProvider>
  </StrictMode>
)
