import React from 'react'
import { useNavigate } from 'react-router-dom'
import './index.scss'

const Index =  () => {
  // 路由跳转
  const router = useNavigate()
  
  function back () {
    router(-1)
  }
  return (
    <>
      <div>record 页</div>
      <button onClick={back}>返回</button>
    </>
  )
}

export default Index
