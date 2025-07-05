import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import Body from './pages/Body.tsx'
import Project from './pages/Project.tsx'
import Projects from './pages/Projects.tsx'

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Body />
      },
      {
        path: "/projects",
        element: <Projects />
      },
      {
        path: "/project/:id",
        element: <Project />
      }
    ]
  }
], {
  basename: "/portfolio"
})
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={routes} />
  </StrictMode>,
)
