import React, {forwardRef} from 'react'

interface Props {
  btnClick?: (item: any) => void
  totalScore?: number
}

const Index = forwardRef(function HeadReward(props: Props, ref: any) {
  return <div>{props.totalScore}</div>
})

// 默认值设置会失效
Index.defaultProps = {
  btnClick: () => {
    //
  },
  totalScore: 0
} as Props

export default Index