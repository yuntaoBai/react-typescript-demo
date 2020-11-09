import * as React from 'react'
import Carousel from '../../components/carousel'

let data = [
  {
    title: '1.商务机器人',
    info: '商务机器人，商务机器人，商务机器人商务机器人',
    icon: require('../../static/img/01.png').default,
    theme: 'dark',
    index: 1
  },
  {
    title: '2.政务机器人',
    info: '政务机器人政务机器人政务机器人，政务机器人政务机器人',
    icon: require('../../static/img/02.png').default,
    index: 1
  },
  {
    title: '3.全能机器人全能机器人,全能机器人全能机器人全能机器人 \n 全能机器人全能机器人全能机器人',
    icon: require('../../static/img/03.png').default,
    index: 1
  }
]

// 由于时间问题，没有加单元测试，抱歉

const App: React.FC = () => {
  return (
    <Carousel data= {data} timer= {3000}/>
  )
}

export default App
