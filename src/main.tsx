import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

if (import.meta.env.PROD) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  import('https://cdn.staticfile.org/vConsole/3.3.4/vconsole.min.js').then(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    new window.VConsole()
  })
}

// 可伸缩布局库
import 'amfe-flexible'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <App />
)
