import React, {useRef, useState} from 'react';
import { useNavigate } from 'react-router-dom'
import star from '@/assets/react.svg'
import './index.scss'

const Index =  () => {
  // 路由跳转
  const router = useNavigate()

  function toDetail () {
    router('/detail')
  }

  function toRecord () {
    router('/record')
  }

  const refList = [] as HTMLDivElement[]

  const destinationDom = useRef<HTMLDivElement>(null)

  function getRef (dom: HTMLDivElement | null) {
    if(dom) refList.push(dom)
  }

  const [transitionStyle, setTransitionStyle] = useState({
    display: 'none',
    top: 0,
    left: 0,
    transform: 'scale(0)',
    transition: 'none'
  })

  const canGather = useRef(true)

  function gather (index: number) {
    if(!canGather.current) return
    canGather.current = false

    const target = refList[index].getBoundingClientRect()
    const destination = destinationDom.current!.getBoundingClientRect()
    
    setTransitionStyle({
      display: 'block',
      top: target.top,
      left: target.left,
      transform: 'scale(1)',
      transition: 'none'
    })

    setTimeout(() => {
      setTransitionStyle({
        display: 'block',
        top: destination.top,
        left: destination.left,
        transform: 'scale(0.5)',
        transition: 'all .6s linear'
      })
    },0)
    setTimeout(() => {
      setTransitionStyle({
        display: 'none',
        top: 0,
        left: 0,
        transform: 'scale(1)',
        transition: 'none'
      })
      canGather.current = true
    }, 600)
  }

  return (
    <React.Fragment>
      <div>home 页</div>
      <br />
      <div ref={destinationDom} className='destination'></div>
      目的地
      <br />
      <br />
      <button onClick={toDetail}>去 detail</button>
      <br />
      <br />
      <button onClick={toRecord}>去 record</button>
      <br />
      <br />
      <div className='box'></div>
      <div className='week'>
        {[1,2,3,4,5,6,7].map((item, index) => (
          <div ref={getRef} className={`day day${index + 1}`} key={`${item}`} onClick={() => gather(index)}>
            <div className='day-num'>第{item}天</div>
            <div className='top'>
              <img className='img' src={star} />
            </div>
            <div className='bottom'>5积分</div>
          </div>
        ))}
      </div>
      {/* 注意样式，position: fixed */}
      <div className='transition-div' style={transitionStyle}></div>
    </React.Fragment>
  )
}

export default Index
