import * as React from 'react'
import Spped from './speed'
import './carousel.less'

interface Item {
    title: string
    info?: string
    icon: string
    index: number
    theme?: string // 通过此项可以选择item的风格，目前支持两种风格（dark|light）更多可在css中配合添加
}

interface Props {
    data?: Item[]
    timer?: number
}
// 渲染列表
const renderItem = (item: Item, index: number): React.ReactNode => {
    return (
        <div className={`carousel-item ${item.theme? item.theme : 'light'}`} key={index}>
            <h2>{ item.title }</h2>
            <div className="info">{ item.info}</div>
            <div className="img">
                <img src={item.icon} />
            </div>
        </div>
    )
}
// 创建定时器，通过作用执行轮播动画
function useInterval( callback: () => void , time: number) {
    React.useEffect(() => {
        const interval = setInterval(callback, time)
        return () => {
            clearInterval(interval)
        }
    }, [])
}


const Carousel: React.FC<Props> = ({ data, timer = 3000 }) => {
    const list = data || [], len = list.length
    const [current, setCurrent] = React.useState<number>(0)
    let styles = {
        width: `${list.length * 100}%`,
        left: `-${current * 100}%`
    }
    useInterval(() => {
        setCurrent(current => {
            return current < len - 1 ? current + 1 : 0
        })
        styles = {
            width: `${list.length * 100}%`,
            left: `-${current * 100}%`
        }
    }, timer)
  return (
    <div className="ui-carousel">
        <div className="carousel-container" style={styles}>
            { list.map(renderItem) }
        </div>
        <Spped current={current} timer={timer} count={len}/>
    </div>
  )
}

export default Carousel