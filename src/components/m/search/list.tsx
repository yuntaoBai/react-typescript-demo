import * as React from 'react'

interface ListChild {
    title: string
    info: string
    price: number
}
  
interface ListItem {
    title: string
    children?: ListChild[]
}
interface ListProps {
    data?: ListItem[]
    onItemClick?: (v:ListChild) => void
}

const renderChild = (item:ListChild, index:number, props:ListProps) => {
    return (
        <div className="list-child" key={`child_${index}`} onClick={() => {
            if (props.onItemClick) {
                props.onItemClick(item)
            }
        }}>
            <div className="child-content">
                <div className="child-title">{item.title}</div>
                <div className="child-info">{item.info}</div>
            </div>
            <div className="child-price">
                <span>{`$${item.price}`}</span>
            </div>
        </div>
    )
}

const renderItem = (item:ListItem, index:number, props:ListProps) => {
    return (
        <div className="list-item" key={`item_${index}`}>
            <h2>{item.title}</h2>
            <div className="list-content">
                {(item.children || []).map((listItem: ListChild, listIndex: number) => {
                    return renderChild(listItem, listIndex, props)
                })}
            </div>
        </div>
    )
}

const SearchList: React.FC<ListProps> = (props) => {
    return (
        <div className="search-list">
            {
                (props.data || []).map((item, index) => {
                    return renderItem(item, index, props)
                })
            }
        </div>
    )
}

export default SearchList