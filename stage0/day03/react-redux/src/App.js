import { useDispatch, useSelector } from 'react-redux'
// 导入创建action对象的方法
import { decrement, inscrement, addToNum } from './store/modules/counterStore'
import { fetchChannelList } from './store/modules/channelStore'
import { useEffect } from 'react'

function App () {
  const { count } = useSelector(state => state.counter)
  const { channelList } = useSelector(state => state.channel)
  // 得到dispatch函数
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchChannelList())
  }, [dispatch])

  return (
    <div className="App">
      <button onClick={() => dispatch(decrement())}>-</button>
      <span>{count}</span>
      <button onClick={() => dispatch(inscrement())}>+</button>
      <button onClick={() => dispatch(addToNum(10))}>add to 10</button>
      <button onClick={() => dispatch(addToNum(20))}>add to 20</button>
      <ul>
        {channelList.map(item =>
          <li key={item.id}>{item.name}</li>)}
      </ul>
    </div>
  )
}

export default App
