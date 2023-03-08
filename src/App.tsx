import React, { Suspense } from 'react'
import { RouterProvider } from 'react-router-dom'
import Loading from './pages/loading'
import router from './router'
import './App.css'

function App () {
  return (
    <Suspense fallback={<Loading />}>
      <RouterProvider router={router}></RouterProvider>
    </Suspense>
  )
}

export default App
