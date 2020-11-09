import * as React from 'react'
import List from './list'
import './search.less'

interface Child {
  title: string
  info: string
  price: number
}

interface Item {
  title: string
  children?: Child[]
}

interface Props {
  title?: string
  placeholder?: string
  data?: Item[]
  onChange?:(value:string) => void
  onItemClick?:(value:Child) => void
  nothingText?: string
}

let interval:any = null

function useSearchChange( callback:(v:string)=> void,value: string) {
  if (interval) {
    clearTimeout(interval)
  }
  React.useEffect(() => {
    interval = setTimeout(() => {
      callback(value)
    }, 500)
    return () => {
      clearTimeout(interval)
    }
  }, [value])
}

const renderList = (props:Props, value: string, cancel: boolean) => {
  const { data, onItemClick, nothingText } = props
  if (value && (data || []).length === 0) {
    return <div className="nothing">{nothingText}</div>
  }
  return <List data={data} onItemClick={onItemClick}/>
}

const Search: React.FC<Props> = (props) => {
  const [value, setValue] = React.useState<string>('')
  const [cacel, setCacel] = React.useState<boolean>(true)
  const [showResult, setShowResult] = React.useState<boolean>(false)

  const children = props.children

  let inputBlurTimeout: any = null

  const inputRef = React.useRef<HTMLInputElement | null>(null)
  useSearchChange((v:string) => {
    if (props.onChange) {
      props.onChange(v)
    }
  },value)
  return (
    <div className="search-container">
        <div className={`search-title ${cacel ? '' : 'hide'}`}>
          <h2>{props.title || 'Search'}</h2>
        </div>
        <div className="search-content">
          <div className="search-input">
            <i className="search-icon"></i>
            <input 
              value={value} 
              ref={inputRef}
              placeholder={props.placeholder}
              onFocus= {
                () => {
                  clearTimeout(inputBlurTimeout)
                  setCacel(() => false)
                  setTimeout(() => {
                    setShowResult(() => true)
                  }, 500)
                }
              }
              onBlur = {
                (e) => {
                  e.preventDefault()
                  inputBlurTimeout = setTimeout(() => {
                    setCacel(() => true)
                    setShowResult(() => false)
                  }, 100)
                }
              }
              onChange = {
                (e) => {
                  setValue(() => e.target.value)
                }
              }
            />
          </div>
          <div className="search-cancel" style= {{display: cacel ? 'none' : 'block'}} onClick={() => {
            setValue(() => '')
            if (props.onChange) {
              props.onChange('')
            }
            inputRef.current?.focus()
          }}>+</div>
        </div>
        <div className={`search-result ${showResult ? 'show' : ''}`} onClick={
          ()=> {
            inputRef.current?.focus()
          }
        }>
            {
              children ? children : renderList(props, value, cacel)
            }
        </div>
    </div>
  )
}

export default Search
