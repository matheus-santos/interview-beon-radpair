import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { UIProvider } from '@contexts/uiContext'
import { MainLayout } from '@components/layouts'
import { MainPage } from '@components/pages/mainPage'

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <MainPage />,
      },
    ],
  },
])

function App() {
  return (
    <UIProvider>
      <RouterProvider router={appRouter} />
    </UIProvider>
  )
}

export default App
