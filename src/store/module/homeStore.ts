import { makeAutoObservable } from 'mobx'

class Store {
  name = '张三'
  age = 18
  count = 0
  transitionStyle = {
    display: 'none',
    top: 0,
    left: 0,
    transform: 'scale(0)',
    transition: 'none'
  }
  constructor () {
    makeAutoObservable(this)
  }

  add () {
    this.count ++
  }
  setTransitionStyle (newTransitionStyle: any) {
    this.transitionStyle = newTransitionStyle
  }
}

export default new Store()
