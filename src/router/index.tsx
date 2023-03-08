import React, {lazy} from 'react'
import { createHashRouter, Navigate } from 'react-router-dom'
import HomeC from '../pages/home'

// 引入方法一
// const Home = lazy(() => import('../pages/home'))

// 引入方法二
// const Home = lazy(async () => {
//   const res = await new Promise<any>((resolve) => {
//     setTimeout(() => {
//       resolve(HomeC)
//     }, 2000)
//   })
//   return {default: res}
// })

// 引入方法三
const Home = lazy(async () => {
  return new Promise<any>((resolve) => {
    setTimeout(() => {
      resolve({
        default: HomeC
      })
    }, 2)
  })  
})
const Detail = lazy(() => import('../pages/rule'))
const Record = lazy(() => import('../pages/record'))

export default createHashRouter([
  {
    path: '/',
    element: <Navigate replace to="/home" />
  },
  {
    path: '/home',
    element: <Home />
  },
  {
    path: '/detail',
    element: <Detail />
  },
  {
    path: '/record',
    element: <Record />
  }
])
