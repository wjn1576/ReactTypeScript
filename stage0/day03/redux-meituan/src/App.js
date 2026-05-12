import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchFoodsList } from './store/modules/takeaway'
import NavBar from './components/NavBar'
import Menu from './components/Menu'
import Cart from './components/Cart'
import FoodsCategory from './components/FoodsCategory'

import './App.scss'

const App = () => {
  // 从 store 中获取数据
  const { foodsList, activeIndex, searchKeyword } = useSelector(state => state.foods)
  const dispatch = useDispatch()
  // 用 ref 存储每个分类的 DOM 引用
  const listRef = useRef(null)

  // 组件挂载时触发异步请求
  useEffect(() => {
    dispatch(fetchFoodsList())
  }, [dispatch])

  // activeIndex 变化时，滚动到对应分类
  useEffect(() => {
    if (listRef.current) {
      const categoryNodes = listRef.current.querySelectorAll('.category')
      if (categoryNodes[activeIndex]) {
        categoryNodes[activeIndex].scrollIntoView({ behavior: 'smooth' })
      }
    }
  }, [activeIndex])

  // 根据搜索关键词过滤商品列表
  const filteredList = foodsList.map(category => ({
    ...category,
    foods: category.foods.filter(food =>
      food.name.toLowerCase().includes(searchKeyword.toLowerCase())
    )
  })).filter(category => category.foods.length > 0)

  return (
    <div className="home">
      {/* 导航 */}
      <NavBar />

      {/* 内容 */}
      <div className="content-wrap">
        <div className="content">
          <Menu />

          <div className="list-content">
            <div className="goods-list" ref={listRef}>
              {/* 外卖商品列表 */}
              {filteredList.map(item => {
                return (
                  <FoodsCategory
                    key={item.tag}
                    // 列表标题
                    name={item.name}
                    // 列表商品
                    foods={item.foods}
                  />
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* 购物车 */}
      <Cart />
    </div>
  )
}

export default App
