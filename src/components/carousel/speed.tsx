import * as React from 'react'

interface Props {
    current?: number,
    timer?: number,
    count?: number
}

// 轮播步骤进度组件，应属于倒计时功能
const Speed: React.FC<Props> = ({ current = 0, timer = 3000, count = 0 }) => {
    const list: any[] = [] 
    for (let i =0; i < count; i++) {
        list.push(i)
    }
    const len = list.length

    const ref = React.useRef<HTMLDivElement | null>(null)

    React.useEffect(() => {
        let spanItems = ref.current?.getElementsByTagName('span') || [],len = spanItems?.length || 0
        for (let i =0; i < len; i++) {
            if (i === current) {
                spanItems[i].style.transitionDuration = `${timer}ms`
                spanItems[i].style.width = `100%`
            } else {
                spanItems[i].style.transitionDuration = `${0}ms`
                spanItems[i].style.width = `0%`
            }
        }
        
    }, [current])
    
    return (
        <div className="carousel-speed" ref={ref}>
            { 
                list.map((item, index) => {
                    return (
                        <div key={index}>
                            <span></span>
                        </div>
                    )
                }) 
            }
        </div>
    )
}

export default Speed