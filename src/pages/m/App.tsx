import * as React from 'react'
import Search from '../../components/m/search/index'

function getData(v:string) {
  return fetch('/api/search/' + v,{
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  }).then(res => {
    return res.json()
  })
}

const App: React.FC = () => {
  const [data, setData] = React.useState([])
  return (
    <Search 
      title={'搜索'}
      placeholder="请输入关键字"
      nothingText="暂无结果"
      data = {data}
      onChange= {
        (v) => {
          if (v) {
            getData(v).then(res => {
              setData(() => res.data)
            })
          } else {
            setData(() => [])
          }
        }
      }
      onItemClick = {
        (v) => {
          console.log('点击列表:', v)
        }
      }
    />
  )
}

export default App
