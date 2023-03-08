import React, {useRef, useState, useContext} from 'react'
import star from '@/assets/react.svg'
import './index.scss'
import Navbar from '@/components/navbar'
import {allStore} from '@/store/index'
import {observer} from 'mobx-react-lite'
import { makeAutoObservable } from 'mobx'

// const state = makeAutoObservable({
//   count: 123,
//   add () {
//     state.count ++
//   }
// })
const state = new class State {
  constructor () {
    makeAutoObservable(this)
  }
  count = 123
  
  add () {
    this.count ++
  }
}

const Index =  () => {
  const {homeStore} = allStore
  console.log(123)
  
  const refList = [] as HTMLDivElement[]

  const destinationDom = useRef<HTMLDivElement>(null)

  function getRef (dom: HTMLDivElement | null) {
    if(dom) refList.push(dom)
  }

  const canGather = useRef(true)
  
  function gather (index: number) {
    if(!canGather.current) return
    canGather.current = false

    const target = refList[index].getBoundingClientRect()
    const destination = destinationDom.current!.getBoundingClientRect()
    
    homeStore.setTransitionStyle({
      display: 'block',
      top: target.top,
      left: target.left,
      transform: 'scale(1)',
      transition: 'none'
    })

    setTimeout(() => {
      homeStore.setTransitionStyle({
        display: 'block',
        top: destination.top,
        left: destination.left,
        transform: 'scale(0.5)',
        transition: 'all .6s linear'
      })
    },0)
    setTimeout(() => {
      homeStore.setTransitionStyle({
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
      <Navbar count={state.count} />
      <div className="home">
        <div ref={destinationDom} className='destination'></div>
        目的地
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
        <div className='transition-div' style={{...homeStore.transitionStyle}}></div>
        <button onClick={() => state.add()}>++</button>
      </div>  
    </React.Fragment>
  )
}

export default observer(Index)
