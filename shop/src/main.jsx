import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Tasks from './Task.jsx'
import EditTask from './Edit.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/tasks", element: <Tasks /> },
  { path: "/edit/:id", element: <EditTask /> }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
