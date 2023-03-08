## Observable state

##
```js
import { observer } from "mobx-react-lite" // Or "mobx-react".

const MyComponent = observer(props => ReactElement)
```
##
```js
import React from "react"
import ReactDOM from "react-dom"
import { makeAutoObservable } from "mobx"
import { observer } from "mobx-react-lite"

class Timer {
    secondsPassed = 0

    constructor() {
        makeAutoObservable(this)
    }

    increaseTimer() {
        this.secondsPassed += 1
    }
}

const myTimer = new Timer()

//被`observer`包裹的函数式组件会被监听在它每一次调用前发生的任何变化
const TimerView = observer(({ timer }) => <span>Seconds passed: {timer.secondsPassed}</span>)

ReactDOM.render(<TimerView timer={myTimer} />, document.body)

setInterval(() => {
    myTimer.increaseTimer()
}, 1000)
```
## 

现在有几种写法。

### 一个组件（页面）对应一个 observerAbled state 对象。
```js
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

  const destinati

  ...
  ...
  
export default observer(Index)
```
### 在全局定义一个对象，然后各组件引入。本质和上面是一样的。

### 使用 context 把 observerAbled state 传给整个组件树。

react 的 context，与在全局定义一个对象有什么区别呢。

区局变量改变无法驱动组件渲染。