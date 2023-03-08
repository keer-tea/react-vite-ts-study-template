import React, { memo } from 'react'
import './index.scss'
import leftArrow from '@/assets/left-arrow.svg'

const Index = () => {
  return (
    <>
      <div className="navbar">
        <div className="container">
          {/* 导航栏左边 */}
          <div className="navbar-left">
            <img src={leftArrow} title="" />
          </div>
          <div className="navbar-center">首页</div>
          <div className="navbar-right">
            记录
          </div>
        </div>
      </div>
      <div className="navbar-booth"></div>
    </>
  )
}

export default memo(Index)
