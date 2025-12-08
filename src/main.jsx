import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import { router } from './routes/router'
import AuthProvider from './contexts/AuthContext/AuthProvider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <App></App>
        <RouterProvider router={router}>
        </RouterProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
)